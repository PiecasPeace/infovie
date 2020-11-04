import {StyleSheet} from 'react-native';
import {BLACK, DARK_GREEN, DARK_RED, WHITE} from '../../../../constants/Colors';

export const styles = StyleSheet.create({
  QRContainer: {
    flex: 1,
    backgroundColor: '#55505e', //replace for background
    flexDirection: 'column',
  },
  containerItem: {
    paddingRight: 20,
    paddingLeft: 5,
    paddingTop: 5,
    marginBottom: 20,
    flexDirection: 'row',
  },
  headertext: {
    color: WHITE,
    fontSize: 18,
    fontWeight: '700',
    padding: 5,
  },
  DescriptionText: {
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
    padding: 10,
    width: '100%',
    alignSelf: 'flex-end',
    position: 'absolute',
    marginTop: 480,
  },
  StopScan: {
    borderRadius: 2,
    backgroundColor: DARK_RED,
    width: '50%',
  },
  ScanAgain: {
    borderRadius: 2,
    backgroundColor: DARK_GREEN,
    width: '50%',
  },
});
