import React from 'react';
import {View, Button, Text} from 'react-native';
import {CustomButton} from '../../../../../components/CustomButton/CustomButton';

export const FavoriteScreen: React.FC = ({navigation}: any) => {
  return (
    <View style={{backgroundColor: '#55505e'}}>
      <Text>Favorite Sreen</Text>
      <View>
        <Button
          title="Go back"
          onPress={() => navigation.navigate('Home')}></Button>
      </View>
    </View>
  );
};
