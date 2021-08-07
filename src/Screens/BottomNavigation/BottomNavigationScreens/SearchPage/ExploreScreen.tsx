import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {WHITE} from '../../../../constants/Colors/colorpalette';

export const ExploreScreen = () => {
  return (
    <View style={styles.container}>
      {/* <MovieFlatList /> */}
      <Text style={{color: WHITE}}>EXPLORE</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#55505e',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 10,
    paddingBottom: 10,
  },
});
