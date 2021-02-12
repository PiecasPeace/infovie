import React from 'react';
import {
  Image,
  ListRenderItem,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {convertToYear} from '../../../../../../components/utils/dates';
import {getImageApi} from '../../../../../../components/utils/Image';
import {getLanguage} from '../../../../../../constants/Language/getLanguageFunction';
import {renderDivider} from '../../../../../../constants/RenderDivider/RenderDivider';
import {ItmdbITEM} from '../../../QRPage/Interfaces/IMovieInterface';
import {styles} from './styles';

const FavoriteItem: ListRenderItem<ItmdbITEM> = ({item}) => {  
  return (
    <TouchableHighlight key={item.id} style={styles.swipeContainer}>
      <View style={styles.container}>
        <Image
          source={getImageApi(item.backdrop_path)}
          style={styles.BackDropPhoto}
          resizeMode="cover"
        />
        <View style={styles.subContainer}>
          <Text numberOfLines={2} style={styles.title}>
            {item.title !== undefined ? item.title : item.name}
          </Text>
          <View style={[styles.textRow, styles.containerSubTitles]}>
            <Text style={styles.year}>{convertToYear(item.release_date)}</Text>
            {renderDivider(item.release_date, item.original_language)}
            <Text numberOfLines={1} style={styles.language}>
              {getLanguage(item.original_language)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};
export default FavoriteItem;
