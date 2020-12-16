import React, {Fragment} from 'react';
import {CollectionScreen} from '../../../BottomNavigation/BottomNavigationScreens/CollectionPage/CollectionScreen';
import {Header} from '../../../../components/Header/Header';
import {createStackNavigator} from '@react-navigation/stack';
import {FavoritePageScreen} from '../../../BottomNavigation/BottomNavigationScreens/CollectionPage/FavoritePage/FavoritePageScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {MyMoviesPageScreen} from '../../../BottomNavigation/BottomNavigationScreens/CollectionPage/MyMoviesPage/MyMoviesPageScreen';

const HeaderStack = createStackNavigator();

export const CollectionStackScreen: React.FC = ({navigation}: any) => {
  return (
    <Header
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
                  style={{backgroundColor: '#29272e'}}
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
                  style={{backgroundColor: '#29272e'}}
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
