import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {DARK_PURPLE, WHITE} from '../../constants/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from './styles';
import {IHeaderStackScreenProps} from './IHeader';

const HeaderStack = createStackNavigator();

export const Header: React.FC<IHeaderStackScreenProps> = ({
  component,
  componentName,
  componentTitle,
  onPress,
  children,
}: IHeaderStackScreenProps) => {
  return (
    <HeaderStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: DARK_PURPLE,
        },
        headerTintColor: WHITE,
        headerTitleStyle: {
          // fontWeight: 'bold',
          justifyContent: 'center',
          fontFamily: 'roboto',
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
      {children}
    </HeaderStack.Navigator>
  );
};
