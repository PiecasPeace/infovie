import { StyleSheet } from 'react-native';
import {darkpurple} from '../../utils/colors';

export const styles = StyleSheet.create({
    FlatlistContainer: {
        flex: 1,
        width: "100%",
        padding: 10,
        justifyContent: 'center',
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
        height: 250,
        width: 150,
        borderRadius: 10,
        resizeMode: "stretch"
    }
})