import React from 'react';
import {Header} from '../../../../../components/Header/Header';
import {FavoritePageScreen} from '../../../../BottomNavigation/BottomNavigationScreens/CollectionPage/FavoritePage/FavoritePageScreen';

export const FavoriteStackScreen: React.FC = ({navigation}: any) => {
  return (
    <Header
      component={FavoritePageScreen}
      componentName={'FavoriteCollection'}
      componentTitle={'My Favorites'}
      onPress={() => navigation.openDrawer()}
    />
  );
};
