import {StackNavigationProp} from '@react-navigation/stack';
import {
  IMovieIDInterface,
  IResultItem,
} from '../../../constants/Interfaces/IMovieByIDInterface';
import {RootStackParamList} from '../../../constants/Navigation/navigation';

export interface IPosterImageProps {
  backdropPath: string;
  title: string;
  vote_average: number;
  images: [];
  item: IMovieIDInterface;
  showImage: boolean;
  onPress: () => void;
  video: IResultItem[];
  navigation: StackNavigationProp<RootStackParamList, 'MovieDetails'>;
}
