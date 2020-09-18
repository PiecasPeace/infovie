export const bigmokjson = {
    "code": "string",
    "items": [
        {
            "ean": "0012569713710",
            "title": "Batman",
            "upc": "012569713710",
            "gtin": "string",
            "asin": "B00NQGOZV0",
            "description": "iPhone 6 isn't just bigger - it's better...",
            "category": "Electronics > Communications > Telephony > Mobile Phones > Unlocked Mobile Phones",
            "currency": "string",
            "lowest_recorded_price": 3.79,
            "highest_recorded_price": 8500,
            "images": [
                "https://images-na.ssl-images-amazon.com/images/I/61sXtDrzDaL._AC_SY679_.jpg"
            ],
            "offers": [
                {
                    "merchant": "Newegg.com",
                    "domain": "newegg.com",
                    "title": "Apple iPhone 6 64GB T-Mobile Space Gray MG5A2LL/A",
                    "currency": "string",
                    "list_price": 0,
                    "price": 1200,
                    "shipping": "Free Shipping",
                    "condition": "New",
                    "availability": "Out of Stock",
                    "link": "https://www.upcitemdb.com/norob/alink/?id=v2p2...",
                    "updated_t": 1479243029
                }
            ]
        }
    ]
}

 // useEffect(() => {
    //     async function fetchData() {
    //         try {
    //             const request = bigmokjson;
    //             setBarcodesJson(bigmokjson.items);
    //             return request;
    //         } catch (err) {
    //             console.log(
    //                 "(Z.130~) Fetchproblem at upcUrl: " + err.message
    //             );
    //             throw err;
    //         } finally {
    //             setLoading(false);
    //         }
    //     }
    //     fetchData();
    //     return () => {
    //         fetchData();
    //     };
    // }, []);