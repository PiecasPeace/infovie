import React, {Fragment, useState} from 'react';
import {ListRenderItem, ListRenderItemInfo, Text, View} from 'react-native';
import Spinner from '../../../../../components/Spinner/Spinner';
import {ItmdbItem} from '../../../../../constants/Interfaces/IMovieInterface';
import {styles} from './styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FavoriteItem from './FavoriteItem/FavoriteItem';
import {CustomButton} from '../../../../../components/blueprints/CustomButton/CustomButton';
import {WHITE} from '../../../../../constants/Colors/colorpalette';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {RowMap, SwipeListView} from 'react-native-swipe-list-view';
import _ from 'lodash';
import {
  loadFavorites,
  deleteFavorite,
} from '../../../../../constants/HandleAsyncStorage/HandleAS';
import {useFocusEffect} from '@react-navigation/native';
import {
  tmdbGetById,
  tmdbGetByIdTV,
} from '../../../../../constants/services/APICallsTMDB';
import {IMovieIDInterface} from '../../../../../constants/Interfaces/IMovieByIDInterface';
import {
  MapState,
  MapStateTV,
} from '../../HomePage/Flatlist/IHomeListProps';
import {MovieDetails} from '../../../../../components/MovieLayout/MovieDetail/MovieDetails';
import {IMovieIDTVInterface} from '../../../../../constants/Interfaces/IMovieByIDTVInterface';
import {TVSeriesPopup} from '../../../../../components/MovieLayout/TVSeriesPopup/TVSeriesPopup';

export const FavoriteScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [favoriteMap, setFavoriteMap] = useState<Map<number, ItmdbItem>>(
    new Map<number, ItmdbItem>(),
  );
  let flatlistMap = new Map<number, ItmdbItem>();

  const [showDetails, setShowDetails] = useState(false);
  const [loadingID, setLoadingID] = useState(false);
  const [loadingTV, setLoadingTV] = useState(false);
  const [detailMovie, setDetailMovie] = useState<MapState>({
    selected: {} as IMovieIDInterface,
  });
  const [detailMovieTV, setDetailMovieTV] = useState<MapStateTV>({
    selected: {} as IMovieIDTVInterface,
  });

  const FetchFavoriteData = async () => {
    flatlistMap = await loadFavorites(flatlistMap);
    setFavoriteMap(flatlistMap);
    // console.log(flatlistMap);
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
  const closeRow = (rowMap: RowMap<ItmdbItem>, keyID: number) => {
    if (rowMap[keyID]) {
      rowMap[keyID].closeRow();
    }
  };

  const deleteMovie = async (id: number) => {
    flatlistMap = await deleteFavorite(id, flatlistMap);
    setFavoriteMap(flatlistMap);
  };

  const handleDeleteMovie = async (rowMap: RowMap<ItmdbItem>, keyID: number) => {
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
    rowMap: RowMap<ItmdbItem>;
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
    rowMap: RowMap<ItmdbItem>,
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
    setLoadingTV(false);
    try {
      await tmdbGetById(movieID).then(async (result) => {
        if (result.success === false) {
          await tmdbGetByIdTV(movieID).then(async (result) => {
            await handleTVDetails(result);
            setLoadingTV(true);
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

  const handleMovieDetails = async (result: IMovieIDInterface) => {
    setDetailMovie({selected: result});
    setShowDetails(true);
  };
  const handleTVDetails = async (result: IMovieIDTVInterface) => {
    setDetailMovieTV({selected: result});
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
          {/* {loadingID ? (
            <MoviePopup
              item={detailMovie.selected}
              onPress={closeModal}
              visible={showDetails}
            />
          ) : (
            <></>
          )} */}
          {loadingTV ? (
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
