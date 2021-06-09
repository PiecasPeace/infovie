import React from 'react';
import {WebView} from 'react-native-webview';
import {IMovieIDInterface} from '../../../../constants/Interfaces/IMovieByIDInterface';
import Screen from '../../../Screen/Screen';
import Spinner from '../../../Spinner/Spinner';

import styles from './styles';

const Loading = () => <Spinner style={styles.container} />;
interface MovieDataProps {
  item: IMovieIDInterface;
}

export const MovieVideo: React.FC<MovieDataProps> = ({
  item,
}: MovieDataProps) => {
  return (
    <Screen>
      <WebView
        source={{
          uri: `https://www.youtube.com/embed/${item.videos.results[0].key}?start=0`,
        }}
        startInLoadingState
        renderLoading={Loading}
      />
    </Screen>
  );
};

export default MovieVideo;
