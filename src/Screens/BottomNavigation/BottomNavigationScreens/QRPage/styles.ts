import {StyleSheet} from 'react-native';
import {
  BLACK,
  BORDEAUX_RED,
  DARK_GRAY,
  DARK_GREEN,
  DARK_RED,
  LIGHT_PURPLE,
  NEUTRAL_GREEN,
  WHITE,
} from '../../../../constants/Colors/colorpalette';

export const styles = StyleSheet.create({
  barcodeContainer: {
    flex: 1,
    backgroundColor: LIGHT_PURPLE, //replace for background
    flexDirection: 'column',
  },
  mainContainer: {
    // justifyContent: 'center',
    // alignContent: 'center',
    flex: 1,
  },
  headertext: {
    color: WHITE,
    fontSize: 18,
    fontWeight: '700',
    padding: 5,
  },
  descriptionText: {
    padding: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: BLACK,
    textAlign: 'center',
  },
  photo: {
    height: 250,
    width: 150,
    borderRadius: 5,
    display: 'flex',
    resizeMode: 'stretch',
  },
  activateScan: {
    marginBottom: 20,
    color: BLACK,
    fontFamily: 'roboto',
    alignSelf: 'center',
    width: '95%',
    bottom: 0,
    position: 'absolute',
    borderRadius: 10,
  },
  stopScan: {
    borderRadius: 5,
    backgroundColor: BORDEAUX_RED,
    width: '50%',
  },
  movieHistory: {
    flex: 1,
    padding: 20,
    marginTop: '10%',
    borderRadius: 10,
  },
  historyText: {
    color: DARK_GRAY,
    fontSize: 17,
    borderRadius:5,
    marginTop:15
  },
  scanAgain: {
    borderRadius: 2,
    backgroundColor: NEUTRAL_GREEN,
    width: '50%',
  },
});
