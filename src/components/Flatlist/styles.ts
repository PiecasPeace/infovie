import { StyleSheet } from 'react-native';
import { WHITE } from '../../constants/Colors';
import { fontSizeResponsive } from '../utils/Dimensions';

export const styles = StyleSheet.create({
    FlatlistContainer: {
        flex: 1,
        width: "100%",
        padding: 10,
        justifyContent: 'space-evenly',
    },
    containerItem: {
        paddingRight: 20,
        paddingLeft: 5,
        paddingTop: 5,
        marginBottom: 20,
        flexDirection: 'row'
    },
    item: {
        marginLeft: 20,
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 1
    },
    textRow: {
        flexDirection: 'row'
    },
    containerSubTitle: {
        marginTop: 3,
        marginBottom: 3
    },
    textSmall: {
        fontSize: fontSizeResponsive(2.1),
        color: WHITE
    },
    trace: {
        marginLeft: 5,
        marginRight: 5,
        fontSize: fontSizeResponsive(2.1),
        color: WHITE
    },
    headertext: {
        color: WHITE,
        fontSize: 18,
        fontWeight: '700',
        padding: 5
    },
    photo: {
        height: 250,
        width: 150,
        borderRadius: 5,
        display: "flex",
        resizeMode: "stretch"
    }
})