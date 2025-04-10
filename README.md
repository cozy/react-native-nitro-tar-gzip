# React Native Nitro TarGzip

A React Native Nitro module for decompressing Gzip and Tar files.

This library is a rewrite of [FWC1994/react-native-gzip](https://github.com/FWC1994/react-native-gzip) library using Nitro modules, Swift and Kotlin.

Like for original library, this is based on following native libraries:
- iOS: [NVHTarGzip](https://github.com/nvh/NVHTarGzip)
- Android: [CompressorStreamFactory](https://commons.apache.org/proper/commons-compress/apidocs/org/apache/commons/compress/compressors/CompressorStreamFactory.html) and [ArchiveStreamFactory](https://commons.apache.org/proper/commons-compress/apidocs/org/apache/commons/compress/archivers/ArchiveStreamFactory.html)

The APIs are similare to `FWC1994/react-native-gzip` ones at the exception of the returned value.
- `FWC1994/react-native-gzip`:
  - methods did return a string containing the destination path
  - methods did throw if errors occured
- `react-native-nitro-tar-gzip`:
  - methods do return an object containing success and failure info
  - methods do not throw if errors occur

## Requirements

This library requires:
- Reat-native `0.75` or higher
- Xcode `16` or higher
- Android compileSDK `34` or higher

## Installation

> [!IMPORTANT]  
> This package requires `react-native-nitro-modules` to be installed first.
> See [react-native-nitro-modules](https://github.com/mrousavy/nitro) for more information.

First install dependencies:
```sh
npm install --save react-native-nitro-tar-gzip react-native-nitro-modules
```

Then in your project's `Podfile` add:
```
pod 'NVHTarGzip', :modular_headers => true
```
NVHTarGzip requires `modular_headers` to be used by Swift package manager. If you know how to implement this on module side and remove this requirement, PR appreciated :smile:

## Usage

```js
import { unGzip, unGzipTar, unTar } from 'react-native-nitro-tar-gzip';

const sourcePath = `${PATH}/xxx.gz`
const targetPath = `${PATH}/xxx`

// Decompress Gzip
const result = await unGzip(sourcePath, targetPath, true)

// Decompress Tar
const result = await unTar(sourcePath, targetPath, true)

// Decompress Gzip and Tar
const result = await unGzipTar(sourcePath, targetPath, true)

// Handle the decompressing result
if (result.success) {
  console.log(result.path)
} else {
  console.error(result.error)
}
```

### Parameters
| Name | Type | Description | Mandatory |
| ---- | ---- | ---- | ---- |
| sourcePath | string | compressed source file path | true |
| targetPath | string | target file or folder path for decompressed output | true |
| force | boolean | whether to overwrite the target path | true |

### Returned object
```ts
// When method success
{
  success: true,
  path: 'some_target_path'
}

// When method fails
{
  success: false,
  reason: 'Reason of the failure'
}
```
