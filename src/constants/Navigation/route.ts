import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from './navigation';

export type RouteRootStackParamList = {
  CustomFlatListToMovieDetail: {id: number};
  MovieDetailToMovieVideo: {key: number};
};

type ProfileScreenRouteProp = RouteProp<
  RootStackParamList,
  'MovieDetails'
>;

type MovieDetailScreenRouteProp = {
    // navigation:
  route: MovieDetailScreenRouteProp;
};

type RootStaackParamList = {
  Home: undefined;
  Profile: {userId: string};
  Feed: {sort: 'latest' | 'top'} | undefined;
};

type ProfilSeScreenRouteProp = RouteProp<RootStaackParamList, 'Profile'>;

type ProfilSeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Profile'
>;

type Props = {
  route: ProfileScreenRouteProp;
  navigation: ProfilSeScreenNavigationProp;
};
