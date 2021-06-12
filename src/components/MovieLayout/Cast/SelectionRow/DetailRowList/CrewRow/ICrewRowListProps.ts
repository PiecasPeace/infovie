import {ListRenderItem} from 'react-native';
import {ICrewItem} from '../../../../../../constants/Interfaces/IMovieByIDInterface';

export interface ICrewRowListProps {
  data: ICrewItem[];
  renderItem: ListRenderItem<ICrewItem>;
}
