import { IBackDropItem } from "../Interfaces/IMovieByIDInterface";
import { sliceArrayLength } from "./array";
import { getImageApi } from "./Image";

export const formatImageUrl = (images: IBackDropItem[]) =>
  sliceArrayLength(images, 15).map((item: IBackDropItem) =>
    getImageApi(item.file_path, 'url', 'original'),
  );
