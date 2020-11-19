import React from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {LibraryScreen} from '../../../BottomNavigation/BottomNavigationScreens/LibraryPage/LibraryScreen';

const LibraryStack = createStackNavigator();

const LibraryStackScreen = ({navigation}: any) => {
  return (
    <LibraryStack.Navigator
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
      <LibraryStack.Screen
        name="Library"
        component={LibraryScreen}
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
    </LibraryStack.Navigator>
  );
};

const styles = StyleSheet.create({
  BurgerMenu: {
    backgroundColor: '#29272e',
  },
});

export default LibraryStackScreen;
