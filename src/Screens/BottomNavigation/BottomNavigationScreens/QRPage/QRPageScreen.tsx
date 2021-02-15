import React, {Fragment, useContext, useState} from 'react';
import {View, Text, Linking, ListRenderItem} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {Button} from 'react-native-paper';
import {styles} from './styles';
import Spinner from '../../../../components/Spinner/Spinner';
import {getFirstWord, removeSpecialSigns} from './Regex/Regex';
import RequestMovieTitleByBarcode from './APICalls/RequestMovieTitleByBarcode';
import {CustomButton} from '../../../../components/CustomButton/CustomButton';
import {MoviePopup} from './MoviePopup/MoviePopup';
import {QRPageMovieList} from './MovieList/QRPageMovieList';
import {QRPageNoTitleAlert} from './MovieNoTitleAlert/QRPageNoTitleAlert';
import {tmdbGetById, tmdbGetByTitle} from './APICalls/APICallsTMDB';
import {extractMovieTitles} from './utils/TitleUtilities';
import AsyncStorage from '@react-native-community/async-storage';
import {
  FavoriteMapContext, STORAGE_MOVIE_KEY
} from '../../Context/ContextProvider';
import _ from 'lodash';
import {MovieLayout} from '../../../../components/MovieLayout/MovieLayout';
import {IUPCItem} from './Interfaces/IupcInterface';
import {IMovieIDItem} from './Interfaces/IMovieByIDInterface';
import {ItmdbItem} from './Interfaces/IMovieInterface';
import { useSaveFavorite } from '../../Context/HandleMovieStoring';

interface IQRState {
  scan: boolean;
  scanResult: boolean;
  result: any;
  selected: IMovieIDItem;
}

const QRPageScreen: React.FC = () => {
  let ContextFavMap = useContext(FavoriteMapContext);
  const [barcodeMovie, setBarcodeMovie] = useState<Map<number, ItmdbItem>>(
    new Map<number, ItmdbItem>(),
  );
  let MovieMapBody = new Map<number, ItmdbItem>();
  const [tmdbdataLoaded, settmdbDataLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loadedID, setLoadedID] = useState(false);
  const [scanSuccess, setScanSuccess] = useState<IQRState>({
    scan: false,
    scanResult: false,
    result: '',
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
    console.log('WE ARE CONSOLE LOGGING EVENT FOR THE INTERFACE');
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
          for (let i = 0; i < result.results.length; i++) {
            if (ContextFavMap.get(result.results[i].id) !== undefined) {
              result.results[i].favorite = true;
            } else {
              result.results[i].favorite = false;
            }
            MovieMapBody = MovieMapBody.set(
              result.results[i].id,
              result.results[i],
            );
            updateMap(result.results[i].id, result.results[i]);
          }
          setBarcodeMovie(MovieMapBody);
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
    setShowModal(false);
  };
  const continueScanning = async (strongTitle: string) => {
    await tmdbGetByTitle(strongTitle).then((betterResult) => {
      for (let i = 0; i < betterResult.results.length; i++) {
        if (ContextFavMap.get(betterResult.results[i].id) !== undefined) {
          betterResult.results[i].favorite = true;
        } else {
          betterResult.results[i].favorite = false;
        }
        MovieMapBody = MovieMapBody.set(
          betterResult.results[i].id,
          betterResult.results[i],
        );
        updateMap(betterResult.results[i].id, betterResult.results[i]);
      }
      setBarcodeMovie(MovieMapBody);
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
    setShowModal(true);
  };
  const deleteFavorite = async (id: number) => {
    const item = await AsyncStorage.getItem(STORAGE_MOVIE_KEY);
    if (item !== null) {
      ContextFavMap = new Map<number, ItmdbItem>(JSON.parse(item));
      ContextFavMap.delete(id);
      await AsyncStorage.setItem(
        STORAGE_MOVIE_KEY,
        JSON.stringify([...ContextFavMap]),
      );
    }
  };
  const saveFavorite = async (myMovies: ItmdbItem) => {
    const oldFavorites = await AsyncStorage.getItem(STORAGE_MOVIE_KEY);
    if (oldFavorites !== null) {
      ContextFavMap = new Map<number, ItmdbItem>(JSON.parse(oldFavorites));
    }
    ContextFavMap.set(myMovies.id, myMovies);
    if (myMovies !== null) {
      await AsyncStorage.setItem(
        STORAGE_MOVIE_KEY,
        JSON.stringify([...ContextFavMap]),
      );
      console.log(`Movie saved: ${myMovies.title} \n `);
    }
  };

  const StoreOwnMovie = async (id: number) => {
    let favoriteMovieValues = _.cloneDeep(barcodeMovie.get(id));
    if (favoriteMovieValues !== undefined) {
      if (favoriteMovieValues.favorite === false) {
        try {
          favoriteMovieValues.favorite = true;
          updateMap(id, favoriteMovieValues);
          saveFavorite(favoriteMovieValues);
          useSaveFavorite();
        } catch (err) {
          err.message;
        }
      } else {
        try {
          favoriteMovieValues.favorite = false;
          updateMap(id, favoriteMovieValues);
          deleteFavorite(favoriteMovieValues.id);
        } catch (err) {
          err.message;
        }
      }
    }
  };
  const updateMap = (id: number, movieValues: ItmdbItem) => {
    setBarcodeMovie(
      new Map<number, ItmdbItem>(barcodeMovie.set(id, movieValues)),
    );
  };
  const TrendingList: ListRenderItem<ItmdbItem> = ({item}) => (
    <MovieLayout
      Modal={() => openMovieDetails(item.id)}
      StoreFavoriteMovies={() => StoreOwnMovie(item.id)}
      item={item}
    />
  );

  return (
    <View style={styles.QRContainer}>
      <Fragment>
        {!scanSuccess.scan && !scanSuccess.scanResult ? (
          <View>
            <Text style={styles.DescriptionText}>Please scan a Code !</Text>
            <View>
              <Button
                contentStyle={{
                  height: 80,
                  backgroundColor: '#fff0f2',
                  alignContent: 'center',
                }}
                labelStyle={{
                  fontSize: 25,
                }}
                style={styles.activateScan}
                icon="barcode"
                onPress={activeQR}
                color="#400a13"
                mode="outlined">
                <Text>Start Scan</Text>
              </Button>
            </View>
          </View>
        ) : (
          <></>
        )}
        {scanSuccess.scanResult && tmdbdataLoaded ? (
          <Fragment>
            <QRPageMovieList
              movies={Array.from(barcodeMovie.values())}
              renderItem={TrendingList}
              scanAgainFunction={scanAgain}
              stopScanFunction={scanStop}
            />
            {loadedID ? (
              <MoviePopup
                item={scanSuccess.selected}
                onPress={closeModal}
                visible={showModal}
              />
            ) : (
              <></>
            )}
          </Fragment>
        ) : (
          <></>
        )}
        {scanSuccess.scan ? (
          <QRCodeScanner
            reactivate={true}
            showMarker={true}
            onRead={onSuccess}
            bottomContent={
              <View>
                <CustomButton
                  style={styles.StopScan}
                  mode="outlined"
                  color="#fff"
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
      </Fragment>
    </View>
  );
};
export default QRPageScreen;
