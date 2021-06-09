import React from 'react';
import {ExploreScreen} from '../../../BottomNavigation/BottomNavigationScreens/SearchPage/ExploreScreen';
import {CustomHeader} from '../../../../components/Header/Header';
import {ExploreProps} from '../../../../constants/Navigation/navigation';

export const ExploreStackScreen: React.FC<ExploreProps> = ({
  navigation,
}: ExploreProps) => {
  return (
    <CustomHeader
      component={ExploreScreen}
      componentName={'Explore'}
      componentTitle={'Explore Movies'}
      onPress={() => navigation.openDrawer()}
    />
  );
};
