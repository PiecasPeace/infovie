import React from 'react';
import {Text} from 'react-native';
import {styles} from './styles';
import {IReadMoreFooterProps} from './IReadMoreFooterProps';
import {CustomTouchableOpacity} from '../../../blueprints/CustomTouchableOpacity/CustomTouchableOpacity';

export const ReadMoreFooter: React.FC<IReadMoreFooterProps> = ({
  text,
  handlePress,
}: IReadMoreFooterProps) => {
  return (
    <CustomTouchableOpacity activeOpacity={0.5} onPress={() => handlePress()}>
      <Text style={styles.footerContainer}>{text}</Text>
    </CustomTouchableOpacity>
  );
};
