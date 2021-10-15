import {StyleProp, ViewStyle} from 'react-native';

export interface ICustomTouchableOpacityProps {
  activeOpacity: 0.5 | 1;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
  children: Element;
}
