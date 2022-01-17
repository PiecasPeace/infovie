import {RouteProp} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import {IMovieIDInterface} from '../../../../constants/Interfaces/IMovieByIDInterface';
import {RootStackParamList} from '../../../../constants/Navigation/navigation';

export interface IMovieDetailProps {
  item: IMovieIDInterface;
  navigation: StackNavigationProp<RootStackParamList, 'MovieDetails'>;
  route: RouteProp<RootStackParamList, 'MovieDetails'>;
}
