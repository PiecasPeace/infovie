import React, {
  useEffect,
  useState,
  createContext,
  useContext,
} from 'react';
import {ItmdbItem} from '../BottomNavigationScreens/QRPage/Interfaces/IMovieInterface';
import AsyncStorage from '@react-native-community/async-storage';
import {ContextProps} from './IMapInterface';

export const STORAGE_MOVIE_KEY = '@save_movie';

export const FavoriteMapContext = createContext<Map<number, ItmdbItem>>(
  new Map<number, ItmdbItem>(),
);

export const MapContextProvider: React.FC<ContextProps> = ({
  children,
}: ContextProps) => {
  const [favMap, setFavMap] = useState<Map<number, ItmdbItem>>(
    new Map<number, ItmdbItem>(),
  );
  // let ContextMap = useContext(FavoriteMapContext);

  // const getAsyncStorage = async () => {
  //   const item = await AsyncStorage.getItem(STORAGE_MOVIE_KEY);
  //   if (item !== null) {
  //     ContextMap = new Map<number, ItmdbItem>(JSON.parse(item));
  //     setFavMap(ContextMap);
  //   }
  //   return favMap;
  // };

  // useEffect(() => {
  //   getAsyncStorage();
  // }, []);
  // useEffect(() => {
  //   AsyncStorage.setItem(STORAGE_MOVIE_KEY, JSON.stringify(favMap));
  // }, [favMap]);

  return (
    <FavoriteMapContext.Provider value={favMap}>
      {children}
    </FavoriteMapContext.Provider>
  );
};
