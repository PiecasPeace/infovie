import React from 'react';
import AboutDrawerScreen from '../../../LeftDrawer/AboutDrawerScreen/AboutDrawerScreen';

import {CustomHeader} from '../../../../components/Header/Header';

export const AboutStackScreen: React.FC = ({navigation}: any) => {
  return (
    <CustomHeader
      component={AboutDrawerScreen}
      componentName={'About'}
      componentTitle={'Infovie'}
      onPress={() => navigation.openDrawer()}
    />
  );
};
