const API_KEY = '94ff60134af5b7bbe6cb00087e37359f';

const requests = {
    Trending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    NetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    TopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    ActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    ComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    HorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    RomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    Documentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
}

export default requests;

// https://image.tmdb.org/t/p/original//trending/all/week?api_key=94ff60134af5b7bbe6cb00087e37359f&language=en-US
// https://image.tmdb.org/t/p/original/uGhQ2ZGBpzCj6wC5jUrybsZuPTI.jpg
// const fetchUrl = "https://api.themoviedb.org/3/trending/all/week?api_key=94ff60134af5b7bbe6cb00087e37359f&language=en-US";