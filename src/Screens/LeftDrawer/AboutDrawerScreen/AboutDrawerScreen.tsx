import React from 'react';
import {View, Button, Text} from 'react-native';
import {CustomButton} from '../../../components/blueprints/CustomButton/CustomButton';
import { AboutDrawerProps } from '../../../constants/Navigation/navigation';


const AboutDrawerScreen: React.FC<AboutDrawerProps> = ({navigation}: AboutDrawerProps) => {
  return (
    <View style={{backgroundColor: '#55505e'}}>
      <Text>ABOUUUUUUUUUUUUT</Text>
      <View>
        <Button
          title="Go to Home"
          onPress={() => navigation.navigate('Home')}></Button>
      </View>
    </View>
  );
};
export default AboutDrawerScreen;
