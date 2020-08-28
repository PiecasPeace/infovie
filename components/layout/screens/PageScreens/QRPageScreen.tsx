import React from 'react';
import { StyleSheet, View, Button, Text, TouchableOpacity } from "react-native";

import QRCodeScanner from 'react-native-qrcode-scanner';
import QRCode from 'react-native-qrcode-svg';

class QRPageScreen extends React.Component {
    state = {
        qr: ''
    }

    onRead = (e: any) => {
        this.setState({ qr: e.data })
    }

    ScanQR = () => {
        return (
            <View>
                <QRCodeScanner
                    onRead={this.onRead}
                />
                {
                    this.state.qr ?
                        <QRCode
                            value={this.state.qr}
                        /> : null
                }
            </View>
        )
    }

    render() {
        return (
            <>
                <View>
                    <Text>
                        Please press the button to open up your Camera and scan a QR-Code.
                    </Text>
                    <QRCodeScanner
                        onRead={this.onRead}
                        topContent={
                            <Text style={styles.centerText}>
                                Go to{' '}
                                <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
            your computer and scan the QR code.
          </Text>
                        }
                        bottomContent={
                            <TouchableOpacity style={styles.buttonTouchable}>
                                <Text style={styles.buttonText}>OK. Got it!</Text>
                            </TouchableOpacity>
                        }
                    />
                    {
                        this.state.qr ?
                            <QRCode
                                value={this.state.qr}
                            /> : null
                    }
                    <Button
                        title="Scan a QR-Code!"
                        onPress={() => this.ScanQR()}>
                    </Button>
                </View>
            </>
        )
    }
}





const styles = StyleSheet.create({
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