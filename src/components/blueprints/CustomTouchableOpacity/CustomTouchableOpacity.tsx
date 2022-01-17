import React from 'react';
import {TouchableOpacity} from 'react-native';
import {ICustomTouchableOpacityProps} from './ICustomTouchableOpacityProps';

export const CustomTouchableOpacity: React.FC<ICustomTouchableOpacityProps> = ({
  activeOpacity,
  style,
  onPress,
  children,
}: ICustomTouchableOpacityProps) => (
  <TouchableOpacity
    activeOpacity={activeOpacity}
    style={style}
    onPress={onPress}>
    {children}
  </TouchableOpacity>
);

