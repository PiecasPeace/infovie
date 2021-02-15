import {ItmdbItem} from '../../Screens/BottomNavigation/BottomNavigationScreens/QRPage/Interfaces/IMovieInterface';

export interface IMovieLayoutInterface {
  Modal: (id: number) => void;
  StoreFavoriteMovies: (id: number) => void;
  item: ItmdbItem;
}
