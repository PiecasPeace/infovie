import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import QRPageScreen from '../PageScreens/QRPageScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const QRStack = createStackNavigator();

const QRStackScreen = ({ navigation }: any) => {
    return (
        <QRStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#29272e',
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
                justifyContent: "center",
                textAlign: 'center',
                marginRight: 50
            }
        }} >
            <QRStack.Screen
                name="QR"
                component={QRPageScreen}
                options={{
                    title: "Infovie - Scan",
                    headerLeft: () =>
                        <MaterialCommunityIcons.Button
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
        backgroundColor: '#29272e'
    }
});

export default QRStackScreen