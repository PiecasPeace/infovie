import {StyleSheet} from 'react-native';
import {
  BLUE,
  DARK_BLUE,
  WHITE,
} from '../../../../constants/Colors/colorpalette';
import {
  fontSizeResponsive,
  height,
} from '../../../../constants/utils/dimensions';

export const styles = StyleSheet.create({
  containerModal: {
    backgroundColor: WHITE,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: height * 0.7,
  },
  containerScroll: {
    padding: 22,
    paddingTop: 0,
    marginTop: 22,
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
    marginBottom: 30,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  titleInfo: {
    fontSize: fontSizeResponsive(2.4),
    fontWeight: 'bold',
    color: DARK_BLUE,
    marginBottom: 7,
  },
  titleName: {
    fontSize: fontSizeResponsive(2.6),
    fontWeight: 'bold',
    color: DARK_BLUE,
    marginBottom: 10,
  },
  textItens: {
    marginLeft: 20,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  textSmall: {
    fontSize: fontSizeResponsive(2.1),
    color: BLUE,
  },
  textJustify: {
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
    padding: 22,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: DARK_BLUE,
    paddingVertical: 9.1,
    borderRadius: 100,
    width: '60%',
  },
  icon: {
    fontSize: fontSizeResponsive(2.8),
  },
});
