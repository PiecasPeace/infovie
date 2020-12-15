import React from 'react';
import {Image, TouchableHighlight, View} from 'react-native';
import {Title} from 'react-native-paper';
import {styles} from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ICollectionProps} from './ICollectionItem';
// import e from '../../../../../assets/images/local_movie.png'
import AntIcons from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const CollectionItem: React.FC<ICollectionProps> = ({
  titleName,
  iconName,
  color,
  size,
  onPress,
  onLongPress,
  children,
}: ICollectionProps) => {
  return (
    <TouchableHighlight onLongPress={onLongPress} onPress={onPress}>
      <View style={styles.itemView}>
        {children}
        <MaterialCommunityIcons name={iconName} color={color} size={size} />
        <View style={styles.titleView}>
          <Title style={styles.title}>{titleName}</Title>
        </View>
      </View>
    </TouchableHighlight>
  );
};
