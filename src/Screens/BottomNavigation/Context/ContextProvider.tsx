import React, {
  useEffect,
  useState,
  createContext,
  useContext,
} from 'react';
import {ItmdbItem} from '../../../constants/Interfaces/IMovieInterface';
import AsyncStorage from '@react-native-community/async-storage';
import {ContextProps} from './IMapInterface';

export const FavoriteMapContext = createContext<Map<number, ItmdbItem>>(
  new Map<number, ItmdbItem>(),
);

export const MapContextProvider: React.FC<ContextProps> = ({
  children,
}: ContextProps) => {
  const [favMap, setFavMap] = useState<Map<number, ItmdbItem>>(
    new Map<number, ItmdbItem>(),
  );
  
  return (
    <FavoriteMapContext.Provider value={favMap}>
      {children}
    </FavoriteMapContext.Provider>
  );
};
