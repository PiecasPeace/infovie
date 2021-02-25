import React from 'react';
import BarcodeScreen from '../../../BottomNavigation/BottomNavigationScreens/QRPage/BarcodeScreen';
import {CustomHeader} from '../../../../components/Header/Header';

export const BarcodeStackScreen: React.FC = ({navigation}: any) => {
  return (
    <CustomHeader
      component={BarcodeScreen}
      componentName={'Barcode'}
      componentTitle={'Scan Movies'}
      onPress={() => navigation.openDrawer()}
    />
  );
};
