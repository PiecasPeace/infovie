import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomFlatlist from '../../Flatlist/CustomFlatlist';

const HomePageScreen = () => {
    return (
        <View style={styles.container}>
            <CustomFlatlist />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 10,
        paddingBottom: 10
    },
});

export default HomePageScreen