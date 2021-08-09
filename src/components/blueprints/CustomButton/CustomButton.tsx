import React from 'react';
import {Button} from 'react-native-paper';
import {ICustomButtonProps} from './ICustomButton';

export const CustomButton: React.FC<ICustomButtonProps> = ({
  style,
  mode,
  color,
  onPress,
  Text,
  icon,
  dark,
  contentStyle,
  labelStyle,
}: ICustomButtonProps) => {
  return (
    <Button
      contentStyle={contentStyle}
      labelStyle={labelStyle}
      dark={dark}
      style={style}
      mode={mode}
      color={color}
      onPress={onPress}
      icon={icon}>
      {Text}
    </Button>
  );
};
