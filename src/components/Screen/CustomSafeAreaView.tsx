import React from 'react';
import {SafeAreaView, StatusBar, StyleProp, ViewStyle} from 'react-native';

interface ICustomSafeAreaViewProps {
  children: Element;
  style?: StyleProp<ViewStyle>;
}

const CustomSafeAreaView: React.FC<ICustomSafeAreaViewProps> = ({
  children,
  style,
}: ICustomSafeAreaViewProps) => (
  <SafeAreaView style={style}>
    <StatusBar barStyle="dark-content" />
    {children}
  </SafeAreaView>
);

export default CustomSafeAreaView;
