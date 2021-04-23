import React, {useState, Fragment} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {FlatList, View, ListRenderItem} from 'react-native';
import Spinner from '../../../../../components/Spinner/Spinner';
import {styles} from './styles';
import {ItmdbItem, ItmdbJsonGET} from '../../QRPage/Interfaces/IMovieInterface';
import {baseTMDBUrl} from '../../../../../constants/Shortcuts';
import _ from 'lodash';
import {
  ICustomFlatListProps,
  MapState,
  MapStateTV,
} from './ICustomFlatListInterface';
import {MovieLayout} from '../../../../../components/MovieLayout/MovieItem/MovieLayout';
import {
  tmdbGetById,
  tmdbGetByIdTV,
} from '../../../../../constants/APICalls/APICallsTMDB';
import {IMovieIDItem} from '../../QRPage/Interfaces/IMovieByIDInterface';
import {MoviePopup} from '../../../../../components/MovieLayout/MoviePopup/MoviePopup';
import {
  loadFavorites,
  handleMovies,
} from '../../../../../constants/HandleAsyncStorage/HandleAS';
import {IMovieByIDTVItem} from '../../QRPage/Interfaces/IMovieByIDTVInterface';
import {TVSeriesPopup} from '../../../../../components/MovieLayout/TVSeriesPopup/TVSeriesPopup';

export const CustomFlatlist: React.FC<ICustomFlatListProps> = ({
  fetchUrl,
}: ICustomFlatListProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const [loadingID, setLoadingID] = useState(false);
  const [loadingTVSeries, setloadingTVSeries] = useState(false);
  const [loading, setLoading] = useState(true);
  const [detailMovie, setDetailMovie] = useState<MapState>({
    selected: {} as IMovieIDItem,
  });
  const [detailMovieTV, setDetailMovieTV] = useState<MapStateTV>({
    selected: {} as IMovieByIDTVItem,
  });

  const [movieMap, setMovieMap] = useState<Map<number, ItmdbItem>>(
    new Map<number, ItmdbItem>(),
  );

  let favoriteMap = new Map<number, ItmdbItem>();

  const fetchData = async () => {
    setLoading(true);
    let MovieMapBody = new Map<number, ItmdbItem>();
    try {
      const request = await fetch(`${baseTMDBUrl}${fetchUrl}`);
      const result = (await request.json()) as ItmdbJsonGET;
      favoriteMap = await loadFavorites(favoriteMap);
      for (let i = 0; i < result.results.length; i++) {
        if (favoriteMap.get(result.results[i].id) !== undefined) {
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

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [fetchUrl]),
  );

  const updateMap = (id: number, movieValues: ItmdbItem) => {
    setMovieMap(new Map<number, ItmdbItem>(movieMap.set(id, movieValues)));
  };

  const closeModal = () => {
    setShowDetails(false);
  };

  const openMovieDetails = async (movieID: number) => {
    setLoadingID(false);
    setloadingTVSeries(false);
    try {
      await tmdbGetById(movieID).then(async (result) => {
        if (result.success === false) {
          await tmdbGetByIdTV(movieID).then(async (result) => {
            await handleTVDetails(result);
            setloadingTVSeries(true);
          });
        } else {
          await handleMovieDetails(result);
          setLoadingID(true);
        }
      });
    } catch (err) {
      console.log('Error at MovieDetailOpen');
      throw err;
    }
  };
  const handleMovieDetails = async (result: IMovieIDItem) => {
    setDetailMovie({selected: result});
    setShowDetails(true);
  };
  const handleTVDetails = async (result: IMovieByIDTVItem) => {
    setDetailMovieTV({selected: result});
    setShowDetails(true);
  };

  const TrendingList: ListRenderItem<ItmdbItem> = ({item}) => (
    <MovieLayout
      openDetails={() => openMovieDetails(item.id)}
      StoreFavoriteMovies={() =>
        handleMovies(item.id, movieMap, favoriteMap, updateMap)
      }
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
          {loadingTVSeries ? (
            <TVSeriesPopup
              item={detailMovieTV.selected}
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
