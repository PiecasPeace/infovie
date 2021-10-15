import React from 'react';
import {FlatList, ListRenderItem} from 'react-native';

interface ICFlatList<T> {
  data: T[];
  renderItem: ListRenderItem<T>;
  keyExtractor: (item: T, index: number) => string;
  horizontal: boolean;
}

export const CustomFlatList = <T extends {}>({
  data,
  renderItem,
  keyExtractor,
  horizontal
}: ICFlatList<T>) => {
  return (
    <FlatList
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      horizontal={horizontal}
      showsHorizontalScrollIndicator={false}
      removeClippedSubviews
      keyboardShouldPersistTaps="always"
    />
  );
};
