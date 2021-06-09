import {StyleSheet} from 'react-native';
import {fontSizeResponsive} from '../../../../../../components/utils/dimensions';
import {
  BLACK,
  DARK_GRAY,
  DARK_PURPLE,
  WHITE,
} from '../../../../../../constants/Colors/colorpalette';

export const styles = StyleSheet.create({
  swipeContainer: {
    alignItems: 'center',
    backgroundColor: DARK_PURPLE,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    paddingRight: 1,
    paddingLeft: 5,
    paddingTop: 5,
    marginBottom: 0,
    flexDirection: 'row',
  },
  BackDropPhoto: {
    height: 100,
    width: 150,
    borderRadius: 2,
    borderColor: BLACK,
    borderWidth: 1,
  },
  subContainer: {
    flex: 1,
    marginLeft: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: fontSizeResponsive(1.9),
    color: WHITE,
    fontWeight: 'bold',
    fontFamily: 'roboto',
  },
  year: {
    fontSize: fontSizeResponsive(1.7),
    color: DARK_GRAY,
  },
  language: {
    fontSize: fontSizeResponsive(1.7),
    color: DARK_GRAY,
  },
  textRow: {
    flexDirection: 'row',
  },
  containerSubTitles: {
    flex: 1,
  },
});
