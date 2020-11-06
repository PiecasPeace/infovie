import {genreMap} from '../../constants/genres';
import {IGenres} from '../../PageScreens/QRPage/Interfaces/IMovieByIDInterface';

export const convertTypeWithGenre = (movieGenres: number[]): string => {
  if (movieGenres.length > 1) {
    const firstGenre = genreMap.get(movieGenres[0])
      ? genreMap.get(movieGenres[0])
      : `Unknown Genre: ${movieGenres[0]}`;
    const secondGenre = genreMap.get(movieGenres[1])
      ? genreMap.get(movieGenres[1])
      : `Unknown Genre: ${movieGenres[1]}`;

    return `${firstGenre}, ${secondGenre}`;
  } else if (movieGenres.length === 1) {
    const firstGenre = genreMap.get(movieGenres[0])
      ? genreMap.get(movieGenres[0])
      : `Unknown Genre: ${movieGenres[0]}`;
    return `${firstGenre}`;
  }
  return 'Unknown Genre';
};
export const convertTypeWithGenreByID = (movieGenreIDs: IGenres[]): string => {
  let genreString = '';
  for (let i = 0; i < movieGenreIDs.length; i++) {
    genreString += movieGenreIDs[i].name +", ";

  }
  return genreString;
};
