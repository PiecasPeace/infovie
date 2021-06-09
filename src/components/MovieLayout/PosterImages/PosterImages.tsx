import React from 'react';
import {Image, Text, View} from 'react-native';
import {getImageApi} from '../../utils/Image';
import {styles} from './styles';
import {getAvarageRating} from '../../../constants/MovieScore/getAverageRating';
import ImagesModal from './ImageModal';
import {RED, WHITE} from '../../../constants/Colors/colorpalette';
import {width} from '../../utils/dimensions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  IMovieIDInterface,
  IResultItem,
  results,
} from '../../../constants/Interfaces/IMovieByIDInterface';
import {TouchableOpacity} from '../../TouchableOpacity/TouchableOpacity';

interface PosterImageProps {
  backdropPath: string;
  title: string;
  vote_average: number;
  images: any;
  item: IMovieIDInterface;
  showImage: boolean;
  onPress: any;
  video: IResultItem[];
  // navigation: any;
}


export const PosterImages: React.FC<PosterImageProps> = ({
  backdropPath,
  title,
  vote_average,
  images,
  showImage,
  onPress,
  video,
}: PosterImageProps) => {
  return (
    <View style={styles.containerMainPhoto}>
      <Image
        source={getImageApi(backdropPath)}
        style={styles.mainPhoto}
        resizeMode="cover"
      />
      {video[0] && video[0].site === 'YouTube' && (
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.play}
          onPress={() => console.log('B')}>
          <MaterialCommunityIcons
            name="youtube"
            size={width * 0.09}
            color={WHITE}
            style={styles.buttonPlay}
          />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={styles.containerMainPhotoInfo}
        activeOpacity={images.length ? 0.5 : 1}
        onPress={images.length ? onPress : null}>
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
      </TouchableOpacity>
      {images.length ? (
        <ImagesModal showImage={showImage} images={images} onClose={onPress} />
      ) : null}
    </View>
  );
};
