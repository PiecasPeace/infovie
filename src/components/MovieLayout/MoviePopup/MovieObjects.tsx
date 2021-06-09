import {IResultItem} from '../../../constants/Interfaces/IMovieByIDInterface';

export const ADULT_RATE = {
  true: 'No',
  false: 'Yes',
};

export interface IInitialInfo {
  id: string;
  backdrop_path: string;
  title: string;
  vote_average: number;
  video: IResultItem[];
  overview: string;
  cast: [];
  crew: [];
  production_companies: [];
  images: [];
  infosDetail: {
    Duration: string;
    Genre: string;
    // Language: UNINFORMED,
    Release: string;
    Budget: string;
    Revenue: string;
    Adult: string;
  };
}
export const UNINFORMED = 'Uninformed';
export const INITIAL_INFO: IInitialInfo = {
  id: '',
  backdrop_path: '',
  title: '',
  vote_average: 0,
  video: [],
  overview: UNINFORMED,
  cast: [],
  crew: [],
  production_companies: [] = [],
  images: [],
  infosDetail: {
    Duration: UNINFORMED,
    Genre: UNINFORMED,
    // Language: UNINFORMED,
    Release: UNINFORMED,
    Budget: UNINFORMED,
    Revenue: UNINFORMED,
    Adult: UNINFORMED,
  },
};
