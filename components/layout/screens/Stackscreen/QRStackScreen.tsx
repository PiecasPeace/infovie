import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import QRPageScreen from '../PageScreens/QRPageScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const QRStack = createStackNavigator();

const QRStackScreen = ({ navigation }: any) => {
    return (
        <QRStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#020093',
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
                fontWeight: 'bold',
                justifyContent: "center"
            }
        }} >
            <QRStack.Screen
                name="QR"
                component={QRPageScreen}
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
        </QRStack.Navigator>
    )
}

const styles = StyleSheet.create({
    BurgerMenu: {
        backgroundColor: '#020093'
    }
});

export default QRStackScreen