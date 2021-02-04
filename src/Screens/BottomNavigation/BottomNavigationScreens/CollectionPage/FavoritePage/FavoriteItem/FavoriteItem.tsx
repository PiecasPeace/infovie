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
import {renderScore} from '../../../../../../constants/MovieScore/renderScore';
import {renderDivider} from '../../../../../../constants/RenderDivider/RenderDivider';
import {ItmdbITEM} from '../../../QRPage/Interfaces/IMovieInterface';
import {style} from './styles';

const FavoriteItem: ListRenderItem<ItmdbITEM> = ({item}) => {
  return (
    <TouchableHighlight key={item.id}>
      <View style={style.container}>
        <Image
          source={getImageApi(item.backdrop_path)}
          style={style.BackDropPhoto}
          resizeMode="cover"
        />
        <View style={style.subContainer}>
            <Text numberOfLines={2} style={style.title}>
              {item.title}
            </Text>
            <View style={[style.textRow, style.containerSubTitles]}>
              <Text style={style.year}>{convertToYear(item.release_date)}</Text>
              {renderDivider(item.release_date, item.original_language)}
              <Text numberOfLines={1} style={style.language}>
                {getLanguage(item.original_language)}
              </Text>
            </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};
export default FavoriteItem;
