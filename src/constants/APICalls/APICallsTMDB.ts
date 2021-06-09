import { IMovieIDInterface } from '../Interfaces/IMovieByIDInterface';
import { IMovieIDTVInterface } from '../Interfaces/IMovieByIDTVInterface';
import { ItmdbJsonGET } from '../Interfaces/IMovieInterface';
import { buildIDUrl, buildIDUrlforTV, TMDBRequest } from '../Shortcuts';

export const tmdbGetByTitle = async (title: string): Promise<ItmdbJsonGET> => {
  const request = await fetch(`${TMDBRequest}${encodeURI(title)}`);
  const result = (await request.json()) as ItmdbJsonGET;
  console.log(request);
  return result;
};

//SEARCH VIA ID
export const tmdbGetById = async (id: number): Promise<IMovieIDInterface> => {
  const request = await fetch(buildIDUrl(id));

  const result = (await request.json()) as IMovieIDInterface;
  console.log(result);
  return result;
};

export const tmdbGetByIdTV = async (id: number): Promise<IMovieIDTVInterface> => {
  const request = await fetch(buildIDUrlforTV(id));
  const result = (await request.json()) as IMovieIDTVInterface;
  console.log(result);
  return result;
};
