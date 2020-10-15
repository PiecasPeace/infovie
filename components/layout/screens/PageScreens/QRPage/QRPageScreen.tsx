import React, { Fragment, useState } from 'react';
import { View, Text, TouchableOpacity, Linking, FlatList, Alert } from "react-native";
import QRCodeScanner from 'react-native-qrcode-scanner';
import { Button } from 'react-native-paper';
import { styles } from './styles';
import Spinner from '../../../../utils/spinner';
import { TMDBRequest, UPCRequest } from '../../../../services/Shortcuts';
import { strongerRegex, firstRegex } from './utils/Regex';
import RequestMovieTitleByBarcode from './QRcomponents/RequestMovieTitleByBarcode';
import QRFlatList from './QRcomponents/QRFlatList';
interface IQRState {
    scan: boolean,
    scanResult: boolean
    result: any,
}

const QRPageScreen = () => {
    const [movies, setMovies] = useState<any[]>([]);
    const [dataLoading, setDataLoading] = useState(false);
    const [scanSuccess, setScanSuccess] = useState<IQRState>({
        scan: false,
        scanResult: false,
        result: "",
    });
    //After scan, onSuccess starts
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
        //api call upc DB (passing event.data, which is the barcode, titleList will be the title for the tmdb)
        await RequestMovieTitleByBarcode(event.data).then((titleList) => {
            //api call movie DB with title parameter
            requestBarcodeTitle(titleList)
        }).catch((message) => {
            console.log("failed fetching: " + message)
        });
    }
    const requestBarcodeTitle = async (title: string[]) => {
        const RegexOutput: RegExpMatchArray | null = title[0].match(firstRegex);
        const strongRegexOutput: RegExpMatchArray | null = title[0].match(strongerRegex);
        let lightTitleArray: string[] = [];
        let strongTitleArray: string[] = [];
        if (RegexOutput !== null) {
            for (let i = 0; i < RegexOutput.length; i++) {
                //Regex gives back an array so we have to give it the [0] index
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
            //before every scan, we clear setMovies so we dont see it in the background after second scan
            setMovies([]);
            //fetch url with the lighterRegex
            const request = await fetch(`${TMDBRequest}${encodeURI(lightTitleArray[0])}`);
            console.log(request)
            const result = await request.json();
            //if total_results are 0, open an Alert which asks if you want to search with the strongerRegex (total_results is from the JSON request)
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
                            //if you click yes, we fetching data from the strongerRegex
                            onPress: async () => {
                                const betterRequest = await fetch(`${TMDBRequest}${encodeURI(strongTitleArray[0]).trim()}`)
                                console.log(`${TMDBRequest}${encodeURI(strongTitleArray[0]).trim()}`)
                                const betterResult = await betterRequest.json();
                                setMovies(betterResult.results);
                                setDataLoading(true)
                            },
                        }
                    ],
                    //this makes so you cant click outside of the box
                    { cancelable: false }
                );
            } else {
                setMovies(result.results);
                setDataLoading(true)
            }
        } catch (error) {
            console.log("FetchProblem -> requestBarcodeTitle: " + error.message);
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
                        <QRFlatList
                            data={movies}
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