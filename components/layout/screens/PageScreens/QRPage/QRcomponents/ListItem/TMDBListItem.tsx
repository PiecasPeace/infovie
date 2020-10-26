import React from 'react';
import { View, Text, Image, TouchableHighlight, ListRenderItem, ListRenderItemInfo } from 'react-native';
import { getImageApi } from '../../../../../../utils/Image';
import { tmdbITEM, tmdbItemForFlatlist } from '../../utils/interface/MovieInterface';
import { ListItemstyles } from './styles';

export const renderItem: ListRenderItem<tmdbItemForFlatlist> = ({ item }) => (
    <TouchableHighlight
        key={item.id}
        onPress={() => item.onPress(item.id)}
    >
        <View style={ListItemstyles.resultMovie}>
            <Text style={ListItemstyles.headertext}>
                {item.title !== undefined ? item.title : item.original_title}
                {item.original_title !== undefined ? item.title : item.original_title}
            </Text>
            <Text>
                {/* {movie.overview} */}
            </Text>
            <Image
                source={getImageApi(item.poster_path)}
                defaultSource={
                    require('../../../../../../assets/images/not_found.png')
                }
                style={ListItemstyles.Images}
                resizeMode="cover"
            />
        </View>
    </TouchableHighlight>
);

// export default TMDBListItem;