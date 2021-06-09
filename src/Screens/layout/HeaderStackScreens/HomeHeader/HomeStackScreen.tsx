import React, {Fragment, useState} from 'react';
import HomeScreen from '../../../BottomNavigation/BottomNavigationScreens/HomePage/HomeScreen';
import {CustomHeader} from '../../../../components/Header/Header';
import AsyncStorage from '@react-native-community/async-storage';
import {View} from 'react-native';
import Spinner from '../../../../components/Spinner/Spinner';
import {STORAGE_MOVIE_KEY} from '../../../../constants/HandleAsyncStorage/HandleAS';
import {HomeProps} from '../../../../constants/Navigation/navigation';
import {createStackNavigator} from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MovieVideo from '../../../../components/MovieLayout/PosterImages/MovieVideo/MovieVideo';
import {DARK_PURPLE} from '../../../../constants/Colors/colorpalette';
import { MovieDetails } from '../../../../components/MovieLayout/MoviePopup/MovieDetails';

const HomeStack = createStackNavigator();
export const HomeStackScreen: React.FC<HomeProps> = ({
  navigation
}: HomeProps) => {
  return (
    <Fragment>
      <CustomHeader
        component={HomeScreen}
        componentName={'HomePage'}
        componentTitle={'Infovie'}
        onPress={() => navigation.openDrawer()}
        children={
          <Fragment>
            <HomeStack.Screen
              name={'MovieVideoScreen'}
              component={MovieVideo}
              options={{
                title: 'Movie',
                headerLeft: () => (
                  <MaterialCommunityIcons.Button
                    name="menu-open"
                    size={25}
                    style={{backgroundColor: DARK_PURPLE}}
                    onPress={() => navigation.openDrawer()}
                  />
                ),
              }}
            />
             <HomeStack.Screen
              name={'MovieDetailScreen'}
              component={MovieDetails}
              options={{
                title: 'Movie',
                headerLeft: () => (
                  <MaterialCommunityIcons.Button
                    name="menu-open"
                    size={25}
                    style={{backgroundColor: DARK_PURPLE}}
                    onPress={() => navigation.openDrawer()}
                  />
                ),
              }}
            />
          </Fragment>
        }
      />
    </Fragment>
  );
};
