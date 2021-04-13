import React, {Fragment, useState} from 'react';
import {View} from 'react-native';
import {CustomFlatlist} from './Flatlist/CustomFlatlist';
import RequestPath from '../../../../constants/RequestPath';
import {styles} from './styles';
import {WHITE} from '../../../../constants/Colors/colorpalette';
import DropDownPicker from 'react-native-dropdown-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {STORAGE_MOVIE_KEY} from '../../../../constants/HandleAsyncStorage/HandleAS';
import {ItmdbItem} from '../QRPage/Interfaces/IMovieInterface';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from '../../../../components/Spinner/Spinner';

interface fetchFavoriteMap {
  favoMap: Map<number, ItmdbItem>;
}

const HomeScreen: React.FC = () => {
  const [dropdownString, setDropdownString] = useState(RequestPath.MostPopular);
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
    <View style={styles.container}>
      {loading ? (
        fetchData()
      ) : (
        // loadingFavoriteMovies()
        <Fragment>
          <DropDownPicker
            placeholder="Choose List"
            style={styles.dropDownPicker}
            containerStyle={styles.dropContainer}
            onChangeItem={(item) => setDropdownString(item.value)}
            itemStyle={styles.dropItem}
            labelStyle={styles.dropLabel}
            selectedLabelStyle={styles.dropSelectedLabel}
            dropDownStyle={styles.dropListStyle}
            arrowColor={WHITE}
            items={[
              {
                label: 'Most Popular',
                value: RequestPath.MostPopular,
                icon: () => (
                  <MaterialCommunityIcons
                    name="podium"
                    size={25}
                    color={WHITE}
                  />
                ),
              },
              {
                label: 'Top Rated',
                value: RequestPath.TopRated,
                icon: () => (
                  <MaterialCommunityIcons
                    name="chart-bar"
                    size={25}
                    color={WHITE}
                  />
                ),
              },
              {
                label: 'Trending',
                value: RequestPath.Trending,
                icon: () => (
                  <MaterialCommunityIcons
                    name="trending-up"
                    size={25}
                    color={WHITE}
                  />
                ),
              },
            ]}
          />
          <CustomFlatlist fetchUrl={dropdownString} />
        </Fragment>
      )}
    </View>
  );
};

export default HomeScreen;
