import React, {useState, useEffect, Fragment} from 'react';
import {
  FlatList,
  View,
  Text,
  Image,
  TouchableHighlight,
  ListRenderItem,
} from 'react-native';
import Spinner from '../../../components/Spinner/Spinner';
import {styles} from './styles';
import {getImageApi} from '../../../components/utils/Image';
import {tmdbITEM, tmdbJsonGET} from '../../QRPage/Interfaces/IMovieInterface';
import {convertToYear} from '../../../components/utils/dates';
import {convertTypeWithGenre} from '../../../components/utils/genreFunctions';
import {baseTMDBUrl} from '../../../constants/Shortcuts';
import {renderDivider} from '../../../constants/RenderDivider/RenderDivider';
import {getLanguage} from '../../../constants/Language/getLanguageFunction';
import {renderScore} from '../../../constants/MovieScore/renderScore';
import {CustomButton} from '../../../components/CustomButton/CustomButton';

interface ICustomFlatListProps {
  fetchUrl: string;
}

export const CustomFlatlist: React.FC<ICustomFlatListProps> = ({
  fetchUrl,
}: ICustomFlatListProps) => {
  const [movies, setMovies] = useState<tmdbITEM[]>([]);
  const [loading, setLoading] = useState(true);
  const [Favorite, setFavorite] = useState(false);
  const [ButtonState, setButtonChange] = useState<tmdbITEM[]>([]);
  const [movieMap, setMovieMap] = useState<Map<number, tmdbITEM>>();

  useEffect(() => {
    const fetchData = async (): Promise<tmdbJsonGET> => {
      let MovieMapBody = new Map<number, tmdbITEM>();
      try {
        const request = await fetch(`${baseTMDBUrl}${fetchUrl}`);
        const result = (await request.json()) as tmdbJsonGET;
        for (let i = 0; i < result.results.length; i++) {
          result.results[i].favorite = false;
        }
        for (let i = 0; i < result.results.length; i++) {
          MovieMapBody = MovieMapBody.set(
            result.results[i].id,
            result.results[i],
          );
          // console.log(MovieMap.get(result.results[i].id));
        }
        setMovieMap(MovieMapBody);

        for (let [key, value] of MovieMapBody.entries()) {
          // console.log(key);
          // console.log(value);
        }

        setMovies(result.results);
        return result;
      } catch (err) {
        console.log('Fetchproblem at CustomFlatList Url: ' + err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [fetchUrl]);

  const favColor = Favorite ? 'fav' : 'notfav';
  const AddFavoriteMovie = (id: number) => {
    let getMovieMapBody = movieMap?.get(id);
    if (getMovieMapBody !== undefined) {
      console.log('before add: ');
      console.log(getMovieMapBody.favorite)
      setFavorite((getMovieMapBody.favorite = true));
      console.log('after add: ');
      console.log(getMovieMapBody.favorite)
      console.log("------------------------------------------")
    }
  };
  const RemoveFavoriteMovie = (id: number) => {
    let getMovieMapBody = movieMap?.get(id);
    if (getMovieMapBody !== undefined) {
      console.log("before remove:")
      console.log(getMovieMapBody.favorite)
      setFavorite((getMovieMapBody.favorite = false));
      console.log("after remove:")
      console.log(getMovieMapBody.favorite)
      console.log("------------------------------------------")
    }
  };
  const handleFavoriteMovie = (id:number) => {
    !Favorite ? AddFavoriteMovie(id) : RemoveFavoriteMovie(id);
    console.log(id)
  }
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
          <View style={[styles.textRow, styles.containerReview]}>
            {renderScore(item.vote_average)}
          </View>
          <View>
            <CustomButton
              key={item.id}
              Text={Favorite ? 'favorised' : 'add fav'}
              color="white"
              mode="outlined"
              icon="heart"
              onPress={() => handleFavoriteMovie(item.id)}
              style={[styles.favoriteButton, styles[favColor]]}
            />
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );

  const isLoading = () => {
    if (loading) {
      return <Spinner />;
    }
  };

  return (
    <View style={styles.FlatlistContainer}>
      {isLoading && (
        <Fragment>
          <FlatList
            data={movies}
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
