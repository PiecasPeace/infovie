import React, {useState} from 'react';
import {View} from 'react-native';
import {CustomFlatlist} from './Flatlist/CustomFlatlist';
import RequestPath from '../../../../constants/RequestPath';
import {styles} from './styles';
import {WHITE} from '../../../../constants/Colors/Colors';
import DropDownPicker from 'react-native-dropdown-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeScreen: React.FC = () => {
  const [dropdownString, setDropdownString] = useState(RequestPath.MostPopular);
  return (
    <View style={styles.container}>
      <View>
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
                <MaterialCommunityIcons name="podium" size={25} color={WHITE} />
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
      </View>
      <CustomFlatlist fetchUrl={dropdownString} />
    </View>
  );
};

export default HomeScreen;
