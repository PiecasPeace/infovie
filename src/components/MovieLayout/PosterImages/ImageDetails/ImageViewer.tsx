import React, {useState} from 'react';
import {Modal, Platform, Text, View} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import Spinner from '../../../Spinner/Spinner';
import {BLACK, WHITE} from '../../../../constants/Colors/colorpalette';
import {IImageModalProps} from './IImageProps';
import Button from '@material-ui/core/Button';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import RNFetchBlob, {FetchBlobResponse} from 'rn-fetch-blob';
import {CustomGetPermissionAndroid} from '../../../blueprints/CustomGetPermissionAndroid/CustomGetPermissionAndroid';
import {CustomSnackBar} from '../../../blueprints/CustomSnackBar/CustomSnackBar';
import CameraRoll from '@react-native-community/cameraroll';
import {IImageInterface} from '../../MovieDetail/Interfaces/IImageInterface';
import {CustomButton} from '../../../blueprints/CustomButton/CustomButton';

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};
interface ISnackProps {
  text: string;
  handleClick: () => void;
  open: boolean | undefined;
}

const ImagesModal: React.FC<IImageModalProps> = ({
  showImage = false,
  images,
  onClose,
}: IImageModalProps) => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const CustomRenderFooter = (images: IImageInterface[], index: number) => (
    <View>
      <MuiAlert elevation={6} variant="filled" severity="success">
        <Text> This is a success message!</Text>
      </MuiAlert>
      {/* <Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert> */}
      {/* <Text style={{width: '100%'}}>
        <CustomButton
          color={BLACK}
          mode={"contained"}
          Text={'Open success snackbar'}
          onPress={() => handleClick()}
        />
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            <Text>WAHOO</Text>
          </Alert>
        </Snackbar>
      </Text> */}
      {/* <CustomButton
        onPress={() => HandlePermission(images, index)}
        color={BLACK}
        mode={'contained'}
        Text={'Save to Gallery'}
        icon={'download'}
        style={{flex: 1, minWidth: '100%'}}
      /> */}
    </View>
  );

  const HandlePermission = async (images: IImageInterface[], index: number) => {
    //If you use android, you have to ask for permission
    if (Platform.OS === 'android') {
      const granted = await CustomGetPermissionAndroid();
      if (!granted) {
        return;
      }
    }
    setLoading(true);
    let dirs = RNFetchBlob.fs.dirs;
    RNFetchBlob.config({
      fileCache: true,
      appendExt: 'png',
      path: dirs.DownloadDir + '/path-to-file.png',
    })
      .fetch('GET', images[index].url)
      .then((res: FetchBlobResponse) => {
        CameraRoll.save(res.data)
          .then(() => {
            <Snackbar open={true} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success">
                Success
              </Alert>
            </Snackbar>;
          })
          .catch((err) => {
            <Snackbar open={true} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success">
                Fail
              </Alert>
            </Snackbar>;
          })
          .finally(() => setLoading(false));
      })
      .catch((err) => {
        setLoading(false);
        <Snackbar open={true} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            Failure on catch
          </Alert>
        </Snackbar>;
      });
  };

  const Snack = ({text, handleClick, open}: ISnackProps) => {
    return (
      <Text style={{width: '100%'}}>
        <Button variant="outlined" onClick={handleClick}>
          Open success snackbar
        </Button>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            {text}
          </Alert>
        </Snackbar>
      </Text>
    );
  };
  return (
    <Modal visible={showImage} transparent onRequestClose={onClose}>
      <ImageViewer
        imageUrls={images}
        enableSwipeDown
        enableImageZoom
        enablePreload
        saveToLocalByLongPress={true}
        pageAnimateTime={200}
        flipThreshold={10}
        swipeDownThreshold={25}
        renderFooter={(index: number) => CustomRenderFooter(images, index)}
        loadingRender={() => <Spinner color={WHITE} />}
        onCancel={onClose}
      />
    </Modal>
  );
};

export default ImagesModal;
