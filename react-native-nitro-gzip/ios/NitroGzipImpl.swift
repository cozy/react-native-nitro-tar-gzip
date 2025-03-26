import Foundation
import NitroModules
import NVHTarGzip

class NitroGzipImpl {
    func unTar(source: String, target: String, force: Bool) async -> GzipResult {
        if !checkDir(source, target: target, force: force) {
            return GzipResult(success: false, path: nil, error: "dir error")
        }
        
        do {
            try await NVHTarGzip.sharedInstance().unTarFile(atPath: source, toPath: target)
        } catch let unTarError {
            return GzipResult(success: false, path: nil, error: "untar error: \(unTarError)")
        }
        
        return GzipResult(success: true, path: target, error: nil)
    }
    
    func unGzip(source: String, target: String, force: Bool) async -> GzipResult {
        if !checkDir(source, target: target, force: force) {
            return GzipResult(success: false, path: nil, error: "dir error")
        }
        
        do {
            try await NVHTarGzip.sharedInstance().unGzipFile(atPath: source, toPath: target)
        } catch let unGzipError {
            return GzipResult(success: false, path: nil, error: "ungzip error: \(unGzipError)")
        }
        
        return GzipResult(success: true, path: target, error: nil)
    }
    
    func unGzipTar(source: String, target: String, force: Bool) async -> GzipResult
    {
        if !checkDir(source, target: target, force: force) {
            return GzipResult(success: false, path: nil, error: "dir error")
        }
        let temporaryPath = temporaryFilePath(forPath: source)
        
        do {
            try await NVHTarGzip.sharedInstance().unGzipFile(atPath: source, toPath: temporaryPath)
        } catch let unGzipError {
            return GzipResult(success: false, path: nil, error: "ungzip error: \(unGzipError)")
        }
        
        do {
            try await NVHTarGzip.sharedInstance().unTarFile(atPath: temporaryPath, toPath: target)
        } catch let unTarError {
            return GzipResult(success: false, path: nil, error: "untar error: \(unTarError)")
        }
        
        do {
            try FileManager.default.removeItem(atPath: temporaryPath)
        } catch let cleanError {
            return GzipResult(success: false, path: nil, error: "clean error")
        }
        
        return GzipResult(success: true, path: target, error: nil)
    }
    
    private func checkDir(
        _ source: String,
        target: String,
        force: Bool
    ) -> Bool {
        let manager = FileManager.default
        
        if !manager.fileExists(atPath: source) {
            return false
        }
        
        if manager.fileExists(atPath: target) {
            if !force {
                return false
            }

            do {
                try manager.removeItem(atPath: target)
            } catch {
                return false
            }
        }
        return true
    }
    
    private func temporaryFilePath(forPath path: String) -> String {
        let UUIDString = UUID().uuidString
        let filename = ((path as NSString).lastPathComponent as NSString).deletingPathExtension
        let temporaryFile = filename + "-\(UUIDString)"
        var temporaryPath = URL(fileURLWithPath: NSTemporaryDirectory()).appendingPathComponent(
            temporaryFile
        ).path
        if URL(fileURLWithPath: temporaryPath).pathExtension != "tar" {
            temporaryPath = URL(fileURLWithPath: temporaryPath).appendingPathExtension("tar").path
        }
        return temporaryPath
    }
}
