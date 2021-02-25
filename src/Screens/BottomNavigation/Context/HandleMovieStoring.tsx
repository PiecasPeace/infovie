import AsyncStorage from '@react-native-community/async-storage';
import {useContext} from 'react';
import {ItmdbItem} from '../BottomNavigationScreens/QRPage/Interfaces/IMovieInterface';
import {FavoriteMapContext, STORAGE_MOVIE_KEY} from './ContextProvider';

export const useSaveFavorite = () => {
  let ContextFavMap = useContext(FavoriteMapContext);

  const saveFavorite = async (myMovies: ItmdbItem) => {
    const oldFavorites = await AsyncStorage.getItem(STORAGE_MOVIE_KEY);
    if (oldFavorites !== null) {
      ContextFavMap = new Map<number, ItmdbItem>(JSON.parse(oldFavorites));
    }
    ContextFavMap.set(myMovies.id, myMovies);
    if (myMovies !== null) {
      await AsyncStorage.setItem(
        STORAGE_MOVIE_KEY,
        JSON.stringify([...ContextFavMap]),
      );
      console.log(`Movie saved: ${myMovies.title} \n `);
    }
  };
  return saveFavorite;
};

export const useDeleteFavorite = () => {
  let ContextFavMap = useContext(FavoriteMapContext);

  const deleteFavorite = async (id: number) => {
    const item = await AsyncStorage.getItem(STORAGE_MOVIE_KEY);
    if (item !== null) {
      ContextFavMap = new Map<number, ItmdbItem>(JSON.parse(item));
      ContextFavMap.delete(id);
      await AsyncStorage.setItem(
        STORAGE_MOVIE_KEY,
        JSON.stringify([...ContextFavMap]),
      );
      console.log(`Movie deleted: ${id} \n `);
    }
    return deleteFavorite;
  };
};
