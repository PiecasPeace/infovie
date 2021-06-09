import { IMovieIDTVInterface } from '../../../constants/Interfaces/IMovieByIDTVInterface';

export interface TVSeriesProps {
  onPress: () => void;
  item: IMovieIDTVInterface;
  visible: boolean;
}
