import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {StyleSheet} from 'react-native';
import {DARK_PURPLE, WHITE} from '../../../constants/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const HeaderStack = createStackNavigator();

interface IHeaderStackScreenProps {
  navigation?: any;
  component: React.FC<{}>;
  componentName: string;
  componentTitle: string;
  onPress: () => void;
}

export const Header: React.FC<IHeaderStackScreenProps> = ({
  navigation,
  component,
  componentName,
  componentTitle,
  onPress
}: IHeaderStackScreenProps) => {
  return (
    <HeaderStack.Navigator
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
      <HeaderStack.Screen
        name={componentName}
        component={component}
        options={{
          title: `${componentTitle}`,
          headerLeft: () => (
            <MaterialCommunityIcons.Button
              name="menu-open"
              size={25}
              style={styles.BurgerMenu}
              onPress={onPress}
            />
          ),
        }}
      />
    </HeaderStack.Navigator>
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
