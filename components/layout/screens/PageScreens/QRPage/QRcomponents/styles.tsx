import { StyleSheet } from 'react-native';
import { darkPurple } from "../../../../../utils/colors"

export const styles = StyleSheet.create({
    resultMovie: {
        flex: 1,
        width: '100%',
        marginBottom: 30,
        justifyContent: 'space-between',
        alignItems: 'stretch',
        padding: 8
    },
    headertext: {
        color: darkPurple,
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
});