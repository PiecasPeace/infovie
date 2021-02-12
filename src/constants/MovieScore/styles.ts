import {StyleSheet} from 'react-native';
import {fontSizeResponsive} from '../../components/utils/Dimensions';
import {LIME,DARK_GRAY, LIGHT_GREEN, LIGHT_RED, LIGHT_YELLOW, WHITE, BLACK} from '../Colors/Colors';

export const styles = StyleSheet.create({
  score: {
    minWidth: '25%',
    padding:3,
    borderRadius: 3,
  },
  textPercent: {
    fontSize: fontSizeResponsive(2.1),
    fontWeight: '500',
    color: WHITE,
    textAlign: 'center',
  },
  low: {
    backgroundColor: LIGHT_RED,
  },
  mid: {
    backgroundColor: LIGHT_YELLOW,
  },
  high: {
    backgroundColor: LIGHT_GREEN,
  },
  zero: {
    backgroundColor:DARK_GRAY,
  },
  lime:{
    backgroundColor:LIME,
  }
});
