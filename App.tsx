import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {MainTabScreen} from './src/components/BottomTab/MainTabScreen';
import {LeftDrawer} from './src/components/LeftDrawer/LeftDrawerScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props: any) => <LeftDrawer {...props} />}>
        <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
