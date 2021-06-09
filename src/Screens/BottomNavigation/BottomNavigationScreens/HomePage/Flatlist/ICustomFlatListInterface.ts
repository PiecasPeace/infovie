import {HomeProps} from '../../../../../constants/Navigation/navigation';
import {IMovieIDInterface} from '../../../../../constants/Interfaces/IMovieByIDInterface';
import {IMovieIDTVInterface} from '../../../../../constants/Interfaces/IMovieByIDTVInterface';

export interface ICustomFlatListProps {
  fetchUrl: string;
  navigation?: any;
}

export interface MapState {
  selected: IMovieIDInterface;
}

export interface MapStateTV {
  selected: IMovieIDTVInterface;
}
