import React from 'react';
import QRPageScreen from '../../../BottomNavigation/BottomNavigationScreens/QRPage/QRPageScreen';
import {CustomHeader} from '../../../../components/Header/Header';

export const QRStackScreen: React.FC = ({navigation}: any) => {
  return (
    <CustomHeader
      component={QRPageScreen}
      componentName={'QR'}
      componentTitle={'Scan Movies'}
      onPress={() => navigation.openDrawer()}
    />
  );
};
