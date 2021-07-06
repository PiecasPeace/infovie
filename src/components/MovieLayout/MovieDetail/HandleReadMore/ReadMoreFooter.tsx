import React from 'react';
import {Text} from 'react-native';
import {styles} from './styles';
import {TouchableOpacity} from '../../../TouchableOpacity/TouchableOpacity';
import {IHandleReadMoreFooterProps} from './IHandleReadMoreFooterProps';

export const ReadMoreFooter: React.FC<IHandleReadMoreFooterProps> = ({
  text,
  handlePress,
}: IHandleReadMoreFooterProps) => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={() => handlePress()}>
      <Text style={styles.footerContainer}>{text}</Text>
    </TouchableOpacity>
  );
};
