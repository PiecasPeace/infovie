import { StyleSheet } from 'react-native';
import { DARK_PURPLE, LIGHT_PURPLE } from '../../../../../constants/Colors';

export const styles = StyleSheet.create({
    ContainerPopup: {
        padding: 20,
        backgroundColor: LIGHT_PURPLE,
        height: '100%',
        flex: 1
    },
    titlePopup: {
        fontSize: 24,
        fontWeight: '300',
        marginBottom: 5,
        color: "#FFF",
        backgroundColor: '#010101'
    },
    ImagePopup: {
        height: 300,
        width: 200,
        borderRadius: 5,
        display: "flex",
        resizeMode: "stretch"
    },
    headertext: {
        color: DARK_PURPLE,
        fontSize: 18,
        fontWeight: '700',
        padding: 5
    },
    // Images: {
    //     height: 300,
    //     width: 200,
    //     borderRadius: 5,
    //     display: "flex",
    //     resizeMode: "stretch"
    // },
    closePopUpButton: {
        padding: 20,
        fontSize: 20,
        backgroundColor: '#eeeeee',
        color: '#FFF'
    },
    ReleaseYearPopup: {
        padding: 10,
    },
    plotPopup: {
        padding: 10
    },
})