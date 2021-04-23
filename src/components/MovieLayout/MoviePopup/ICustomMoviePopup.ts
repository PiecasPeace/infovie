import {IMovieIDItem} from '../../../Screens/BottomNavigation/BottomNavigationScreens/QRPage/Interfaces/IMovieByIDInterface';
import {IMovieByIDTVItem} from '../../../Screens/BottomNavigation/BottomNavigationScreens/QRPage/Interfaces/IMovieByIDTVInterface';

export interface IMoviePopupProps {
  onPress: () => void;
  item: IMovieIDItem;
  visible: boolean;
}
