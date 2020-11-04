import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import SearchPageScreen from '../../../Screens/PageScreens/SearchPage/SearchPageScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SearchStack = createStackNavigator();

const SearchStackScreen = ({ navigation }: any) => {
    return (
        <SearchStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#29272e',
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
                fontWeight: 'bold',
                justifyContent: "center"
            }
        }} >
            <SearchStack.Screen
                name="Details"
                component={SearchPageScreen}
                options={{
                    title: "Infovie",
                    headerLeft: () =>
                        <MaterialCommunityIcons.Button
                            name='menu-open'
                            size={25}
                            style={styles.BurgerMenu}
                            onPress={() => navigation.openDrawer()}
                        />
                }} />
        </SearchStack.Navigator>
    )
}

const styles = StyleSheet.create({
    BurgerMenu: {
        backgroundColor: '#29272e'
    }
});

export default SearchStackScreen
