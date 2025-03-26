import * as RNFS from '@dr.pogodin/react-native-fs';

interface FolderData {
  directory: string[]
  files: string[]
}

const scanDir = async (pathOfDirToScan: string, data: FolderData = {directory: [], files: []}) => {
  const readedFilesAndDir = await RNFS.readDir(pathOfDirToScan);

  for (const eachItem of readedFilesAndDir) {
    if (eachItem.isDirectory()) {
      const directoryPath = pathOfDirToScan + '/' + eachItem.name;
      data.directory.push(directoryPath.replace(RNFS.DocumentDirectoryPath, ''));
      data = await scanDir(directoryPath, data);
    } else {
      data.files.push(pathOfDirToScan.replace(RNFS.DocumentDirectoryPath, '') + '/' + eachItem.name);
    }
  }

  return data;
};

export const listFilesOnDevice = async (folder: string) => {
  console.log('List files in', folder);
  const dir = await scanDir(RNFS.DocumentDirectoryPath + '/' + folder);

  console.log('Files', dir);

  return dir
};
