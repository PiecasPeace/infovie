export interface IMovieIDInterface {
  adult: string;
  backdrop_path: string;
  belongs_to_collection: ICollection[];
  budget: number;
  genres: IGenres[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: IProductionCompanies[];
  production_countries: IProductionContries[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_language: ISpoken[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  //APPEND TO PATH
  credits: cast;
  images: backdrops;
  videos: results;
  //NO RESULT
  status_code: number;
  status_message: string;
  success: boolean;
}
interface ICollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}
export interface IGenres {
  id: number;
  name: string;
}
export interface IProductionCompanies {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

interface IProductionContries {
  iso_3166_1: string;
  name: string;
}
interface ISpoken {
  iso_639_1: string;
  name: string;
}

export interface cast {
  cast: ICastItem[];
  crew: ICrewItem[];
}

export interface ICastItem {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface ICrewItem {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
  department: string;
  job: string;
  //FROM ICASTITEM
  order: number;
}

export interface backdrops {
  backdrops: IBackDropItem[];
}
export interface IBackDropItem {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface results {
  results: IResultItem[];
}

export interface IResultItem {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
}
