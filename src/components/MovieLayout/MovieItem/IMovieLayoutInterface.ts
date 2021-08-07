import {ItmdbItem} from '../../../constants/Interfaces/IMovieInterface';

export interface IMovieLayoutInterface {
  openDetails: (id:number) => void;
  StoreFavoriteMovies: (id: number) => void;
  item: ItmdbItem;
}
