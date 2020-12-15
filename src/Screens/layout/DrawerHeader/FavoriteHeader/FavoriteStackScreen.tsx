import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Header} from '../../Header/Header';
import {FavoriteScreen} from '../../HeaderStackScreens/CollectionHeader/FavoriteDrawerScreen/FavoriteScreen';

export const FavoriteStackScreen: React.FC = ({navigation}: any) => {
  return (
    <Header
      component={FavoriteScreen}
      componentName={'Favorites'}
      componentTitle={'Favorites'}
      onPress={() => navigation.openDrawer()}
    />
  );
};
