import { NitroModules } from 'react-native-nitro-modules'
import type {
  NitroGzip,
  GzipResult as NativeResult,
} from './specs/NitroGzip.nitro'

const GzipHybridObject = NitroModules.createHybridObject<NitroGzip>('NitroGzip')

interface GzipResultSuccess {
  success: true
  path: string
}

interface GzipResultFail {
  success: false
  reason: string
}

type GzipResult = GzipResultSuccess | GzipResultFail

const wrapResult = (result: NativeResult): GzipResult => {
  if (result.success && result.path) {
    return {
      success: true,
      path: result.path,
    }
  } else {
    return {
      success: false,
      reason: result.error || 'unkown error',
    }
  }
}

export async function unTar(
  sourcePath: string,
  targetPath: string,
  force: boolean
): Promise<GzipResult> {
  const result = await GzipHybridObject.unTar(sourcePath, targetPath, force)

  return wrapResult(result)
}

export async function unGzip(
  sourcePath: string,
  targetPath: string,
  force: boolean
): Promise<GzipResult> {
  const result = await GzipHybridObject.unGzip(sourcePath, targetPath, force)

  return wrapResult(result)
}

export async function unGzipTar(
  sourcePath: string,
  targetPath: string,
  force: boolean
): Promise<GzipResult> {
  const result = await GzipHybridObject.unGzipTar(sourcePath, targetPath, force)

  return wrapResult(result)
}
