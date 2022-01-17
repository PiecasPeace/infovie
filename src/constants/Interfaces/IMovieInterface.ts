export interface ItmdbJsonGET {
  page: number;
  total_results: number;
  total_pages: number;
  results: ItmdbItem[];
}
export interface ItmdbItem {
  popularity: number;
  vote_count: number;
  video: boolean;
  poster_path: string;
  id: number;
  adult: boolean;
  backdrop_path: string;
  original_language: string;
  original_title: string;
  genre_ids: number[];
  title: string;
  vote_average: number;
  overview: string;
  release_date: string;
  //CUSTOM
  favorite: boolean;
  myList: boolean;
  name: string;
  //TV-SERIES
  first_air_date: string;
}

export type tmdbItemForFlatlist = ItmdbItem & {
  onPress: (id: number) => void;
};
