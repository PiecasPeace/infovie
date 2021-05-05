import {IMovieIDInterface} from '../../QRPage/Interfaces/IMovieByIDInterface';
import {IMovieIDTVInterface} from '../../QRPage/Interfaces/IMovieByIDTVInterface';

export interface ICustomFlatListProps {
  fetchUrl: string;
}

export interface MapState {
  selected: IMovieIDInterface;
}

export interface MapStateTV {
  selected: IMovieIDTVInterface;
}