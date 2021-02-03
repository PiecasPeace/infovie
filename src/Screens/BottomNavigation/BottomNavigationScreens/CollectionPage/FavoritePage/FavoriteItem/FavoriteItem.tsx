import React from 'react';
import {
  Image,
  ListRenderItem,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {getImageApi} from '../../../../../../components/utils/Image';
import {ItmdbITEM} from '../../../QRPage/Interfaces/IMovieInterface';
import {style} from './styles';

export const FavoriteItem: ListRenderItem<ItmdbITEM> = ({item}) => {
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
        </View>
      </View>
    </TouchableHighlight>
  );
};
