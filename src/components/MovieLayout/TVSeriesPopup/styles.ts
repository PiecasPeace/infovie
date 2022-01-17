import {StyleSheet} from 'react-native';
import {fontSizeResponsive} from '../../../constants/utils/dimensions';
import {
  BLACK,
  LIGHT_PURPLE,
} from '../../../constants/Colors/colorpalette';

export const styles = StyleSheet.create({
  FlatlistContainer: {
    flex: 1,
    width: '100%',
    padding: 10,
    justifyContent: 'space-evenly',
  },
  containerItem: {
    paddingRight: 20,
    paddingLeft: 5,
    paddingTop: 5,
    marginBottom: 20,
    flexDirection: 'row',
  },
  item: {
    marginLeft: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
  },
  textRow: {
    flexDirection: 'row',
  },
  containerSubTitle: {
    marginTop: 3,
    marginBottom: 3,
  },
  textSmall: {
    fontSize: fontSizeResponsive(2.1),
    color: BLACK,
  },
  containerReview: {
    justifyContent: 'space-between',
    marginRight: 20,
  },
  headertext: {
    fontSize: fontSizeResponsive(2.6),
    color: BLACK,
    fontWeight: 'bold',
  },
  photo: {
    height: 250,
    width: 150,
    borderRadius: 5,
  },
  ContainerPopup: {
    padding: 20,
    backgroundColor: LIGHT_PURPLE,
    height: '100%',
    flex: 1,
  },
  titlePopup: {
    fontSize: 24,
    fontWeight: '300',
    marginBottom: 5,
    color: '#FFF',
    backgroundColor: '#010101',
  },
  ImagePopup: {
    height: 300,
    width: 200,
    borderRadius: 5,
    display: 'flex',
    resizeMode: 'stretch',
  },
  closePopUpButton: {
    padding: 20,
    fontSize: 20,
    backgroundColor: '#eeeeee',
    color: '#FFF',
  },
  ReleaseYearPopup: {
    padding: 10,
  },
  plotPopup: {
    padding: 10,
  },
});
