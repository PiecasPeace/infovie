import { ListRenderItem } from "react-native";
import { IProductionCompanies } from "../../../../../../constants/Interfaces/IMovieByIDInterface";

export interface ICompanyRowListProps {
  data: IProductionCompanies[];
  renderItem: ListRenderItem<IProductionCompanies>;
}
