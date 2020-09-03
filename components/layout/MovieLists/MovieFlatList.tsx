import React, { useState } from 'react'
import {
    FlatList,
    TouchableHighlight,
    TextInput,
    View,
    Image,
    Text,
    StyleSheet,
    Modal,
    Button
} from 'react-native'
import axios from 'axios';
import { lightpurple, darkpurple } from '../../utils/colors';

export const MovieFlatList = () => {
    const apiurl = "http://omdbapi.com/?apikey=9ebc6b68";
    const [movies, setMovieName] = useState({
        searchBar: "",
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
                    <Text style={styles.headertext}>
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
                placeholder="Enter Movie"
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
                <View style={styles.ContainerPopup}>
                    <Text style={styles.titlePopup}>
                        {movies.selected.Title}
                    </Text>
                    <Image
                        source={{ uri: movies.selected.Poster }}
                        style={styles.ImagePopup}
                    />
                    <Text style={styles.ReleaseYearPopup}>
                        Release Year: {movies.selected.Year}
                    </Text>

                    <Text style={styles.plotPopup}>
                        Description: {movies.selected.Plot}
                    </Text>

                    <Button onPress={() => setMovieName(prevState => {
                        return { ...prevState, selected: {} }
                    })} title="Close">

                    </Button>
                </View>
            </Modal>
            {/* style={styles.closePopUpButton}  */}
        </>
    )
}

const styles = StyleSheet.create({
    ContainerPopup: {
        padding: 20,
        backgroundColor: lightpurple,
        height: '100%',
        flex: 1
    },
    titlePopup: {
        fontSize: 24,
        fontWeight: '300',
        marginBottom: 5,
        color: "#FFF",
        backgroundColor: '#010101'
    },
    ImagePopup: {
        height: 300,
        width: 200,
        borderRadius: 5,
        display: "flex",
        resizeMode: "stretch"
    },
    results: {
        flex: 1,
        width: '90%',
        marginBottom: 20,
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
    searchBox: {
        fontSize: 20,
        fontWeight: '300',
        padding: 20,
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 5,
        marginBottom: 40,
    },
    closePopUpButton: {
        padding: 20,
        fontSize: 20,
        backgroundColor: '#eeeeee',
        color: '#FFF'
    },
    ReleaseYearPopup: {
        padding: 10,
    },
    plotPopup: {
        padding: 10
    }
})