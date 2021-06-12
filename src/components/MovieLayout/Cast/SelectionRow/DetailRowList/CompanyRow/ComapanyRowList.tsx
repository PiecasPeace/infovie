import React from "react";
import { FlatList } from "react-native";
import { IProductionCompanies } from "../../../../../../constants/Interfaces/IMovieByIDInterface";
import { ICompanyRowListProps } from "./ICompanyRowListProps";

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