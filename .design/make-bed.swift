// A bed under the narration: a low drone synthesised for the game.
//   swift make-bed.swift <out.wav> <seconds> <fadeInSeconds> <fadeOutSeconds>
//
// Not a recording of anything, so nothing to clear. A bare fifth two octaves
// below middle C — A1 and E2 — with the A an octave up detuned a quarter of a
// hertz so the pair beats once every four seconds, a few soft harmonics for
// warmth, a slow breathing swell, a near-inaudible A4 shimmer, and a gentle
// low-pass so nothing in it competes with a voice. It fades in over the first
// line and reaches silence exactly at the film's end. Deterministic: the same
// arguments make the same file. Written as a WAV for mix-narration.swift.
import Foundation
import AVFoundation

let args = CommandLine.arguments
guard args.count == 5, let seconds = Double(args[2]), let fadeIn = Double(args[3]), let fadeOut = Double(args[4]) else {
    FileHandle.standardError.write("usage: make-bed.swift <out.wav> <seconds> <fadeIn> <fadeOut>\n".data(using: .utf8)!)
    exit(2)
}
let outURL = URL(fileURLWithPath: args[1])
let rate = 44100.0
let count = Int(seconds * rate)

struct Voice { let hz: Double; let level: Double }
let voices = [Voice(hz: 55.0, level: 1.0), Voice(hz: 82.41, level: 0.7), Voice(hz: 110.25, level: 0.45)]
let cutoff = 1 - exp(-2 * Double.pi * 600 / rate)

var samples = [Double](repeating: 0, count: count)
var filtered = 0.0
var peak = 0.0
for i in 0..<count {
    let t = Double(i) / rate
    var s = 0.0
    for v in voices {
        for h in 1...4 { s += v.level * sin(2 * .pi * v.hz * Double(h) * t) / Double(h * h) }
    }
    s += 0.015 * sin(2 * .pi * 440 * t) * (0.5 + 0.5 * sin(2 * .pi * 0.11 * t))
    s *= 1 + 0.12 * sin(2 * .pi * 0.06 * t)
    filtered += cutoff * (s - filtered)
    var envelope = 1.0
    if t < fadeIn { envelope = 0.5 - 0.5 * cos(.pi * t / fadeIn) }
    let remaining = seconds - t
    if remaining < fadeOut { envelope *= 0.5 - 0.5 * cos(.pi * remaining / fadeOut) }
    samples[i] = filtered * envelope
    peak = max(peak, abs(samples[i]))
}
let gain = pow(10.0, -18.0 / 20.0) / peak   // peak at -18 dBFS
var sumSquares = 0.0
guard let format = AVAudioFormat(commonFormat: .pcmFormatFloat32, sampleRate: rate, channels: 1, interleaved: false),
      let buffer = AVAudioPCMBuffer(pcmFormat: format, frameCapacity: AVAudioFrameCount(count)) else { exit(1) }
buffer.frameLength = AVAudioFrameCount(count)
let out = buffer.floatChannelData![0]
for i in 0..<count {
    let v = samples[i] * gain
    out[i] = Float(v)
    sumSquares += v * v
}
try? FileManager.default.removeItem(at: outURL)
do {
    let file = try AVAudioFile(forWriting: outURL, settings: format.settings)
    try file.write(from: buffer)
} catch {
    FileHandle.standardError.write("write failed: \(error.localizedDescription)\n".data(using: .utf8)!); exit(1)
}
let rms = (sumSquares / Double(count)).squareRoot()
print(String(format: "ok %@ %.2f s, peak -18.0 dBFS, rms %.1f dBFS", outURL.lastPathComponent, seconds, 20 * log10(rms)))
