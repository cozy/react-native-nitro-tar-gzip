package com.margelo.nitro.nitrogzip

import com.facebook.proguard.annotations.DoNotStrip
import com.facebook.jni.HybridData

import com.margelo.nitro.core.Promise

import android.util.Log

@DoNotStrip
class NitroGzip : HybridNitroGzipSpec() {
  companion object {
    const val TAG = "HybridGzip"
  }

  override fun unTar(sourcePath: String, targetPath: String, force: Boolean): Promise<GzipResult> {
    Log.d(TAG, "unTar: ${sourcePath}")
    var impl = NitroGzipImpl()
    return Promise.async {
      impl.unTar(sourcePath, targetPath, force)
    }
  }

  override fun unGzip(sourcePath: String, targetPath: String, force: Boolean): Promise<GzipResult> {
    Log.d(TAG, "unGzip: ${sourcePath}")
    var impl = NitroGzipImpl()
    return Promise.async {
      impl.unTar(sourcePath, targetPath, force)
    }
  }

  override fun unGzipTar(sourcePath: String, targetPath: String, force: Boolean): Promise<GzipResult> {
    Log.d(TAG, "unGzipTar: ${sourcePath}")
    var impl = NitroGzipImpl()
    return Promise.async {
      impl.unGzipTar(sourcePath, targetPath, force)
    }
  }
}
