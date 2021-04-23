import {ItmdbItem} from '../../../Screens/BottomNavigation/BottomNavigationScreens/QRPage/Interfaces/IMovieInterface';

export interface IMovieLayoutInterface {
  openDetails: (id: number) => void;
  StoreFavoriteMovies: (id: number) => void;
  item: ItmdbItem;
}
