import React from 'react';
import HomePageScreen from '../../../BottomNavigation/BottomNavigationScreens/HomePage/HomePageScreen';
import {CustomHeader} from '../../../../components/Header/Header';

export const HomeStackScreen: React.FC = ({navigation}: any) => {
  return (
    <CustomHeader
      component={HomePageScreen}
      componentName={'HomePage'}
      componentTitle={'Infovie'}
      onPress={() => navigation.openDrawer()}
    />
  );
};
