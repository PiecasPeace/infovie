import React, { Fragment, useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Linking, Platform, Image, FlatList, TouchableHighlight } from "react-native";
import QRCodeScanner from 'react-native-qrcode-scanner';
import { Button } from 'react-native-paper';
import request from '../../../services/api';
import Spinner from '../../../utils/spinner';
import { styles } from './styles';

// const omdbURL = "http://omdbapi.com/?apikey=9ebc6b68"
// const apiurl = "https://api.themoviedb.org/3/movie/76341?api_key=024d69b581633d457ac58359146c43f6";

interface iQRState {
    scan: boolean,
    scanResult: boolean
    result: any,
}

const bigmokjson = {
    "code": "string",
    "total": 0,
    "offset": 0,
    "items": [
        {
            "ean": "0012569713710",
            "title": "Batman",
            "upc": "012569713710",
            "gtin": "string",
            "asin": "B00NQGOZV0",
            "description": "iPhone 6 isn't just bigger - it's better...",
            "brand": "Apple",
            "model": "MG5A2LL/A",
            "dimension": "string",
            "weight": "string",
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
    const [barcodeKEY, setBarcodeKEY] = useState('');
    const [barcodeTitle, setBarcodeTitle] = useState('');
    const [IMDBJson, setIMDBListJson] = useState<any[]>([]);
    const [barcodesJson, setBarcodesJson] = useState<any[]>([]);

    // const tmdbURL = `https://api.themoviedb.org/3/search/movie?api_key=94ff60134af5b7bbe6cb00087e37359f&query=${movieTitle}`
    const upcURL = `https://api.upcitemdb.com/prod/trial/lookup?upc=${barcodeKEY}`;
    const imdbURL = `http://omdbapi.com/?apikey=9ebc6b68&s=batman`
    // const imdbURL = `http://omdbapi.com/?apikey=9ebc6b68&s=${barcodeTitle}`
    const [loading, setLoading] = useState(true);
    const [scanSuccess, setScanSuccess] = useState<iQRState>({
        scan: false,
        scanResult: false,
        result: "",
    });

    const onSuccess = (event: any) => {
        const check = event.data.substring(0, 4);
        setBarcodeKEY(event.data);
        setScanSuccess({
            result: event,
            scan: false,
            scanResult: true,
        });

        //For QR Scan
        if (check === 'http') {
            Linking
                .openURL(event.data)
                .catch(err => console.error('An error occured, please Check if the URL is correct', err));
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

    useEffect(() => {
        fetch(upcURL)
            .then((response) =>
                // response.json()
                bigmokjson
            )
            .then((json) => {
                setBarcodesJson(json.items);
                // setBarcodeTitle(json.items);
            })
            .catch(error => { console.log(error); })
            .finally(() => setLoading(false));
    }, []);

    const upcDBList = (result: any) => {
        return (
            <TouchableHighlight
                key={result.upcitemdbID}
            >
                <View>
                    <Text
                        style={{ color: '#fff', fontSize: 20 }}>
                        MOVIE AFTER SCAN: {result.title}
                    </Text>
                </View>
            </TouchableHighlight>
        )
    }

    const getBarcodeTitle = (result: any) => {
        setBarcodeTitle(result.title)
    }

    useEffect(() => {
        fetch(imdbURL)
            .then((response) =>
                response.json()
            )
            .then((json) => {
                setIMDBListJson(json.Search)
                getBarcodeTitle
            })
            .catch(error => { console.log(error); })
            .finally(() => setLoading(false));

    }, []);

    const imDBList = (result: any) => {
        return (
            <TouchableHighlight
                key={result.imdbID}
            >
                <View>
                    <Text
                        style={{ color: '#fff', fontSize: 13 }}>
                        imdb Titel: {result.Title}
                    </Text>
                    <Image
                        source={{ uri: result.Poster }}
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
                            keyExtractor={(result, index) => `${result.upcitemdbID}-${index}`}
                            renderItem={result => upcDBList(result.item)}
                            keyboardShouldPersistTaps='always'
                            showsVerticalScrollIndicator={true}
                        />

                        <FlatList
                            data={IMDBJson}
                            keyExtractor={(result, index) => `${result.imdbID}-${index}`}
                            showsVerticalScrollIndicator={true}
                            renderItem={result => imDBList(result.item)}
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