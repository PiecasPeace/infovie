import React, {Fragment} from 'react';
import {FlatList, ListRenderItem, View} from 'react-native';
import CustomButton from '../../../../../utils/CustomButton';
import {styles} from '../styles';
import {tmdbITEM} from '../utils/interface/MovieInterface';

interface IQRPageMovieListProps {
  movies: tmdbITEM[];
  renderItem: ListRenderItem<tmdbITEM>;
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
