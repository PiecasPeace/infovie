import React, { Fragment } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Linking, Platform } from "react-native";
import QRCodeScanner from 'react-native-qrcode-scanner';
import { Button } from 'react-native-paper';

interface iQRState {
    scan: boolean,
    ScanResult: boolean
    result: any,
    scanner: null
}

class QRPageScreen extends React.Component<{}, iQRState> {
    constructor(props) {
        super(props);
        this.state = {
            scan: false,
            ScanResult: false,
            result: null,
            scanner: null
        };
    }

    onSuccess = (e: any) => {
        const check = e.data.substring(0, 4);
        console.log('scanned data ' + check + ": TRUE -> " + e.data);
        this.setState({
            result: e,
            scan: false,
            ScanResult: true
        })

        if (check === 'http') {
            Linking
                .openURL(e.data)
                .catch(err => console.error('An error occured, please Check if the URL is correct', err));
        } else {
            this.setState({
                result: e,
                scan: false,
                ScanResult: true
            })
        }
    }

    activeQR = () => {
        this.setState({
            scan: true
        })
    }

    scanAgain = () => {
        this.setState({
            scan: true,
            ScanResult: false
        })
    }

    render() {
        return (
            <View style={styles.QRContainer}>
                <Fragment>
                    {!this.state.scan && !this.state.ScanResult &&
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
                                    onPress={this.activeQR}
                                    color="#400a13"
                                    mode="outlined">
                                    Scan Code
                                </Button>
                            </View>
                        </View>
                    }

                    {this.state.ScanResult &&
                        <Fragment>
                            <Text style={styles.textTitle1}>Result !</Text>
                            <View style={this.state.ScanResult ? styles.scanCardView : styles.cardView}>
                                <Text>Type : {this.state.result.type}</Text>
                                <Text>Result : {this.state.result.data}</Text>
                                <Text numberOfLines={1}>RawData: {this.state.result.rawData}</Text>
                                <TouchableOpacity onPress={this.scanAgain} style={styles.buttonTouchable}>
                                    <Text style={styles.buttonTextStyle}>Click to Scan again!</Text>
                                </TouchableOpacity>
                                <View style={styles.StopScan}>
                                    <Button
                                        mode="outlined"
                                        color='#fff'
                                        onPress={() => this.setState({ scan: false, ScanResult: false })}>
                                        Stop Scan
                                    </Button>
                                </View>
                            </View>
                        </Fragment>
                    }

                    {this.state.scan &&
                        <QRCodeScanner
                            reactivate={true}
                            showMarker={true}
                            // ref={(node) => { this.state.scanner = node }}
                            onRead={this.onSuccess}
                            bottomContent={
                                <View style={styles.StopScan}>
                                    <Button
                                        mode="outlined"
                                        color='#fff'
                                        onPress={() => this.setState({ scan: false })}>
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
}

const styles = StyleSheet.create({
    QRContainer: {
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,
        flex: 1,
        backgroundColor: '#55505e', //replace for background
        flexDirection: 'column',
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