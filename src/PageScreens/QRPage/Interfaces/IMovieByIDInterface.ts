export interface IMovieIDItem {
    adult: boolean,
    backdrop_path: string,
    belongs_to_collection: ICollection[],
    budget: number,
    genres: IGenres[],
    homepage: string,
    id: number,
    imdb_id: string,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    production_companies: IProductionCompanies[],
    production_countries: IProductionContries[],
    release_date: string,
    revenue: number,
    runtime: number,
    spoken_language: ISpoken[],
    status: string,
    tagline: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number,
}
export interface ICollection {
    id: number,
    name: string,
    poster_path: string,
    backdrop_path: string,
}
export interface IGenres {
    id: number,
    name: string,
}
export interface IProductionCompanies {
    id: number,
    logo_path: null,
    name: string,
    original_country: string,
}

export interface IProductionContries {
    iso_3166_1: string,
    name: string,
}
export interface ISpoken {
    iso_639_1: string,
    name: string,
}