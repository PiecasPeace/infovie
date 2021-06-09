import {IMovieIDInterface} from '../../../constants/Interfaces/IMovieByIDInterface';
export interface IMoviePopupProps {
  onPress: () => void;
  item: IMovieIDInterface;
  route: any;
  navigation: any;
}
