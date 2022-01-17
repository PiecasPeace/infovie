import {DrawerNavigationProp} from '@react-navigation/drawer';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  //FROM HOME
  MovieDetails: {id: number};
  MovieVideo: {key: string};
  //
  Explore: undefined;
  Barcode: undefined;
  Collection: undefined;
  //FROM COLLECTION
  FavoriteCollection: undefined;
  MyMoviesCollection: undefined;
  //DRAWER
  About: undefined;
};

export type RootNavProps<T extends keyof RootStackParamList> = {
  navigation: StackNavigationProp<RootStackParamList, T>;
  route: RouteProp<RootStackParamList, T>;
};

// ------------------------------------------------------

//HOME
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;
export type HomeStackNavigationProp = DrawerNavigationProp<
  RootStackParamList,
  'Home'
>;
export type HomeProps = {
  navigation: HomeStackNavigationProp;
  route: HomeScreenRouteProp;
};
//HOME - MUSIC VIDEO
type MovieVideoRouteProp = RouteProp<RootStackParamList, 'MovieVideo'>;
type MovieVideoNavigationProp = DrawerNavigationProp<
  RootStackParamList,
  'MovieVideo'
>;
export type MovieVideoProps = {
  navigate: MovieVideoNavigationProp;
  route: MovieVideoRouteProp;
};

//EXPLORE
export type ExploreStackNavigationProp = DrawerNavigationProp<
  RootStackParamList,
  'Explore'
>;
export type ExploreProps = {
  navigation: ExploreStackNavigationProp;
};

//BARCODE
export type BarcodeStackNavigationProp = DrawerNavigationProp<
  RootStackParamList,
  'Barcode'
>;
export type BarcodeProps = {
  navigation: BarcodeStackNavigationProp;
};

//COLLECTION
export type CollectionStackNavigationProp = DrawerNavigationProp<
  RootStackParamList,
  'Collection'
>;
export type CollectionStackNavigationFavoriteProp = DrawerNavigationProp<
  RootStackParamList,
  'FavoriteCollection'
>;
export type CollectionStackNavigationMyMoviesProp = DrawerNavigationProp<
  RootStackParamList,
  'MyMoviesCollection'
>;
export type CollectionProps = {
  navigation: CollectionStackNavigationProp;
};
export type CollectionFavoriteProps = {
  navigationFavorites: CollectionStackNavigationFavoriteProp;
};
export type CollectionMyMoviesProps = {
  navigationMyMovies: CollectionStackNavigationMyMoviesProp;
};

//HOME
export type HomeScreenNavigationProp = DrawerNavigationProp<
  RootStackParamList,
  'Home'
>;
export type HomeDrawerProps = {
  navigation: HomeScreenNavigationProp;
};
//ABOUT
export type AboutScreenNavigationProp = DrawerNavigationProp<
  RootStackParamList,
  'About'
>;
export type AboutDrawerProps = {
  navigation: AboutScreenNavigationProp;
};

export type HomeAboutScreenProps = {
  navigationHome: HomeScreenNavigationProp;
  navigationAbout: AboutScreenNavigationProp;
};
