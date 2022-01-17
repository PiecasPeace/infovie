import React, { useState, useEffect } from 'react'
import {
    FlatList,
    TouchableHighlight,
    TextInput,
    View,
    Image,
    Text,
    Modal,
    Button
} from 'react-native'
import { styles } from "./styles";
import Request from '../../../../../constants/requestPath';
// import axios from '../../../../services/axios';
import { TouchableOpacity } from '../../../../../components/blueprints/CustomTouchableOpacity/CustomTouchableOpacity';
import Spinner from '../../../../../components/Spinner/Spinner';
// import Screen from '../../utils/Screen';
import MovieListRow from '../MovieListRow/MovieListRow';
// import InputSearch from '../InputSearch/InputSearch';
import { getImageApi } from '../../../../../constants/utils/Image';
import requestPath from '../../../../../constants/requestPath';
import Screen from '../../../../../constants/utils/Screen';

export const MovieFlatList = ({ navigation }) => {
    const apiurl = "http://omdbapi.com/?apikey=9ebc6b68";
    const [loading, setLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [isRefresh, setIsRefresh] = useState(false);
    const [isError, setIsError] = useState(false);
    const [hasAdultContent, setHasAdultContent] = useState(false);
    const [results, setResults] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState({
        filterType: 'popularity.desc',
        filterName: 'Most popular'
    });

    const [movies, setMovieName] = useState({
        searchBar: "",
        results: [] as any,
        selected: {} as any
    })
    const [view, setView] = useState({ numColumns: 1, keyGrid: 1 });
    const {
        params: { id = null, name = null, typeRequest = 'discover' } = {}
    } = navigation.state;

    const [params, setParams] = useState({
        id: null,
        name: null,
        typerequest: 'discover',
    })

    const getQueryRequest = () => {
        if (typeRequest === 'discover') {
            return id ? { with_genres: `${id}` } : null;
        }

        if (typeRequest === 'search') {
            return { query: `${name.trim()}` };
        }

        return null;
    };


    const requestMoviesList = async () => {
        try {
            setLoading(true);
            const { filterType } = filter;
            // const dateRelease = getTodayDate();

            // const data = await RequestPath(`${typeRequest}/movie`, {
            //     page,
            //     // 'release_date.lte': dateRelease,
            //     sort_by: filterType,
            //     with_release_type: '1|2|3|4|5|6|7',
            //     // include_adult: hasAdultContent,
            //     ...getQueryRequest()
            // });

            setLoading(false);
            setIsLoadingMore(false);
            setIsRefresh(false);
            setIsError(false);
            // setTotalPages(data.total_pages);
            // setResults(isRefresh ? data.results : [...results, ...data.results]);
        } catch (err) {
            setLoading(false);
            setIsLoadingMore(false);
            setIsRefresh(false);
            setIsError(true);
        }
    };

    useEffect(() => {
        (async () => {
            try {

                requestMoviesList();
            } catch (error) {
                requestMoviesList();
            } finally {
                setLoading(false)
            }
        })();
    }, []);

    const handleRefresh = async () => {
        await setIsRefresh(true);
        await setPage(1);
        await requestMoviesList();
    };

    const handleLoadMore = async () => {
        await setIsLoadingMore(true);
        await setPage(page + 1);
        await requestMoviesList();
    };

    const handleGrid = () => {
        const { numColumns, keyGrid } = view;

        setView({ numColumns: numColumns === 1 ? 2 : 1, keyGrid: keyGrid + 1 });
    };

    const { numColumns, keyGrid } = view;

    const TMDBList = (movie: any) => {
        return (
            <TouchableHighlight
                key={movie.tmdbID2}
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
                            require('../../../../assets/images/not_found.png')
                        }
                        style={styles.Images}
                        resizeMode="cover"
                    />
                </View>
            </TouchableHighlight>
        )
    }


    const MovieFlatlistView = (result: any) => {
        return (
            <TouchableHighlight
                key={result.imdbID}
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

    // const renderFooter = () => {
    //     if (isLoadingMore) return <Spinner size={25} />;

    //     if (totalPages !== page && results.length > 0) {
    //         return (
    //             <View style={styles.loadingMore}>
    //                 <TouchableOpacity
    //                     style={styles.loadingButton}
    //                     onPress={handleLoadMore}
    //                 >
    //                     <Text style={styles.loadingText}>Load more</Text>
    //                 </TouchableOpacity>
    //             </View>
    //         );
    //     }

    //     if (results.length > 0) return <View style={styles.loadingMore} />;

    //     return null;
    
    
    return (
        <Screen>
            <View style={styles.container}>
                {/* <InputSearch /> */}
                {/* <MovieListRow
                    data={results}
                    type="normal"
                    isSearch={false}
                    keyGrid={keyGrid}
                    numColumns={numColumns}
                    refreshing={isRefresh}
                    onRefresh={handleRefresh}
                    ListFooterComponent={renderFooter}
                    renderItem={TMDBList}
                /> */}

                {/* <FlatList
                    style={styles.results}
                    data={movies.results}
                    keyExtractor={result => result.imdbID}
                    showsVerticalScrollIndicator={true}
                    renderItem={result => TMDBList(result.item)}
                    keyboardShouldPersistTaps='always'
                /> */}


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
            </View>
        </Screen>
    )
}