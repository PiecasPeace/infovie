import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import DetailPageScreen from '../PageScreens/DetailPageScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DetailStack = createStackNavigator();

const DetailStackScreen = ({ navigation }: any) => {
    return (
        <DetailStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#079300',
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
                fontWeight: 'bold',
                justifyContent: "center"
            }
        }} >
            <DetailStack.Screen
                name="Details"
                component={DetailPageScreen}
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
        </DetailStack.Navigator>
    )
}

const styles = StyleSheet.create({
    BurgerMenu: {
        backgroundColor: '#079300'
    }
});

export default DetailStackScreen
