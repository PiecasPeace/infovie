import React, {useState} from 'react';
import {View, Button, Text} from 'react-native';

const AboutPageScreen: React.FC = () => {
  const [text, setText] = useState('BRUH');
  return (
    <View style={{backgroundColor: '#55505e'}}>
      <Text>ABOUUUUUUUUUUUUT</Text>
      <Button title="DINGDONG" onPress={() => setText('XDDDDDDDDDDD')}></Button>
      {console.log(text)}
    </View>
  );
};

export default AboutPageScreen;
