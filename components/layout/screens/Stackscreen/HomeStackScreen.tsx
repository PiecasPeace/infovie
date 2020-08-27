import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePageScreen from '../PageScreens/HomePageScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeStack = createStackNavigator();
const HomeStackScreen = ({ navigation }: any) => {
    return (
        <HomeStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#930000',
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
                fontWeight: 'bold',
            }
        }} >
            <HomeStack.Screen
                name="HomePage"
                component={HomePageScreen}
                options={{
                    title: "Infovie",
                    headerLeft: () =>
                        <Icon.Button
                            name='menu-open'
                            size={25}
                            style={styles.BurgerMenu}
                            onPress={() => navigation.openDrawer()}
                        />
                }} />
        </HomeStack.Navigator>
    )
}

const styles = StyleSheet.create({
    BurgerMenu: {
        backgroundColor: '#930000'
    }
});

export default HomeStackScreen