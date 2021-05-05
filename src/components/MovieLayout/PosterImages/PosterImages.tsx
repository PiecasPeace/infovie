import React from 'react';
import {
  GestureResponderEvent,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {getImageApi} from '../../utils/Image';
import {styles} from './styles';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {getAvarageRating} from '../../../constants/MovieScore/getAverageRating';
import ImagesModal from './ImageModal';
import { WHITE } from '../../../constants/Colors/colorpalette';
import { width } from '../../utils/Dimensions';

interface PosterImageProps {
  backdropPath: string;
  title: string;
  vote_average: number;
  images: any;
  video: any;
  showImage: boolean;
  onPress: ((event: GestureResponderEvent) => void) | undefined | null | any;
  // handlePlayVideo: () => void;
}

export const PosterImages: React.FC<PosterImageProps> = ({
  backdropPath,
  title,
  vote_average,
  images,
  video,
  showImage,
  onPress,
}: PosterImageProps) => {
  const handlePlayVideo = ({navigation}:any) => {
    const { key } = video;

    navigation.navigate("MovieScreen", { key });
  };
  return (
    <View style={styles.containerMainPhoto}>
      <Image
        source={getImageApi(backdropPath)}
        style={styles.mainPhoto}
        resizeMode="cover"
      />
      {video && video.site === 'YouTube' && (
        <TouchableOpacity style={styles.play} onPress={handlePlayVideo}>
          <AwesomeIcon
            name="play"
            size={width * 0.07}
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
              <AwesomeIcon
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
