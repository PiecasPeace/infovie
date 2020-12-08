import React, {createContext, useEffect, useState} from 'react';
import {ItmdbITEM} from '../BottomNavigationScreens/QRPage/Interfaces/IMovieInterface';
import AsyncStorage from '@react-native-community/async-storage';

export const FavAndOwnMapContext = createContext(new Map<number, ItmdbITEM>());

export const useFavorites = () => React.useContext(FavAndOwnMapContext);

interface MapContextProviderProps {
  children: Element;
}
const FAV_KEY = '@fav_key';
const OWN_KEY = '@own_key';

export const MapContext: React.FC<MapContextProviderProps> = ({
  children,
}: MapContextProviderProps) => {
  const [favMap, setFavMap] = useState<Map<number, ItmdbITEM>>(
    new Map<number, ItmdbITEM>(),
  );

  const [ownMap, setOwnMap] = useState<Map<number, ItmdbITEM>>(
    new Map<number, ItmdbITEM>(),
  );

  useEffect(() => {
    AsyncStorage.setItem(OWN_KEY, JSON.stringify(ownMap));
    AsyncStorage.setItem(FAV_KEY, JSON.stringify(favMap));
  }, []);

  return (
    <FavAndOwnMapContext.Provider value={favMap}>
      {children}
    </FavAndOwnMapContext.Provider>
  );
};
