import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { MovieFlatList } from '../../MovieLists/MovieFlatList';

const HomePageScreen = ({ navigation }: any) => {
    return (
        <View style={styles.container}>
            <Button title="Want to QR-Scan a movie?"
                onPress={() => navigation.navigate("QR")}>
            </Button>

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

export default HomePageScreen