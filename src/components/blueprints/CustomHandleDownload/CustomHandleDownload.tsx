import {Platform} from 'react-native';
import RNFetchBlob, {FetchBlobResponse} from 'rn-fetch-blob';
import {IImageInterface} from '../../MovieLayout/MovieDetail/Interfaces/IImageInterface';
import CameraRoll from '@react-native-community/cameraroll';
import {CustomGetPermissionAndroid} from '../CustomGetPermissionAndroid/CustomGetPermissionAndroid';
import {CustomSnackBar} from '../CustomSnackBar/CustomSnackBar';
import React, {useState} from 'react';

export const CustomHandleDownload = async (
  picture: IImageInterface[],
  index: number,
) => {
  const [load, setLoad] = useState(false);
  const [open, setOpen] = useState(false);
  //If you use android, you have to ask for permission
  if (Platform.OS === 'android') {
    const granted = await CustomGetPermissionAndroid();
    if (!granted) {
      return;
    }
  }
  setLoad(true);
  let dirs = RNFetchBlob.fs.dirs;
  RNFetchBlob.config({
    fileCache: true,
    appendExt: 'png',
    path: dirs.DownloadDir + '/path-to-file.png',
  })
    .fetch('GET', picture[index].url)
    .then((res: FetchBlobResponse) => {
      CameraRoll.save(res.data)
        .then(() => {
          <CustomSnackBar text={'Success'} handleClick={() => setOpen(true)} />;
        })
        .catch((err) => {
          <CustomSnackBar
            text={'Failure: ' + err}
            handleClick={() => setOpen(true)}
          />;
        })
        // .finally(() => (loading = false));
        .finally(() => setLoad(false));
    })
    .catch((err) => {
      setLoad(false);
      <CustomSnackBar
        text={'Failure: ' + err}
        handleClick={() => setOpen(true)}
      />;
    });
};
