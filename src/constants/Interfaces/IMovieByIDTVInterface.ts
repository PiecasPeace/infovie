export interface IMovieIDTVInterface {
  backdrop_path: string;
  created_by: ICreated_by[];
  episode_run_time: IEpisode_run_time[];
  first_air_date: string;
  genres: IGenres[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: ILanguage[];
  last_air_date: ILast_air_date;
  name: string;
  networks: INetworks[];
  next_episode_to_air: INext_episode_to_air;
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: IOrigin_country[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: IProductionCompanies[];
  production_countries: IProduction_countries[];
  seasons: ISeasons[];
  spoken_languages: ISpoken_languages[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
  //CUSTOM
  selected: IMovieIDTVInterface;
  //NO RESULT 
  success: boolean;

}

interface ICreated_by {
  credit_id: string;
  gender: number;
  id: number;
  name: string;
  profile_path: string;
}

interface IEpisode_run_time {
  hour: number;
  minute: number;
}

interface IGenres {
  id: number;
  name: string;
}

interface ILanguage {
  language: string;
}

interface ILast_air_date {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  season_number: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
}

interface INetworks {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface INext_episode_to_air {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  season_number: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
}

interface IOrigin_country {
  origin_country: string;
}

interface IProductionCompanies {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface IProduction_countries {
  iso_3166_1: string; //US
  name: string;
}

interface ISeasons {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
}

interface ISpoken_languages {
  english_name: string; //"English"
  iso_639_1: string; //"en"
  name: string; //"English"
}
