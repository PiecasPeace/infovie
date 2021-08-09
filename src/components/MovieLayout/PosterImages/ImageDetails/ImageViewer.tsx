import React from 'react';
import {Modal} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import Spinner from '../../../Spinner/Spinner';
import {WHITE} from '../../../../constants/Colors/colorpalette';
import {IImageModalProps} from './IImageProps';
import {CustomRenderFooter} from '../../../blueprints/CustomRenderFooter/CustomRenderFooter';

const ImagesModal: React.FC<IImageModalProps> = ({
  showImage = false,
  images,
  onClose,
}: IImageModalProps) => {
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
        renderFooter={(index: number) =>
          CustomRenderFooter(images, index)
        }
        loadingRender={() => <Spinner color={WHITE} />}
        onCancel={onClose}
      />
    </Modal>
  );
};

export default ImagesModal;
