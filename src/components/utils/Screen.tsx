import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';

const Screen = ({children}) => (
  <SafeAreaView style={styles.container}>
    <StatusBar barStyle="dark-content" />
    {children}
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Screen;
