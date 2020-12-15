import React from 'react';
import {View} from 'react-native';
import {WHITE} from '../../../../constants/Colors';
import {styles} from './styles';
import {CollectionItem} from './CollectionItem/CollectionItem';

export const CollectionScreen: React.FC = ({navigation}: any) => {
  const bruh = () => {
    return <></>;
  };

  return (
    <View style={styles.collectionContainer}>
      <View style={styles.collectionItems}>
        <CollectionItem
          // iconChildren={}
          iconName={'movie-open-outline'}
          titleName={'My Movies'}
          onPress={() => bruh}
          color={WHITE}
          size={45}
        />
        <CollectionItem
          iconName={'folder-heart-outline'}
          titleName={'Favorites'}
          onPress={() => bruh}
          color={WHITE}
          size={45}
        />
      </View>

      {/* <View>
        <CustomButton
          Text="Movies I Own"
          color={WHITE}
          mode="outlined"
          icon="heart"
          onPress={() => ''}
          style={styles.moviesIMarkedAsBought}
        />
        <CustomButton
          Text="Go back to Home"
          color={PINK}
          mode="outlined"
          style={{}}
          onPress={() => navigation.navigate('Home')}
        />
      </View>
      <View>
        <CustomButton
          Text="Favorites"
          color={WHITE}
          mode="outlined"
          icon="heart"
          onPress={() => ''}
          style={styles.favoriteButton}
        />
      </View> */}
    </View>
  );
};
