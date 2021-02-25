import React from 'react';
import {ExploreScreen} from '../../../BottomNavigation/BottomNavigationScreens/SearchPage/ExploreScreen';
import {CustomHeader} from '../../../../components/Header/Header';

export const ExploreStackScreen: React.FC = ({navigation}: any) => {
  return (
    <CustomHeader
      component={ExploreScreen}
      componentName={'Explore'}
      componentTitle={'Explore Movies'}
      onPress={() => navigation.openDrawer()}
    />
  );
};
