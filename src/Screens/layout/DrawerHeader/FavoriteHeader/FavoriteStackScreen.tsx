import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Header} from '../../../../components/Header/Header';
import {FavoriteScreen} from '../../HeaderStackScreens/CollectionHeader/FavoriteStackScreen/FavoriteStackScreen';

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
