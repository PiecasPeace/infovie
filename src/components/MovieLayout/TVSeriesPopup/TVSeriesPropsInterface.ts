import { IMovieByIDTVItem } from '../../../Screens/BottomNavigation/BottomNavigationScreens/QRPage/Interfaces/IMovieByIDTVInterface';

export interface TVSeriesProps {
  onPress: () => void;
  item: IMovieByIDTVItem;
  visible: boolean;
}
