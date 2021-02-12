import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import {CustomFlatlist} from './Flatlist/CustomFlatlist';
import RequestPath from '../../../../constants/RequestPath';
import {styles} from './styles';
import {CustomButton} from '../../../../components/CustomButton/CustomButton';
import {
  DARK_BLUE,
  DARK_PURPLE,
  WHITE,
} from '../../../../constants/Colors/Colors';
import DropDownPicker from 'react-native-dropdown-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Spinner from '../../../../components/Spinner/Spinner';

const HomePageScreen: React.FC = () => {
  const [dropdownString, setDropdownString] = useState(RequestPath.MostPopular);
  const [loading, setLoading] = useState(true);
  const activateLoading = () => {
    setLoading(false);
  };
  useEffect(() => {
    activateLoading();
  }, [dropdownString]);
  return (
    <View style={styles.container}>
      {loading ? (
        <Spinner />
      ) : (
        <DropDownPicker
          placeholder="Change List"
          style={styles.dropDownPicker}
          containerStyle={styles.dropContainer}
          onChangeItem={(item) => setDropdownString(item.value)}
          itemStyle={styles.dropItem}
          labelStyle={styles.dropLabel}
          selectedLabelStyle={styles.dropSelectedLabel}
          dropDownStyle={styles.dropListStyle}
          arrowStyle={styles.dropArrow}
          arrowColor={WHITE}
          items={[
            {
              label: 'Most Popular',
              value: RequestPath.MostPopular,
              icon: () => (
                <MaterialCommunityIcons name="podium" size={30} color={WHITE} />
              ),
            },
            {
              label: 'Top Rated',
              value: RequestPath.TopRated,
              icon: () => (
                <MaterialCommunityIcons
                  name="chart-bar"
                  size={30}
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
                  size={30}
                  color={WHITE}
                />
              ),
            },
          ]}
        />
      )}

      <CustomFlatlist fetchUrl={dropdownString} />
    </View>
  );
};

export default HomePageScreen;
