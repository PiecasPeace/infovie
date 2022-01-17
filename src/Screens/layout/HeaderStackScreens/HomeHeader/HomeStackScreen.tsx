import React, {Fragment} from 'react';
import HomeScreen from '../../../BottomNavigation/BottomNavigationScreens/HomePage/HomeScreen';
import {CustomHeader} from '../../../../components/Header/Header';
import {RootStackParamList} from '../../../../constants/Navigation/navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MovieVideo from '../../../../components/MovieLayout/PosterImages/video/MovieVideo';
import {DARK_PURPLE} from '../../../../constants/Colors/colorpalette';
import {MovieDetails} from '../../../../components/MovieLayout/MovieDetail/MovieDetails';
import {createStackNavigator} from '@react-navigation/stack';
import {IHomeProps} from './IHomeProps';

const HomeStack = createStackNavigator<RootStackParamList>();
export const HomeStackScreen: React.FC<IHomeProps> = ({
  navigation,
}: IHomeProps) => {
  return (
    <Fragment>
      <CustomHeader
        component={HomeScreen}
        componentName={'Home'}
        componentTitle={'Infovie'}
        onPress={() => navigation.openDrawer()}
        children={
          <Fragment>
            <HomeStack.Screen
              name={'MovieDetails'}
              component={MovieDetails}
              options={{
                title: 'Movie Details',
                headerLeft: () => (
                  <MaterialCommunityIcons.Button
                    name="arrow-left"
                    size={25}
                    style={{backgroundColor: DARK_PURPLE}}
                    onPress={() => navigation.goBack()}
                  />
                ),
              }}
            />
            <HomeStack.Screen
              name={'MovieVideo'}
              component={MovieVideo}
              options={{
                title: 'Youtube Trailer',
                headerLeft: () => (
                  <MaterialCommunityIcons.Button
                    name="arrow-left"
                    size={25}
                    style={{backgroundColor: DARK_PURPLE}}
                    onPress={() => navigation.navigate('MovieDetails')}
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
