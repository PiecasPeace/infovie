import React from 'react';
import {View, Text} from 'react-native';
import {ISelectionRowProp} from './ISelectionRowProps';
import {styles} from './styles';

export const SelectionRow: React.FC<ISelectionRowProp> = ({
  title,
  children,
}: ISelectionRowProp) => {
  return (
    <View>
      <View style={styles.sectionHeader}>
        <Text style={styles.textHeader}>{title}</Text>
      </View>
      {children}
    </View>
  );
};
