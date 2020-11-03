import {
  buildIDUrl,
  TMDBRequest,
} from '../../../../../../../constants/Shortcuts';
import {IMovieIDItem} from '../../utils/interface/IDInterface';
import {tmdbJsonGET} from '../../utils/interface/MovieInterface';

export const tmdbGetByTitle = async (title: string): Promise<tmdbJsonGET> => {
  const request = await fetch(`${TMDBRequest}${encodeURI(title)}`);
  const result = (await request.json()) as tmdbJsonGET;
  console.log(request);
  return result;
};

export const tmdbGetById = async (id: number): Promise<IMovieIDItem> => {
  const request = await fetch(buildIDUrl(id));
  const result = (await request.json()) as IMovieIDItem;
  console.log(request);
  return result;
};
