import React from 'react';
import Modal from 'react-native-modal';

interface ICustomModalProps {
  children: Element;
  isVisible: boolean;
  style: {};
  onClose: () => void;
}

export const CustomModal: React.FC<ICustomModalProps> = ({
  children,
  isVisible,
  style,
  onClose,
}: ICustomModalProps) => (
  <Modal
    isVisible={isVisible}
    useNativeDriver
    hideModalContentWhileAnimating
    backdropOpacity={0.5}
    style={style}
    onBackdropPress={onClose}
    onBackButtonPress={onClose}>
    {children}
  </Modal>
);
