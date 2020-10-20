import React from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
// import { TouchableHighlight } from 'react-native-gesture-handler';
import { getImageApi } from '../../../../../utils/images';
import { styles } from './styles';

const TMDBListItem = (movie: any) => {
    return (
        <TouchableHighlight
            key={movie.tmdbID2}
        >
            <View style={styles.resultMovie}>
                <Text style={styles.headertext}>
                    {movie.title !== undefined ? movie.title : movie.original_title}
                    {movie.name !== undefined ? movie.name : movie.original_name}
                </Text>
                <Text>
                    {movie.description}
                </Text>
                <Image
                    source={getImageApi(movie.poster_path)}
                    defaultSource={
                        require('../../../../../assets/images/not_found.png')
                    }
                    style={styles.Images}
                    resizeMode="cover"
                />
            </View>
        </TouchableHighlight>
    )
}

export default TMDBListItem;