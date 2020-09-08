import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { MovieFlatList } from '../../MovieLists/MovieFlatList';

const DetailPageScreen = () => {
    return (
        <View style={styles.container}>

            <MovieFlatList />
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

export default DetailPageScreen