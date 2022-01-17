import React, {Fragment, useState} from 'react';
import {View, Text, Linking, ListRenderItem} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {styles} from './styles';
import {getFirstWord, removeSpecialSigns} from './Regex/Regex';
import {RequestMovieTitleByBarcode} from '../../../../constants/services/RequestMovieTitleByBarcode';
import {CustomButton} from '../../../../components/blueprints/CustomButton/CustomButton';
import {MovieDetails} from '../../../../components/MovieLayout/MovieDetail/MovieDetails';
import {BarcodeMovieList} from './MovieList/BarcodeMovieList';
import {NoTitleFoundAlert} from './MovieNoTitleAlert/NoTitleFoundAlert';
import {
  tmdbGetById,
  tmdbGetByTitle,
} from '../../../../constants/services/APICallsTMDB';
import {extractMovieTitles} from './utils/TitleUtilities';
import _ from 'lodash';
import {MovieLayout} from '../../../../components/MovieLayout/MovieItem/MovieLayout';
import {IUPCInterface} from '../../../../constants/Interfaces/IupcInterface';
import {IMovieIDInterface} from '../../../../constants/Interfaces/IMovieByIDInterface';
import {ItmdbItem, ItmdbJsonGET} from '../../../../constants/Interfaces/IMovieInterface';
import {
  DARK_GRAY,
  NEUTRAL_GREEN,
  WHITE,
} from '../../../../constants/Colors/colorpalette';
import {IBarcodeState} from './IBarcodeState';
import {ShowHistory} from './MovieHistory/HistoryItem';
import {handleHistoryOrder} from './MovieHistory/handleHistoryOrder';
import {
  handleMovies,
  loadFavorites,
} from '../../../../constants/HandleAsyncStorage/HandleAS';

export const BarcodeScreen: React.FC = () => {
  let favoriteMap = new Map<number, ItmdbItem>();
  let MovieMapBody = new Map<number, ItmdbItem>();

  const [barcodeMovie, setBarcodeMovie] = useState<Map<number, ItmdbItem>>(
    new Map<number, ItmdbItem>(),
  );
  const [tmdbdataLoaded, settmdbDataLoaded] = useState(false);
  const [movieDetail, setMovieDetail] = useState(false);
  const [loadedID, setLoadedID] = useState(false);
  const [history, setHistory] = useState<String[]>([]);
  const [scanSuccess, setScanSuccess] = useState<IBarcodeState>({
    scan: false,
    scanResult: false,
    result: {} as IUPCInterface,
    selected: {} as IMovieIDInterface,
  });

  //After scan, onSuccess starts
  const onSuccess = async (event: IUPCInterface) => {
    setScanSuccess({
      result: event,
      scan: false,
      scanResult: true,
      selected: {} as IMovieIDInterface,
    });
    //For QR-Scan
    const check = event.data.substring(0, 4);
    const checkIP = event.data.substring(0, 11);
    if (check === 'http' || checkIP === '192.168.0.1') {
      Linking.openURL(event.data).catch((err) =>
        console.error('Error at QRCode HTTP/IP check', err),
      );
    } else {
      setScanSuccess({
        result: event,
        scan: false,
        scanResult: true,
        selected: {} as IMovieIDInterface,
      });
    }
    console.log(event);
    //api call upc DB (passing event.data, which is the barcode, titleList will be the title for the tmdb)
    await RequestMovieTitleByBarcode(event.data)
      .then((titleList) => {
        //api call movie DB with title parameter
        requestByBarcodeTitle(titleList);
      })
      .catch((message) => {
        console.log('failed onSuccess fetching: ' + message);
      });
  };

  const handleFavoriteLoop = async (result: ItmdbJsonGET) => {
    favoriteMap = await loadFavorites(favoriteMap);
    for (let i = 0; i < result.results.length; i++) {
      if (favoriteMap.get(result.results[i].id) !== undefined) {
        result.results[i].favorite = true;
      } else {
        result.results[i].favorite = false;
      }
      MovieMapBody = MovieMapBody.set(result.results[i].id, result.results[i]);
      updateMap(result.results[i].id, result.results[i]);
    }
    setBarcodeMovie(MovieMapBody);
  };

  const requestByHistoryTitle = async (index: number) => {
    try {
      setBarcodeMovie(new Map<number, ItmdbItem>());
      await tmdbGetByTitle(`${history[index]}`).then((result) => {
        handleFavoriteLoop(result);
        settmdbDataLoaded(true);
        setScanSuccess((prevState) => {
          return {...prevState, scanResult: true};
        });
      });
    } catch (error) {
      console.log('FetchProblem -> requestByHistoryTitle: ' + error.message);
      throw error;
    }
  };
  const updateMap = (id: number, movieValues: ItmdbItem) => {
    setBarcodeMovie(
      new Map<number, ItmdbItem>(barcodeMovie.set(id, movieValues)),
    );
  };

  const requestByBarcodeTitle = async (title: string[]) => {
    let titleWithoutSpecialSigns = extractMovieTitles(
      title,
      removeSpecialSigns,
    );
    let firstWordOfTitle = extractMovieTitles(title, getFirstWord);
    try {
      //before every scan, we clear setMovies so we dont see it in the background after second scan
      setBarcodeMovie(new Map<number, ItmdbItem>());
      //fetch url with the lighterRegex
      tmdbGetByTitle(titleWithoutSpecialSigns[0]).then((result) => {
        //IF total_results are 0, open alert which asks to search with the stronger Regex.
        if (result.total_results === 0) {
          NoTitleFoundAlert(
            titleWithoutSpecialSigns[0],
            firstWordOfTitle[0],
            () => scanStop(),
            () => continueScanning(firstWordOfTitle[0]),
          );
        } else {
          handleFavoriteLoop(result);
          handleHistoryOrder(titleWithoutSpecialSigns[0], history);
          console.log(history);
          settmdbDataLoaded(true);
        }
      });
    } catch (error) {
      console.log('FetchProblem -> requestBarcodeTitle: ' + error.message);
      throw error;
    }
  };
  const activeQR = () => {
    setScanSuccess((prevState) => {
      return {...prevState, scan: true};
    });
  };
  const scanAgain = () => {
    setScanSuccess((prevState) => {
      return {...prevState, scan: true, scanResult: false};
    });
  };
  const scanStop = () => {
    setScanSuccess((prevState) => {
      return {...prevState, scan: false, scanResult: false};
    });
  };
  const closeModal = () => {
    setMovieDetail(false);
  };
  const continueScanning = async (strongTitle: string) => {
    await tmdbGetByTitle(strongTitle).then((betterResult) => {
      handleFavoriteLoop(betterResult);
      handleHistoryOrder(strongTitle, history);
      settmdbDataLoaded(true);
    });
  };
  const openMovieDetails = async (movieID: number) => {
    setLoadedID(false);
    await tmdbGetById(movieID).then(async (result) => {
      await handleMovieDetails(result);
    });
    setLoadedID(true);
  };
  const handleMovieDetails = async (result: IMovieIDInterface) => {
    setScanSuccess((prevState) => {
      return {...prevState, selected: result};
    });
    setMovieDetail(true);
  };

  const TrendingList: ListRenderItem<ItmdbItem> = ({item}) => (
    <MovieLayout
      openDetails={() => openMovieDetails(item.id)}
      StoreFavoriteMovies={() =>
        handleMovies(item.id, barcodeMovie, favoriteMap, updateMap)
      }
      item={item}
    />
  );

  return (
    <View style={styles.barcodeContainer}>
      <>
        {!scanSuccess.scan && !scanSuccess.scanResult ? (
          <View style={styles.mainContainer}>
            <Text style={styles.descriptionText}>Please scan a Code !</Text>
            {history.length === 0 ? (
              <Text style={{color: DARK_GRAY, fontSize: 20, padding: 30}}>
                Your History will be shown here
              </Text>
            ) : (
              <View style={{flex: 1, padding: 30}}>
                <Text
                  onPress={() => console.log(history[0])}
                  style={{color: WHITE, fontSize: 20}}>
                  {'Your latest Movie(s) \n'}
                </Text>
                <ShowHistory
                  history={history}
                  onPress={requestByHistoryTitle}
                />
              </View>
            )}

            <View style={{flex: 1}}>
              <CustomButton
                color={NEUTRAL_GREEN}
                mode={'contained'}
                Text={'Start Scan'}
                style={styles.activateScan}
                labelStyle={{fontSize: 25}}
                contentStyle={{height: 80}}
                onPress={activeQR}
              />
            </View>
          </View>
        ) : (
          <></>
        )}
        {scanSuccess.scan ? (
          <QRCodeScanner
            reactivate={true}
            showMarker={true}
            onRead={onSuccess}
            bottomContent={
              <View style={{height: 150}}>
                <CustomButton
                  style={styles.stopScan}
                  mode={'outlined'}
                  color={WHITE}
                  onPress={() =>
                    setScanSuccess((prevState) => {
                      return {...prevState, scan: false};
                    })
                  }
                  Text={'Stop Scan'}
                />
              </View>
            }
          />
        ) : (
          <></>
        )}
        {scanSuccess.scanResult && tmdbdataLoaded ? (
          <Fragment>
            <BarcodeMovieList
              movies={Array.from(barcodeMovie.values())}
              renderItem={TrendingList}
              scanAgainFunction={scanAgain}
              stopScanFunction={scanStop}
            />
            {loadedID ? (
              <MovieDetails
                item={scanSuccess.selected}
                onPress={closeModal}
                visible={movieDetail}
              />
            ) : (
              <></>
            )}
          </Fragment>
        ) : (
          <></>
        )}
      </>
    </View>
  );
};
