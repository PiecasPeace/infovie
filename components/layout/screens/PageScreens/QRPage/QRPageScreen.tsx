import React, { Fragment, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Linking, Image, FlatList, TouchableHighlight } from "react-native";
import QRCodeScanner from 'react-native-qrcode-scanner';
import { Button } from 'react-native-paper';
import { styles } from './styles';
import axios from '../../../../services/axios';
import { bigmokjson, JSONITEMS, JSONRESULTS } from "./bigmokjson";
import Spinner from '../../../../utils/spinner';
import { getImageApi } from '../../../../utils/images';

interface iQRState {
    scan: boolean,
    scanResult: boolean
    result: any,
}

const QRPageScreen = () => {
    const [barcode, setBarcode] = useState('');
    const [barcodeTitle, setBarcodeTitle] = useState<string[]>([]);
    const [barcodesJson, setBarcodesJson] = useState<string[]>([]);
    const [movies, setMovies] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const tmdbUrl = `https://api.themoviedb.org/3/search/movie?api_key=94ff60134af5b7bbe6cb00087e37359f&query=`;
    const upcUrl = `https://api.upcitemdb.com/prod/trial/lookup?upc=${barcode}`;
    // const tmdbUrl = `https://api.themoviedb.org/3/search/movie?api_key=94ff60134af5b7bbe6cb00087e37359f&query=batman`;

    const [scanSuccess, setScanSuccess] = useState<iQRState>({
        scan: false,
        scanResult: false,
        result: "",
    });

    const onSuccess = async (event: any) => {
        const check = event.data.substring(0, 4);

        setBarcode(event.data);
        console.log(event.data)
        setScanSuccess({
            result: event,
            scan: false,
            scanResult: true,
        });
        //For QR-Scan
        if (check === 'http') {
            Linking
                .openURL(event.data)
                .catch(err => console.error
                    ('An error occured, please Check if the URL is correct',
                        err)
                );
        } else {
            setScanSuccess({
                result: event,
                scan: false,
                scanResult: true,
            });
        }
        //api call ean db
        await requestBarcodeAndSetTitle();
        //api call movie db with title
        await requestBarcodeTitle();
    }

    const requestBarcodeAndSetTitle = async () => {
        console.log("11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111");
        try {
            const eanList: string[] = [];
            const titleList: string[] = [];
            for (let i = 0; i < bigmokjson.items.length; i++) {
                // eanList.push(bigmokjson.items[i].ean);
                const getCode = bigmokjson.items[i];
                if (getCode.ean === undefined) {
                    eanList.push(bigmokjson.items[i].upc);
                } else {
                    eanList.push(bigmokjson.items[i].ean);
                }
                titleList[i] = (bigmokjson.items[i].title);
                console.log("titleList[i] ist  Zeile 78: " + titleList[i]);
                // console.log(eanList[i])
            }
            console.log("titleList ist  Zeile 81: " + titleList)
            setBarcodeTitle(titleList);
            setBarcodesJson(eanList);
            console.log("eanList ist  Zeile 83: " + eanList);
            console.log("titleList ist  Zeile 84: " + titleList);
        } catch (err) {
            console.log(
                "(Z.70~) Fetchproblem at upcUrl: " + err.message
            );
            throw err;
        } finally {
            setLoading(false);
        }
    }

    const requestBarcodeTitle = async () => {
        console.log("2222222222222222222222222222222222222222222222222222222222222222222222222222222222222")
        try {
            console.log("tmdbUrl+Barcodetitle[0] lautet: " + `${tmdbUrl}${encodeURI(barcodeTitle[0])}`)
            const request = await fetch(`${tmdbUrl}${encodeURI(barcodeTitle[0])}`);
            // console.log(request);
            const result = await request.json();
            setMovies(result.results);
        } catch (error) {
            console.log(
                "(Z.105~) Fetchproblem at tmdbUrl in QRPageSreen: " + error.message
            );
            throw error;
        } finally {
            setLoading(false);
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

    const upcList = (result: JSONITEMS) => {
        
        return (
            <TouchableHighlight
                key={result.ean}
            >
                <View>
                    <Text
                        style={{ color: '#fff', fontSize: 20 }}>
                        {/* {result.title !== undefined ? result.title : movie.original_title} */}
                        {result.title}
                    </Text>
                </View>
            </TouchableHighlight>
        )
    }

    const TMDBList = (movie: any) => {
        return (
            <TouchableHighlight
                key={movie.tmdbID2}
            >
                <View style={styles.resultMovie}>
                    <Text style={styles.headertext}>
                        {movie.title !== undefined ? movie.title : movie.original_title}
                        {movie.name !== undefined ? movie.name : movie.original_name}
                    </Text>
                    <Text>
                        {movie.description}
                    </Text>
                    <Image
                        source={getImageApi(movie.poster_path)}
                        // defaultSource={
                        //     require('../../../../assets/images/not_found.png')
                        // }
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
                            keyExtractor={(result: any, index) => `${result.ean}-${index}`}
                            renderItem={result => upcList(result.item)}
                            keyboardShouldPersistTaps='always'
                            showsVerticalScrollIndicator={true}
                        />

                        <FlatList
                            data={movies}
                            keyExtractor={(movie, index) => `${movie.tmdbID2}-${index}`}
                            showsVerticalScrollIndicator={true}
                            renderItem={movie => TMDBList(movie.item)}
                            keyboardShouldPersistTaps='always'
                        />

                        <View style={{ padding: 1 }}>
                            {/* <Text style={{ color: '#fff', fontSize: 20 }}>
                                Name : {scanSuccess.result.data}
                            </Text>
                            <Text style={{ color: '#fff', fontSize: 20 }} numberOfLines={1}>
                                Type: {scanSuccess.result.type}
                            </Text> */}
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