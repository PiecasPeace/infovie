import {StyleSheet} from 'react-native';
import {fontSizeResponsive} from '../utils/dimensions';
import {BLACK} from '../Colors/colorpalette';

export const styles = StyleSheet.create({
  trace: {
    marginLeft: 5,
    marginRight: 5,
    fontSize: fontSizeResponsive(2.1),
    color: BLACK,
  },
});
