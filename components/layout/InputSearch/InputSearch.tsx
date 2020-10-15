import React, { useState, useEffect } from 'react';
import { View, TextInput } from 'react-native';
import Feather from 'feather-icons-react';
import { TouchableOpacity } from '../../utils/TouchableOpacity';
import { darkGray } from '../../utils/colors';
import axios from '../../services/axios'
import styles from './styles';

const InputSearch = () => {
    const tmdbUrl = `https://api.themoviedb.org/3/search/movie?api_key=94ff60134af5b7bbe6cb00087e37359f&query=`;
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState<any[]>([]);
    // const [value, setValue] = useState('')

    useEffect(() => {
        try {
            requestMovies();
        } catch (err) {
            console.log(
                "Fetchproblem at InputSearch: " + err.message
            );
            throw err;
        } finally {
            setLoading(false)
        }
        requestMovies();
    })

    const requestMovies = async () => {
        try {
            const request = await axios.get(`${tmdbUrl}${search}`);
            setMovies(request.data.results);
            return request;
        } catch (error) {
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }

    const onChangeSearch = (value: string) => {
        setSearch(value);
    };

    const handleClearSearch = () => {
        setSearch('');
    };

    const handleSubmit = () => {
        if (search) {
            requestMovies();
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.containerInput}>
                <View style={styles.inputDirection}>
                    <Feather
                        style={styles.icon}
                        name="search"
                        size={20}
                        color={darkGray}
                    />
                    <TextInput
                        style={styles.textInput}
                        onSubmitEditing={handleSubmit}
                        onChangeText={value => onChangeSearch(value)}
                        value={search}
                        returnKeyType="search"
                        keyboardType="default"
                        blurOnSubmit
                        multiline={false}
                        autoCorrect={false}
                        underlineColorAndroid="transparent"
                        placeholderTextColor={darkGray}
                        placeholder="Search"
                    />
                    {search.length > 0 && (
                        <TouchableOpacity onPress={handleClearSearch}>
                            <Feather
                                style={styles.icon}
                                name="x"
                                size={20}
                                color={darkGray}
                            />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </View>
    );
};

export default InputSearch;