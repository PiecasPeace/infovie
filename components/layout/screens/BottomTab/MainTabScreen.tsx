import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import QRStackScreen from '../StackScreens/QRStackScreen';
import AboutStackScreen from '../StackScreens/AboutStackScreen';

import DetailStackScreen from '../StackScreens/DetailStackScreen';
import HomeStackScreen from '../StackScreens/HomeStackScreen';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();
const MainTabScreen = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            activeColor="#FFF"
            inactiveColor='#81798f'

        >
            <Tab.Screen
                name="Home"
                component={HomeStackScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarColor: "#930000",
                    tabBarIcon: ({ color }) => (
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
                component={DetailStackScreen}
                options={{
                    tabBarLabel: 'Search',
                    tabBarColor: "#079300",
                    tabBarIcon: ({ color }) => (
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
                    tabBarColor: "#009387",
                    tabBarIcon: ({ color }) => (
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
                    tabBarColor: '#29272e',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name="barcode"
                            color={color}
                            size={26}
                        />
                    ),
                }}
            />
        </Tab.Navigator >
    )
}

export default MainTabScreen;