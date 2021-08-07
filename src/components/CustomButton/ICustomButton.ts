import {StyleProp, TextStyle, ViewStyle} from 'react-native';
export interface ICustomButtonProps {
  style?: object;
  mode: 'text' | 'outlined' | 'contained' | undefined;
  Text?: string | Element;
  color: string;
  onPress?: () => void;
  icon?: string;
  dark?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}
