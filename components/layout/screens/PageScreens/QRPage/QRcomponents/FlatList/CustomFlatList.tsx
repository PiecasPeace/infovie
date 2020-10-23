import React, { Fragment } from 'react';
import { FlatList } from 'react-native';
import TMDBListItem from '../ListItem/TMDBListItem';

interface IFlatListProps {
    movieData: any[];
}

const CustomFlatList = ({ movieData }: IFlatListProps) => {
    return (
        <Fragment>
            <FlatList
                data={movieData}
                keyExtractor={(movie, index) => `${movie.id}-${index}`}
                showsVerticalScrollIndicator={true}
                renderItem={(movie) => TMDBListItem(movie.item)}
                keyboardShouldPersistTaps='always'
            />
        </Fragment>
    )
}

export default CustomFlatList;