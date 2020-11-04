import 'react-native-gesture-handler'
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainTabScreen from './src/components/Screens/BottomTab/MainTabScreen';
import LeftDrawer from './src/components/Screens/LeftDrawer/LeftDrawerScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props: any) =>
          <LeftDrawer {...props} />
        }>

        <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />

      </Drawer.Navigator>
    </NavigationContainer >
  );
}

{/* <Stack.Screen name="Home"
          component={HomeStackScreen}
          options={{ title: "Homepage" }} />

        <Stack.Screen name="About"
          component={AboutStackScreen}
          options={{ title: "About Page" }} />

        <Stack.Screen name="Detail"
          component={DetailStackScreen}
          options={{ title: "Detail Page" }} />

        <Stack.Screen name="QR"
          component={QRStackScreen}
          options={{ title: "QR Scan" }} /> 
          
          
import HomeStackScreen from './components/layout/screens/StackScreens/HomeStackScreen';
import AboutStackScreen from './components/layout/screens/StackScreens/AboutStackScreen';
import DetailStackScreen from './components/layout/screens/StackScreens/DetailStackScreen';
import QRStackScreen from './components/layout/screens/StackScreens/QRStackScreen';
          */


}