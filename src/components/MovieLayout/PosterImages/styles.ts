import {StyleSheet} from 'react-native';
import {PINK, WHITE} from '../../../constants/Colors/colorpalette';
import {fontSizeResponsive, width} from '../../utils/Dimensions';

export const styles = StyleSheet.create({
  PosterImageContainer: {flex: 1},
  image: {backgroundColor: '#010101', width: '100%'},
  containerMainPhoto: {
    width,
    height: width * 0.6,
  },
  mainPhoto: {
    width: '100%',
    height: '100%',
  },
  play: {
    position: 'absolute',
    zIndex: 1,
    bottom: -20,
    right: 15,
    borderRadius: width * 0.32,
    backgroundColor: PINK,
    width: width * 0.16,
    height: width * 0.16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerMainPhotoInfo: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  containerBackgroundPhotoInfo: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  photoInfo: {
    fontSize: fontSizeResponsive(3.8),
    color: WHITE,
    fontWeight: 'bold',
  },
  photoStar: {
    flexDirection: 'row',
    marginTop: 8,
  },
  buttonPlay: {
    marginLeft: 5,
  },
  star: {
    marginRight: 5,
  },
});
