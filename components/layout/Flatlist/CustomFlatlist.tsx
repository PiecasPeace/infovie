import React, { useState, useEffect, Fragment } from 'react';
import {
    FlatList, View, Text, Image, TouchableHighlight, ListRenderItem,
} from 'react-native'
import axios from '../../services/axios';
import Spinner from '../../utils/Spinner';
import { styles } from "./styles";
import { getImageApi } from '../../utils/Image';
import { tmdbITEM } from '../screens/PageScreens/QRPage/utils/interface/MovieInterface';
import { convertToYear } from '../../utils/dates';
import isoLanguage from '../../dataJSON/iso.json';
import { convertToUpperCaseFirstLetter } from '../../utils/letters';
import { convertTypeWithGenre } from '../../utils/genre';

const CustomFlatlist = ({ fetchUrl }) => {
    const [movies, setMovies] = useState<tmdbITEM[]>([]);
    const [loading, setLoading] = useState(true);

    const renderDivider = (releaseDate, originalLanguage) =>
        releaseDate && originalLanguage !== 'xx' ? (
            <Text style={styles.trace}>|</Text>
        ) : null;

    const getLanguage = value => {
        const str = isoLanguage[value] || '';

        return convertToUpperCaseFirstLetter(str);
    };

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

    const TrendingList: ListRenderItem<tmdbITEM> = ({ item }) => (
        <TouchableHighlight
            key={item.id}
        >
            <View style={styles.containerItem}>
                <Image
                    source={getImageApi(item.poster_path)}
                    style={styles.photo}
                    resizeMode="cover"
                />
                <View style={styles.item}>
                    <Text numberOfLines={2} style={styles.headertext}>
                        {item.title}
                    </Text>
                    <View style={[styles.textRow, styles.containerSubTitle]}>
                        <Text style={styles.textSmall}>
                            {convertToYear(item.release_date)}
                        </Text>
                        {renderDivider(item.release_date, item.original_language)}
                        <Text numberOfLines={1} style={styles.textSmall}>
                            {getLanguage(item.original_language)}
                        </Text>
                    </View>
                    <Text numberOfLines={1} style={styles.textSmall}>
                        {convertTypeWithGenre(item.genre_ids, item.type, item.isSearch)}
                    </Text>
                </View>

            </View>
        </TouchableHighlight>
    )

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
                            (movie, index) => `${movie.id}-${index}`
                        }
                        showsVerticalScrollIndicator={true}
                        renderItem={TrendingList}
                        keyboardShouldPersistTaps='always'
                    />
                </Fragment>
            }
        </View>
    )
}

export default CustomFlatlist;
