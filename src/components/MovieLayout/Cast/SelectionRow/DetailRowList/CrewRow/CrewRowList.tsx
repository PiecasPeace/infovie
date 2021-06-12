import React from "react";
import { FlatList } from "react-native";
import { ICrewItem } from "../../../../../../constants/Interfaces/IMovieByIDInterface";
import { ICrewRowListProps } from "./ICrewRowListProps";

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