import axios from "axios";
//change axios and tsx to ts
const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
});

export default instance;