import React from 'react';
import {Image, Text, View} from 'react-native';
import {getImageApi} from '../../../constants/utils/Image';
import {CustomTouchableOpacity} from '../../blueprints/CustomTouchableOpacity/CustomTouchableOpacity';
import {ICastProps} from './ICastProps';
import {styles} from './styles';

export const CastItem: React.FC<ICastProps> = ({
  credit_id,
  name,
  image,
  original_name,
  onPress,
}: ICastProps) => {
  return (
    <CustomTouchableOpacity
      key={credit_id}
      onPress={onPress}
      activeOpacity={0.5}>
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
    </CustomTouchableOpacity>
  );
};
