import AsyncStorage from '@react-native-community/async-storage';
import _ from 'lodash';
import React, {useState} from 'react';
import {View, Image, Text} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {WHITE} from '../../constants/Colors/colorpalette';
import {getLanguage} from '../../constants/Language/getLanguageFunction';
import {renderScore} from '../../constants/MovieScore/renderScore';
import {renderDivider} from '../../constants/RenderDivider/RenderDivider';
import {ItmdbItem} from '../../Screens/BottomNavigation/BottomNavigationScreens/QRPage/Interfaces/IMovieInterface';
import {STORAGE_MOVIE_KEY} from '../../Screens/BottomNavigation/Context/ContextProvider';
import {CustomButton} from '../CustomButton/CustomButton';
import {IMovieLayoutInterface} from '../MovieLayout/IMovieLayoutInterface';
import {listStyle} from '../MovieLayout/renderItemStyles';
import {convertToYear} from '../utils/dates';
import {convertTypeWithGenre} from '../utils/genreFunctions';
import {getImageApi} from '../utils/Image';

export const HandleStoring: React.FC<IMovieLayoutInterface> = ({
  openDetails,
  item,
  FavoriteMap,
  BarcodeMap,
}) => {
  const [barcodeMovie, setBarcodeMovie] = useState<Map<number, ItmdbItem>>(
    new Map<number, ItmdbItem>(),
  );

  const saveFavoriteMovie = async (myMovies: ItmdbItem) => {
    const oldFavorites = await AsyncStorage.getItem(STORAGE_MOVIE_KEY);
    if (oldFavorites !== null) {
      FavoriteMap = new Map<number, ItmdbItem>(JSON.parse(oldFavorites));
    }
    FavoriteMap.set(myMovies.id, myMovies);
    if (myMovies !== null) {
      await AsyncStorage.setItem(
        STORAGE_MOVIE_KEY,
        JSON.stringify([...FavoriteMap]),
      );
      console.log(`Movie saved gagaga: ${myMovies.title} \n `);
    }
  };

  const deleteFavoriteMovie = async (id: number) => {
    const item = await AsyncStorage.getItem(STORAGE_MOVIE_KEY);
    if (item !== null) {
      FavoriteMap = new Map<number, ItmdbItem>(JSON.parse(item));
      FavoriteMap.delete(id);
      await AsyncStorage.setItem(
        STORAGE_MOVIE_KEY,
        JSON.stringify([...FavoriteMap]),
      );
      console.log(`Movie deleted: ${id} \n `);
    }
  };
  const updateMap = (id: number, movieValues: ItmdbItem) => {
    setBarcodeMovie(
      new Map<number, ItmdbItem>(BarcodeMap.set(id, movieValues)),
    );
  };

  const StoreOwnMovie = async (id: number) => {
    let favoriteMovieValues = _.cloneDeep(BarcodeMap.get(id));
    if (favoriteMovieValues !== undefined) {
      favoriteMovieValues.favorite = !favoriteMovieValues.favorite;
      try {
        updateMap(id, favoriteMovieValues);
        if (favoriteMovieValues.favorite) {
          saveFavoriteMovie(favoriteMovieValues);
        } else {
          deleteFavoriteMovie(favoriteMovieValues.id);
        }
      } catch (err) {
        err.message;
      }
    }
  };
  FavoriteMap;
  return (
    <TouchableHighlight key={item.id} onPress={() => openDetails(item.id)}>
      <View style={listStyle.containerItem}>
        <Image
          source={getImageApi(item.poster_path)}
          style={listStyle.photo}
          resizeMode="cover"
        />
        <View style={listStyle.item}>
          <View>
            <Text numberOfLines={2} style={listStyle.headertext}>
              {item.title !== undefined ? item.title : item.name}
            </Text>
            <View style={[listStyle.textRow, listStyle.containerSubTitle]}>
              <Text style={listStyle.textSmall}>
                {convertToYear(item.release_date)}
              </Text>
              {renderDivider(item.release_date, item.original_language)}
              <Text numberOfLines={1} style={listStyle.textSmall}>
                {getLanguage(item.original_language)}
              </Text>
            </View>
            <Text numberOfLines={2} style={listStyle.textSmall}>
              {convertTypeWithGenre(item.genre_ids)}
            </Text>
          </View>
          <View>
            <View style={[listStyle.textRow, listStyle.containerReview]}>
              {renderScore(item.vote_average)}
            </View>
            <CustomButton
              key={item.id}
              Text={item.favorite ? 'Unfavorite' : 'Favorite'}
              color={item.favorite ? WHITE : WHITE}
              mode="outlined"
              icon={item.favorite ? 'heart-outline' : 'heart'}
              onPress={() => StoreOwnMovie(item.id)}
              style={[
                listStyle.favoriteButton,
                listStyle[item.favorite ? 'fav' : 'nonfav'],
              ]}
            />
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};
