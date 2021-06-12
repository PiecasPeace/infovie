import {DrawerNavigationProp} from '@react-navigation/drawer';
import {RootStackParamList} from '../../../../constants/Navigation/navigation';

export interface IHomeProps {
  navigation: DrawerNavigationProp<RootStackParamList, 'Home'>;
}
