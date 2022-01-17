import React from 'react';
import AboutDrawerScreen from '../../../LeftDrawer/AboutDrawerScreen/AboutDrawerScreen';
import {CustomHeader} from '../../../../components/Header/Header';
import { AboutDrawerProps } from '../../../../constants/Navigation/navigation';

export const AboutStackScreen: React.FC<AboutDrawerProps> = ({
  navigation,
}: AboutDrawerProps) => {
  return (
    <CustomHeader
      component={AboutDrawerScreen}
      componentName={'About'}
      componentTitle={'Infovie'}
      onPress={() => navigation.openDrawer()}
    />
  );
};
