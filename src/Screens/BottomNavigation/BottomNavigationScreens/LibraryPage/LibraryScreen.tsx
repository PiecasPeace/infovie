import React, { useContext } from 'react';
import {View, Button, Text} from 'react-native';
// import {CustomButton} from '../../../components/CustomButton/CustomButton';
import AsyncStorage from '@react-native-community/async-storage';
import {PINK} from '../../../../constants/Colors';
import {CustomButton} from '../../../../components/CustomButton/CustomButton';
import { MapContext } from '../../Context/MapContext';

export const LibraryScreen: React.FC = ({navigation}: any) => {
  const getmyMovies = async () => {
    // const myFavList = await AsyncStorage.getItem(STORAGE_MOVIE)
  };

  return (
    <View style={{backgroundColor: '#55505e'}}>
      <Text>MY COLLECTION</Text>
      <View style={{marginTop: 571, height: 40}}>
        <CustomButton
          Text="Go back to Home"
          color={PINK}
          mode="outlined"
          style={{height: 50}}
          onPress={() => navigation.navigate('Home')}
        />
      </View>
    </View>
  );
};
