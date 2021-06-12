import React from 'react';
import {TouchableOpacity} from 'react-native';
import {ITouchableOpacityProps} from './ITouchableOpacityProps';

const TouchableOpacityCustom: React.FC<ITouchableOpacityProps> = ({
  activeOpacity,
  style,
  onPress,
  children,
}: ITouchableOpacityProps) => (
  <TouchableOpacity
    activeOpacity={activeOpacity}
    style={style}
    onPress={onPress}>
    {children}
  </TouchableOpacity>
);

export {TouchableOpacityCustom as TouchableOpacity};
