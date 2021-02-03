import React, {Fragment, useEffect, useState, useContext} from 'react';
import {View} from 'react-native';
import Spinner from '../../../../../components/Spinner/Spinner';
import {
  FavoriteMapContext,
  STORAGE_MOVIE_KEY,
} from '../../../Context/ContextProvider';
import {ItmdbITEM} from '../../QRPage/Interfaces/IMovieInterface';
import {styles} from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import {FlatList} from 'react-native-gesture-handler';
import {FavoriteItem} from './FavoriteItem/FavoriteItem';
import {CustomButton} from '../../../../../components/CustomButton/CustomButton';
import {PINK, WHITE} from '../../../../../constants/Colors/Colors';

export const FavoritePageScreen: React.FC = ({navigation}: any) => {
  let ContextFavMap = useContext(FavoriteMapContext);

  const [loading, setLoading] = useState(true);
  const [favoriteMap, setFavoriteMap] = useState<Map<number, ItmdbITEM>>(
    new Map<number, ItmdbITEM>(),
  );

  const FetchFavoriteData = async () => {
    ContextFavMap = await loadFavoriteData();
    setFavoriteMap(ContextFavMap);
  };

  useEffect(() => {
    FetchFavoriteData();
  }, []);

  const loadFavoriteData = async (): Promise<Map<number, ItmdbITEM>> => {
    console.log('Loading Favorite list...');
    const FavoriteItem = await AsyncStorage.getItem(STORAGE_MOVIE_KEY);
    if (FavoriteItem !== null) {
      ContextFavMap = new Map<number, ItmdbITEM>(JSON.parse(FavoriteItem));
    }
    setLoading(false);
    return ContextFavMap;
  };

  return (
    <View style={styles.favoritesContainer}>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <CustomButton
            color={WHITE}
            mode={'outlined'}
            onPress={() => FetchFavoriteData()}
            Text={'Refresh List'}
          />
          <FlatList
            data={Array.from(favoriteMap.values())}
            keyExtractor={(movie, index) => `${movie.id}-${index}`}
            keyboardShouldPersistTaps="always"
            renderItem={FavoriteItem}
            initialNumToRender={6}
          />
        </Fragment>
      )}
      <View style={styles.collectionItems}>
        <CustomButton
          Text="Go back to Home"
          color={PINK}
          mode="outlined"
          style={{}}
          onPress={() => navigation.navigate('Collection')}
        />
      </View>
    </View>
  );
};
