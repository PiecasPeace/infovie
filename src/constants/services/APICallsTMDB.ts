import {ICast, IPersonWithMovieCredits} from '../../components/MovieLayout/MovieDetail/Interfaces/ICastWithCredits';
import {IPerson} from '../../components/MovieLayout/MovieDetail/Interfaces/Person';
import {
  IMovieIDInterface,
  IProductionCompanies,
} from '../Interfaces/IMovieByIDInterface';
import {IMovieIDTVInterface} from '../Interfaces/IMovieByIDTVInterface';
import {ItmdbJsonGET} from '../Interfaces/IMovieInterface';
import {
  buildIDUrl,
  buildIDUrlforTV,
  buildPerson,
  buildPersonWithMovieReferences,
  TMDBRequest,
} from '../Shortcuts';
//SEARCH VIA MOVIE TITLE
export const tmdbGetByTitle = async (title: string): Promise<ItmdbJsonGET> => {
  const request = await fetch(`${TMDBRequest}${encodeURI(title)}`);
  const result = (await request.json()) as ItmdbJsonGET;
  console.log(request);
  return result;
};

//SEARCH VIA MOVIE ID
export const tmdbGetById = async (id: number): Promise<IMovieIDInterface> => {
  const request = await fetch(buildIDUrl(id));
  const result = (await request.json()) as IMovieIDInterface;
  console.log(result);
  return result;
};
//SEARCH VIA MOVIE TV ID
export const tmdbGetByIdTV = async (
  id: number,
): Promise<IMovieIDTVInterface> => {
  const request = await fetch(buildIDUrlforTV(id));
  const result = (await request.json()) as IMovieIDTVInterface;
  console.log(result);
  return result;
};
//SEARCH VIA PERSON (we only search 1 person here)
export const tmdbGetPerson = async (id: number): Promise<IPerson> => {
  const request = await fetch(buildPerson(id));
  const result = (await request.json()) as IPerson;
  console.log(result);

  return result;
};
//SEARCH VIA PERSON->COMPANY // NOT CORRECT
export const tmdbGetCompany = async (
  id: number,
): Promise<IProductionCompanies> => {
  const request = await fetch(buildPerson(id));
  const result = (await request.json()) as IProductionCompanies;
  console.log(result);

  return result;
};
//Here we are searching movie_credits from a person's creditId. (this will give us the movies he/she played in)
export const tmdbGetPersonReferences = async (
  id: number,
): Promise<ICast> => {
  const request = await fetch(buildPersonWithMovieReferences(id));
  const result = (await request.json()) as ICast;
  // console.log(result);

  return result;
};
