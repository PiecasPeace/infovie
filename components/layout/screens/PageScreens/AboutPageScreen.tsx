import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';

const AboutPageScreen = () => {
    const [text, setText] = useState("BRUH");

    return (
        <View>
            <Text>
                ABOUUUUUUUUUUUUT
            </Text>
            <Button title="DINGDONG" onPress={() => setText(text)}>

            </Button>
        </View>
    )
}

export default AboutPageScreen
