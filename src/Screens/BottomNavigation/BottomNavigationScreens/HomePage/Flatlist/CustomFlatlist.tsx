import React, {
  useState,
  useEffect,
  Fragment,
  useContext,
  Component,
} from 'react';
import {
  FlatList,
  View,
  Text,
  Image,
  TouchableHighlight,
  ListRenderItem,
} from 'react-native';
import Spinner from '../../../../../components/Spinner/Spinner';
import {styles} from './styles';
import {getImageApi} from '../../../../../components/utils/Image';
import {ItmdbITEM, ItmdbJsonGET} from '../../QRPage/Interfaces/IMovieInterface';
import {convertToYear} from '../../../../../components/utils/dates';
import {convertTypeWithGenre} from '../../../../../components/utils/genreFunctions';
import {baseTMDBUrl} from '../../../../../constants/Shortcuts';
import {renderDivider} from '../../../../../constants/RenderDivider/RenderDivider';
import {getLanguage} from '../../../../../constants/Language/getLanguageFunction';
import {renderScore} from '../../../../../constants/MovieScore/renderScore';
import {CustomButton} from '../../../../../components/CustomButton/CustomButton';
import _ from 'lodash';
import AsyncStorage from '@react-native-community/async-storage';
import {
  FavoriteMapContext,
  STORAGE_MOVIE_KEY,
} from '../../../Context/ContextProvider';
import {WHITE} from '../../../../../constants/Colors/Colors';
import {ICustomFlatListProps} from './ICustomFlatListInterface';

export const CustomFlatlist: React.FC<ICustomFlatListProps> = ({
  fetchUrl,
}: ICustomFlatListProps) => {
  const [loading, setLoading] = useState(true);
  const [movieMap, setMovieMap] = useState<Map<number, ItmdbITEM>>(
    new Map<number, ItmdbITEM>(),
  );
  let ContextFavMap = useContext(FavoriteMapContext);

  const fetchData = async () => {
    let MovieMapBody = new Map<number, ItmdbITEM>();
    try {
      const request = await fetch(`${baseTMDBUrl}${fetchUrl}`);
      const result = (await request.json()) as ItmdbJsonGET;
      ContextFavMap = await loadFavorites();

      for (let i = 0; i < result.results.length; i++) {
        if (ContextFavMap.get(result.results[i].id) !== undefined) {
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

  const saveFavorite = async (myMovies: ItmdbITEM) => {
    const oldFavorites = await AsyncStorage.getItem(STORAGE_MOVIE_KEY);
    if (oldFavorites !== null) {
      ContextFavMap = new Map<number, ItmdbITEM>(JSON.parse(oldFavorites));
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

  const loadFavorites = async (): Promise<Map<number, ItmdbITEM>> => {
    console.log('load HomePage Data...');
    const item = await AsyncStorage.getItem(STORAGE_MOVIE_KEY);
    if (item !== null) {
      ContextFavMap = new Map<number, ItmdbITEM>(JSON.parse(item));
      console.log(ContextFavMap);
    }
    return ContextFavMap;
  };

  const deleteFavorite = async (id: number) => {
    const item = await AsyncStorage.getItem(STORAGE_MOVIE_KEY);
    if (item !== null) {
      ContextFavMap = new Map<number, ItmdbITEM>(JSON.parse(item));
      ContextFavMap.delete(id);
      await AsyncStorage.setItem(
        STORAGE_MOVIE_KEY,
        JSON.stringify([...ContextFavMap]),
      );
    }
  };
  const RefreshFavoriteList = async () => {
    return ContextFavMap;
  };
  useEffect(() => {
    RefreshFavoriteList();
  }, [saveFavorite, deleteFavorite]);

  useEffect(() => {
    fetchData();
  }, []);

  const StoreOwnMovie = async (id: number) => {
    let favoriteMovieValues = _.cloneDeep(movieMap.get(id));
    if (favoriteMovieValues !== undefined) {
      if (favoriteMovieValues.favorite === false) {
        try {
          favoriteMovieValues.favorite = true;
          updateMap(id, favoriteMovieValues);
          saveFavorite(favoriteMovieValues);
        } catch (err) {
          err.message;
        }
      } else {
        try {
          favoriteMovieValues.favorite = false;
          updateMap(id, favoriteMovieValues);
          deleteFavorite(favoriteMovieValues.id);
        } catch (err) {
          err.message;
        }
      }
    }
  };

  const updateMap = (id: number, movieValues: ItmdbITEM) => {
    setMovieMap(new Map<number, ItmdbITEM>(movieMap.set(id, movieValues)));
  };
  const TrendingList: ListRenderItem<ItmdbITEM> = ({item}) => (
    <TouchableHighlight key={item.id}>
      <View style={styles.containerItem}>
        <Image
          source={getImageApi(item.poster_path)}
          style={styles.photo}
          resizeMode="cover"
        />
        <View style={styles.item}>
          <View>
            <Text numberOfLines={2} style={styles.headertext}>
              {item.title}
            </Text>
            <View style={[styles.textRow, styles.containerSubTitle]}>
              <Text style={styles.textSmall}>
                {convertToYear(item.release_date)}
              </Text>
              {renderDivider(item.release_date, item.original_language)}
              <Text numberOfLines={1} style={styles.textSmall}>
                {getLanguage(item.original_language)}
              </Text>
            </View>
            <Text numberOfLines={1} style={styles.textSmall}>
              {convertTypeWithGenre(item.genre_ids)}
            </Text>
          </View>
          <View style={[styles.textRow, styles.containerReview]}>
            {renderScore(item.vote_average)}
          </View>
          <View>
            <CustomButton
              key={item.id}
              Text={item.favorite ? 'Unfavorite' : 'Favorite'}
              color={item.favorite ? WHITE : WHITE}
              mode="outlined"
              icon={item.favorite ? 'heart-outline' : 'heart'}
              onPress={() => StoreOwnMovie(item.id)}
              style={[
                styles.favoriteButton,
                styles[item.favorite ? 'fav' : 'nonfav'],
              ]}
            />
          </View>
        </View>
      </View>
    </TouchableHighlight>
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
            // horizontal={true}
          />
        </Fragment>
      )}
    </View>
  );
};
