import React from 'react';
import { StyleSheet, View, Button, Text, TouchableOpacity, Linking } from "react-native";
import QRCodeScanner from 'react-native-qrcode-scanner';

class QRPageScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scan: false,
            ScanResult: false,
            result: null
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

    ScanQR = () => {
        return (
            this.setState({ qr: "" })
        )
    }

    render() {
        return (
            <View style={styles.QRContainer}>
                <Text>
                    Please press the button to open up your Camera and scan a QR-Code.
                    </Text>
                <View>
                    <QRCodeScanner
                        reactivate={true}
                        onRead={this.onSuccess}
                        topContent={
                            <View>
                                <Text style={styles.centerText}>
                                    Go to{' '}
                                    <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
                                 your computer and scan the QR code.
                             </Text>
                            </View>
                        }
                        bottomContent={
                            <View>
                                <TouchableOpacity style={styles.buttonTouchable}>
                                    <Text style={styles.buttonText}>OK. Got it!</Text>
                                </TouchableOpacity>
                            </View>
                        }
                    />
                </View>
                <Button
                    title="Reset your Progress"
                    onPress={() => this.ScanQR()}>
                </Button>
            </View>
        )
    }
}





const styles = StyleSheet.create({
    QRContainer: {
        // flex: 1
    },
    // centerText: {
    //     flex: 1,
    //     fontSize: 18,
    //     padding: 32,
    //     color: '#777'
    // },
    // textBold: {
    //     fontWeight: '500',
    //     color: '#000'
    // },
    // buttonText: {
    //     fontSize: 21,
    //     color: 'rgb(0,122,255)'
    // },
    // buttonTouchable: {
    //     padding: 16
    // }
});

export default QRPageScreen;