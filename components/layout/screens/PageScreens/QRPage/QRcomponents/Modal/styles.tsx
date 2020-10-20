import { StyleSheet } from 'react-native';
import { darkPurple, lightPurple } from '../../utils/colors';
import { fontSizeResponsive } from '../../utils/dimensions';

export const styles = StyleSheet.create({
    ContainerPopup: {
        padding: 20,
        backgroundColor: lightPurple,
        height: '100%',
        flex: 1
    },
    // container: {
    //     flex: 1,
    //     backgroundColor: '#fff',
    //     justifyContent: 'center'
    // },
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
        color: darkPurple,
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
    loadingMore: {
        paddingTop: 20,
        paddingBottom: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loadingButton: {
        padding: 10,
        width: '50%',
        borderWidth: 1,
        borderRadius: 100,
        borderColor: lightPurple
    },
    loadingText: {
        fontSize: fontSizeResponsive(2.1),
        color: darkPurple,
        textAlign: 'center'
    },
})