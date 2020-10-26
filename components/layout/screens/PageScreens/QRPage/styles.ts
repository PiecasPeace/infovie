import { StyleSheet } from 'react-native';
import { black, darkGreen, darkPurple, darkRed } from "../../../../utils/colors"

export const styles = StyleSheet.create({
    QRContainer: {
        flex: 1,
        backgroundColor: '#55505e', //replace for background
        flexDirection: 'column',
    },
    DescriptionText: {
        padding: 10,
        fontSize: 14,
        fontWeight: 'bold',
        color: "white",
        backgroundColor: black,
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
        borderRadius: 2,
        backgroundColor: darkRed,
        width: '50%',
    },
    ScanAgain: {
        borderRadius: 2,
        backgroundColor: darkGreen,
        width: '50%'
    },
});