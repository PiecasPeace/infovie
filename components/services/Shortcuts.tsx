export const TheMovieDBUrl = "https://api.themoviedb.org/3/search/movie";
export const API_KEY = "api_key=94ff60134af5b7bbe6cb00087e37359f";
export const UpcUrl = "https://api.upcitemdb.com/prod/trial/lookup?upc=";

export const TMDBRequest = `${TheMovieDBUrl}?${API_KEY}&query=`;
export const UPCRequest = `${UpcUrl}`;

export const buildIDUrl = (getId: number): string => {
    return `${TheMovieDBUrl}?${getId}?${API_KEY}`;
};