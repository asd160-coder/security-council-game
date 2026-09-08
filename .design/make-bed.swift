// A bed under the narration: a low drone synthesised for the game.
//   swift make-bed.swift <out.wav> <seconds> <fadeInSeconds> <fadeOutSeconds>
//
// Not a recording of anything, so nothing to clear. Two layers. Below, a
// bare fifth two octaves under middle C — A1 and E2 — with the A an octave
// up detuned a quarter of a hertz so the pair beats once every four seconds,
// a few soft harmonics, a low-pass near 600 Hz: weight, for real speakers.
// Above it, what small speakers can actually carry — the same fifth at A3
// and E4, three voices each detuned a third of a percent so they chorus
// slowly, six harmonics falling as 1/n for a string-like edge, low-passed
// near 1.5 kHz, with a swell of its own. The first version was the low
// layer alone, and on a laptop it was inaudible; the user heard nothing.
// A slow breathing on the whole, a near-inaudible A4 shimmer, a fade-in
// and a fade-out to silence exactly at the film's end. Deterministic: the
// same arguments make the same file. Written as a WAV for
// mix-narration.swift, which sets the level under the voice.
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
let low = [Voice(hz: 55.0, level: 1.0), Voice(hz: 82.41, level: 0.7), Voice(hz: 110.25, level: 0.45)]
var mid: [Voice] = []
for base in [220.0, 329.63] {
    for detune in [-0.003, 0.0, 0.003] { mid.append(Voice(hz: base * (1 + detune), level: base < 300 ? 1.0 : 0.7)) }
}
let lowCutoff = 1 - exp(-2 * Double.pi * 600 / rate)
let midCutoff = 1 - exp(-2 * Double.pi * 1500 / rate)

var samples = [Double](repeating: 0, count: count)
var lowFiltered = 0.0
var midFiltered = 0.0
var peak = 0.0
for i in 0..<count {
    let t = Double(i) / rate
    var l = 0.0
    for v in low {
        for h in 1...4 { l += v.level * sin(2 * .pi * v.hz * Double(h) * t) / Double(h * h) }
    }
    var m = 0.0
    for v in mid {
        for h in 1...6 { m += v.level * sin(2 * .pi * v.hz * Double(h) * t) / Double(h) }
    }
    m *= 1 + 0.15 * sin(2 * .pi * 0.08 * t)
    lowFiltered += lowCutoff * (l - lowFiltered)
    midFiltered += midCutoff * (m - midFiltered)
    var s = 0.6 * lowFiltered + 0.35 * midFiltered
    s += 0.015 * sin(2 * .pi * 440 * t) * (0.5 + 0.5 * sin(2 * .pi * 0.11 * t))
    s *= 1 + 0.1 * sin(2 * .pi * 0.06 * t)
    var envelope = 1.0
    if t < fadeIn { envelope = 0.5 - 0.5 * cos(.pi * t / fadeIn) }
    let remaining = seconds - t
    if remaining < fadeOut { envelope *= 0.5 - 0.5 * cos(.pi * remaining / fadeOut) }
    samples[i] = s * envelope
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
