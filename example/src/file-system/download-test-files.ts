import * as RNFS from '@dr.pogodin/react-native-fs';

import { getErrorMessage } from '../getErrorMessage';

const githubBaseUri = 'https://github.com/cozy/react-native-nitro-tar-gzip/raw/refs/heads/feat/nitro_migration';
const downloadTarGzipUri = `${githubBaseUri}/example/testFiles/TarGzipItem.tar.gz`;
const downloadTarUri = `${githubBaseUri}/example/testFiles/TarItem.tar`;
const downloadGzipUri = `${githubBaseUri}/example/testFiles/GzipItem.md.gz`;

const getEmbedDestinationPath = () => RNFS.DocumentDirectoryPath + '/embedded';

const prepareEmbedDestinationPath = async () => {
  const destinationPath = getEmbedDestinationPath();

  if (await RNFS.exists(destinationPath)) {
    await RNFS.unlink(destinationPath);
  }
  await RNFS.mkdir(destinationPath);

  return destinationPath;
};

const downloadGithubFile = async (sourceUri: string, destinationPath: string) => {
  try {
    console.log('Download github file', sourceUri);
    const result = await RNFS.downloadFile({
      fromUrl: sourceUri,
      toFile: destinationPath,
    }).promise;

    console.log(`Download result is ${JSON.stringify(result)}`);
  } catch (err: unknown) {
    console.error(`Error while downloading archive: ${getErrorMessage(err)}`);
  }
};

export const prepareTestFiles = async () => {
  console.log('Prepare iOS assets');
  await prepareEmbedDestinationPath();
  const destinationPath = await getEmbedDestinationPath();

  await downloadGithubFile(downloadTarGzipUri, destinationPath + '/TarGzipItem.tar.gz');
  await downloadGithubFile(downloadTarUri, destinationPath + '/TarItem.tar');
  await downloadGithubFile(downloadGzipUri, destinationPath + '/GzipItem.md.gz');
};




