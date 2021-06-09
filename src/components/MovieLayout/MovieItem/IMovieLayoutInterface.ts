import {GestureResponderEvent} from 'react-native';
import {ItmdbItem} from '../../../constants/Interfaces/IMovieInterface';

export interface IMovieLayoutInterface {
  // openDetails: (id: number) => void;
  openDetails: any;
  StoreFavoriteMovies: (id: number) => void;
  item: ItmdbItem;
}
