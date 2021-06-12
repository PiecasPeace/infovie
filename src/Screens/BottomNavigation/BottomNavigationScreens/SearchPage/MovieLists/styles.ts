import { StyleSheet } from 'react-native';
import { DARK_PURPLE, LIGHT_PURPLE } from '../../../../../constants/Colors/colorpalette';
import { fontSizeResponsive } from '../../../../../constants/utils/dimensions';

export const styles = StyleSheet.create({
    ContainerPopup: {
        padding: 20,
        backgroundColor: LIGHT_PURPLE,
        height: '100%',
        flex: 1
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center'
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
    results: {
        flex: 1,
        width: '90%',
        marginBottom: 20,
    },
    resultMovie: {
        flex: 1,
        width: '100%',
        marginBottom: 30,
        justifyContent: 'space-between',
        alignItems: 'stretch'
    },
    headertext: {
        color: DARK_PURPLE,
        fontSize: 18,
        fontWeight: '700',
        padding: 5
    },
    Images: {
        height: 300,
        width: 200,
        borderRadius: 5,
        display: "flex",
        resizeMode: "stretch"
    },
    searchBox: {
        fontSize: 20,
        fontWeight: '300',
        padding: 20,
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 5,
        marginBottom: 40,
    },
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
        borderColor: LIGHT_PURPLE
    },
    loadingText: {
        fontSize: fontSizeResponsive(2.1),
        color: DARK_PURPLE,
        textAlign: 'center'
    },
})