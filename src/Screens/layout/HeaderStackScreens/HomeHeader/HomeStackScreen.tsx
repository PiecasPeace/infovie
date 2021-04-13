import React, {Fragment, useState} from 'react';
import HomeScreen from '../../../BottomNavigation/BottomNavigationScreens/HomePage/HomeScreen';
import {CustomHeader} from '../../../../components/Header/Header';
import AsyncStorage from '@react-native-community/async-storage';
import {View} from 'react-native';
import Spinner from '../../../../components/Spinner/Spinner';
import {STORAGE_MOVIE_KEY} from '../../../../constants/HandleAsyncStorage/HandleAS';
import {HomeProps} from '../../../../constants/types';

export const HomeStackScreen: React.FC<HomeProps> = ({
  navigation,
}: HomeProps) => {
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    setLoading(true);
    await AsyncStorage.getItem(STORAGE_MOVIE_KEY);
    setLoading(false);
    return (
      <View>
        <Spinner />
      </View>
    );
  };
  return (
    <Fragment>
      {loading ? (
        fetchData
      ) : (
        <CustomHeader
          component={HomeScreen}
          componentName={'HomePage'}
          componentTitle={'Infovie'}
          onPress={() => navigation.openDrawer()}
        />
      )}
    </Fragment>
  );
};
