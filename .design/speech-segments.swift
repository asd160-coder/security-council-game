// Find the spoken segments of a narration — where the voice starts and stops.
//   swift speech-segments.swift <in> [--json]
//
// The track is read as float PCM and measured in 50 ms RMS windows. A window is
// speech when its RMS is above 5% of the loudest window; runs of speech closer
// together than 0.45 s are one segment (a breath inside a line is not a break);
// runs shorter than 0.15 s are dropped (a click is not a word). Prints one line
// per segment in seconds, with the silence that follows it, the total, and
// the take's noise floor — the median RMS of its silence.
//
// Used twice on the overture's voice: on the delivered take to find the cut
// points, and on the padded file to find where each line begins — the `at` of
// each beat in src/data/overture.js is copied from that second run, never typed.
import Foundation
import AVFoundation

let args = CommandLine.arguments
guard args.count >= 2 else {
    FileHandle.standardError.write("usage: speech-segments.swift <in> [--json]\n".data(using: .utf8)!)
    exit(2)
}
let inURL = URL(fileURLWithPath: args[1])
let asJSON = args.contains("--json")

let asset = AVURLAsset(url: inURL)
guard let track = asset.tracks(withMediaType: .audio).first else {
    FileHandle.standardError.write("no audio track in \(inURL.lastPathComponent)\n".data(using: .utf8)!); exit(1)
}
let rate = 44100.0
let settings: [String: Any] = [
    AVFormatIDKey: kAudioFormatLinearPCM,
    AVSampleRateKey: rate,
    AVNumberOfChannelsKey: 1,
    AVLinearPCMBitDepthKey: 32,
    AVLinearPCMIsFloatKey: true,
    AVLinearPCMIsBigEndianKey: false,
    AVLinearPCMIsNonInterleaved: false,
]
guard let reader = try? AVAssetReader(asset: asset) else {
    FileHandle.standardError.write("could not read \(inURL.lastPathComponent)\n".data(using: .utf8)!); exit(1)
}
let output = AVAssetReaderTrackOutput(track: track, outputSettings: settings)
reader.add(output)
reader.startReading()

let step = 0.05
let window = Int(rate * step)
var rms: [Double] = []
var acc = 0.0
var n = 0
while let buffer = output.copyNextSampleBuffer() {
    guard let block = CMSampleBufferGetDataBuffer(buffer) else { continue }
    let length = CMBlockBufferGetDataLength(block)
    var floats = [Float](repeating: 0, count: length / 4)
    floats.withUnsafeMutableBytes { raw in
        _ = CMBlockBufferCopyDataBytes(block, atOffset: 0, dataLength: length, destination: raw.baseAddress!)
    }
    for f in floats {
        let v = Double(f)
        acc += v * v
        n += 1
        if n == window {
            rms.append((acc / Double(n)).squareRoot())
            acc = 0
            n = 0
        }
    }
}
if n > 0 { rms.append((acc / Double(n)).squareRoot()) }
if reader.status == .failed {
    FileHandle.standardError.write("read failed: \(reader.error?.localizedDescription ?? "unknown")\n".data(using: .utf8)!); exit(1)
}

let peak = rms.max() ?? 0
let threshold = peak * 0.05
var runs: [(Double, Double)] = []
var start: Double? = nil
for (i, v) in rms.enumerated() {
    let t = Double(i) * step
    if v > threshold {
        if start == nil { start = t }
    } else if let s = start {
        runs.append((s, t))
        start = nil
    }
}
if let s = start { runs.append((s, Double(rms.count) * step)) }

var merged: [(Double, Double)] = []
for run in runs {
    if let last = merged.last, run.0 - last.1 < 0.45 {
        merged[merged.count - 1].1 = run.1
    } else {
        merged.append(run)
    }
}
let segments = merged.filter { $0.1 - $0.0 >= 0.15 }
let total = CMTimeGetSeconds(asset.duration)
let quiet = rms.filter { $0 <= threshold }.sorted()
let floor = quiet.isEmpty ? 0 : quiet[quiet.count / 2]

if asJSON {
    let items = segments.map { String(format: "{\"start\":%.2f,\"end\":%.2f}", $0.0, $0.1) }
    print("{\"total\":\(String(format: "%.2f", total)),\"floor\":\(String(format: "%.5f", floor)),\"segments\":[\(items.joined(separator: ","))]}")
} else {
    for (i, seg) in segments.enumerated() {
        let next = i + 1 < segments.count ? segments[i + 1].0 : total
        print(String(format: "%2d  %6.2f – %6.2f   speech %.2f   silence after %.2f", i + 1, seg.0, seg.1, seg.1 - seg.0, next - seg.1))
    }
    print(String(format: "%d segments, %.2f s total, peak rms %.3f, silence floor rms %.5f", segments.count, total, peak, floor))
}
