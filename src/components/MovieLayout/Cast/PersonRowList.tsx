import React from 'react';
import {
  ICastItem,
  ICrewItem,
  IProductionCompanies,
} from '../../../constants/Interfaces/IMovieByIDInterface';
import {FlatList, ListRenderItem} from 'react-native';

interface IPersonRowListProps {
  data: ICastItem[];
  renderItem: ListRenderItem<ICastItem>;
}

interface ICrewRowListProps {
  data: ICrewItem[];
  renderItem: ListRenderItem<ICrewItem>;
}

interface ICompanyRowListProps {
  data: IProductionCompanies[];
  renderItem: ListRenderItem<IProductionCompanies>;
}

export const PersonRowList: React.FC<IPersonRowListProps> = ({
  data,
  renderItem,
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
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      removeClippedSubviews
      keyboardShouldPersistTaps="always"
    />
  );
};

export const CrewRowList: React.FC<ICrewRowListProps> = ({
  data,
  renderItem,
}: ICrewRowListProps) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(cast: ICrewItem) =>
        cast.credit_id !== undefined
          ? cast.credit_id.toString()
          : cast.id.toString()
      }
      renderItem={renderItem}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      removeClippedSubviews
      keyboardShouldPersistTaps="always"
    />
  );
};

export const CompanyRowList: React.FC<ICompanyRowListProps> = ({
  data,
  renderItem,
}: ICompanyRowListProps) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(company: IProductionCompanies) =>
        company.id.toString() ? company.id.toString() : company.name
      }
      renderItem={renderItem}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      removeClippedSubviews
      keyboardShouldPersistTaps="always"
    />
  );
};
