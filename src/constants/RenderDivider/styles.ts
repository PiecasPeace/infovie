import {StyleSheet} from 'react-native';
import {fontSizeResponsive} from '../../components/utils/Dimensions';
import {BLACK, DARK_GRAY, DARK_RED, GRAY_BLUE, WHITE} from '../Colors/colorpalette';

export const styles = StyleSheet.create({
  trace: {
    marginLeft: 5,
    marginRight: 5,
    fontSize: fontSizeResponsive(2.1),
    color: BLACK,
  },
});
