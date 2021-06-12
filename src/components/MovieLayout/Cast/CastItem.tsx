import React from 'react';
import {Image, Text, View} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {getImageApi} from '../../../constants/utils/Image';
import {ICastProps} from './ICastProps';
import {styles} from './styles';

export const CastItem: React.FC<ICastProps> = ({
  credit_id,
  name,
  image,
  original_name,
}: ICastProps) => {
  return (
    <TouchableHighlight key={credit_id}>
      <View style={styles.castContainer}>
        <View>
          <Text numberOfLines={1} style={styles.character}>
            {name}
          </Text>
        </View>
        <Image
          source={getImageApi(image)}
          style={styles.photo}
          resizeMode="cover"
        />
        <Text numberOfLines={1} style={styles.name}>
          {original_name}
        </Text>
      </View>
    </TouchableHighlight>
  );
};
