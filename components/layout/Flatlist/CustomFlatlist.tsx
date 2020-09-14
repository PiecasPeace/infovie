import React, { useState, useEffect, Fragment } from 'react';
import {
    FlatList, View, Text, Image, StyleSheet, TouchableHighlight,
} from 'react-native'
import axios from '../../services/axios';
import { darkpurple } from '../../utils/colors';
import Spinner from '../../utils/spinner';

const CustomFlatlist = ({ fetchUrl }) => {
    const [movies, setMovies] = useState<any[]>([]);
    const imageURL = "https://image.tmdb.org/t/p/original";
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const request = await axios.get(fetchUrl);
                setMovies(request.data.results);
                return request;
            } catch (err) {
                console.log("There was a problem with your fetch: " + err.message);
                throw err;
            } finally {
                setLoading(false)
            }
        }
        fetchData();
    }, [fetchUrl]);

    const TrendingList = (movie: any) => {
        const getImageURL = `${imageURL}${movie.poster_path}`
        return (
            <TouchableHighlight
                key={movie.tmdbID}
            >
                <View style={styles.resultMovie}>
                    <Text style={styles.headertext}>
                        {movie.title}
                    </Text>
                    <Text>
                        {movie.description}
                    </Text>
                    {/* {console.log(`${imageURL}${movie.poster_path}`)} */}
                    <Image
                        source={{ uri: getImageURL }}
                        defaultSource={require('../../assets/images/not_found.png')}
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
                        keyExtractor={(movie, index) => `${movie.tmdbID}-${index}`}
                        showsVerticalScrollIndicator={true}
                        renderItem={movie => TrendingList(movie.item)}
                        keyboardShouldPersistTaps='always'
                    />
                </Fragment>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    FlatlistContainer: {
        flex: 1,
        width: "100%",
        padding: 10,
    },
    resultMovie: {
        flex: 1,
        width: '100%',
        marginBottom: 30,
        justifyContent: 'space-between',
        alignItems: 'stretch'
    },
    headertext: {
        color: darkpurple,
        fontSize: 18,
        fontWeight: '700',
        padding: 5
    },
    Images: {
        height: 250,
        width: 150,
        borderRadius: 10,
        resizeMode: "stretch"
    },
})

export default CustomFlatlist;
