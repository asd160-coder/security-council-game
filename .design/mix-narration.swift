// Mix the bed under the clean voice, into the file the overture plays.
//   swift mix-narration.swift <voice.m4a> <bed.wav> <out.m4a> <bedGainDb>
//
// Two tracks in one composition, the bed's volume set by the gain, exported
// as the M4A at public/overture/narration.m4a. The beat times are read from
// the clean voice file, never from this one: speech-segments.swift cannot see
// silences once the bed fills them. The bed is trimmed to the voice's length,
// so make it at least that long (make-bed.swift takes the seconds).
import Foundation
import AVFoundation

let args = CommandLine.arguments
guard args.count == 5, let gainDb = Double(args[4]) else {
    FileHandle.standardError.write("usage: mix-narration.swift <voice.m4a> <bed.wav> <out.m4a> <bedGainDb>\n".data(using: .utf8)!)
    exit(2)
}
let voice = AVURLAsset(url: URL(fileURLWithPath: args[1]))
let bed = AVURLAsset(url: URL(fileURLWithPath: args[2]))
let outURL = URL(fileURLWithPath: args[3])
guard let voiceTrack = voice.tracks(withMediaType: .audio).first, let bedTrack = bed.tracks(withMediaType: .audio).first else {
    FileHandle.standardError.write("missing an audio track\n".data(using: .utf8)!); exit(1)
}
let composition = AVMutableComposition()
guard let v = composition.addMutableTrack(withMediaType: .audio, preferredTrackID: kCMPersistentTrackID_Invalid),
      let b = composition.addMutableTrack(withMediaType: .audio, preferredTrackID: kCMPersistentTrackID_Invalid) else { exit(1) }
do {
    try v.insertTimeRange(CMTimeRange(start: .zero, duration: voice.duration), of: voiceTrack, at: .zero)
    let bedDuration = CMTimeMinimum(bed.duration, voice.duration)
    try b.insertTimeRange(CMTimeRange(start: .zero, duration: bedDuration), of: bedTrack, at: .zero)
} catch {
    FileHandle.standardError.write("insert failed: \(error.localizedDescription)\n".data(using: .utf8)!); exit(1)
}
let parameters = AVMutableAudioMixInputParameters(track: b)
parameters.setVolume(Float(pow(10.0, gainDb / 20.0)), at: .zero)
let mix = AVMutableAudioMix()
mix.inputParameters = [parameters]

try? FileManager.default.removeItem(at: outURL)
guard let session = AVAssetExportSession(asset: composition, presetName: AVAssetExportPresetAppleM4A) else { exit(1) }
session.audioMix = mix
session.outputURL = outURL
session.outputFileType = .m4a
let done = DispatchSemaphore(value: 0)
session.exportAsynchronously { done.signal() }
done.wait()
if session.status == .completed {
    let bytes = (try? FileManager.default.attributesOfItem(atPath: outURL.path)[.size] as? Int) ?? 0
    print(String(format: "ok %@ %.2f s, bed at %.1f dB, %d bytes", outURL.lastPathComponent, CMTimeGetSeconds(voice.duration), gainDb, bytes ?? 0))
} else {
    FileHandle.standardError.write("export failed: \(session.error?.localizedDescription ?? "unknown")\n".data(using: .utf8)!); exit(1)
}
