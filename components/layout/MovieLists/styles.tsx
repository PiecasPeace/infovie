import { StyleSheet } from 'react-native';
import {darkpurple, lightpurple} from '../../utils/colors';

export const styles = StyleSheet.create({
    ContainerPopup: {
        padding: 20,
        backgroundColor: lightpurple,
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
        color: darkpurple,
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
    
})