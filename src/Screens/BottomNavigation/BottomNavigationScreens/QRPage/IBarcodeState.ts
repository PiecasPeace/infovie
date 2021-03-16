import {IMovieIDItem} from './Interfaces/IMovieByIDInterface';

export interface IBarcodeState {
  scan: boolean;
  scanResult: boolean;
  result: any;
  selected: IMovieIDItem;
}
