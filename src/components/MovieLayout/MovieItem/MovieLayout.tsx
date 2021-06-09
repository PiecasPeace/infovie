import React from 'react';
import {View, Image, Text, TouchableHighlight} from 'react-native';
import {WHITE} from '../../../constants/Colors/colorpalette';
import { convertToYear } from '../../../constants/convert/convertToDates';
import {getLanguage} from '../../../constants/Language/getLanguageFunction';
import {renderScore} from '../../../constants/MovieScore/renderScore';
import {renderDivider} from '../../../constants/RenderDivider/RenderDivider';
import {CustomButton} from '../../CustomButton/CustomButton';
import {convertTypeWithGenre} from '../../utils/genreFunctions';
import {getImageApi} from '../../utils/Image';
import {IMovieLayoutInterface} from './IMovieLayoutInterface';
import {styles} from './styles';

export const MovieLayout: React.FC<IMovieLayoutInterface> = ({
  openDetails,
  StoreFavoriteMovies,
  item,
}: IMovieLayoutInterface) => {
  return (
    <TouchableHighlight key={item.id}>
      <View style={styles.containerItem}>
        <TouchableHighlight onPress={() => openDetails(item.id)}>
          <Image
            source={getImageApi(item.poster_path)}
            style={styles.photo}
            resizeMode="cover"
          />
        </TouchableHighlight>
        <View style={styles.item}>
          <View>
            <Text numberOfLines={2} style={styles.headertext}>
              {item.title !== undefined ? item.title : item.name}
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
            <Text numberOfLines={2} style={styles.textSmall}>
              {convertTypeWithGenre(item.genre_ids)}
            </Text>
          </View>
          <View>
            <View style={[styles.textRow, styles.containerReview]}>
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
                styles.favoriteButton,
                styles[item.favorite ? 'fav' : 'nonfav'],
              ]}
            />
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};
