import React, {useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Platform} from 'react-native';
import {ExploreStackScreen} from '../layout/HeaderStackScreens/SearchHeader/ExploreStackScreen';
import {HomeStackScreen} from '../layout/HeaderStackScreens/HomeHeader/HomeStackScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {DARK_PURPLE, WHITE} from '../../constants/Colors/colorpalette';
import {MapContextProvider} from './Context/ContextProvider';
import {CollectionStackScreen} from '../layout/HeaderStackScreens/CollectionHeader/CollectionStackScreen';
import {BarcodeStackScreen} from '../layout/HeaderStackScreens/BarcodeHeader/BarcodeStackScreen';
import { RootStackParamList } from '../../constants/Navigation/navigation';

const Tab = createBottomTabNavigator<RootStackParamList>();
export const MainTabScreen: React.FC = () => {
  return (
    <MapContextProvider>
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: WHITE,
          style: {
            backgroundColor: DARK_PURPLE,
            paddingTop: Platform.OS === 'ios' ? 20 : 0,
          },
        }}>
        <Tab.Screen
          name="Home"
          component={HomeStackScreen}
          options={{
            // tabBarVisible: false,
            tabBarLabel: 'Home',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                name="home-outline"
                color={color}
                // style={{ backgroundColor: "#eeeeee" }} hintergrund vom icon ändert sich
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Explore"
          component={ExploreStackScreen}
          options={{
            tabBarLabel: 'Explore',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                name="navigation"
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Barcode"
          component={BarcodeStackScreen}
          options={{
            tabBarLabel: 'Barcode',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="barcode" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Collection"
          component={CollectionStackScreen}
          options={{
            tabBarLabel: 'Collection',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                name="book-open-page-variant"
                color={color}
                size={26}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </MapContextProvider>
  );
};
