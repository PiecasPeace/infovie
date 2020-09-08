import React, { useState, useEffect } from 'react';
import {
    FlatList, View, Text, Image, StyleSheet, TouchableHighlight,
} from 'react-native'
import axios from 'axios';
import requests from '../../services/requests';
import { darkpurple } from '../../utils/colors';

const CustomFlatlist = (title: any, fetchUrl: any) => {
    const [movies, setMovies] = useState<any[]>([])
    const imageURL = "https://image.tmdb.org/t/p/original/";

    const PictureList = (movies: any) => {
        return (
            <TouchableHighlight
                key={movies.tmdb}
                onPress={() => ""}
            >
                <View style={styles.resultMovie}>
                    <Image
                        key={movies.id}
                        source={{ uri: `${imageURL}${movies.poster_path}` }}
                        style={styles.imageTrending}
                    />
                    <Text style={styles.headertext}>
                        {movies.Title}
                    </Text>
                </View>
            </TouchableHighlight>
        )
    }

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl])

    return (
        <View>
            <Text>
                {title}
            </Text>
            <FlatList
                data={fetchUrl}
                keyExtractor={(movies, index) => `${movies.tmdb}-${index}`}
                showsVerticalScrollIndicator={true}
                renderItem={movies => PictureList(movies.item)}
                keyboardShouldPersistTaps='always'
            />

            {movies.map(movies => (
                <Image
                    source={{ uri: `${imageURL}${movies.poster_path}` }}
                    style={styles.imageTrending}
                />
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    imageTrending: {
        flex: 1,
        width: '100%',
        maxHeight: 100,
        objectFit: 'contain',
        // transition: 450, still missing, also hover is maybe missing, not sure (1.08)
        marginBottom: 10,

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
        height: 300,
        width: 200,
        borderRadius: 5,
        display: "flex",
        resizeMode: "stretch"
    },
})

export default CustomFlatlist;
