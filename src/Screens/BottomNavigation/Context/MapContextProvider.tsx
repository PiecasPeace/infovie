import React, {createContext, useEffect, useState, ReactElement} from 'react';
import {ItmdbITEM} from '../BottomNavigationScreens/QRPage/Interfaces/IMovieInterface';
import AsyncStorage from '@react-native-community/async-storage';
import {FAV_KEY, MapContextProviderProps, OWN_KEY} from './IMapInterface';

export const FavAndOwnMapContext = React.createContext(
  new Map<number, ItmdbITEM>(),
);
export const useFavorites = () => React.useContext(FavAndOwnMapContext);

export const MapContextProvider: React.FC<MapContextProviderProps> = ({
  children,
}: MapContextProviderProps) => {
  const [favMap, setFavMap] = React.useState<Map<number, ItmdbITEM>>(
    new Map<number, ItmdbITEM>(),
  );
  const [BoughtMoviesMap, setBoughtMoviesmap] = useState<
    Map<number, ItmdbITEM>
  >(new Map<number, ItmdbITEM>());

  const getData = async () => {
    await AsyncStorage.setItem(FAV_KEY, JSON.stringify(favMap));
    setFavMap(favMap)
  };

  useEffect(() => {
    // AsyncStorage.setItem(OWN_KEY, JSON.stringify(BoughtMoviesMap));
    getData();
  }, []);
  return (
    <FavAndOwnMapContext.Provider value={favMap}>
      {children}
    </FavAndOwnMapContext.Provider>
  );
};
