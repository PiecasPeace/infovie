import React, { Fragment } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Linking, StatusBar } from "react-native";
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
                    <Text style={styles.DescriptionText}>
                        Toggle between QR and Barcodescanner in the settings!
                    </Text>

                    {!this.state.scan && !this.state.ScanResult &&
                        <View style={styles.activeScan}>
                            <View style={{ width: 180 }}>
                                <Button
                                    contentStyle={{ height: 80, backgroundColor: '#fff0f2' }}
                                    icon="qrcode-scan"
                                    onPress={this.activeQR}
                                    color="#400a13"
                                    mode="outlined">
                                    Scan QR-code
                                </Button>
                            </View>
                            <View style={{ width: 180 }}>
                                <Button
                                    contentStyle={{ height: 80, backgroundColor: '#fff0f2' }}
                                    icon="barcode-scan"
                                    onPress={this.activeQR}
                                    color="#400a13"
                                    mode="outlined">
                                    Scan Bar-code
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
                                    <Button mode="outlined" color='#fff' onPress={() => this.setState({ scan: false })}>
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
        flex: 1,
        // backgroundColor:'#fff' //replace for background
    },
    DescriptionText: {
        padding: 10,
        fontSize: 14,
        fontWeight: 'bold',
        color: "white",
        backgroundColor: "#010101"
    },
    activeScan: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    StopScan: {
        // color: '#fff'
        backgroundColor:'red'
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