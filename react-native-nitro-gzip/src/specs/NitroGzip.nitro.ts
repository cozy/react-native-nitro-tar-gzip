import type { HybridObject } from 'react-native-nitro-modules'

export interface GzipResult {
  success: boolean
  path?: string
  error?: string
}

export interface NitroGzip
  extends HybridObject<{ ios: 'swift'; android: 'kotlin' }> {
  unTar(
    sourcePath: string,
    targetPath: string,
    force: boolean
  ): Promise<GzipResult>

  unGzip(
    sourcePath: string,
    targetPath: string,
    force: boolean
  ): Promise<GzipResult>

  unGzipTar(
    sourcePath: string,
    targetPath: string,
    force: boolean
  ): Promise<GzipResult>
}
