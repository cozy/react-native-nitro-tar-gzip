import React, { useState } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { unGzip, unGzipTar, unTar } from 'react-native-nitro-gzip';
import { prepareTestFiles } from './file-system/download-test-files';
import { listFilesOnDevice } from './file-system/list-files';
import * as RNFS from '@dr.pogodin/react-native-fs';

const measure = async (callback: Function) => {
  const begin = performance.now();
  const result = await callback();
  const end = performance.now();
  console.log('⏰ Call took', (end - begin), 'ms');
  console.log('⏰ Result', result);

  return result;
};

export const TestComponent = () => {
  const [force, setForce] = useState(false);
  const [dirs, setDirs] = useState({});
  const [result, setResult] = useState({});

  const doGzip = async () => {
    const source = RNFS.DocumentDirectoryPath + '/embedded/GzipItem.md.gz';
    const destination = RNFS.DocumentDirectoryPath + '/output/GzipItem.md';
    const res = await measure(() => unGzip(source, destination, force));

    setResult(res);
    await listDocs();
  };

  const doTarGzip = async () => {
    const source = RNFS.DocumentDirectoryPath + '/embedded/TarGzipItem.tar.gz';
    const destination = RNFS.DocumentDirectoryPath + '/output/TarGzipItem';
    const res = await measure(() => unGzipTar(source, destination, force));

    setResult(res);
    await listDocs();
  };

  const doTar = async () => {
    const source = RNFS.DocumentDirectoryPath + '/embedded/TarItem.tar';
    const destination = RNFS.DocumentDirectoryPath + '/output/TarItem';
    const res = await measure(() => unTar(source, destination, force));

    setResult(res);
    await listDocs();
  };

  const prepareAsset = async () => {
    await prepareTestFiles();

    await cleanOutput();
  };

  const cleanOutput = async () => {
    const destinationPath = RNFS.DocumentDirectoryPath + '/output';

    if (await RNFS.exists(destinationPath)) {
      await RNFS.unlink(destinationPath);
    }
    await RNFS.mkdir(destinationPath);

    await listDocs();
  };

  const listDocs = async () => {
    const embeddedDir = await listFilesOnDevice('embedded');
    const ouputDir = await listFilesOnDevice('output');

    setDirs({
      embedded: embeddedDir,
      output: ouputDir,
    });
  };

  const toggleForce = () => {
    setForce(previous => !previous);
  };

  return (
    <>
      <View>
        <View>
          <Button onPress={prepareAsset} title="Download test files" />
          <Button onPress={cleanOutput} title="Clean Output" />
          <Button onPress={listDocs} title="List documents" />
        </View>

        <View style={styles.split}>
          <Button onPress={toggleForce} title={force ? 'Current: force' : 'Current: not force'} />
        </View>

        <View style={styles.split}>
          <Button onPress={doGzip} title="Try Gzip" />
          <Button onPress={doTar} title="Try Tar" />
          <Button onPress={doTarGzip} title="Try TarGzip" />
        </View>

        <Text>Résult:</Text>
        <Text>{JSON.stringify(result, null, 2)}</Text>

        <Text style={styles.split}>Folders:</Text>
        <Text>{JSON.stringify(dirs, null, 2)}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  split: {
    marginTop: 20,
  },
});
