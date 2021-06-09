import {DrawerNavigationProp} from '@react-navigation/drawer';
import {StackNavigationProp} from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  //FROM HOME
  MovieDetail: undefined;
  MovieVideo: undefined;
  //
  Explore: undefined;
  Barcode: undefined;
  Collection: undefined;
  //FROM COLLECTION
  Favorite: undefined;
  //DRAWER
  About: undefined;
};

//HOME
export type HomeStackNavigationProp = DrawerNavigationProp<
  RootStackParamList,
  'Home'
>;
export type HomeStackNavigationDetailProp = DrawerNavigationProp<
  RootStackParamList,
  'MovieDetail'
>;
export type HomeProps = {
  navigation: HomeStackNavigationProp;
  navigationDetails: HomeStackNavigationDetailProp;
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
export type CollectionProps = {
  navigation: CollectionStackNavigationProp;
};
//---DRAWER------DRAWER------DRAWER------DRAWER------DRAWER------DRAWER---
export type DrawerParamList = {
  Home: undefined;
  About: undefined;
};
//HOME
export type HomeScreenNavigationProp = DrawerNavigationProp<
  DrawerParamList,
  'Home'
>;
export type HomeDrawerProps = {
  navigation: HomeScreenNavigationProp;
};
//ABOUT
export type AboutScreenNavigationProp = DrawerNavigationProp<
  DrawerParamList,
  'About'
>;
export type AboutDrawerProps = {
  navigation: AboutScreenNavigationProp;
};

export type HomeAboutScreenProps = {
  navigationHome: HomeScreenNavigationProp;
  navigationAbout: AboutScreenNavigationProp;
};
