import {GestureResponderEvent} from 'react-native';
export interface ICollectionProps {
  titleName: string;
  iconName: string;
  color: string;
  size: number;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  onLongPress?: ((event: GestureResponderEvent) => void) | undefined;
  children?: Element;
  iconChildren?: Element;
}
interface IICONS {
  MaterialCommunityIcons: 'MaterialCommunityIcons.ttf';
  EvilIcons: 'EvilIcons.ttf';
  AntDesign: 'AntDesign.ttf';
  Ionicons: 'Ionicons.ttf';
  MaterialIcons: 'MaterialIcons.ttf';
  Entypo: 'Entypo.ttf';
  Feather: 'Feather.ttf';
}
