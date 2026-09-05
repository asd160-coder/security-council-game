// Rebuild a narration with a chosen pause after every spoken line.
//   swift pad-narration.swift <in> <out.m4a> <segments> <pauses>
//     <segments>  "start:end,start:end,…" in seconds — from speech-segments.swift
//     <pauses>    "p1,p2,…" seconds of pause to follow each segment, one each
//
// Why this exists: a synthesised take renders its breaks shorter than asked
// for, and the film needs to linger. Each line is taken whole from the source
// with a handle either side — 0.20 s before, 0.35 s after — so no consonant is
// clipped, and is followed by exactly the pause asked for. The handles cannot
// reach a neighbouring line: the script refuses to run if any gap is too
// narrow for them.
//
// The pauses are the take's own room tone, not empty time: a stretch from the
// middle of its longest silence, repeated to length, so the noise floor never
// switches off between lines. This also sidesteps AVFoundation dropping an
// empty range at the very end of a composition — which is exactly where the
// last pause is; the first version of this script lost it that way.
//
// One AAC pass over the speech; the output is the M4A the overture already
// expects at public/overture/narration.m4a. Prints where each line's speech
// should begin in the output as a cross-check — the beat times themselves are
// read back from the output with speech-segments.swift, not from this print.
import Foundation
import AVFoundation

let args = CommandLine.arguments
guard args.count == 5 else {
    FileHandle.standardError.write("usage: pad-narration.swift <in> <out.m4a> <start:end,…> <pause,…>\n".data(using: .utf8)!)
    exit(2)
}
let inURL = URL(fileURLWithPath: args[1])
let outURL = URL(fileURLWithPath: args[2])
let segments: [(Double, Double)] = args[3].split(separator: ",").compactMap { pair in
    let parts = pair.split(separator: ":").compactMap { Double($0) }
    return parts.count == 2 ? (parts[0], parts[1]) : nil
}
let pauses = args[4].split(separator: ",").compactMap { Double($0) }
guard !segments.isEmpty, pauses.count == segments.count else {
    FileHandle.standardError.write("need one pause per segment (\(segments.count) segments, \(pauses.count) pauses)\n".data(using: .utf8)!)
    exit(2)
}

let lead = 0.20
let tail = 0.35
for i in 1..<segments.count where segments[i].0 - segments[i - 1].1 < lead + tail + 0.1 {
    FileHandle.standardError.write(String(format: "segments %d and %d are too close (%.2f s) for the handles\n", i, i + 1, segments[i].0 - segments[i - 1].1).data(using: .utf8)!)
    exit(1)
}

let asset = AVURLAsset(url: inURL)
guard let source = asset.tracks(withMediaType: .audio).first else {
    FileHandle.standardError.write("no audio track in \(inURL.lastPathComponent)\n".data(using: .utf8)!); exit(1)
}
let total = CMTimeGetSeconds(asset.duration)

// Room tone: the middle of the take's longest silence, clear of both handles.
var tone: (Double, Double) = (0, 0)
for i in 1..<segments.count {
    let from = segments[i - 1].1 + tail + 0.10
    let to = segments[i].0 - lead - 0.10
    if to - from > tone.1 - tone.0 { tone = (from, to) }
}
let lastFrom = segments[segments.count - 1].1 + tail + 0.10
let lastTo = total - 0.05
if lastTo - lastFrom > tone.1 - tone.0 { tone = (lastFrom, lastTo) }
guard tone.1 - tone.0 >= 0.5 else {
    FileHandle.standardError.write("no silence in the take is long enough to use as room tone\n".data(using: .utf8)!); exit(1)
}

let composition = AVMutableComposition()
guard let track = composition.addMutableTrack(withMediaType: .audio, preferredTrackID: kCMPersistentTrackID_Invalid) else {
    FileHandle.standardError.write("could not add a track\n".data(using: .utf8)!); exit(1)
}
let scale: CMTimeScale = 44100
func time(_ seconds: Double) -> CMTime { CMTime(seconds: seconds, preferredTimescale: scale) }

var cursor = CMTime.zero
func insert(from: Double, to: Double) throws {
    let range = CMTimeRange(start: time(from), end: time(to))
    try track.insertTimeRange(range, of: source, at: cursor)
    cursor = CMTimeAdd(cursor, range.duration)
}
func insertTone(_ seconds: Double) throws {
    var remaining = seconds
    while remaining > 0.0005 {
        let piece = min(remaining, tone.1 - tone.0)
        try insert(from: tone.0, to: tone.0 + piece)
        remaining -= piece
    }
}

var report: [String] = []
do {
    for (i, seg) in segments.enumerated() {
        let from = max(0, seg.0 - lead)
        let to = min(total, seg.1 + tail)
        let speechAt = CMTimeGetSeconds(cursor) + (seg.0 - from)
        try insert(from: from, to: to)
        report.append(String(format: "%2d  speech %6.2f – %6.2f   then %.2f s pause", i + 1, speechAt, speechAt + (seg.1 - seg.0), pauses[i]))
        try insertTone(pauses[i])
    }
} catch {
    FileHandle.standardError.write("insert failed: \(error.localizedDescription)\n".data(using: .utf8)!); exit(1)
}

try? FileManager.default.removeItem(at: outURL)
try? FileManager.default.createDirectory(at: outURL.deletingLastPathComponent(), withIntermediateDirectories: true)
guard let session = AVAssetExportSession(asset: composition, presetName: AVAssetExportPresetAppleM4A) else {
    FileHandle.standardError.write("could not create export session\n".data(using: .utf8)!); exit(1)
}
session.outputURL = outURL
session.outputFileType = .m4a
let sem = DispatchSemaphore(value: 0)
session.exportAsynchronously { sem.signal() }
sem.wait()

if session.status == .completed {
    print(String(format: "room tone from %.2f – %.2f s of the take", tone.0, tone.1))
    for line in report { print(line) }
    let bytes = (try? FileManager.default.attributesOfItem(atPath: outURL.path)[.size] as? Int) ?? 0
    print(String(format: "ok %@ planned %.2f s, %d bytes", outURL.lastPathComponent, CMTimeGetSeconds(cursor), bytes ?? 0))
} else {
    FileHandle.standardError.write("export failed: \(session.error?.localizedDescription ?? "unknown")\n".data(using: .utf8)!)
    exit(1)
}
