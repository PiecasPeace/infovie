import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';

export const renderScore = (voteAverage: number) => {
  const color =
  voteAverage == 10 ? "lime" :
    voteAverage == 0
      ? 'zero'
      : voteAverage < 5
      ? 'low'
      : voteAverage >= 5 && voteAverage < 7
      ? 'mid'
      : 'high';
  return (
    <View style={[styles.score, styles[color]]}>
      <Text style={styles.textPercent}>{voteAverage}</Text>
    </View>
  );
};
