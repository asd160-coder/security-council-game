// Word timestamps for a narration, from macOS on-device speech recognition.
//
// Why a compiled tool and not a script: TCC refuses speech recognition to any
// process without an embedded usage description, and aborts it — a bare
// `swift transcribe.swift` dies with __TCC_CRASHING_DUE_TO_PRIVACY_VIOLATION__.
// And an embedded plist is not enough either: TCC judges the *responsible*
// process — the terminal or app that launched the tool — so a tool run from a
// shell is judged by that shell's plist and dies the same way. The tool has
// to be its own responsible process, which means a minimal app bundle
// launched through LaunchServices:
//
//   swiftc -O -o transcribe .design/transcribe.swift
//   mkdir -p transcribe.app/Contents/MacOS
//   cp transcribe transcribe.app/Contents/MacOS/
//   cp .design/transcribe-Info.plist transcribe.app/Contents/Info.plist
//   codesign -s - --force transcribe.app
//   open -W -a "$PWD/transcribe.app" --args <in.mp3> <out.txt>
//
// macOS asks once whether to allow speech recognition for "transcribe".
// Recognition is on-device only — the request refuses anything else — so the
// audio never leaves the machine. Writes one line per recognised word to
// <out.txt>: start, duration, word, in seconds (and errors to <out>.err).
// Feed the result to align-lines.py.
import Foundation
import Speech
import AVFoundation

func fail(_ message: String) -> Never {
    FileHandle.standardError.write((message + "\n").data(using: .utf8)!)
    exit(1)
}
func pump(until ready: () -> Bool, seconds: Double) {
    let deadline = Date(timeIntervalSinceNow: seconds)
    while !ready() && Date() < deadline {
        RunLoop.current.run(mode: .default, before: Date(timeIntervalSinceNow: 0.1))
    }
}

let args = CommandLine.arguments
guard args.count == 2 || args.count == 3 else { fail("usage: transcribe <in.mp3> [<out.txt>]") }
let url = URL(fileURLWithPath: args[1])
if args.count == 3 {
    /* Launched through `open`, the tool has no terminal: its words go to the
       file named, its complaints to the same name with .err. */
    freopen(args[2], "w", stdout)
    freopen(args[2] + ".err", "w", stderr)
}

var status = SFSpeechRecognizerAuthorizationStatus.notDetermined
SFSpeechRecognizer.requestAuthorization { status = $0 }
pump(until: { status != .notDetermined }, seconds: 300)
guard status == .authorized else { fail("speech recognition not authorized (status \(status.rawValue)); allow it in System Settings → Privacy & Security → Speech Recognition") }

guard let recognizer = SFSpeechRecognizer(locale: Locale(identifier: "en-US")) else { fail("no en-US recognizer") }
pump(until: { recognizer.isAvailable }, seconds: 10)
guard recognizer.isAvailable else { fail("recognizer not available") }
guard recognizer.supportsOnDeviceRecognition else { fail("on-device recognition is not supported here; this tool will not send audio off the machine") }

let request = SFSpeechURLRecognitionRequest(url: url)
request.shouldReportPartialResults = false
request.requiresOnDeviceRecognition = true
if #available(macOS 13, *) { request.addsPunctuation = false }

var finished = false
var failure: String? = nil
recognizer.recognitionTask(with: request) { result, error in
    if let error = error { failure = error.localizedDescription; finished = true; return }
    guard let result = result, result.isFinal else { return }
    for segment in result.bestTranscription.segments {
        print(String(format: "%.2f %.2f %@", segment.timestamp, segment.duration, segment.substring))
    }
    finished = true
}
pump(until: { finished }, seconds: 600)
if let failure = failure { fail("recognition failed: \(failure)") }
if !finished { fail("recognition timed out") }
