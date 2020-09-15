import React, { Fragment, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Linking, Platform, Image, FlatList, TouchableHighlight } from "react-native";
import QRCodeScanner from 'react-native-qrcode-scanner';
import { Button } from 'react-native-paper';
import Spinner from '../../../utils/spinner';
import { styles } from './styles';
import axios from '../../../services/axios';

// const omdbURL = "http://omdbapi.com/?apikey=9ebc6b68"
// const apiurl = "https://api.themoviedb.org/3/movie/76341?api_key=024d69b581633d457ac58359146c43f6";

interface iQRState {
    scan: boolean,
    scanResult: boolean
    result: any,
}

const bigmokjson = {
    "code": "string",
    "items": [
        {
            "ean": "0012569713710",
            "title": "Batman",
            "upc": "012569713710",
            "gtin": "string",
            "asin": "B00NQGOZV0",
            "description": "iPhone 6 isn't just bigger - it's better...",
            "category": "Electronics > Communications > Telephony > Mobile Phones > Unlocked Mobile Phones",
            "currency": "string",
            "lowest_recorded_price": 3.79,
            "highest_recorded_price": 8500,
            "images": [
                "https://images-na.ssl-images-amazon.com/images/I/61sXtDrzDaL._AC_SY679_.jpg"
            ],
            "offers": [
                {
                    "merchant": "Newegg.com",
                    "domain": "newegg.com",
                    "title": "Apple iPhone 6 64GB T-Mobile Space Gray MG5A2LL/A",
                    "currency": "string",
                    "list_price": 0,
                    "price": 1200,
                    "shipping": "Free Shipping",
                    "condition": "New",
                    "availability": "Out of Stock",
                    "link": "https://www.upcitemdb.com/norob/alink/?id=v2p2...",
                    "updated_t": 1479243029
                }
            ]
        }
    ]
}

const QRPageScreen = () => {
    const [barcode, setBarcode] = useState('');
    const [barcodeTitle, setBarcodeTitle] = useState('');
    const [barcodesJson, setBarcodesJson] = useState<any[]>([]);
    const [movies, setMovies] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const imageUrl = "https://image.tmdb.org/t/p/original";
    // const tmdbUrl = `https://api.themoviedb.org/3/search/movie?api_key=94ff60134af5b7bbe6cb00087e37359f&query=${barcodeTitle}`;
    const upcUrl = `https://api.upcitemdb.com/prod/trial/lookup?upc=${barcode}`;
    const tmdbUrl = `https://api.themoviedb.org/3/search/movie?api_key=94ff60134af5b7bbe6cb00087e37359f&query=batman`;
    const [scanSuccess, setScanSuccess] = useState<iQRState>({
        scan: false,
        scanResult: false,
        result: "",
    });

    const onSuccess = (event: any) => {
        const check = event.data.substring(0, 4);
        setBarcode(event.data);
        console.log("EVENT DATAAAAAAAAAAAAAAAAAA " + event.data)
        setScanSuccess({
            result: event,
            scan: false,
            scanResult: true,
        });
        //For QR Scan
        if (check === 'http') {
            Linking
                .openURL(event.data)
                .catch(err => console.error
                    ('An error occured, please Check if the URL is correct', err)
                );
        } else {
            setScanSuccess({
                result: event,
                scan: false,
                scanResult: true,
            });
        }
    }
    const isLoading = () => {
        if (loading) {
            return <Spinner />
        }
    }
    const activeQR = () => {
        setScanSuccess(prevState => {
            return { ...prevState, scan: true }
        })
    }
    const scanAgain = () => {
        setScanSuccess(prevState => {
            return { ...prevState, scanResult: false, scan: true }
        })
    }

    // useEffect(() => {
    //     fetch(upcUrl)
    //         .then((response) =>
    //             // response.json()
    //             bigmokjson
    //         )
    //         .then((json) => {
    //             setBarcodesJson(json.items);
    //             // setBarcodeTitle(json.items);
    //         })
    //         .catch(error => { console.log(error); })
    //         .finally(() => setLoading(false));
    // }, []);

    useEffect(() => {
        async function fetchData() {
            try {
                const request = await axios.get(upcUrl);
                //    const getMok = await axios.get(bigmokjson);
                setBarcodesJson(request.data.bigmokjson);
                return request;
            } catch (err) {
                console.log(
                    "(Z.130~) Fetchproblem at upcUrl: " + err.message
                );
                throw err;
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const upcList = (result: any) => {
        return (
            <TouchableHighlight
                key={result.upcID}
            >
                <View>
                    <Text
                        style={{ color: '#fff', fontSize: 20 }}>
                        {result.title}
                    </Text>
                </View>
            </TouchableHighlight>
        )
    }

    const getBarcodeTitle = (result: any) => {
        setBarcodeTitle(result.title)
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const request = await axios.get(tmdbUrl);
                setMovies(request.data.results);
                // getBarcodeTitle(request.data.results.title)
                return request;
            } catch (err) {
                console.log(
                    "(Z.170~) Fetchproblem at tmdbUrl in QRPageSreen: " + err.message
                );
                throw err;
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const TMDBList = (movie: any) => {
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
                        source={
                            { uri: `${imageUrl}${movie.poster_path}` }
                        }
                        defaultSource={
                            require('../../../assets/images/not_found.png')
                        }
                        style={styles.Images}
                        resizeMode="cover"
                    />
                </View>
            </TouchableHighlight>
        )
    }

    return (
        <View style={styles.QRContainer}>
            <Fragment>
                {!scanSuccess.scan && !scanSuccess.scanResult &&
                    <View>
                        <Text style={styles.DescriptionText}>
                            Please scan a Code !
                            </Text>
                        <View>
                            <Button
                                contentStyle={{
                                    height: 80,
                                    backgroundColor: '#fff0f2',
                                    alignContent: 'center',
                                }}
                                labelStyle={{
                                    fontSize: 25
                                }}
                                style={styles.activateScan}
                                icon="barcode"
                                onPress={activeQR}
                                color="#400a13"
                                mode="outlined">
                                Scan Code
                                </Button>
                        </View>
                    </View>
                }

                {scanSuccess.scanResult && isLoading &&
                    <Fragment>
                        <FlatList
                            data={barcodesJson}
                            keyExtractor={(result, index) => `${result.upcID}-${index}`}
                            renderItem={result => upcList(result.item)}
                            keyboardShouldPersistTaps='always'
                            showsVerticalScrollIndicator={true}
                        />

                        <FlatList
                            data={movies}
                            keyExtractor={(movie, index) => `${movie.tmdbID}-${index}`}
                            showsVerticalScrollIndicator={true}
                            renderItem={movie => TMDBList(movie.item)}
                            keyboardShouldPersistTaps='always'
                        />

                        <View style={{ padding: 15 }}>
                            <Text style={{ color: '#fff', fontSize: 20 }}>Name : {scanSuccess.result.data}</Text>
                            <Text style={{ color: '#fff', fontSize: 20 }} numberOfLines={1}>Type: {scanSuccess.result.type}</Text>
                            <TouchableOpacity onPress={scanAgain} style={styles.buttonTouchable}>
                                <Text style={styles.DescriptionText}>Click to Scan again!</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.StopScan}>
                            <Button
                                mode="outlined"
                                color='#fff'
                                onPress={() => setScanSuccess(prevState => {
                                    return { ...prevState, scan: false, scanResult: false }
                                })}>
                                Stop Scan
                            </Button>
                        </View>
                    </Fragment>
                }

                {scanSuccess.scan &&
                    <QRCodeScanner
                        reactivate={true}
                        showMarker={true}
                        // ref={(node) => { this.state.scanner = node }}
                        onRead={onSuccess}
                        bottomContent={
                            <View style={styles.StopScan}>
                                <Button
                                    mode="outlined"
                                    color='#fff'
                                    onPress={() => setScanSuccess(prevState => {
                                        return { ...prevState, scan: false }
                                    })}>
                                    Stop Scan
                                    </Button>
                            </View>
                        }
                    />
                }
            </Fragment>
        </View>
    )
}

export default QRPageScreen;