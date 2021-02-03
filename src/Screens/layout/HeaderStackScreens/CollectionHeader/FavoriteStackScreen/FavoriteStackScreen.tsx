import React from 'react';
import {CustomHeader} from '../../../../../components/Header/Header';
import {FavoritePageScreen} from '../../../../BottomNavigation/BottomNavigationScreens/CollectionPage/FavoritePage/FavoritePageScreen';

export const FavoriteStackScreen: React.FC = ({navigation}: any) => {
  return (
    <CustomHeader
      component={FavoritePageScreen}
      componentName={'FavoriteCollection'}
      componentTitle={'Favorites'}
      onPress={() => navigation.openDrawer()}
    />
  );
};
