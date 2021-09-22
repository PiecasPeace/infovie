import React, {Fragment, useState} from 'react';
import {View} from 'react-native';
import {HomeList} from './Flatlist/HomeList';
import {styles} from './styles';
import {WHITE} from '../../../../constants/Colors/colorpalette';
import DropDownPicker from 'react-native-dropdown-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {requestPath} from '../../../../constants/RequestPath';
import {
  HomeProps,
  RootStackParamList,
} from '../../../../constants/Navigation/navigation';
import {StackNavigationProp} from '@react-navigation/stack';

interface IHomeProps {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
}

const HomeScreen: React.FC<IHomeProps> = ({navigation}: IHomeProps) => {
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
        <HomeList fetchUrl={dropdownString} navigation={navigation} />
      </Fragment>
    </View>
  );
};

export default HomeScreen;
