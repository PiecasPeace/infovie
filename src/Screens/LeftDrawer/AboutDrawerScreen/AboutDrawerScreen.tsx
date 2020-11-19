import React from 'react';
import {View, Button, Text} from 'react-native';
import {CustomButton} from '../../../components/CustomButton/CustomButton';

const AboutPageScreen: React.FC = ({navigation}: any) => {
  return (
    <View style={{backgroundColor: '#55505e'}}>
      <Text>ABOUUUUUUUUUUUUT</Text>
      <View>
        <Button
          title="Go back"
          onPress={() => navigation.navigate('Home')}></Button>
      </View>
    </View>
  );
};
export default AboutPageScreen;
