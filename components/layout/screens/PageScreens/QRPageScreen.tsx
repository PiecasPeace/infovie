import React, { Fragment, useState, constructor } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Linking, Platform, Image } from "react-native";
import QRCodeScanner from 'react-native-qrcode-scanner';
import { Button } from 'react-native-paper';
import request from '../../../services/api';

import axios from 'axios';

interface iQRState {
    scan: boolean,
    scanResult: boolean
    result: any,
}

const QRPageScreen = () => {
    const apiurl = "http://omdbapi.com/?apikey=9ebc6b68";
    let barcode = "";
    const BarcodeURL = `https://api.upcitemdb.com/prod/trial/lookup?upc=${barcode}`
    const [scanSuccess, setScanSuccess] = useState<iQRState>({
        scan: false,
        scanResult: false,
        result: "",
    })

    const onSuccess = (event: any) => {
        const check = event.data.substring(0, 4);
        console.log('scanned data ' + check + ": TRUE -> " + event.data + event);
        console.log(event)
        console.log(event.origin)
        setScanSuccess({
            result: event,
            scan: false,
            scanResult: true
        })

        if (check === 'http') {
            Linking
                .openURL(event.data)
                .catch(err => console.error('An error occured, please Check if the URL is correct', err));
        } else {
            setScanSuccess({
                result: event,
                scan: false,
                scanResult: true
            })
        }
    }

    const activeQR = () => {
        setScanSuccess(prevState => {
            return { ...prevState, scan: true }
        })
    }

    const scanAgain = () => {
        setScanSuccess(prevState => {
            return { ...prevState, scanResult: false, scan: true }
        })
    }

    return (
        <View style={styles.QRContainer}>
            <Fragment>
                {!scanSuccess.scan && !scanSuccess.scanResult &&
                    <View>
                        <Text style={styles.DescriptionText}>
                            Please scan a Code !
                            </Text>
                        <View>
                            <Button
                                contentStyle={{
                                    height: 80,
                                    backgroundColor: '#fff0f2',
                                    alignContent: 'center',
                                }}
                                labelStyle={{
                                    fontSize: 25
                                }}
                                style={styles.activateScan}
                                icon="barcode"
                                onPress={activeQR}
                                color="#400a13"
                                mode="outlined">
                                Scan Code
                                </Button>
                        </View>
                    </View>
                }

                {scanSuccess.scanResult &&
                    <Fragment>
                        {/* <Image
                            source={{ uri: this.state.selected.Poster }}
                            style={styles.Images}
                            resizeMode="cover" /> */}
                        <Text>Name : {scanSuccess.result.data}</Text>
                        <Text numberOfLines={1}>RawData: {scanResult.rawData}</Text>
                        <TouchableOpacity onPress={scanAgain} style={styles.buttonTouchable}>
                            <Text style={styles.buttonTextStyle}>Click to Scan again!</Text>
                        </TouchableOpacity>
                        <View style={styles.StopScan}>
                            <Button
                                mode="outlined"
                                color='#fff'
                                onPress={() => setScanSuccess(prevState => {
                                    return { ...prevState, scan: false, scanResult: false }
                                })}>
                                Stop Scan
                                    </Button>
                        </View>
                    </Fragment>
                }

                {scanSuccess.scan &&
                    <QRCodeScanner
                        reactivate={true}
                        showMarker={true}
                        // ref={(node) => { this.state.scanner = node }}
                        onRead={onSuccess}
                        bottomContent={
                            <View style={styles.StopScan}>
                                <Button
                                    mode="outlined"
                                    color='#fff'
                                    onPress={() => setScanSuccess(prevState => {
                                        return { ...prevState, scan: false }
                                    })}>
                                    Stop Scan
                                    </Button>
                            </View>
                        }
                    />
                }
            </Fragment>
        </View>
    )
}

const styles = StyleSheet.create({
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

export default QRPageScreen;