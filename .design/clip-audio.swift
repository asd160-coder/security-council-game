// Clip a time range out of an audio file using AVFoundation.
//   swift clip-audio.swift <in> <out.m4a> <startSeconds> <durationSeconds>
import Foundation
import AVFoundation

let args = CommandLine.arguments
guard args.count == 5,
      let start = Double(args[3]), let dur = Double(args[4]) else {
    FileHandle.standardError.write("usage: clip-audio.swift <in> <out.m4a> <start> <duration>\n".data(using: .utf8)!)
    exit(2)
}
let inURL = URL(fileURLWithPath: args[1])
let outURL = URL(fileURLWithPath: args[2])
try? FileManager.default.removeItem(at: outURL)

let asset = AVURLAsset(url: inURL)
guard let session = AVAssetExportSession(asset: asset, presetName: AVAssetExportPresetAppleM4A) else {
    FileHandle.standardError.write("could not create export session\n".data(using: .utf8)!); exit(1)
}
session.outputURL = outURL
session.outputFileType = .m4a
session.timeRange = CMTimeRange(
    start: CMTime(seconds: start, preferredTimescale: 600),
    duration: CMTime(seconds: dur, preferredTimescale: 600)
)

let sem = DispatchSemaphore(value: 0)
session.exportAsynchronously { sem.signal() }
sem.wait()

if session.status == .completed {
    let bytes = (try? FileManager.default.attributesOfItem(atPath: outURL.path)[.size] as? Int) ?? 0
    print("ok \(outURL.lastPathComponent) \(String(format: "%.1f", start))s +\(String(format: "%.1f", dur))s \(bytes ?? 0) bytes")
} else {
    FileHandle.standardError.write("export failed: \(session.error?.localizedDescription ?? "unknown")\n".data(using: .utf8)!)
    exit(1)
}
