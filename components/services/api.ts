const api = 'https://api.themoviedb.org/3';
// The api key is ok to be exposed, it's free and only for self study. I know that the corretly way is to store in a .env file.
const key = '94ff60134af5b7bbe6cb00087e37359f';


const defaultContent = {
    api_key: key,
    language: 'en-US'
};

function queryString(obj) {
    return Object.entries(obj)
        .map(([index, val]) => `${index}=${val}`)
        .join('&');
}

export default async function request(url, content = {}, debug = false) {
    const obj = { ...defaultContent, ...content };

    const response = await fetch(`${api}/${url}?${queryString(obj)}`);
    const data = await (debug ? response.status : response.json());

    return data;
}

//my data
//my key: 94ff60134af5b7bbe6cb00087e37359f
//my request: https://api.themoviedb.org/3/movie/550?api_key=94ff60134af5b7bbe6cb00087e37359f