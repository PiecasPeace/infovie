import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../../../constants/Navigation/navigation';

export interface IHomeListProps {
  fetchUrl: string;
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
}
