import React from 'react';
import {Text, View} from 'react-native';
import {FavAndOwnMapContext} from '../../../Context/MapContextProvider';
//import styles from './styles'

export const FavoritePageScreen: React.FC = ({navigation}: any) => {
  let ContextFavMap = React.useContext(FavAndOwnMapContext);
  console.log(FavAndOwnMapContext);
  return (
    <View>
      <View>
        <Text>XDDDDDDDDDDDDDDD</Text>
      </View>
    </View>
  );
};
