import React from 'react';
import {CustomHeader} from '../../../../../components/Header/Header';
import {FavoriteScreen} from '../../../../BottomNavigation/BottomNavigationScreens/CollectionPage/FavoritePage/FavoriteScreen';

export const FavoriteStackScreen: React.FC = ({navigation}: any) => {
  return (
    <CustomHeader
      component={FavoriteScreen}
      componentName={'FavoriteCollection'}
      componentTitle={'Favorites'}
      onPress={() => navigation.openDrawer()}
    />
  );
};
