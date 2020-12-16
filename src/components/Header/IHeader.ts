import {StyleSheet} from 'react-native';

export interface IHeaderStackScreenProps {
  navigation?: any;
  component: React.FC<{}>;
  componentName: string;
  componentTitle: string;
  onPress: () => void;
  children?: Element;
}
