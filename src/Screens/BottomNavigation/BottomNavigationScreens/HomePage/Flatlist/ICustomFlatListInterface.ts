import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../../../constants/Navigation/navigation';

export interface ICustomFlatListProps {
  fetchUrl: string;
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
}
