import { IMovieIDItem } from "../../QRPage/Interfaces/IMovieByIDInterface";

export interface ICustomFlatListProps {
  fetchUrl: string;
}

export interface MapState {
  selected: IMovieIDItem;
}
