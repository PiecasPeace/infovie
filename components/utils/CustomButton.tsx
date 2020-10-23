import React from 'react'
import { Button } from 'react-native-paper';

const CustomButton = ({
    style = {},
    mode,
    color,
    onPress,
    Text = "",
}) => {
    return (
        <Button
            style={style}
            mode={mode}
            color={color}
            onPress={onPress}>
            {Text}
        </Button>
    )
}
export default CustomButton;