import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {View} from 'react-native';
import {CustomButton} from '../../../../components/CustomButton/CustomButton';
import {PINK, WHITE} from '../../../../constants/Colors';
import {CollectionItem} from './CollectionItem/CollectionItem';
import {styles} from './styles';

const Stack = createStackNavigator();
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
          onPress={() => navigation.navigate('MyMoviesCollection')}
          color={WHITE}
          size={45}
        />
        <CollectionItem
          iconName={'folder-heart-outline'}
          titleName={'Favorites'}
          onPress={() => navigation.navigate('FavoriteCollection')}
          color={WHITE}
          size={45}
        />
      </View>

      <View>
        {/* <CustomButton
          Text="Movies I Own"
          color={WHITE}
          mode="outlined"
          icon="heart"
          onPress={() => ''}
          style={styles.moviesIMarkedAsBought}
        /> */}
        <CustomButton
          Text="Go back to Home"
          color={PINK}
          mode="outlined"
          style={{}}
          onPress={() => navigation.navigate('Home')}
        />
      </View>
      {/* <View>
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
