import React from 'react';
import { StyleSheet, Platform } from 'react-native'

export const styles = StyleSheet.create({
    QRContainer: {
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,
        flex: 1,
        backgroundColor: '#55505e', //replace for background
        flexDirection: 'column',
    },
    Images: {
        height: 300,
        width: 200,
        borderRadius: 5,
        display: "flex",
        resizeMode: "stretch"
    },
    DescriptionText: {
        padding: 10,
        fontSize: 14,
        fontWeight: 'bold',
        color: "white",
        backgroundColor: "#010101",
        textAlign: 'center',
    },
    activateScan: {
        padding: 10,
        width: '100%',
        alignSelf: 'flex-end',
        position: 'absolute',
        marginTop: 480
    },
    StopScan: {
        backgroundColor: 'red',
        borderRadius: 5,
    },

    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777'
    },
    textBold: {
        fontWeight: '500',
        color: '#000'
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
        padding: 16
    }
});