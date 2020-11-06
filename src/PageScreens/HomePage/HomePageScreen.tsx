import React from 'react';
import {View, Text} from 'react-native';
import {CustomFlatlist} from './Flatlist/CustomFlatlist';
import RequestPath from '../../constants/RequestPath';
import {styles} from './styles';

const HomePageScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.trendingText}>Most Popular</Text>
      </View>

      <CustomFlatlist fetchUrl={RequestPath.MostPopular} />
    </View>
  );
};

export default HomePageScreen;
