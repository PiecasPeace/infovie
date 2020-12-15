import React from 'react';
import QRPageScreen from '../../../BottomNavigation/BottomNavigationScreens/QRPage/QRPageScreen';
import {Header} from '../../Header/Header';

export const QRStackScreen: React.FC = ({navigation}: any) => {
  return (
    <Header
      component={QRPageScreen}
      componentName={'QR'}
      componentTitle={'Scan Movies'}
      onPress={() => navigation.openDrawer()}
    />
  );
};
