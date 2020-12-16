import React from 'react';
import HomePageScreen from '../../../BottomNavigation/BottomNavigationScreens/HomePage/HomePageScreen';
import {Header} from '../../../../components/Header/Header';

export const HomeStackScreen: React.FC = ({navigation}: any) => {
  return (
    <Header
      component={HomePageScreen}
      componentName={'HomePage'}
      componentTitle={'Infovie'}
      onPress={() => navigation.openDrawer()}
    />
  );
};
