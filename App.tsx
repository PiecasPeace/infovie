import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {MainTabScreen} from './src/Screens/BottomNavigation/MainTabScreen';
import {LeftDrawerMenu} from './src/Screens/LeftDrawer/LeftDrawerMenu';
import {createStackNavigator} from '@react-navigation/stack';
import AboutStackScreen from './src/Screens/layout/DrawerHeader/AboutHeader/AboutStackScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props: any) => <LeftDrawerMenu {...props} />}>
        <Drawer.Screen name="About" component={AboutStackScreen} />
        <Stack.Screen name="Home" component={MainTabScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
