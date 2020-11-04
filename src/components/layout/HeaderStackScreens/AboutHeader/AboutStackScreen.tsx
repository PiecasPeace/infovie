import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AboutPageScreen from '../../../Screens/PageScreens/AboutPage/AboutPageScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const AboutStack = createStackNavigator();

const AboutStackScreen = ({ navigation }: any) => {
    return (
        <AboutStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#29272e',
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    fontWeight: 'bold',
                    justifyContent: "center"
                }
            }}>
            <AboutStack.Screen
                name="About" component={AboutPageScreen} options={{
                    title: "Infovie",
                    headerLeft: () =>
                        <MaterialCommunityIcons.Button
                            name='menu-open'
                            size={25}
                            style={styles.BurgerMenu}
                            onPress={() => navigation.openDrawer()}
                        />
                }} />
        </AboutStack.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#c8fadd',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 40
    },
    title: {
        color: '#FFF',
        fontSize: 32,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 20,
    },
    BurgerMenu: {
        backgroundColor: '#29272e'
    }
});

export default AboutStackScreen