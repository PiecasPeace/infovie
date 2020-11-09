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
import {convertToYear} from '../../../components/utils/Dates';
import {convertTypeWithGenre} from '../../../components/utils/genre';
import {baseTMDBUrl} from '../../../constants/Shortcuts';
import {renderDivider} from '../../../constants/RenderDivider/RenderDivider';
import {getLanguage} from '../../../constants/Language/getLanguageFunction';
import {renderScore} from '../../../constants/MovieScore/renderScore';
import {CustomButton} from '../../../components/CustomButton/CustomButton';
import {DARK_PINK, WHITE} from '../../../constants/Colors';

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

  useEffect(() => {
    const fetchData = async (): Promise<tmdbJsonGET> => {
      try {
        const request = await fetch(`${baseTMDBUrl}${fetchUrl}`);
        const result = (await request.json()) as tmdbJsonGET;
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
  const handleFav = () => {
    Favorite ? setFavorite(false) : setFavorite(true);
    // setButtonChange(item.id);
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
              onPress={handleFav}
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
