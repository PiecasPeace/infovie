import React from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import AboutDrawerScreen from '../../../LeftDrawer/AboutDrawerScreen/AboutDrawerScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {DARK_PURPLE, WHITE} from '../../../../constants/Colors';

const AboutStack = createStackNavigator();

interface IAboutStackScreenProps {
  navigation: any;
}

const AboutStackScreen: React.FC<IAboutStackScreenProps> = ({
  navigation,
}: IAboutStackScreenProps) => {
  return (
    <AboutStack.Navigator
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
      <AboutStack.Screen
        name="About"
        component={AboutDrawerScreen}
        options={{
          title: 'Infovie',
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
    </AboutStack.Navigator>
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

export default AboutStackScreen;
