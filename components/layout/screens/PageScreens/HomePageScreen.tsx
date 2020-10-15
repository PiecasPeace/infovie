import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import CustomFlatlist from '../../Flatlist/CustomFlatlist';
import requests from '../../../services/requests';
import { white,pink } from '../../../utils/colors';

const HomePageScreen = () => {
    return (
        <View style={styles.container}>
                <Text style={styles.TrendingText}>
                    Trending
             </Text>

            <CustomFlatlist
                fetchUrl={requests.Trending}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#55505e',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 10,
        paddingBottom: 10
    },
    TrendingText: {
        color: white,
        borderBottomColor:pink,
    
    }
});

export default HomePageScreen