import {IMovieIDInterface} from '../../../Screens/BottomNavigation/BottomNavigationScreens/QRPage/Interfaces/IMovieByIDInterface';
import {IMovieIDTVInterface} from '../../../Screens/BottomNavigation/BottomNavigationScreens/QRPage/Interfaces/IMovieByIDTVInterface';

export interface IMoviePopupProps {
  onPress: () => void;
  item: IMovieIDInterface;
  visible: boolean;
}
