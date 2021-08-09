import React, {Fragment} from 'react';
import {FlatList, ListRenderItem, View} from 'react-native';
import {CustomButton} from '../../../../../components/blueprints/CustomButton/CustomButton';
import {styles} from '../styles';
import {ItmdbItem} from '../../../../../constants/Interfaces/IMovieInterface';

interface BarcodeMovieListProps {
  movies: ItmdbItem[];
  renderItem: ListRenderItem<ItmdbItem>;
  stopScanFunction: () => void;
  scanAgainFunction: () => void;
}

export const BarcodeMovieList: React.FC<BarcodeMovieListProps> = ({
  movies,
  renderItem,
  stopScanFunction,
  scanAgainFunction,
}: BarcodeMovieListProps) => {
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
          style={styles.stopScan}
          mode={'outlined'}
          color={'#fff'}
          onPress={stopScanFunction}
          Text={'Stop'}
        />
        <CustomButton
          style={styles.scanAgain}
          mode={'outlined'}
          color={'#fff'}
          onPress={scanAgainFunction}
          Text={'Scan Again'}
        />
      </View>
    </Fragment>
  );
};
