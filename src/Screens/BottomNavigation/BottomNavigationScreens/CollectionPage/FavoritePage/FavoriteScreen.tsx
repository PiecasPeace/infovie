import React, {Fragment, useState} from 'react';
import {ListRenderItem, ListRenderItemInfo, Text, View} from 'react-native';
import Spinner from '../../../../../components/Spinner/Spinner';
import {ItmdbItem} from '../../QRPage/Interfaces/IMovieInterface';
import {styles} from './styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FavoriteItem from './FavoriteItem/FavoriteItem';
import {CustomButton} from '../../../../../components/CustomButton/CustomButton';
import {WHITE} from '../../../../../constants/Colors/colorpalette';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SwipeListView} from 'react-native-swipe-list-view';
import _ from 'lodash';
import {
  loadFavorites,
  deleteFavorite,
} from '../../../../../constants/HandleAsyncStorage/HandleAS';
import {useFocusEffect} from '@react-navigation/native';
import {tmdbGetById} from '../../../../../constants/APICalls/APICallsTMDB';
import {IMovieIDItem} from '../../QRPage/Interfaces/IMovieByIDInterface';
import {MapState} from '../../HomePage/Flatlist/ICustomFlatListInterface';
import {MoviePopup} from '../../../../../components/MovieLayout/MoviePopup/MoviePopup';
import { IMovieByIDTVItem } from '../../QRPage/Interfaces/IMovieByIDTVInterface';

export const FavoriteScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [favoriteMap, setFavoriteMap] = useState<Map<number, ItmdbItem>>(
    new Map<number, ItmdbItem>(),
  );
  let flatlistMap = new Map<number, ItmdbItem>();

  const [showDetails, setShowDetails] = useState(false);
  const [loadingID, setLoadingID] = useState(false);
  const [detailMovie, setDetailMovie] = useState<MapState>({
    selected: {} as IMovieIDItem
  });

  const FetchFavoriteData = async () => {
    flatlistMap = await loadFavorites(flatlistMap);
    setFavoriteMap(flatlistMap);
    console.log(flatlistMap);
    setLoading(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      FetchFavoriteData();
    }, []),
  );

  const updateMap = (id: number, movieValues: ItmdbItem) => {
    setFavoriteMap(
      new Map<number, ItmdbItem>(favoriteMap.set(id, movieValues)),
    );
  };
  const closeRow = (rowMap: number, keyID: number) => {
    if (rowMap[keyID]) {
      rowMap[keyID].closeRow();
    }
  };

  const deleteMovie = async (id: number) => {
    flatlistMap = await deleteFavorite(id, flatlistMap);
    setFavoriteMap(flatlistMap);
  };

  const handleDeleteMovie = async (rowMap: any, keyID: number) => {
    closeRow(rowMap, keyID);
    let favoriteMovieValues = _.cloneDeep(favoriteMap.get(keyID));
    if (favoriteMovieValues !== undefined) {
      try {
        favoriteMovieValues.favorite = false;
        updateMap(keyID, favoriteMovieValues);
        deleteMovie(favoriteMovieValues.id);
      } catch (err) {
        err.message;
      }
    }
  };
  interface IDelete {
    onDelete: () => void;
    data: ListRenderItemInfo<ItmdbItem>;
    rowMap: number;
  }

  const HiddenItemWithActions = ({onDelete}: IDelete) => {
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
    setDetailMovie({selectedTV: result});
    setShowDetails(true);
  };

  const TrendingList: ListRenderItem<ItmdbItem> = ({item}) => (
    <FavoriteItem openDetails={() => openMovieDetails(item.id)} item={item} />
  );

  return (
    <View style={styles.favoritesContainer}>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <SwipeListView
            useFlatList={true}
            data={Array.from(favoriteMap.values())}
            renderItem={TrendingList}
            keyExtractor={(movie, index) => `${movie.id}-${index}`}
            renderHiddenItem={renderHiddenItem}
            leftOpenValue={0}
            rightOpenValue={-100}
            closeOnScroll={true}
            disableRightSwipe={true}
            directionalDistanceChangeThreshold={20}
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
