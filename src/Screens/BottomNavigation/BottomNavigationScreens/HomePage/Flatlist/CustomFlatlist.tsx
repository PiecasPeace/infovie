import React, {useState, useEffect, Fragment} from 'react';
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
import {tmdbITEM, tmdbJsonGET} from '../../QRPage/Interfaces/IMovieInterface';
import {convertToYear} from '../../../../../components/utils/dates';
import {convertTypeWithGenre} from '../../../../../components/utils/genreFunctions';
import {baseTMDBUrl} from '../../../../../constants/Shortcuts';
import {renderDivider} from '../../../../../constants/RenderDivider/RenderDivider';
import {getLanguage} from '../../../../../constants/Language/getLanguageFunction';
import {renderScore} from '../../../../../constants/MovieScore/renderScore';
import {CustomButton} from '../../../../../components/CustomButton/CustomButton';
import _ from 'lodash';
import AsyncStorage from '@react-native-community/async-storage';

interface ICustomFlatListProps {
  fetchUrl: string;
}
const STORAGE_MOVIE = '@save_movie';

export const CustomFlatlist: React.FC<ICustomFlatListProps> = ({
  fetchUrl,
}: ICustomFlatListProps) => {
  const [loading, setLoading] = useState(true);
  const [movieMap, setMovieMap] = useState<Map<number, tmdbITEM>>(
    new Map<number, tmdbITEM>(),
  );
  const fetchData = async () => {
    let MovieMapBody = new Map<number, tmdbITEM>();
    try {
      const request = await fetch(`${baseTMDBUrl}${fetchUrl}`);
      const result = (await request.json()) as tmdbJsonGET;
      for (let i = 0; i < result.results.length; i++) {
        result.results[i].favorite === true
          ? (result.results[i].favorite = true)
          : (result.results[i].favorite = false);
      }

      for (let i = 0; i < result.results.length; i++) {
        MovieMapBody = MovieMapBody.set(
          result.results[i].id,
          result.results[i],
        );
      }
      setMovieMap(MovieMapBody);
    } catch (err) {
      console.log('Fetchproblem at CustomFlatList Url: ' + err.message);
      throw err;
    } finally {
      setLoading(false);
    }
    // const myExistingFavoriteMovies = await AsyncStorage.getItem(STORAGE_MOVIE);
    // for (let i = 0; i < STORAGE_MOVIE.length; i++) {
    //   STORAGE_MOVIE[i];
    //   console.log('my existing favorite movies:');
    //   console.log(myExistingFavoriteMovies);
    //   if (myExistingFavoriteMovies !== null) {
    //     console.log(STORAGE_MOVIE.length);
    //   }
    // }
  };
  const saveData = async (myMovies: any) => {
    console.log('Save Movie...');
    await AsyncStorage.setItem(STORAGE_MOVIE, JSON.stringify({myMovies}));
    console.log('Movie saved: \n ');
  };
  const loadData = () => {
    console.log('load Data...');
    let data = AsyncStorage.getItem(STORAGE_MOVIE);
    console.log('data loaded: \n ' + data);
  };

  useEffect(() => {
    loadData();
    fetchData();
  }, [fetchUrl]);

  const StoreFavoriteMovie = async (id: number) => {
    let favoriteMovieValues = _.cloneDeep(movieMap.get(id));
    if (favoriteMovieValues !== undefined) {
      if (favoriteMovieValues.favorite === false) {
        try {
          favoriteMovieValues.favorite = true;
          updateMap(id, favoriteMovieValues);
          saveData(favoriteMovieValues);
        } catch (err) {
          err.message;
        }
      } else {
        try {
          favoriteMovieValues.favorite = false;
          updateMap(id, favoriteMovieValues);
          await AsyncStorage.removeItem(`${favoriteMovieValues.id}`);
        } catch (err) {
          err.message;
        }
      }
    }
  };

  const updateMap = (id: number, movieValues: tmdbITEM) => {
    setMovieMap(new Map<number, tmdbITEM>(movieMap.set(id, movieValues)));
  };
  const TrendingList: ListRenderItem<tmdbITEM> = ({item}) => (
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

          <View>
            <View style={[styles.textRow, styles.containerReview]}>
              {renderScore(item.vote_average)}
            </View>
            <CustomButton
              key={item.id}
              Text={item.favorite ? 'in your list' : 'save movie'}
              color="white"
              mode="outlined"
              icon="cart"
              onPress={() => StoreFavoriteMovie(item.id)}
              style={[
                styles.favoriteButton,
                styles[item.favorite ? 'fav' : 'notfav'],
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
          />
        </Fragment>
      )}
    </View>
  );
};
