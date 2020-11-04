import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import QRStackScreen from '../../layout/HeaderStackScreens/QRHeader/QRStackScreen';
import AboutStackScreen from '../../layout/HeaderStackScreens/AboutHeader/AboutStackScreen';
import {Platform} from 'react-native';
import SearchStackScreen from '../../layout/HeaderStackScreens/SearchHeader/SearchStackScreen';
import HomeStackScreen from '../../layout/HeaderStackScreens/HomeHeader/HomeStackScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
const MainTabScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: '#fff',
        style: {
          backgroundColor: '#29272e',
          paddingTop: Platform.OS === 'ios' ? 20 : 0,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
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
        name="About"
        component={AboutStackScreen}
        options={{
          tabBarLabel: 'About',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="account-box"
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
    </Tab.Navigator>
  );
};

export default MainTabScreen;
