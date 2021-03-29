import React, {useState, useEffect, Fragment} from 'react';
import {FlatList, View, ListRenderItem} from 'react-native';
import Spinner from '../../../../../components/Spinner/Spinner';
import {styles} from './styles';
import {ItmdbItem, ItmdbJsonGET} from '../../QRPage/Interfaces/IMovieInterface';
import {baseTMDBUrl} from '../../../../../constants/Shortcuts';
import _ from 'lodash';
import AsyncStorage from '@react-native-community/async-storage';
import {STORAGE_MOVIE_KEY} from '../../../Context/ContextProvider';
import {ICustomFlatListProps} from './ICustomFlatListInterface';
import {
  useSaveFavorite,
  useDeleteFavorite,
} from '../../../../../components/HandleMovieStoring/HandleMovieStoring';
import {MovieLayout} from '../../../../../components/MovieLayout/MovieLayout';
import {tmdbGetById} from '../../../../../constants/APICalls/APICallsTMDB';
import {IMovieIDItem} from '../../QRPage/Interfaces/IMovieByIDInterface';
import {MoviePopup} from '../../QRPage/MoviePopup/MoviePopup';
import {CustomButton} from '../../../../../components/CustomButton/CustomButton';
import {BORDEAUX_RED} from '../../../../../constants/Colors/colorpalette';

interface MapState {
  selected: IMovieIDItem;
}

export const CustomFlatlist: React.FC<ICustomFlatListProps> = ({
  fetchUrl,
}: ICustomFlatListProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const [loadingID, setLoadingID] = useState(false);
  const [loading, setLoading] = useState(true);
  const [detailMovie, setDetailMovie] = useState<MapState>({
    selected: {} as IMovieIDItem,
  });

  const [movieMap, setMovieMap] = useState<Map<number, ItmdbItem>>(
    new Map<number, ItmdbItem>(),
  );
  let flatlistMap = new Map<number, ItmdbItem>();

  const fetchData = async () => {
    setLoading(true);
    let MovieMapBody = new Map<number, ItmdbItem>();
    try {
      const request = await fetch(`${baseTMDBUrl}${fetchUrl}`);
      const result = (await request.json()) as ItmdbJsonGET;
      flatlistMap = await loadFavorites();

      for (let i = 0; i < result.results.length; i++) {
        if (flatlistMap.get(result.results[i].id) !== undefined) {
          result.results[i].favorite = true;
        } else {
          result.results[i].favorite = false;
        }
        MovieMapBody = MovieMapBody.set(
          result.results[i].id,
          result.results[i],
        );
        updateMap(result.results[i].id, result.results[i]);
      }
      setMovieMap(MovieMapBody);
    } catch (err) {
      console.log('Fetchproblem at CustomFlatList Url: ' + err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const saveFavorite = async (myMovies: ItmdbItem) => {
    const oldFavorites = await AsyncStorage.getItem(STORAGE_MOVIE_KEY);
    if (oldFavorites !== null) {
      flatlistMap = new Map<number, ItmdbItem>(JSON.parse(oldFavorites));
    }
    flatlistMap.set(myMovies.id, myMovies);
    if (myMovies !== null) {
      await AsyncStorage.setItem(
        STORAGE_MOVIE_KEY,
        JSON.stringify([...flatlistMap]),
      );
      console.log(`Movie saved: ${myMovies.title} \n `);
    }
  };

  const loadFavorites = async (): Promise<Map<number, ItmdbItem>> => {
    console.log('load HomePage Data...');
    const item = await AsyncStorage.getItem(STORAGE_MOVIE_KEY);
    if (item !== null) {
      flatlistMap = new Map<number, ItmdbItem>(JSON.parse(item));
      console.log(flatlistMap);
    }
    return flatlistMap;
  };

  const deleteFavorite = async (id: number) => {
    const item = await AsyncStorage.getItem(STORAGE_MOVIE_KEY);
    if (item !== null) {
      flatlistMap = new Map<number, ItmdbItem>(JSON.parse(item));
      flatlistMap.delete(id);
      await AsyncStorage.setItem(
        STORAGE_MOVIE_KEY,
        JSON.stringify([...flatlistMap]),
      );
    }
  };
  const RefreshFavoriteList = async () => {
    return flatlistMap;
  };
  useEffect(() => {
    RefreshFavoriteList();
  }, [saveFavorite, deleteFavorite]);

  useEffect(() => {
    fetchData();
  }, [fetchUrl]);

  const StoreOwnMovie = async (id: number) => {
    let favoriteMovieValues = _.cloneDeep(movieMap.get(id));
    if (favoriteMovieValues !== undefined) {
      favoriteMovieValues.favorite = !favoriteMovieValues.favorite;
      try {
        updateMap(id, favoriteMovieValues);
        if (favoriteMovieValues.favorite) {
          saveFavorite(favoriteMovieValues);
        } else {
          deleteFavorite(favoriteMovieValues.id);
        }
      } catch (err) {
        err.message;
      }
    }
  };
  const updateMap = (id: number, movieValues: ItmdbItem) => {
    setMovieMap(new Map<number, ItmdbItem>(movieMap.set(id, movieValues)));
  };

  const closeModal = () => {
    setShowDetails(false);
  };

  const openMovieDetails = async (movieID: number) => {
    setLoadingID(false);
    await tmdbGetById(movieID).then(async (result) => {
      await handleMovieDetails(result);
    });
    setLoadingID(true);
  };
  const handleMovieDetails = async (result: IMovieIDItem) => {
    setDetailMovie({selected: result});
    setShowDetails(true);
  };

  const TrendingList: ListRenderItem<ItmdbItem> = ({item}) => (
    <MovieLayout
      openDetails={() => openMovieDetails(item.id)}
      StoreFavoriteMovies={() => StoreOwnMovie(item.id)}
      item={item}
    />
  );
  return (
    <View style={styles.FlatlistContainer}>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <FlatList
            data={Array.from(movieMap.values())}
            keyExtractor={(movie, index) => `${movie.id}-${index}`}
            showsVerticalScrollIndicator={true}
            renderItem={TrendingList}
            keyboardShouldPersistTaps="always"
            initialNumToRender={4}
          />
          {loadingID ? (
            <MoviePopup
              item={detailMovie.selected}
              onPress={closeModal}
              visible={showDetails}
            />
          ) : (
            <></>
          )}
        </Fragment>
      )}
    </View>
  );
};
