import {ListRenderItem} from 'react-native';
import {ICastItem} from '../../../../../../constants/Interfaces/IMovieByIDInterface';

export interface IPersonRowListProps {
  data: ICastItem[];
  renderItem: ListRenderItem<ICastItem>;
  ListEmptyComponent: React.ComponentType<any> | React.ReactElement | null;
}
