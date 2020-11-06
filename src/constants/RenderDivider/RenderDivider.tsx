import React from 'react';
import {Text} from 'react-native';
import {styles} from './styles';

export const renderDivider = (releaseDate: string, originalLanguage: string) =>
  releaseDate && originalLanguage !== 'xx' ? (
    <Text style={styles.trace}>|</Text>
  ) : null;
