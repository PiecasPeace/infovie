import {StyleSheet} from 'react-native';
import {
  DARK_PURPLE,
  DARK_RED,
  LIGHT_PURPLE,
} from '../../../../../constants/Colors/colorpalette';

export const styles = StyleSheet.create({
  favoritesContainer: {
    flex: 1,
    backgroundColor: DARK_PURPLE,
    flexDirection: 'column',
  },
  collectionItems: {
    flex: 1,
    flexDirection: 'column',
  },

  //YOUTUBE VID
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: DARK_RED,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: DARK_PURPLE,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  deleteOpacity: {
    backgroundColor: '#c92e2c',
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 1,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
});
