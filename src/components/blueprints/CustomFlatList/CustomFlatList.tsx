import React from 'react';
import {FlatList, ListRenderItem} from 'react-native';

interface ICFlatList<T> {
  data: T[];
  renderItem: ListRenderItem<T>;
  keyExtractor: (item: T, index: number) => string;
}

export const CustomFlatList = <T extends {}>({
  data,
  renderItem,
  keyExtractor,
}: ICFlatList<T>) => {
  return (
    <FlatList
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
      removeClippedSubviews
      keyboardShouldPersistTaps="always"
    />
  );
};
