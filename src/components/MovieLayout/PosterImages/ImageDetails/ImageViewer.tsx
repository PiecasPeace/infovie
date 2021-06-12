import React from 'react';
import {Modal} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import Spinner from '../../../Spinner/Spinner';
import {WHITE} from '../../../../constants/Colors/colorpalette';
import {ImageModalProps} from './IImageDetailProps';

const ImagesModal: React.FC<ImageModalProps> = ({
  showImage = false,
  images,
  onClose,
}: ImageModalProps) => (
  <Modal visible={showImage} transparent onRequestClose={onClose}>
    <ImageViewer
      imageUrls={images}
      enableSwipeDown
      enableImageZoom
      enablePreload
      saveToLocalByLongPress={false}
      pageAnimateTime={200}
      flipThreshold={10}
      maxOverflow={5}
      swipeDownThreshold={25}
      loadingRender={() => <Spinner color={WHITE} />}
      onCancel={onClose}
    />
  </Modal>
);

export default ImagesModal;
