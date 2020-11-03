import axios from "axios";
const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
});

export default instance;

// useEffect(() => {
    //     fetch(upcUrl)
    //         .then((response) =>
    //             // response.json()
    //             bigmokjson
    //         )
    //         .then((json) => {
    //             setBarcodesJson(json.items);
    //             // setBarcodeTitle(json.items);
    //         })
    //         .catch(error => { console.log(error); })
    //         .finally(() => setLoading(false));
    // }, []);