import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {WHITE} from '../../../../constants/Colors/colorpalette';


for (let i = 0; i < 100; i++) {
  if (i % 3 === 0) {
    console.log('Fizz: ' + i);
  }
  if (i % 5 === 0) {
    console.log('Buzz: ' + i);
  }
  if (i % 3 === 0 && i % 5 === 0) {
    console.log('FizzBuzz: ' + i);
  } else {
    console.log(i);
  }
}
console.log('-----------------------------');



export const ExploreScreen = () => {
  return (
    <View style={styles.container}>
      {/* <MovieFlatList /> */}
      <Text style={{color: WHITE}}>EXPLORE</Text>
      {/* <Text>{FizzCalculator}</Text> */}
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
