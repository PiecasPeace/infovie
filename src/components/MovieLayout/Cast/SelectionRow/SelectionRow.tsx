import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {BORDEAUX_RED} from '../../../../constants/Colors/colorpalette';

interface ISelectionRowProp {
  title: string;
  children: Element;
}

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
export const styles = StyleSheet.create({
  textHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 5,
    color: BORDEAUX_RED,
  },
  sectionHeader: {
    marginLeft: 5,
    marginRight: 5,
  },
});
