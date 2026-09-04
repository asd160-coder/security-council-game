// Clip a time range out of a video file using AVFoundation.
//   swift clip-video.swift <in> <out.mp4> <startSeconds> <durationSeconds>
//
// The sibling of clip-audio.swift, and kept for the same reason: the archive
// clips in this project are excerpts, and any later excerpt should be cut the
// same way rather than by whatever tool happens to be installed. Re-encodes
// rather than passing through, because a passthrough export cuts on keyframes
// and would drift the in-point by up to a second.
import Foundation
import AVFoundation

let args = CommandLine.arguments
guard args.count == 5,
      let start = Double(args[3]), let dur = Double(args[4]) else {
    FileHandle.standardError.write("usage: clip-video.swift <in> <out.mp4> <start> <duration>\n".data(using: .utf8)!)
    exit(2)
}

let inURL = URL(fileURLWithPath: args[1])
let outURL = URL(fileURLWithPath: args[2])
try? FileManager.default.removeItem(at: outURL)

let asset = AVURLAsset(url: inURL)
guard let export = AVAssetExportSession(asset: asset, presetName: AVAssetExportPreset640x480) else {
    FileHandle.standardError.write("could not create export session\n".data(using: .utf8)!)
    exit(1)
}
export.outputURL = outURL
export.outputFileType = .mp4
export.shouldOptimizeForNetworkUse = true   // moov atom first, so it streams
export.timeRange = CMTimeRange(
    start: CMTime(seconds: start, preferredTimescale: 600),
    duration: CMTime(seconds: dur, preferredTimescale: 600)
)

let sem = DispatchSemaphore(value: 0)
export.exportAsynchronously { sem.signal() }
sem.wait()

if export.status == .completed {
    let attrs = try? FileManager.default.attributesOfItem(atPath: outURL.path)
    let bytes = (attrs?[.size] as? Int) ?? 0
    print(String(format: "wrote %@ — %.2fs from %.2fs, %.1f MB",
                 outURL.lastPathComponent, dur, start, Double(bytes) / 1_048_576))
} else {
    FileHandle.standardError.write("export failed: \(export.error?.localizedDescription ?? "unknown")\n".data(using: .utf8)!)
    exit(1)
}
