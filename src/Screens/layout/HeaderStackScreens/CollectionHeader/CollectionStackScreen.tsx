import React from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {CollectionScreen} from '../../../BottomNavigation/BottomNavigationScreens/CollectionPage/CollectionScreen';

const CollectionStack = createStackNavigator();

export const CollectionStackScreen = ({navigation}: any) => {
  return (
    <CollectionStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#29272e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          justifyContent: 'center',
          textAlign: 'center',
          marginRight: 50,
        },
      }}>
      <CollectionStack.Screen
        name="Collection"
        component={CollectionScreen}
        options={{
          title: 'Saved Movies and Favorites',
          headerLeft: () => (
            <MaterialCommunityIcons.Button
              name="menu-open"
              size={25}
              style={styles.BurgerMenu}
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
      />
    </CollectionStack.Navigator>
  );
};

const styles = StyleSheet.create({
  BurgerMenu: {
    backgroundColor: '#29272e',
  },
});
