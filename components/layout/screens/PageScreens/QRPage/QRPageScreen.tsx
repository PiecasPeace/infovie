import React, { Fragment, useState } from 'react';
import { View, Text, TouchableOpacity, Linking, Image, FlatList, TouchableHighlight, Alert } from "react-native";
import QRCodeScanner from 'react-native-qrcode-scanner';
import { Button } from 'react-native-paper';
import { styles } from './styles';
import { upcITEMS, upcJsonGET, tmdbITEMS, tmdbJsonGET } from "./Interfaces";
import Spinner from '../../../../utils/spinner';
import { getImageApi } from '../../../../utils/images';
import { TheMovieDBUrl, API_KEY, UpcUrl } from '../../../../services/Shortcuts';
import { strongerRegex, firstRegex } from './Regex';
import request from '../../../../services/api';
import { InitialState } from '@react-navigation/native';

interface IQRState {
    scan: boolean,
    scanResult: boolean
    result: "",
}

const QRPageScreen = () => {
    const [movies, setMovies] = useState<any[]>([]);
    const [dataLoading, setDataLoading] = useState(false);
    const TMDBRequest = `${TheMovieDBUrl}?${API_KEY}&query=`;
    const UPCRequest = `${UpcUrl}`;
    const [scanSuccess, setScanSuccess] = useState<IQRState>({
        scan: false,
        scanResult: false,
        result: "",
    });

    const onSuccess = async (event: any) => {
        setScanSuccess({
            result: event,
            scan: false,
            scanResult: true,
        });
        //For QR-Scan
        const check = event.data.substring(0, 4);
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
        await requestMovieTitleByBarcode(event.data).then((titleList) => {
            //api call movie db with title
            requestBarcodeTitle(titleList)
        }).catch((message) => {
            console.log("failed fetching: " + message)
        });
    }
    const requestMovieTitleByBarcode = async (eanUpc: string[]): Promise<string[]> => {
        const titleList: string[] = [];
        try {
            const request = await fetch(`${UPCRequest}${eanUpc}`)
            const result: upcJsonGET = await request.json();
            console.log(result.items)
            for (let i = 0; i < result.items.length; i++) {
                { result.items[i].title ? result.items[i].title : "NOT FOUND" }
                titleList[i] = result.items[i].title;
            };
        } catch (err) {
            console.log("FetchProblem -> requestMovieTitleByBarcode: " + err.message);
            throw err;
        }
        return titleList;
    }

    const requestBarcodeTitle = async (title: string[]) => {
        const RegexOutput: RegExpMatchArray | null = title[0].match(firstRegex);
        const strongRegexOutput: RegExpMatchArray | null = title[0].match(strongerRegex);
        let lightTitleArray: string[] = [];
        let strongTitleArray: string[] = [];
        if (RegexOutput !== null) {
            for (let i = 0; i < RegexOutput.length; i++) {
                lightTitleArray[i] = RegexOutput[0].toString();
                console.log(lightTitleArray[i])
            };
        };
        if (strongRegexOutput !== null) {
            for (let i = 0; i < strongRegexOutput.length; i++) {
                strongTitleArray[i] = strongRegexOutput[0].toString();
                console.log(strongTitleArray[i])
            };
        };

        try {
            const request = await fetch(`${TMDBRequest}${encodeURI(lightTitleArray[0])}`);
            console.log(request)
            const result = await request.json();
            if (result.total_results === 0) {
                return Alert.alert(
                    `Title not found`,
                    `Couldnt find title "${lightTitleArray[0]}" \nSearch with "${strongTitleArray[0]}" instead?`,
                    [
                        {
                            text: "Cancel",
                            onPress: () => setScanSuccess({ result: "", scan: false, scanResult: false }),
                            style: "cancel",
                        },
                        {
                            text: "Yes",
                            onPress: async () => {
                                const betterRequest = await fetch(`${TMDBRequest}${encodeURI(strongTitleArray[0]).trim()}`)
                                console.log(`${TMDBRequest}${encodeURI(strongTitleArray[0]).trim()}`)
                                const betterResult = await betterRequest.json();
                                setMovies(betterResult.results);
                                setDataLoading(true)
                                setScanSuccess(prevState => {
                                    return { ...prevState, event: "" }
                                })
                            },
                        }
                    ],
                    { cancelable: false }
                );
            } else {
                 setMovies(result.results);
                 setDataLoading(true)
            }

        } catch (error) {
            console.log(
                "FetchProblem -> requestBarcodeTitle: " + error.message
            );
            throw error;
        }
    }

    const activeQR = () => {
        setScanSuccess(prevState => {
            return { ...prevState, scan: true }
        })
    }
    const scanAgain = () => {
        setScanSuccess({ result: "", scan: true, scanResult: false })
    }

    const TMDBListItem = (movie: any) => {
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

    return (
        <View style={styles.QRContainer}>
            <Fragment>
                {
                    !scanSuccess.scan && !scanSuccess.scanResult ?
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
                                    <Text>Start Scan</Text>
                                </Button>
                            </View>
                        </View> : <></>
                }

                {scanSuccess.scanResult && dataLoading ?
                    <Fragment>
                        <FlatList
                            data={movies}
                            keyExtractor={(movie, index) => `${movie.tmdbID2}-${index}`}
                            showsVerticalScrollIndicator={true}
                            renderItem={movie => TMDBListItem(movie.item)}
                            keyboardShouldPersistTaps='always'
                        />
                        <View style={{ padding: 1 }}>

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
                                <Text>Stop Scan</Text>
                            </Button>
                        </View>
                    </Fragment> : <></>
                }

                {scanSuccess.scan ?
                    <QRCodeScanner
                        reactivate={true}
                        showMarker={true}
                        onRead={onSuccess}
                        bottomContent={
                            <View style={styles.StopScan}>
                                <Button
                                    mode="outlined"
                                    color='#fff'
                                    onPress={() => setScanSuccess(prevState => {
                                        return { ...prevState, scan: false }
                                    })}>
                                    <Text>Stop Scan</Text>
                                </Button>
                            </View>
                        }
                    /> : <></>
                }
            </Fragment>
        </View>
    )
}

export default QRPageScreen;