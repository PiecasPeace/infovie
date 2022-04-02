import React from 'react';
import {FlatList} from 'react-native';
import {ICastItem} from '../../../../../../constants/Interfaces/IMovieByIDInterface';
import {IPersonRowListProps} from './IPersonRowListProps';

export const PersonRowList: React.FC<IPersonRowListProps> = ({
  data,
  renderItem,
  ListEmptyComponent,
}: IPersonRowListProps) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(cast: ICastItem) =>
        cast.credit_id !== undefined
          ? cast.credit_id.toString()
          : cast.id.toString()
      }
      renderItem={renderItem}
      ListEmptyComponent={ListEmptyComponent}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      removeClippedSubviews
      keyboardShouldPersistTaps="always"
    />
  );
};
