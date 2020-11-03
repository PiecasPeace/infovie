import React, {Fragment, useState} from 'react';
import {
  View,
  Text,
  Linking,
  Alert,
  FlatList,
  Image,
  ListRenderItem,
  TouchableHighlight,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {Button} from 'react-native-paper';
import {styles} from './styles';
import Spinner from '../../../../utils/Spinner';
import {buildIDUrl, TMDBRequest} from '../../../../../constants/Shortcuts';
import {getFirstWord, removeSpecialSigns} from './utils/interface/Regex/Regex';
import RequestMovieTitleByBarcode from './QRcomponents/APICalls/RequestMovieTitleByBarcode';
import {IMovieIDItem} from './utils/interface/IDInterface';
import {tmdbITEM, tmdbJsonGET} from './utils/interface/MovieInterface';
import CustomButton from '../../../../utils/CustomButton';
import CustomModal from './QRcomponents/Modal/CustomModal';
import {getImageApi} from '../../../../utils/Image';
import {QRPageMovieDetails} from './Refactoring/QRPageMovieDetails';
import {QRPageMovieList} from './Refactoring/QRPageMovieList';
import {QRPageNoTitleAlert} from './Refactoring/QRPageNoTitleAlert';
import {tmdbGetById, tmdbGetByTitle} from './QRcomponents/APICalls/QRPageAPI';
import {extractMovieTitles} from './Refactoring/utils/TitleUtilities';
interface IQRState {
  scan: boolean;
  scanResult: boolean;
  result: any;
  selected: IMovieIDItem;
}

const QRPageScreen = () => {
  const [movies, setMovies] = useState<tmdbITEM[]>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
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
    let titleWithoutSpecialSigns = extractMovieTitles(title, removeSpecialSigns);
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
          setDataLoading(true);
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
      console.log(betterResult);
      setMovies(betterResult.results);
      setDataLoading(true);
    });
  };
  const openMovieDetails = async (movieID: number) => {
    tmdbGetById(movieID).then((result) => {
      console.log(tmdbGetById(movieID));
      setScanSuccess((prevState) => {
        return {...prevState, selected: result};
      });
      setShowModal(true);
    });
  };
  const renderItem: ListRenderItem<tmdbITEM> = ({item}) => (
    <TouchableHighlight key={item.id} onPress={() => openMovieDetails(item.id)}>
      <View style={styles.containerItem}>
        <Text style={styles.headertext}>
          {item.title !== undefined ? item.title : item.original_title}
        </Text>
        <Image
          source={getImageApi(item.poster_path)}
          //   defaultSource={
          //       require('../../../../../../assets/images/not_found.png')
          //   }
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
        {scanSuccess.scanResult && dataLoading ? (
          <Fragment>
            <QRPageMovieList
              movies={movies}
              renderItem={renderItem}
              scanAgainFunction={scanAgain}
              stopScanFunction={scanStop}
            />
            <CustomModal
              item={scanSuccess.selected}
              onPress={closeModal}
              visible={showModal}
            />
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
