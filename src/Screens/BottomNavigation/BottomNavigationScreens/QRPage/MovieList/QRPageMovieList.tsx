import React, {Fragment} from 'react';
import {FlatList, ListRenderItem, View} from 'react-native';
import {CustomButton} from '../../../../../components/CustomButton/CustomButton';
import {styles} from '../styles';
import {ItmdbITEM} from '../Interfaces/IMovieInterface';

interface IQRPageMovieListProps {
  movies: ItmdbITEM[];
  renderItem: ListRenderItem<ItmdbITEM>;
  stopScanFunction: () => void;
  scanAgainFunction: () => void;
}

export const QRPageMovieList: React.FC<IQRPageMovieListProps> = ({
  movies,
  renderItem,
  stopScanFunction,
  scanAgainFunction,
}: IQRPageMovieListProps) => {
  return (
    <Fragment>
      <FlatList
        data={movies}
        keyExtractor={(movie, index) => `${movie.id}-${index}`}
        showsVerticalScrollIndicator={true}
        renderItem={renderItem}
        keyboardShouldPersistTaps="always"
      />
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <CustomButton
          style={styles.StopScan}
          mode={'outlined'}
          color={'#fff'}
          onPress={stopScanFunction}
          Text={'Stop'}
        />
        <CustomButton
          style={styles.ScanAgain}
          mode={'outlined'}
          color={'#fff'}
          onPress={scanAgainFunction}
          Text={'Scan Again'}
        />
      </View>
    </Fragment>
  );
};
