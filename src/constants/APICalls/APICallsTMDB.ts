import {
  buildIDUrl,
  TMDBRequest,
} from '../Shortcuts';
import {IMovieIDItem} from '../../Screens/BottomNavigation/BottomNavigationScreens/QRPage/Interfaces/IMovieByIDInterface';
import {ItmdbJsonGET} from '../../Screens/BottomNavigation/BottomNavigationScreens/QRPage/Interfaces/IMovieInterface';

export const tmdbGetByTitle = async (title: string): Promise<ItmdbJsonGET> => {
  const request = await fetch(`${TMDBRequest}${encodeURI(title)}`);
  const result = (await request.json()) as ItmdbJsonGET;
  console.log(request);
  return result;
};

export const tmdbGetById = async (id: number): Promise<IMovieIDItem> => {
  const request = await fetch(buildIDUrl(id));
  const result = (await request.json()) as IMovieIDItem;
  console.log(result);
  return result;
};
