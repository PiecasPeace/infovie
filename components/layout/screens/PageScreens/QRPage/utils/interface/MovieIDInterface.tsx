export interface tmdbIDITEMS {
    adult: boolean,
    backdrop_path: string,
    belongs_to_collection: COLLECTION[],
    budget: number,
    genres: GENRES[],
    homepage: string,
    id: number,
    imdb_id: string,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    production_companies: PRODcompanies[],
    production_countries: PRODcountries[],
    release_date: string,
    revenue: number,
    runtime: number,
    spoken_language: SPOKEN[],
    status: string,
    tagline: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number,
}

export interface COLLECTION {
    id: number,
    name: string,
    poster_path: string,
    backdrop_path: string,
}
export interface GENRES {
    id: number,
    name: string,
}
export interface PRODcompanies {
    id: number,
    logo_path: null,
    name: string,
    original_country: string,
}

export interface PRODcountries {
    iso_3166_1: string,
    name: string,
}
export interface SPOKEN {
    iso_639_1: string,
    name: string,
}