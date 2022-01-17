import React from 'react';
import {Platform, ActivityIndicator, View, StyleSheet} from 'react-native';
import {DARK_PURPLE} from '../../constants/Colors/colorpalette';

const Spinner = ({size = 50 || String, color = DARK_PURPLE}) => (
  <View style={styles.spinnerStyle}>
    {Platform.OS === 'ios' ? (
      <ActivityIndicator size="small" color={color} />
    ) : (
      <ActivityIndicator size={size} color={color} />
    )}
  </View>
);

const styles = StyleSheet.create({
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Spinner;
