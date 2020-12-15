import React from 'react';
import {CollectionScreen} from '../../../BottomNavigation/BottomNavigationScreens/CollectionPage/CollectionScreen';
import {Header} from '../../Header/Header';

export const CollectionStackScreen: React.FC = ({navigation}: any) => {
  return (
    <Header
      component={CollectionScreen}
      componentName={'Collection'}
      componentTitle={'My Movies and Favorites'}
      onPress={() => navigation.openDrawer()}
    />
  );
};
