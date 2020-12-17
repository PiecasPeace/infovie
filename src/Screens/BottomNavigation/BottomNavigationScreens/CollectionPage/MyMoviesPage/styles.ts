import React from 'react';
import {StyleSheet} from 'react-native';
import {DARK_PURPLE, LIGHT_PURPLE} from '../../../../../constants/Colors';

export const styles = StyleSheet.create({
  myMoviesContainer: {
    flex: 1,
    backgroundColor: DARK_PURPLE,
  },
  collectionItems: {
    flex: 1,
    flexDirection: 'column',
  },
});
