import React from 'react';
import {Platform, ActivityIndicator, View} from 'react-native';

import {DARK_PURPLE} from '../../constants/Colors';

const Spinner = ({style = {}, size = 50 || String, color = DARK_PURPLE}) => (
  <View style={style}>
    {Platform.OS === 'ios' ? (
      <ActivityIndicator size="small" color={color} />
    ) : (
      <ActivityIndicator size={size} color={color} />
    )}
  </View>
);

export default Spinner;
