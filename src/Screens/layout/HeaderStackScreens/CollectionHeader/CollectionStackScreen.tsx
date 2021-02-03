import React, {Fragment} from 'react';
import {CollectionScreen} from '../../../BottomNavigation/BottomNavigationScreens/CollectionPage/CollectionScreen';
import {CustomHeader} from '../../../../components/Header/Header';
import {createStackNavigator} from '@react-navigation/stack';
import {FavoritePageScreen} from '../../../BottomNavigation/BottomNavigationScreens/CollectionPage/FavoritePage/FavoritePageScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {MyMoviesPageScreen} from '../../../BottomNavigation/BottomNavigationScreens/CollectionPage/MyMoviesPage/MyMoviesPageScreen';
import {DARK_PURPLE} from '../../../../constants/Colors/Colors';
const HeaderStack = createStackNavigator();

export const CollectionStackScreen: React.FC = ({navigation}: any) => {
  return (
    <CustomHeader
      component={CollectionScreen}
      componentName={'Collection'}
      componentTitle={'My Movies and Favorites'}
      onPress={() => navigation.openDrawer()}
      children={
        <Fragment>
          <HeaderStack.Screen
            name={'FavoriteCollection'}
            component={FavoritePageScreen}
            options={{
              title: 'My Favorites',
              headerLeft: () => (
                <MaterialCommunityIcons.Button
                  name="menu-open"
                  size={25}
                  style={{backgroundColor: DARK_PURPLE}}
                  onPress={() => navigation.openDrawer()}
                />
              ),
            }}
          />
          <HeaderStack.Screen
            name={'MyMoviesCollection'}
            component={MyMoviesPageScreen}
            options={{
              title: 'My Movies',
              headerLeft: () => (
                <MaterialCommunityIcons.Button
                  name="menu-open"
                  size={25}
                  style={{backgroundColor: DARK_PURPLE}}
                  onPress={() => navigation.openDrawer()}
                />
              ),
            }}
          />
        </Fragment>
      }
    />
  );
};
