import React from 'react';
import {StyleSheet} from 'react-native';
import {DARK_PURPLE, LIGHT_PURPLE, WHITE} from '../../../../constants/Colors/colorpalette';

export const styles = StyleSheet.create({
  collectionContainer: {
    flex: 1,
    backgroundColor: DARK_PURPLE,
  },
  favoriteButton: {
    // height:60
  },
  moviesIMarkedAsBought: {
    backgroundColor: DARK_PURPLE,
  },
  collectionItems: {
    flex: 1,
    flexDirection: 'column',
  },
});
