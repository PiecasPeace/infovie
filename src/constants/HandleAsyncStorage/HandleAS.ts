import AsyncStorage from '@react-native-community/async-storage';
import _ from 'lodash';
import {ItmdbItem} from '../../Screens/BottomNavigation/BottomNavigationScreens/QRPage/Interfaces/IMovieInterface';

export const STORAGE_MOVIE_KEY = '@save_movie';

export const saveFavorite = async (
  myMovies: ItmdbItem,
  movieMap: Map<number, ItmdbItem>,
) => {
  const oldFavorites = await AsyncStorage.getItem(STORAGE_MOVIE_KEY);
  if (oldFavorites !== null) {
    movieMap = new Map<number, ItmdbItem>(JSON.parse(oldFavorites));
  }
  movieMap.set(myMovies.id, myMovies);
  if (myMovies !== null) {
    await AsyncStorage.setItem(
      STORAGE_MOVIE_KEY,
      JSON.stringify([...movieMap]),
    );
    console.log(`Movie saved: ${myMovies.title} \n `);
  }
};

export const deleteFavorite = async (
  id: number,
  movieMap: Map<number, ItmdbItem>,
) => {
  const item = await AsyncStorage.getItem(STORAGE_MOVIE_KEY);
  if (item !== null) {
    movieMap = new Map<number, ItmdbItem>(JSON.parse(item));
    movieMap.delete(id);
    await AsyncStorage.setItem(
      STORAGE_MOVIE_KEY,
      JSON.stringify([...movieMap]),
    );
  }
  return movieMap;
};

export const loadFavorites = async (
  movieMap: Map<number, ItmdbItem>,
): Promise<Map<number, ItmdbItem>> => {
  console.log('load HomePage Data...');
  const item = await AsyncStorage.getItem(STORAGE_MOVIE_KEY);
  if (item !== null) {
    movieMap = new Map<number, ItmdbItem>(JSON.parse(item));
    console.log(movieMap);
  }
  return movieMap;
};

export const HandleStoring = async (
  id: number,
  cloneMap: Map<number, ItmdbItem>,
  favoriteMap: Map<number, ItmdbItem>,
  updateMap: (id: number, movieValues: ItmdbItem) => void,
) => {
  let favoriteMovieValues = _.cloneDeep(cloneMap.get(id));
  if (favoriteMovieValues !== undefined) {
    updateMap(id, favoriteMovieValues);
    favoriteMovieValues.favorite = !favoriteMovieValues.favorite;
    try {
      if (favoriteMovieValues.favorite) {
        saveFavorite(favoriteMovieValues, favoriteMap);
      } else {
        deleteFavorite(favoriteMovieValues.id, favoriteMap);
      }
    } catch (err) {
      err.message;
    }
  }
};

export const handleMovies = async (
  id: number,
  cloneMap: Map<number, ItmdbItem>,
  screenMap: Map<number, ItmdbItem>,
  updateMap: (id: number, movieValues: ItmdbItem) => void,
) => {
  let favoriteMovieValues = _.cloneDeep(cloneMap.get(id));
  if (favoriteMovieValues !== undefined) {
    HandleStoring(id, cloneMap, screenMap, updateMap);
  }
};
