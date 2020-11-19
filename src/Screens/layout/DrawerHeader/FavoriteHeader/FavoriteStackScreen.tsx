import React from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {FavoriteScreen} from '../../HeaderStackScreens/LibraryHeader/FavoriteDrawerScreen/FavoriteScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {DARK_PURPLE, WHITE} from '../../../../constants/Colors';

const FavoriteStack = createStackNavigator();

interface IFavoritesStackScreenProps {
  navigation: any;
}

export const FavoriteStackScreen: React.FC<IFavoritesStackScreenProps> = ({
  navigation,
}: IFavoritesStackScreenProps) => {
  return (
    <FavoriteStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: DARK_PURPLE,
        },
        headerTintColor: WHITE,
        headerTitleStyle: {
          fontWeight: 'bold',
          justifyContent: 'center',
        },
      }}>
      <FavoriteStack.Screen
        name="Favorites"
        component={FavoriteScreen}
        options={{
          title: 'Favorites',
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
    </FavoriteStack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c8fadd',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 40,
  },
  title: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },
  BurgerMenu: {
    backgroundColor: '#29272e',
  },
});
