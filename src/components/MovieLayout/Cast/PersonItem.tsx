import React from 'react';
import {Image, Text, View} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {getImageApi} from '../../utils/Image';
import {styles} from './styles';

interface ICastInterface {
  name: string;
  image: string | null;
  original_name: string;
  credit_id: string;
}

export const PeopleItem: React.FC<ICastInterface> = ({
  credit_id,
  name,
  image,
  original_name,
}: ICastInterface) => {
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
