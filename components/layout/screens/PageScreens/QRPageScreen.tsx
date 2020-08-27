import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from "react-native";

// import QRCodeScanner from 'react-native-qrcode-scanner';

class QRPageScreen extends React.Component {
    state = {
        qr: ''
    }

    onRead = (e: any) => {
        this.setState({ qr: e })
    }

    render() {
        return (
            <>
                {/* <QRCodeScanner
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
                <Text>
                    this is a qr page
                </Text> */}
                <Text>
                    BRUH QR PAGE
                </Text>
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