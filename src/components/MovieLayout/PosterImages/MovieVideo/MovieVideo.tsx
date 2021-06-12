import React from 'react';
import {WebView} from 'react-native-webview';
import Screen from '../../../Screen/Screen';
import Spinner from '../../../Spinner/Spinner';
import { IMovieVideoProps } from './IMovieVideoProps';

const Loading = () => <Spinner />;

export const MovieVideo: React.FC<IMovieVideoProps> = ({
  route
}: IMovieVideoProps) => {
  const {key} = route.params;
  return (
    <Screen>
      <WebView
        source={{
          uri: `https://www.youtube.com/embed/${key}?start=0`,
        }}
        startInLoadingState
        renderLoading={Loading}
      />
    </Screen>
  );
};

export default MovieVideo;
