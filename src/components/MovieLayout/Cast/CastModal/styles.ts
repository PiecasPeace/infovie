import {StyleSheet} from 'react-native';
import {
  DARK_PURPLE,
  LIGHT_GRAY,
  LIGHT_PURPLE,
  SUB_GRAY,
} from '../../../../constants/Colors/colorpalette';
import {fontSizeResponsive} from '../../../../constants/utils/dimensions';

export const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  containerModal: {
    backgroundColor: DARK_PURPLE,
    height: '100%',
  },
  containerScroll: {
    flex: 1,
    padding: 10,
    paddingTop: 0,
    marginTop: 20,
  },
  image: {
    width: '30%',
    height: '100%',
    borderRadius: 5,
  },
  containerCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  photo: {
    borderRadius: 8,
  },
  containerMainText: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  titleInfo: {
    fontSize: fontSizeResponsive(2.4),
    // fontWeight: 'bold',
    color: LIGHT_PURPLE,
    marginBottom: 7,
  },
  titleName: {
    fontSize: fontSizeResponsive(2.3),
    color: LIGHT_GRAY,
    marginBottom: 10,
  },
  textItems: {
    marginLeft: 20,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  textSmall: {
    fontSize: fontSizeResponsive(2.1),
    color: SUB_GRAY,
    textAlign: 'justify',
  },

  textLineHeight: {
    lineHeight: 20,
  },
  containerTitleMargin: {
    marginBottom: 7,
  },
  containerRow: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: LIGHT_PURPLE,
    borderWidth: 1,
    borderColor: DARK_PURPLE,
    // paddingVertical: 9.1,
    borderRadius: 10,
    width: '100%',
  },
  readMore: {
    fontSize: fontSizeResponsive(1.9),
    color: LIGHT_GRAY,
  },
  icon: {
    fontSize: fontSizeResponsive(2.8),
  },
});
