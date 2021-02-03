import {StyleSheet} from 'react-native';

import {fontSizeResponsive} from '../utils/Dimensions';

import {DARK_PURPLE, LIGHT_GRAY} from '../../constants/Colors/Colors';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 5,
  },
  containerInput: {
    height: 40,
    backgroundColor: LIGHT_GRAY,
    borderRadius: 15,
  },
  inputDirection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    padding: 10,
  },
  textInput: {
    flex: 1,
    height: '100%',
    fontSize: fontSizeResponsive(2.2),
    color: DARK_PURPLE,
    width: '100%',
  },
});

export default styles;
