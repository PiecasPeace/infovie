import React from 'react';
import {View, Image, Text, TouchableHighlight} from 'react-native';
import {WHITE} from '../../constants/Colors/colorpalette';
import {getLanguage} from '../../constants/Language/getLanguageFunction';
import {renderScore} from '../../constants/MovieScore/renderScore';
import {renderDivider} from '../../constants/RenderDivider/RenderDivider';
import {CustomButton} from '../CustomButton/CustomButton';
import {convertToYear} from '../utils/dates';
import {convertTypeWithGenre} from '../utils/genreFunctions';
import {getImageApi} from '../utils/Image';
import {IMovieLayoutInterface} from './IMovieLayoutInterface';
import {listStyle} from './renderItemStyles';

export const MovieLayout: React.FC<IMovieLayoutInterface> = ({
  openDetails,
  item,
  StoreFavoriteMovies,
}) => {
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
              onPress={() => StoreFavoriteMovies(item.id)}
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
