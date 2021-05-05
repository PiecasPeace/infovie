import { IMovieIDTVInterface } from '../../../Screens/BottomNavigation/BottomNavigationScreens/QRPage/Interfaces/IMovieByIDTVInterface';

export interface TVSeriesProps {
  onPress: () => void;
  item: IMovieIDTVInterface;
  visible: boolean;
}
