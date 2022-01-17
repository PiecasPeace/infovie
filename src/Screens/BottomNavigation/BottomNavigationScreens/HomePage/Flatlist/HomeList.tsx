import React, {useState, Fragment} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {FlatList, View, ListRenderItem} from 'react-native';
import Spinner from '../../../../../components/Spinner/Spinner';
import {styles} from './styles';
import {
  ItmdbItem,
  ItmdbJsonGET,
} from '../../../../../constants/Interfaces/IMovieInterface';
import {baseTMDBUrl} from '../../../../../constants/Shortcuts';
import _ from 'lodash';
import {IHomeListProps} from './IHomeListProps';
import {MovieLayout} from '../../../../../components/MovieLayout/MovieItem/MovieLayout';
import {
  loadFavorites,
  handleMovies,
} from '../../../../../constants/HandleAsyncStorage/HandleAS';

export const HomeList: React.FC<IHomeListProps> = ({
  fetchUrl,
  navigation,
}: IHomeListProps) => {
  const [loading, setLoading] = useState(true);
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
    } catch (error) {
      console.log('Fetchproblem at CustomFlatList');
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

  // const openMovieDetails = async (movieID: number) => {
  //   setLoadingID(false);
  //   setloadingTVSeries(false);
  //   try {
  //     await tmdbGetById(movieID).then(async (result) => {
  //       await navigation.navigate('MovieDetailScreen', {id: movieID});
  //       setLoadingID(true);
  //     });
  //   } catch (err) {
  //     console.log('Error at MovieDetailOpen');
  //     throw err;
  //   }
  // };
  const TrendingList: ListRenderItem<ItmdbItem> = ({item}) => (
    <MovieLayout
      openDetails={() => navigation.navigate('MovieDetails', {id: item.id})}
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
        </Fragment>
      )}
    </View>
  );
};
