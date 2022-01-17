import {IMovieIDInterface} from '../../../../constants/Interfaces/IMovieByIDInterface';
import { IUPCInterface } from '../../../../constants/Interfaces/IupcInterface';

export interface IBarcodeState {
  scan: boolean;
  scanResult: boolean;
  result: IUPCInterface;
  selected: IMovieIDInterface;
}
