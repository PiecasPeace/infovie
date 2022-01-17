import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {CustomButton} from '../../../../../components/blueprints/CustomButton/CustomButton';
import Spinner from '../../../../../components/Spinner/Spinner';
import {PINK, WHITE} from '../../../../../constants/Colors/colorpalette';
import {styles} from './styles';

export const MyMoviesPageScreen: React.FC = ({navigation}: any) => {
  const [loading, setLoading] = useState(false);
  return (
    <View style={styles.myMoviesContainer}>
      {loading ? (
        <Spinner />
      ) : (
        <View style={styles.collectionItems}>
          <Text style={{color: WHITE}}>Here in myMoviesPageScreen</Text>
          <CustomButton
            Text="Go back to Home"
            color={PINK}
            mode="outlined"
            style={{}}
            onPress={() => navigation.goBack()}
          />
        </View>
      )}
      <View style={styles.collectionItems}></View>
    </View>
  );
};
