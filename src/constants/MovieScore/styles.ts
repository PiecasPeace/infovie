import {StyleSheet} from 'react-native';
import {fontSizeResponsive} from '../../components/utils/Dimensions';
import {LIGHT_GREEN, LIGHT_RED, LIGHT_YELLOW, WHITE} from '../Colors';

export const styles = StyleSheet.create({
  score: {
    minWidth: '25%',
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 40,
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
});