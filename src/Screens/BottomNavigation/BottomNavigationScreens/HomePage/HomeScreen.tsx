import React, {Fragment, useState} from 'react';
import {View} from 'react-native';
import {CustomFlatlist} from './Flatlist/CustomFlatlist';
import {styles} from './styles';
import {WHITE} from '../../../../constants/Colors/colorpalette';
import DropDownPicker from 'react-native-dropdown-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { requestPath } from '../../../../constants/RequestPath';


const HomeScreen: React.FC = ({navigation}: any) => {
  const [dropdownString, setDropdownString] = useState(requestPath.MostPopular);
  return (
    <View style={styles.container}>
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
              value: requestPath.MostPopular,
              icon: () => (
                <MaterialCommunityIcons name="podium" size={25} color={WHITE} />
              ),
            },
            {
              label: 'Top Rated',
              value: requestPath.TopRated,
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
              value: requestPath.Trending,
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
        <CustomFlatlist fetchUrl={dropdownString} navigation={navigation} />
      </Fragment>
    </View>
  );
};

export default HomeScreen;
