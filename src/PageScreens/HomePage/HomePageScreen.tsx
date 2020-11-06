import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {CustomFlatlist} from './Flatlist/CustomFlatlist';
import RequestPath from '../../constants/RequestPath';
import {WHITE, PINK} from '../../constants/Colors';

const HomePageScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.TrendingText}>Most Popular</Text>

      <CustomFlatlist fetchUrl={RequestPath.MostPopular} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#55505e',
    justifyContent: 'flex-start',
    paddingTop: 10,
    paddingBottom: 10,
  },
  TrendingText: {
    color: WHITE,
    borderBottomColor: PINK,
  },
});

export default HomePageScreen;
