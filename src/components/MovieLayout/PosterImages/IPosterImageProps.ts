import {StackNavigationProp} from '@react-navigation/stack';
import {
  IMovieIDInterface,
  IResultItem,
} from '../../../constants/Interfaces/IMovieByIDInterface';
import {RootStackParamList} from '../../../constants/Navigation/navigation';
import {IImageInterface} from '../MovieDetail/Interfaces/IImageInterface';

export interface IPosterImageProps {
  backdropPath: string;
  title: string;
  vote_average: number;
  images: IImageInterface[];
  item: IMovieIDInterface;
  showImage: boolean;
  onPress: () => void;
  video: IResultItem[];
  navigation: StackNavigationProp<RootStackParamList, 'MovieDetails'>;
}
