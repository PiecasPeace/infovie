import {IMovieIDItem} from '../../QRPage/Interfaces/IMovieByIDInterface';
import {IMovieByIDTVItem} from '../../QRPage/Interfaces/IMovieByIDTVInterface';

export interface ICustomFlatListProps {
  fetchUrl: string;
}

export interface MapState {
  selected: IMovieIDItem;
}

export interface MapStateTV {
  selected: IMovieByIDTVItem;
}