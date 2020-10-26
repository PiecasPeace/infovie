import React, { Fragment, useState } from 'react';
import { View, Text, Linking, Alert, FlatList, Image, ListRenderItem, TouchableHighlight } from "react-native";
import QRCodeScanner from 'react-native-qrcode-scanner';
import { Button } from 'react-native-paper';
import { styles } from './styles';
import Spinner from '../../../../utils/Spinner';
import { buildIDUrl, TMDBRequest } from '../../../../services/Shortcuts';
import { strongerRegex, firstRegex } from './utils/interface/Regex/Regex';
import RequestMovieTitleByBarcode from './QRcomponents/Requests/RequestMovieTitleByBarcode';
import CustomFlatList from './QRcomponents/FlatList/CustomFlatList';
import { IMovieIDItem } from './utils/interface/IDInterface';
import { tmdbITEM, tmdbItemForFlatlist, tmdbJsonGET } from './utils/interface/MovieInterface';
import CustomButton from '../../../../utils/CustomButton';
import CustomModal from './QRcomponents/Modal/CustomModal';
import { renderItem } from './QRcomponents/ListItem/TMDBListItem';
import { getImageApi } from '../../../../utils/Image';
import { ListItemstyles } from './QRcomponents/ListItem/styles';
interface IQRState {
    scan: boolean,
    scanResult: boolean
    result: any,
    selected: IMovieIDItem,
}

const QRPageScreen = () => {
    const [movies, setMovies] = useState<tmdbITEM[]>([]);
    const [dataLoading, setDataLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [scanSuccess, setScanSuccess] = useState<IQRState>({
        scan: false,
        scanResult: false,
        result: "",
        selected: {} as IMovieIDItem,
    });
    //After scan, onSuccess starts
    const onSuccess = async (event: any) => {
        setScanSuccess({
            result: event,
            scan: false,
            scanResult: true,
            selected: {} as IMovieIDItem,
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
                selected: {} as IMovieIDItem,
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
            const result = await request.json() as tmdbJsonGET;
            //if total_results are 0, open an Alert which asks if you want to search with the strongerRegex (total_results is from the JSON request)
            if (result.total_results === 0) {
                return Alert.alert(
                    `Title not found`,
                    `Couldnt find title \n\n"${lightTitleArray[0].trim()}" \n\nSearch with "${strongTitleArray[0].trim()}" instead?`,
                    [
                        {
                            text: "Cancel",
                            onPress: () => setScanSuccess({ result: "", scan: false, scanResult: false, selected: {} as IMovieIDItem, }),
                            style: "destructive",
                        },
                        {
                            text: "Yes",
                            onPress: async () => {
                                const betterRequest = await fetch(`${TMDBRequest}${encodeURI(strongTitleArray[0]).trim()}`)
                                console.log(`${TMDBRequest}${encodeURI(strongTitleArray[0]).trim()}`)
                                const betterResult = await betterRequest.json();
                                setMovies(betterResult.results);
                                setDataLoading(true)
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
        setScanSuccess({ result: "", scan: true, scanResult: false, selected: {} as IMovieIDItem, })
    }
    const closeModal = () => {
        setShowModal(false)
    }
    const openPopup = async (movieID: number) => {
        const request = await fetch(buildIDUrl(movieID))
        console.log(request)
        console.log(buildIDUrl(movieID))
        const result: IMovieIDItem = await request.json();
        setScanSuccess(prevState => {
            return { ...prevState, selected: result, }
        })
        setShowModal(true)

        console.log(movieID)
    }

    const renderItem: ListRenderItem<tmdbITEM> = ({ item }) => (
        <TouchableHighlight
            key={item.id}
            onPress={() => openPopup(item.id)}
        >
            <View style={ListItemstyles.resultMovie}>
                <Text style={ListItemstyles.headertext}>
                    {item.title !== undefined ? item.title : item.original_title}
                </Text>
                <Text>
                    {/* {movie.overview} */}
                </Text>
                <Image
                    source={getImageApi(item.poster_path)}
                    // defaultSource={
                    //     require('../../../../../../assets/images/not_found.png')
                    // }
                    style={ListItemstyles.Images}
                    resizeMode="cover"
                />
            </View>
        </TouchableHighlight>
    );

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
                            keyExtractor={(movie, index) => `${movie.id}-${index}`}
                            showsVerticalScrollIndicator={true}
                            renderItem={renderItem}
                            keyboardShouldPersistTaps='always'
                        />

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <CustomButton
                                style={styles.StopScan}
                                mode={"outlined"}
                                color={"#fff"}
                                onPress={() => setScanSuccess(prevState => {
                                    return { ...prevState, scan: false, scanResult: false }
                                })}
                                Text={"Stop"}
                            />
                            <CustomButton
                                style={styles.ScanAgain}
                                mode={"outlined"}
                                color={"#fff"}
                                onPress={scanAgain}
                                Text={"Scan Again"}
                            />
                        </View>
                        <CustomModal
                            item={scanSuccess.selected}
                            onPress={closeModal}
                            visible={showModal}
                        />
                    </Fragment> : <></>
                }

                {scanSuccess.scan ?
                    <QRCodeScanner
                        reactivate={true}
                        showMarker={true}
                        onRead={onSuccess}
                        bottomContent={
                            <View>
                                <CustomButton
                                    style={styles.StopScan}
                                    mode="outlined"
                                    color='#fff'
                                    onPress={() => setScanSuccess(prevState => {
                                        return { ...prevState, scan: false }
                                    })}
                                    Text={"Stop Scan"}
                                />
                            </View>
                        }
                    /> : <></>
                }
            </Fragment>
        </View>
    )
}

export default QRPageScreen;