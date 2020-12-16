import React from 'react';
import SearchPageScreen from '../../../BottomNavigation/BottomNavigationScreens/SearchPage/SearchPageScreen';
import {Header} from '../../../../components/Header/Header';

export const SearchStackScreen: React.FC = ({navigation}: any) => {
  return (
    <Header
      component={SearchPageScreen}
      componentName={'Search'}
      componentTitle={'Search Movies'}
      onPress={() => navigation.openDrawer()}
    />
  );
};
