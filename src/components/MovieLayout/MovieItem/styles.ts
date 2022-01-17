import { StyleSheet } from "react-native";
import { fontSizeResponsive } from "../../../constants/utils/dimensions";
import { DARK_GRAY, WHITE, BLACK, DARK_PURPLE, DARK_BLUE } from "../../../constants/Colors/colorpalette";

export const styles = StyleSheet.create({
  FlatlistContainer: {
    flex: 1,
    width: '100%',
    padding: 10,
    justifyContent: 'space-evenly',
  },
  //RENDERITEM
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
    marginBottom: 5,
  },
  textSmall: {
    fontSize: fontSizeResponsive(2.0),
    color: DARK_GRAY,
  },
  containerReview: {
    justifyContent: 'space-between',
    marginBottom:5
  },
  headertext: {
    fontSize: fontSizeResponsive(2.2),
    color: WHITE,
    fontWeight: 'bold',
  },
  photo: {
    height: 250,
    width: 150,
    borderRadius: 5,
    borderColor:BLACK,
    borderWidth:1
  },
  //OWN MOVIES
  notOwned: {
    backgroundColor: DARK_PURPLE,
  },
  own: {
    backgroundColor: DARK_BLUE,
  },
  ownButton: {
    // backgroundColor: DARK_PINK,
    tintColor: WHITE,
    paddingLeft: 5,
  },
  //FAVORITES
  nonfav: {
    backgroundColor: DARK_PURPLE,
  },
  fav: {
    // backgroundColor: 'rgba(255, 0, 0, .10)',
    backgroundColor: '#801d36',
  },
  favoriteButton: {
    borderRadius: 5,
    borderColor:BLACK,
    borderWidth:1
  },
});
