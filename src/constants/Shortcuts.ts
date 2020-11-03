export const TheMovieDBUrl = "https://api.themoviedb.org/3/search/movie";
export const IDMovieUrl = "https://api.themoviedb.org/3/movie";
export const API_KEY = "api_key=94ff60134af5b7bbe6cb00087e37359f";
export const API_KEY2 ="api_key=024d69b581633d457ac58359146c43f6";
export const UpcUrl = "https://api.upcitemdb.com/prod/trial/lookup?upc=";

export const TMDBRequest = `${TheMovieDBUrl}?${API_KEY}&query=`;
export const UPCRequest = `${UpcUrl}`;

export const buildIDUrl = (getId: number): string => {
    return `${IDMovieUrl}/${getId}?${API_KEY2}`;
};  
