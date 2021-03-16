import {StyleSheet} from 'react-native';
import {
  DARK_GRAY,
  PINK,
  WHITE,
} from '../../../../../constants/Colors/colorpalette';

export const styles = StyleSheet.create({
  historyContainer: {
    flex: 1,
  },
  movieText: {
    color: DARK_GRAY,
    fontSize: 20,
    marginTop: 20,
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  buttonView: {
    position: 'absolute',
    right: 0,
    marginTop: 15,
  },
  buttonLabel: {
    fontFamily: 'Roboto',
    fontSize: 15,
    color: WHITE,
  },
});
