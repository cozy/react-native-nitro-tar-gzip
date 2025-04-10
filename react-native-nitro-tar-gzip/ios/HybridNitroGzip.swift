import Foundation
import NitroModules

class NitroGzip: HybridNitroGzipSpec {    
    func unTar(sourcePath: String, targetPath: String, force: Bool) throws -> Promise<GzipResult> {
        let impl = NitroGzipImpl()
        return Promise.async {
            return await impl.unTar(source: sourcePath, target: targetPath, force: force)
        }
    }

    func unGzip(sourcePath: String, targetPath: String, force: Bool) throws -> Promise<GzipResult> {
        let impl = NitroGzipImpl()
        return Promise.async {
            return await impl.unGzip(source: sourcePath, target: targetPath, force: force)
        }
    }

    func unGzipTar(sourcePath: String, targetPath: String, force: Bool) throws -> Promise<GzipResult> {
        let impl = NitroGzipImpl()
        return Promise.async {
            return await impl.unGzipTar(source: sourcePath, target: targetPath, force: force)
        }
    }
}
