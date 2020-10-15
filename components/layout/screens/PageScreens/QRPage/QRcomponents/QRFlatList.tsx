import React, { Fragment } from 'react';
import { FlatList } from 'react-native';
import TMDBListItem from './TMDBListItem';

const QRFlatList = ({ data }) => {
    return (
        <Fragment>
            <FlatList
                data={data}
                keyExtractor={(movie, index) => `${movie.tmdbID2}-${index}`}
                showsVerticalScrollIndicator={true}
                renderItem={movie => TMDBListItem(movie.item)}
                keyboardShouldPersistTaps='always'
            />
        </Fragment>
    )
}

export default QRFlatList;