// Silence a range of a narration without changing its length.
//   swift mute-range.swift <in> <out.wav|out.m4a> <start s> <end s>
//
// For a stray syllable at the head of a take. The beat timings in
// src/data/overture.js were measured against this file, so nothing may move:
// samples in [start, end) are replaced with silence, with a 20 ms fade on
// either side so nothing clicks, and every other sample is copied as it was.
// Digital silence rather than room tone, because the music bed sits under
// the whole take and covers a floor sixty decibels down anyway.
//
// Used on 10 September 2026 to remove a syllable ElevenLabs put before
// "The war had ended." — the detector found it at 0.15–0.50 s, a blip at
// 1.80–1.95 s, and the line itself starting at 2.65 s.
import Foundation
import AVFoundation

let args = CommandLine.arguments
guard args.count == 5, let start = Double(args[3]), let end = Double(args[4]), end > start, start >= 0 else {
    FileHandle.standardError.write("usage: mute-range.swift <in> <out.wav|out.m4a> <start s> <end s>\n".data(using: .utf8)!)
    exit(2)
}
let inURL = URL(fileURLWithPath: args[1])
let outURL = URL(fileURLWithPath: args[2])

let file = try AVAudioFile(forReading: inURL)
let format = file.processingFormat
let frames = AVAudioFrameCount(file.length)
guard let buffer = AVAudioPCMBuffer(pcmFormat: format, frameCapacity: frames) else { exit(1) }
try file.read(into: buffer)

let sampleRate = format.sampleRate
let length = Int(buffer.frameLength)
let s = min(Int(start * sampleRate), length)
let e = min(Int(end * sampleRate), length)
let fade = Int(0.02 * sampleRate)
guard let channels = buffer.floatChannelData else { exit(1) }
for ch in 0..<Int(format.channelCount) {
    let data = channels[ch]
    for i in s..<e { data[i] = 0 }
    for k in 0..<fade {
        let before = s - fade + k
        if before >= 0 && before < s { data[before] *= Float(fade - k) / Float(fade) }
        let after = e + k
        if after < length { data[after] *= Float(k) / Float(fade) }
    }
}

let settings: [String: Any] = outURL.pathExtension.lowercased() == "wav"
    ? [AVFormatIDKey: kAudioFormatLinearPCM, AVSampleRateKey: sampleRate, AVNumberOfChannelsKey: format.channelCount,
       AVLinearPCMBitDepthKey: 24, AVLinearPCMIsFloatKey: false, AVLinearPCMIsBigEndianKey: false]
    : [AVFormatIDKey: kAudioFormatMPEG4AAC, AVSampleRateKey: sampleRate, AVNumberOfChannelsKey: format.channelCount,
       AVEncoderBitRateKey: 160_000]
if FileManager.default.fileExists(atPath: outURL.path) { try FileManager.default.removeItem(at: outURL) }
/* In its own scope: AVAudioFile writes its header when it is released, and a
   script that exits while still holding the file leaves a header that says
   the file is empty. */
func write(_ buffer: AVAudioPCMBuffer, to url: URL) throws {
    let out = try AVAudioFile(forWriting: url, settings: settings, commonFormat: format.commonFormat, interleaved: format.isInterleaved)
    try out.write(from: buffer)
}
try write(buffer, to: outURL)
print(String(format: "muted %.2f–%.2f s of %.2f s → %@", Double(s) / sampleRate, Double(e) / sampleRate, Double(length) / sampleRate, outURL.lastPathComponent))
