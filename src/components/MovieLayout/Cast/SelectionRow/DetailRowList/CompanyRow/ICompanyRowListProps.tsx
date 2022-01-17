import {ComponentType, JSXElementConstructor, ReactElement} from 'react';
import {ListRenderItem} from 'react-native';
import {IProductionCompanies} from '../../../../../../constants/Interfaces/IMovieByIDInterface';

export interface ICompanyRowListProps {
  data: IProductionCompanies[];
  renderItem: ListRenderItem<IProductionCompanies> | null | undefined;
  // type: string;
  // onTeamDetails: () => void;
  ListEmptyComponent: React.ComponentType<any> | React.ReactElement | null;
}
