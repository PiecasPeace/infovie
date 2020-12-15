import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import QRStackScreen from '../layout/HeaderStackScreens/QRHeader/QRStackScreen';
import {Platform} from 'react-native';
import SearchStackScreen from '../layout/HeaderStackScreens/SearchHeader/SearchStackScreen';
import HomeStackScreen from '../layout/HeaderStackScreens/HomeHeader/HomeStackScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {DARK_BLUE, WHITE} from '../../constants/Colors';
import {CollectionStackScreen} from '../layout/HeaderStackScreens/CollectionHeader/CollectionStackScreen';
import {MapContextProvider} from './Context/MapContextProvider';

const Tab = createBottomTabNavigator();
export const MainTabScreen: React.FC = () => {
  return (
    <MapContextProvider>
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: WHITE,
          style: {
            backgroundColor: DARK_BLUE,
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
                name="home"
                color={color}
                // style={{ backgroundColor: "#eeeeee" }} hintergrund vom icon ändert sich
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Details"
          component={SearchStackScreen}
          options={{
            tabBarLabel: 'Search',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                name="movie-outline"
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="QR"
          component={QRStackScreen}
          options={{
            tabBarLabel: 'QR-Scan',
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
