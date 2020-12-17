import {StyleSheet} from 'react-native';
import {
  DARK_PINK,
  DARK_PURPLE,
  GRAY,
  PINK,
  WHITE,
} from '../../../../../constants/Colors';
import {fontSizeResponsive} from '../../../../../components/utils/Dimensions';

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
    color: WHITE,
  },
  containerReview: {
    justifyContent: 'space-between',
    marginRight: 20,
  },
  headertext: {
    fontSize: fontSizeResponsive(2.6),
    color: WHITE,
    fontWeight: 'bold',
  },
  photo: {
    height: 250,
    width: 150,
    borderRadius: 5,
  },
  //BOUGHT MOVIES
  nonBought: {
    backgroundColor: DARK_PURPLE,
  },
  bought: {
    backgroundColor: DARK_PINK,
  },
  ownButton: {
    // backgroundColor: DARK_PINK,
    tintColor: WHITE,
    paddingLeft:13,
   
  },
  //FAVORITES
  nonfav: {
    // backgroundColor: DARK_PURPLE,
    backgroundColor: 'rgba(18, 17, 20, .10)'
  },
  fav: {
    backgroundColor: 'rgba(255, 0, 0, .10)',
  },
  favoriteButton: {
    borderRadius:100,
    paddingLeft:13
  },
});
