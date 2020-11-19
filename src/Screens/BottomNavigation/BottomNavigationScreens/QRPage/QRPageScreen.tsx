import React, {Fragment, useState} from 'react';
import {
  View,
  Text,
  Linking,
  Image,
  ListRenderItem,
  TouchableHighlight,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {Button} from 'react-native-paper';
import {styles} from './styles';
import Spinner from '../../../../components/Spinner/Spinner';
import {getFirstWord, removeSpecialSigns} from './Regex/Regex';
import RequestMovieTitleByBarcode from './APICalls/RequestMovieTitleByBarcode';
import {IMovieIDItem} from './Interfaces/IMovieByIDInterface';
import {tmdbITEM} from './Interfaces/IMovieInterface';
import {CustomButton} from '../../../../components/CustomButton/CustomButton';
import {MoviePopup} from './MoviePopup/MoviePopup';
import {getImageApi} from '../../../../components/utils/Image';
import {QRPageMovieList} from './MovieList/QRPageMovieList';
import {QRPageNoTitleAlert} from './MovieNoTitleAlert/QRPageNoTitleAlert';
import {tmdbGetById, tmdbGetByTitle} from './APICalls/APICallsTMDB';
import {extractMovieTitles} from './utils/TitleUtilities';

interface IQRState {
  scan: boolean;
  scanResult: boolean;
  result: any;
  selected: IMovieIDItem;
}

const QRPageScreen: React.FC = () => {
  const [movies, setMovies] = useState<tmdbITEM[]>([]);
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
      Linking.openURL(event.data).catch((err) =>
        console.error(
          'An error occured, please Check if the URL is correct',
          err,
        ),
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
    await RequestMovieTitleByBarcode(event.data)
      .then((titleList) => {
        //api call movie DB with title parameter
        requestByBarcodeTitle(titleList);
      })
      .catch((message) => {
        console.log('failed fetching: ' + message);
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
      setMovies([]);
      //fetch url with the lighterRegex
      tmdbGetByTitle(titleWithoutSpecialSigns[0]).then((result) => {
        if (result.total_results === 0) {
          QRPageNoTitleAlert(
            titleWithoutSpecialSigns[0],
            firstWordOfTitle[0],
            () => scanStop(),
            () => continueScanning(firstWordOfTitle[0]),
          );
        } else {
          setMovies(result.results);
          settmdbDataLoaded(true);
        }
      });
      //if total_results are 0, open an Alert which asks if you want to search with the strongerRegex (total_results is from the JSON request)
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
    tmdbGetByTitle(strongTitle).then((betterResult) => {
      setMovies(betterResult.results);
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
  const renderItem: ListRenderItem<tmdbITEM> = ({item}) => (
    <TouchableHighlight key={item.id} onPress={() => openMovieDetails(item.id)}>
      <View style={styles.containerItem}>
        <Text style={styles.headertext}>
          {item.title !== undefined ? item.title : item.original_title}
        </Text>
        <Image
          source={getImageApi(item.poster_path)}
          defaultSource={require('../../../../assets/images/not_found.png')}
          style={styles.photo}
          resizeMode="cover"
        />
      </View>
    </TouchableHighlight>
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
              movies={movies}
              renderItem={renderItem}
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
