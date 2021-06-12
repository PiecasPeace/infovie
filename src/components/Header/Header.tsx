import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {DARK_PURPLE, WHITE} from '../../constants/Colors/colorpalette';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from './styles';
import {IHeaderProps} from './IHeaderProps';

const HeaderStack = createStackNavigator();

export const CustomHeader: React.FC<IHeaderProps> = ({
  component,
  componentName,
  componentTitle,
  onPress,
  children,
}: IHeaderProps) => {
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
