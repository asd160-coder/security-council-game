// Cut frames from a video as JPEGs, exactly at the seconds asked for.
//   swift frame-grab.swift <in> <out.jpg> <seconds> [<seconds> ...]
// With one time the frame is written to <out.jpg>; with several, each goes to
// <out>-<seconds>.jpg so a range can be cut and chosen from by eye.
//
// Made for the overture's classroom frame: the 1951 federal film Duck and Cover
// has live-action scenes of schoolchildren under their desks, and this cuts
// them out of the Internet Archive's h.264 copy. AVFoundation reads that; it
// does not read the WebM copies, and ffmpeg is not installed here.
import Foundation
import AVFoundation
import AppKit

let args = CommandLine.arguments
guard args.count >= 4 else {
    FileHandle.standardError.write("usage: frame-grab.swift <in> <out.jpg> <seconds> [<seconds> ...]\n".data(using: .utf8)!)
    exit(2)
}
let inURL = URL(fileURLWithPath: args[1])
let outURL = URL(fileURLWithPath: args[2])
let times = args[3...].compactMap { Double($0) }
guard !times.isEmpty else {
    FileHandle.standardError.write("no times given\n".data(using: .utf8)!); exit(2)
}

let asset = AVURLAsset(url: inURL)
let generator = AVAssetImageGenerator(asset: asset)
generator.appliesPreferredTrackTransform = true
generator.requestedTimeToleranceBefore = .zero
generator.requestedTimeToleranceAfter = .zero

func destination(for t: Double) -> URL {
    if times.count == 1 { return outURL }
    let stem = outURL.deletingPathExtension().lastPathComponent
    let name = String(format: "%@-%06.2f.jpg", stem, t)
    return outURL.deletingLastPathComponent().appendingPathComponent(name)
}

for t in times {
    do {
        let cg = try generator.copyCGImage(at: CMTime(seconds: t, preferredTimescale: 600), actualTime: nil)
        let rep = NSBitmapImageRep(cgImage: cg)
        guard let data = rep.representation(using: .jpeg, properties: [.compressionFactor: 0.92]) else {
            FileHandle.standardError.write("could not encode frame at \(t)s\n".data(using: .utf8)!); exit(1)
        }
        let dest = destination(for: t)
        try data.write(to: dest)
        print(String(format: "ok %@ %dx%d at %.2fs", dest.lastPathComponent, cg.width, cg.height, t))
    } catch {
        FileHandle.standardError.write("frame at \(t)s failed: \(error.localizedDescription)\n".data(using: .utf8)!); exit(1)
    }
}
