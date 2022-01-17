import React from 'react';
import {TouchableHighlight, View} from 'react-native';
import {Title} from 'react-native-paper';
import {styles} from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ICollectionProps} from './ICollectionItem';

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
