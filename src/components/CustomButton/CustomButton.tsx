import React from 'react';
import {Button} from 'react-native-paper';
import {ICustomButtonProps} from './ICustomButton';

export const CustomButton: React.FC<ICustomButtonProps> = ({
  style,
  mode,
  color,
  onPress,
  Text,
}: ICustomButtonProps) => {
  return (
    <Button style={style} mode={mode} color={color} onPress={onPress}>
      {Text}
    </Button>
  );
};
