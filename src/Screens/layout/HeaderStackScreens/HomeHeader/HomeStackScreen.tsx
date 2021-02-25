import React from 'react';
import HomeScreen from '../../../BottomNavigation/BottomNavigationScreens/HomePage/HomeScreen';
import {CustomHeader} from '../../../../components/Header/Header';

export const HomeStackScreen: React.FC = ({navigation}: any) => {
  return (
    <CustomHeader
      component={HomeScreen}
      componentName={'HomePage'}
      componentTitle={'Infovie'}
      onPress={() => navigation.openDrawer()}
    />
  );
};
