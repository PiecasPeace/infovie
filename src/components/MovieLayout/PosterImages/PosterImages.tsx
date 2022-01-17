import React from 'react';
import {Image, Text, View} from 'react-native';
import {getImageApi} from '../../../constants/utils/Image';
import {styles} from './styles';
import {getAvarageRating} from '../../../constants/MovieScore/getAverageRating';
import ImagesModal from './ImageDetails/ImageViewer';
import {WHITE} from '../../../constants/Colors/colorpalette';
import {width} from '../../../constants/utils/dimensions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {IPosterImageProps} from './IPosterImageProps';
import { CustomTouchableOpacity } from '../../blueprints/CustomTouchableOpacity/CustomTouchableOpacity';

export const PosterImages: React.FC<IPosterImageProps> = ({
  backdropPath,
  title,
  vote_average,
  images,
  showImage,
  onPress,
  video,
  navigation,
}: IPosterImageProps) => {
  return (
    <View style={styles.containerMainPhoto}>
      <Image
        source={getImageApi(backdropPath)}
        style={styles.mainPhoto}
        resizeMode="cover"
      />
      {video[0] && video[0].site === 'YouTube' && (
        <CustomTouchableOpacity
          activeOpacity={0.5}
          style={styles.play}
          onPress={() =>
            navigation.navigate('MovieVideo', {key: video[0].key})
          }>
          <MaterialCommunityIcons
            name="youtube"
            size={width * 0.09}
            color={WHITE}
            style={styles.buttonPlay}
          />
        </CustomTouchableOpacity>
      )}
      <CustomTouchableOpacity
        style={styles.containerMainPhotoInfo}
        activeOpacity={images.length ? 0.5 : 1}
        onPress={images.length ? onPress : () => null}>
        <View style={styles.containerBackgroundPhotoInfo}>
          <Text numberOfLines={2} style={styles.photoInfo}>
            {title}
          </Text>
          <View style={styles.photoStar}>
            {getAvarageRating(vote_average).map((value) => (
              <MaterialCommunityIcons
                key={value}
                name="star"
                size={width * 0.06}
                color={WHITE}
                style={styles.star}
              />
            ))}
          </View>
        </View>
      </CustomTouchableOpacity>
      {images.length ? (
        <ImagesModal showImage={showImage} images={images} onClose={onPress} />
      ) : null}
    </View>
  );
};
