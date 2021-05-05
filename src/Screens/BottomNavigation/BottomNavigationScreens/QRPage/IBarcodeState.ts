import {IMovieIDInterface} from './Interfaces/IMovieByIDInterface';
import { IUPCInterface } from './Interfaces/IupcInterface';

export interface IBarcodeState {
  scan: boolean;
  scanResult: boolean;
  result: IUPCInterface;
  selected: IMovieIDInterface;
}
