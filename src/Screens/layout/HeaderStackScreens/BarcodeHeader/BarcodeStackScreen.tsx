import React from 'react';
import {BarcodeScreen} from '../../../BottomNavigation/BottomNavigationScreens/QRPage/BarcodeScreen';
import {CustomHeader} from '../../../../components/Header/Header';
import {BarcodeProps} from '../../../../constants/Navigation/navigation';

export const BarcodeStackScreen: React.FC<BarcodeProps> = ({
  navigation,
}: BarcodeProps) => {
  return (
    <CustomHeader
      component={BarcodeScreen}
      componentName={'Barcode'}
      componentTitle={'Scan Movies'}
      onPress={() => navigation.openDrawer()}
    />
  );
};
