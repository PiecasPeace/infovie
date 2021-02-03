import {StyleSheet} from 'react-native';
import {fontSizeResponsive} from '../../../../../../components/utils/Dimensions';
import {WHITE} from '../../../../../../constants/Colors/Colors';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: 20,
    paddingLeft: 5,
    paddingTop: 5,
    marginBottom: 20,
    flexDirection: 'row',
  },
  BackDropPhoto: {height: 50, width: 250, borderRadius: 5},
  subContainer: {
    flex: 1,
    marginLeft: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: fontSizeResponsive(2.6),
    color: WHITE,
    fontWeight: 'bold',
  },
});
