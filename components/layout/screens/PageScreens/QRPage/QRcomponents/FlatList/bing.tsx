import React, { useState } from 'react'
import {
    FlatList,
    TouchableHighlight,
    TextInput,
    View,
    Image,
    Text,
    StyleSheet,
    Modal
} from 'react-native'
import axios from 'axios';

export const MovieFlatList = () => {
    const apiurl = "http://omdbapi.com/?apikey=9ebc6b68";
    const [movies, setMovieName] = useState({
        searchBar: "Enter a movie...",
        results: [] as any,
        selected: {} as any,
        length: [] as any,
    })

    const search = () => {
        axios(apiurl + "&s=" + movies.searchBar).then(({ data }) => {
            let results = data.Search
            console.log(results)

            setMovieName(prevState => {
                return { ...prevState, results: results }
            })
        })
    }

    const openPopup = (id: []) => {
        axios(apiurl + "&i=" + id).then(({ data }) => {
            let result = data;

            setMovieName(prevState => {
                return { ...prevState, selected: result }
            })
        })
    }

    const MovieFlatlistView = (result: any) => {
        return (
            <TouchableHighlight
                key={result.imdbID}
                onPress={() => openPopup(result.imdbID)}
            >
                <View style={styles.resultMovie}>
                    <Image
                        source={{ uri: result.Poster }}
                        style={styles.Images}
                        resizeMode="cover"
                    />
                    <Text style={styles.header}>
                        {result.Title}
                    </Text>
                </View>
            </TouchableHighlight>
        )
    }

    return (
        <>
            <TextInput
                style={styles.searchBox}
                onChangeText={text => setMovieName(prevState => {
                    return { ...prevState, searchBar: text }
                })}
                onSubmitEditing={search}
                value={movies.searchBar}
            />

            <FlatList
                style={styles.results}
                data={movies.results}
                keyExtractor={result => result.imdbID}
                showsVerticalScrollIndicator={true}
                renderItem={result => MovieFlatlistView(result.item)}
                keyboardShouldPersistTaps='always'
            />
            <Modal
                animationType='fade'
                transparent={false}
                visible={(typeof movies.selected.Title != "undefined")}
            >
                <View style={styles.viewPopup}>
                    <Text style={styles.titlePopup}>
                        Title: {movies.selected.Title}
                    </Text>
                    <Text style={styles.ratingPopup}>
                        Rating: {movies.selected.Rating}
                    </Text>
                    <Text style={styles.plotPopup}>
                        Description: {movies.selected.Plot}
                    </Text>
                    <TouchableHighlight
                        onPress={() => setMovieName(prevState => {
                            return { ...prevState, selected: {} }
                        })}
                    >
                        <Text style={styles.closePopUpButton}>Close</Text>
                    </TouchableHighlight>
                </View>
            </Modal>
        </>
    )
}


const styles = StyleSheet.create({
    results: {
        flex: 1,
        width: '90%',
        marginBottom: 20,
    },
    resultMovie: {
        flex: 1,
        width: '100%',
        marginBottom: 30
    },
    header: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
        padding: 20,
        backgroundColor: '#445565',
    },
    Images: {
        width: '100%',
        height: 300,
    },
    searchBox: {
        fontSize: 20,
        fontWeight: '300',
        padding: 20,
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 5,
        marginBottom: 40,
    },
    viewPopup: {
        padding: 20,
    },
    titlePopup: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 5
    },
    closePopUpButton: {
        padding: 20,
        fontSize: 20,
        fontWeight: '700',
        backgroundColor: '#eeeeee',
        color: '#FFF'
    },
    ratingPopup: {
        padding: 10,
    },
    plotPopup: {
        padding: 10
    }
})
