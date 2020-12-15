import React from 'react';
import AboutDrawerScreen from '../../../LeftDrawer/AboutDrawerScreen/AboutDrawerScreen';

import {Header} from '../../Header/Header';

export const AboutStackScreen: React.FC = ({navigation}: any) => {
  return (
    <Header
      component={AboutDrawerScreen}
      componentName={'About'}
      componentTitle={'Infovie'}
      onPress={() => navigation.openDrawer()}
    />
  );
};
