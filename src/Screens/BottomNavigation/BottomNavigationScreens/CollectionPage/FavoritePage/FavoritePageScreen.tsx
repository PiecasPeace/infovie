import React, {Fragment, useEffect, useState, useContext} from 'react';
import {ListRenderItemInfo, Text, View} from 'react-native';
import Spinner from '../../../../../components/Spinner/Spinner';
import {
  FavoriteMapContext,
  STORAGE_MOVIE_KEY,
} from '../../../Context/ContextProvider';
import {ItmdbItem} from '../../QRPage/Interfaces/IMovieInterface';
import {styles} from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FavoriteItem from './FavoriteItem/FavoriteItem';
import {CustomButton} from '../../../../../components/CustomButton/CustomButton';
import {WHITE} from '../../../../../constants/Colors/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SwipeListView} from 'react-native-swipe-list-view';
import _ from 'lodash';

export const FavoritePageScreen: React.FC = ({navigation}: any) => {
  let ContextFavMap = useContext(FavoriteMapContext);
  const [loading, setLoading] = useState(true);
  const [favoriteMap, setFavoriteMap] = useState<Map<number, ItmdbItem>>(
    new Map<number, ItmdbItem>(),
  );
  const FetchFavoriteData = async () => {
    ContextFavMap = await loadFavoriteData();
    setFavoriteMap(ContextFavMap);
    console.log(ContextFavMap);
  };

  const loadFavoriteData = async (): Promise<Map<number, ItmdbItem>> => {
    console.log('Loading Favorite list...');
    const FavoriteItem = await AsyncStorage.getItem(STORAGE_MOVIE_KEY);
    if (FavoriteItem !== null) {
      ContextFavMap = new Map<number, ItmdbItem>(JSON.parse(FavoriteItem));
    }
    setLoading(false);
    return ContextFavMap;
  };

  const deleteFavoriteMovie = async (id: number) => {
    const item = await AsyncStorage.getItem(STORAGE_MOVIE_KEY);
    if (item !== null) {
      ContextFavMap = new Map<number, ItmdbItem>(JSON.parse(item));
      ContextFavMap.delete(id);
      await AsyncStorage.setItem(
        STORAGE_MOVIE_KEY,
        JSON.stringify([...ContextFavMap]),
      );
      setFavoriteMap(ContextFavMap);
    }
  };
  const updateMap = (id: number, movieValues: ItmdbItem) => {
    setFavoriteMap(
      new Map<number, ItmdbItem>(favoriteMap.set(id, movieValues)),
    );
  };
  const closeRow = (rowMap, keyID) => {
    if (rowMap[keyID]) {
      rowMap[keyID].closeRow();
    }
  };
  const handleDeleteMovie = async (rowMap: any, keyID: number) => {
    closeRow(rowMap, keyID);
    let favoriteMovieValues = _.cloneDeep(favoriteMap.get(keyID));
    if (favoriteMovieValues !== undefined) {
      try {
        favoriteMovieValues.favorite = false;
        updateMap(keyID, favoriteMovieValues);
        deleteFavoriteMovie(favoriteMovieValues.id);
      } catch (err) {
        err.message;
      }
    }
  };

  useEffect(() => {
    FetchFavoriteData();
  }, [ContextFavMap, FavoriteMapContext]);

  const HiddenItemWithActions = (props) => {
    const {onDelete} = props;
    return (
      <View style={styles.rowBack}>
        <Text>Left</Text>
        <TouchableOpacity onPress={onDelete} style={styles.deleteOpacity}>
          <MaterialCommunityIcons
            name="trash-can-outline"
            color={WHITE}
            size={40}
          />
        </TouchableOpacity>
      </View>
    );
  };
  const renderHiddenItem = (
    data: ListRenderItemInfo<ItmdbItem>,
    rowMap: any,
  ) => {
    return (
      <HiddenItemWithActions
        data={data}
        rowMap={rowMap}
        onDelete={() => handleDeleteMovie(rowMap, data.item.id)}
      />
    );
  };

  return (
    <View style={styles.favoritesContainer}>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <CustomButton
            color={WHITE}
            icon={'autorenew'}
            mode={'outlined'}
            onPress={() => FetchFavoriteData()}
            Text={'Refresh List'}
          />
          <SwipeListView
            useFlatList={true}
            data={Array.from(favoriteMap.values())}
            renderItem={FavoriteItem}
            keyExtractor={(movie, index) => `${movie.id}-${index}`}
            renderHiddenItem={renderHiddenItem}
            leftOpenValue={0}
            rightOpenValue={-100}
            closeOnScroll={true}
            disableRightSwipe={true}
            directionalDistanceChangeThreshold={20}
          />
        </Fragment>
      )}
    </View>
  );
};
