import {IMovieIDItem} from '../Interfaces/IMovieByIDInterface';

export interface ICustomModalProps {
  onPress: () => void;
  item: IMovieIDItem;
  visible: boolean;
}
