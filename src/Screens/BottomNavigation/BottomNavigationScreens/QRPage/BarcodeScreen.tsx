import React, {Fragment, useState} from 'react';
import {View, Text, Linking, ListRenderItem} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {styles} from './styles';
import {getFirstWord, removeSpecialSigns} from './Regex/Regex';
import RequestMovieTitleByBarcode from '../../../../constants/APICalls/RequestMovieTitleByBarcode';
import {CustomButton} from '../../../../components/CustomButton/CustomButton';
import {MoviePopup} from './MoviePopup/MoviePopup';
import {BarcodeMovieList} from './MovieList/BarcodeMovieList';
import {QRPageNoTitleAlert} from './MovieNoTitleAlert/QRPageNoTitleAlert';
import {
  tmdbGetById,
  tmdbGetByTitle,
} from '../../../../constants/APICalls/APICallsTMDB';
import {extractMovieTitles} from './utils/TitleUtilities';
import AsyncStorage from '@react-native-community/async-storage';
import {STORAGE_MOVIE_KEY} from '../../Context/ContextProvider';
import _ from 'lodash';
import {MovieLayout} from '../../../../components/MovieLayout/MovieLayout';
import {IUPCItem} from './Interfaces/IupcInterface';
import {IMovieIDItem} from './Interfaces/IMovieByIDInterface';
import {ItmdbItem, ItmdbJsonGET} from './Interfaces/IMovieInterface';
import {
  DARK_GRAY,
  NEUTRAL_GREEN,
  PINK,
  WHITE,
} from '../../../../constants/Colors/colorpalette';
import {IBarcodeState} from './IBarcodeState';
import {ShowHistory} from './MovieHistory/HistoryItem';
import {handleHistoryOrder} from './MovieHistory/handleHistoryOrder';

const BarcodeScreen: React.FC = () => {
  let FavoritenMap = new Map<number, ItmdbItem>();
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
    result: null,
    selected: {} as IMovieIDItem,
  });

  //After scan, onSuccess starts
  const onSuccess = async (event: IUPCItem) => {
    setScanSuccess({
      result: event,
      scan: false,
      scanResult: true,
      selected: {} as IMovieIDItem,
    });
    //For QR-Scan
    const check = event.data.substring(0, 4);
    if (check === 'http') {
      Linking.openURL(event.data).catch((err) =>
        console.error('Error at QRCode HTTP check', err),
      );
    } else {
      setScanSuccess({
        result: event,
        scan: false,
        scanResult: true,
        selected: {} as IMovieIDItem,
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

  const handleFavoriteLoop = (result: ItmdbJsonGET) => {
    for (let i = 0; i < result.results.length; i++) {
      if (FavoritenMap.get(result.results[i].id) !== undefined) {
        result.results[i].favorite = true;
      } else {
        result.results[i].favorite = false;
      }
      MovieMapBody = MovieMapBody.set(result.results[i].id, result.results[i]);
      updateMap(result.results[i].id, result.results[i]);
    }
    setBarcodeMovie(MovieMapBody);
  };
 
   const requestByHistoryTitle = async (index:number) => {
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
          QRPageNoTitleAlert(
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
  const handleMovieDetails = async (result: IMovieIDItem) => {
    setScanSuccess((prevState) => {
      return {...prevState, selected: result};
    });
    setMovieDetail(true);
  };
  const deleteFavorite = async (id: number) => {
    const item = await AsyncStorage.getItem(STORAGE_MOVIE_KEY);
    if (item !== null) {
      FavoritenMap = new Map<number, ItmdbItem>(JSON.parse(item));
      FavoritenMap.delete(id);
      await AsyncStorage.setItem(
        STORAGE_MOVIE_KEY,
        JSON.stringify([...FavoritenMap]),
      );
    }
  };
  const saveFavorite = async (myMovies: ItmdbItem) => {
    const oldFavorites = await AsyncStorage.getItem(STORAGE_MOVIE_KEY);
    if (oldFavorites !== null) {
      FavoritenMap = new Map<number, ItmdbItem>(JSON.parse(oldFavorites));
    }
    FavoritenMap.set(myMovies.id, myMovies);
    if (myMovies !== null) {
      await AsyncStorage.setItem(
        STORAGE_MOVIE_KEY,
        JSON.stringify([...FavoritenMap]),
      );
      console.log(`Movie saved: ${myMovies.title} \n `);
    }
  };

  const StoreOwnMovie = async (id: number) => {
    let favoriteMovieValues = _.cloneDeep(barcodeMovie.get(id));
    if (favoriteMovieValues !== undefined) {
      favoriteMovieValues.favorite = !favoriteMovieValues.favorite;
      try {
        updateMap(id, favoriteMovieValues);
        if (favoriteMovieValues.favorite) {
          saveFavorite(favoriteMovieValues);
        } else {
          deleteFavorite(favoriteMovieValues.id);
        }
      } catch (err) {
        err.message;
      }
    }
  };
  const TrendingList: ListRenderItem<ItmdbItem> = ({item}) => (
    <MovieLayout
      openDetails={() => openMovieDetails(item.id)}
      StoreFavoriteMovies={() => StoreOwnMovie(item.id)}
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
              <MoviePopup
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
export default BarcodeScreen;
