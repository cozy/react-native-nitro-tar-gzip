package com.margelo.nitro.nitrogzip

import java.io.File
import java.io.FileInputStream
import java.io.FileOutputStream
import java.io.IOException
import org.apache.commons.compress.archivers.ArchiveEntry
import org.apache.commons.compress.archivers.ArchiveException
import org.apache.commons.compress.archivers.ArchiveInputStream
import org.apache.commons.compress.archivers.ArchiveStreamFactory
import org.apache.commons.compress.archivers.tar.TarArchiveInputStream
import org.apache.commons.compress.compressors.CompressorException
import org.apache.commons.compress.compressors.CompressorInputStream
import org.apache.commons.compress.compressors.CompressorStreamFactory
import org.apache.commons.compress.utils.IOUtils
import org.apache.commons.io.FileUtils

class NitroGzipImpl() {
  fun unTar(source: String, target: String, force: Boolean): GzipResult {
    var sourceFile = File(source)
    var targetFile = File(target)
    if (!checkDir(sourceFile, targetFile, force)) {
      return GzipResult(false, null, "error")
    }

    var inputStream: ArchiveInputStream? = null
    val fileInputStream: FileInputStream

    try {
      fileInputStream = FileUtils.openInputStream(sourceFile)
      inputStream =
              ArchiveStreamFactory()
                      .createArchiveInputStream(ArchiveStreamFactory.TAR, fileInputStream)

      var archiveEntry: ArchiveEntry? = inputStream.nextEntry

      while (archiveEntry != null) {
        val destFile = File(targetFile, archiveEntry.name)
        if (archiveEntry.isDirectory) {
          destFile.mkdirs()
        } else {
          val outputStream = FileUtils.openOutputStream(destFile)
          IOUtils.copy(inputStream, outputStream)
          outputStream.close()
        }
        archiveEntry = inputStream.nextEntry
      }

      return GzipResult(true, targetFile.absolutePath, null)
    } catch (e: ArchiveException) {
      e.printStackTrace()
      return GzipResult(false, null, "untar error")
    } catch (e: IOException) {
      e.printStackTrace()
      return GzipResult(false, null, "untar error")
    } finally {
      inputStream?.close()
    }
  }

  fun unGzip(source: String, target: String, force: Boolean): GzipResult {
    val sourceFile = File(source)
    val targetFile = File(target)
    if (!checkDir(sourceFile, targetFile, force)) {
      return GzipResult(false, null, "error")
    }

    try {
      val fileInputStream = FileInputStream(sourceFile)
      val compressorInputStream: CompressorInputStream =
              CompressorStreamFactory()
                      .createCompressorInputStream(CompressorStreamFactory.GZIP, fileInputStream)

      val outputStream = FileOutputStream(targetFile)
      IOUtils.copy(compressorInputStream, outputStream)
      outputStream.close()

      return GzipResult(true, targetFile.absolutePath, null)
    } catch (e: IOException) {
      e.printStackTrace()
      return GzipResult(false, null, "ungzip error")
    } catch (e: CompressorException) {
      e.printStackTrace()
      return GzipResult(false, null, "ungzip error")
    }
  }

  fun unGzipTar(source: String, target: String, force: Boolean): GzipResult {
    val sourceFile = File(source)
    val targetFile = File(target)
    if (!checkDir(sourceFile, targetFile, force)) {
      return GzipResult(false, null, "error")
    }

    var inputStream: TarArchiveInputStream? = null
    val fileInputStream: FileInputStream

    try {
      fileInputStream = FileUtils.openInputStream(sourceFile)
      val compressorInputStream: CompressorInputStream =
              CompressorStreamFactory()
                      .createCompressorInputStream(CompressorStreamFactory.GZIP, fileInputStream)
      inputStream = TarArchiveInputStream(compressorInputStream)
      var archiveEntry: ArchiveEntry? = inputStream.nextEntry

      while (archiveEntry != null) {
        val destFile = File(targetFile, archiveEntry.name)
        if (archiveEntry.isDirectory) {
          destFile.mkdirs()
        } else {
          val outputStream = FileUtils.openOutputStream(destFile)
          IOUtils.copy(inputStream, outputStream)
          outputStream.close()
        }
        archiveEntry = inputStream.nextEntry
      }

      return GzipResult(true, targetFile.absolutePath, null)
    } catch (e: IOException) {
      e.printStackTrace()
      return GzipResult(false, null, "ungzip error")
    } catch (e: CompressorException) {
      e.printStackTrace()
      return GzipResult(false, null, "ungzip error")
    } catch (e: ArchiveException) {
      e.printStackTrace()
      return GzipResult(false, null, "ungzip error")
    } finally {
      inputStream?.close()
    }
  }

  private fun checkDir(sourceFile: File, targetFile: File, force: Boolean): Boolean {
    if (!sourceFile.exists()) {
      return false
    }

    if (targetFile.exists()) {
      if (!force) {
        return false
      }

      try {
        if (targetFile.isDirectory) {
          targetFile.deleteRecursively()
        } else {
          targetFile.delete()
        }
        targetFile.mkdirs()
      } catch (ex: IOException) {
        return false
      }
    }
    return true
  }
}
