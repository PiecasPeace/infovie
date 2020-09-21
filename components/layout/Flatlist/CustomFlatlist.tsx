import React, { useState, useEffect, Fragment } from 'react';
import {
    FlatList, View, Text, Image, TouchableHighlight,
} from 'react-native'
import axios from '../../services/axios';
import Spinner from '../../utils/Spinner';
import { styles } from "./styles";
import { getImageApi } from '../../utils/images';

const CustomFlatlist = ({ fetchUrl }) => {
    const [movies, setMovies] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const request = await axios.get(fetchUrl);
                setMovies(request.data.results);
                return request;
            } catch (err) {
                console.log(
                    "Fetchproblem at CustomFlatList Url: " + err.message
                );
                throw err;
            } finally {
                setLoading(false)
            }
        }
        fetchData();
    }, [fetchUrl]);

    const TrendingList = (movie: any) => {
        return (
            <TouchableHighlight
                key={movie.tmdbID}
            >
                <View style={styles.resultMovie}>
                    <Text style={styles.headertext}>
                        {movie.title != undefined ? movie.title : movie.original_title}
                        {movie.name != undefined ? movie.name : movie.original_name}
                    </Text>
                    <Text>
                        {movie.description}
                    </Text>
                    <Image
                        source={getImageApi(movie.poster_path)}
                        defaultSource={
                            require('../../assets/images/not_found.png')
                        }
                        style={styles.Images}
                        resizeMode="cover"
                    />
                </View>
            </TouchableHighlight>
        )
    }

    const isLoading = () => {
        if (loading) {
            return <Spinner />
        }
    }

    return (
        <View style={styles.FlatlistContainer}>
            {isLoading &&
                <Fragment>
                    <FlatList
                        data={movies}
                        keyExtractor={
                            (movie, index) => `${movie.tmdbID}-${index}`
                        }
                        showsVerticalScrollIndicator={true}
                        renderItem={movie => TrendingList(movie.item)}
                        keyboardShouldPersistTaps='always'
                    />
                </Fragment>
            }
        </View>
    )
}

export default CustomFlatlist;
