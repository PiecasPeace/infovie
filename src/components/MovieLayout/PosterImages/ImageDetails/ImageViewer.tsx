import React, {Fragment} from 'react';
import {Modal, Text, View} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import Spinner from '../../../Spinner/Spinner';
import {BLACK, WHITE} from '../../../../constants/Colors/colorpalette';
import {IImageModalProps} from './IImageProps';
import {CustomButton} from '../../../CustomButton/CustomButton';

const renderFooter = () => {
  return (
    <View>
      <CustomButton
      onPress={() => ""}
        color={BLACK}
        mode={'contained'}
        Text={'Save to Gallery'}
        icon={'download'}
        style={{flex: 1, minWidth: '100%'}}
      />
    </View>
  );
};

const ImagesModal: React.FC<IImageModalProps> = ({
  showImage = false,
  images,
  onClose,
}: IImageModalProps) => (
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
      renderFooter={() => renderFooter()}
      loadingRender={() => <Spinner color={WHITE} />}
      onCancel={onClose}
    />
  </Modal>
);

export default ImagesModal;
