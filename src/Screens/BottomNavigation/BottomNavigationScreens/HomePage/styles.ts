import {StyleSheet} from 'react-native';
import {
  WHITE,
  LIGHT_PURPLE,
  DARK_PURPLE,
  PINK,
  RED,
} from '../../../../constants/Colors/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LIGHT_PURPLE,
    justifyContent: 'flex-start',
  },
  trendingText: {
    color: WHITE,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  //DROPDOWN
  dropDownPicker: {
    backgroundColor: DARK_PURPLE,
    zIndex:2
  },
  dropContainer: {
    height: 40,
  },
  dropItem: {
    justifyContent: 'flex-start',
  },
  dropLabel: {
    fontSize: 14,
    textAlign: 'left',
    color: WHITE,
    marginTop: 5,
    marginLeft: 10,
  },
  dropSelectedLabel: {
    color: PINK,
  },
  dropListStyle: {
    backgroundColor: DARK_PURPLE,
  },
  dropArrow: {
    margin: 2,
    color: WHITE,
  },
});
