export interface IBarcodeJSON {
    code: string,
    total: number,
    offset: number,
    items: IBarcodeITEMS[],
}
export interface IBarcodeITEMS {
    ean: string,
    title: string,
    description: string,
    upc: string,
    brand: string,
    model: string,
    color: string,
    size: string,
    dimension: string,
    weight: string,
    category: string,
    currency: string,
    lowest_recorded_price: number,
    highest_recorded_price: number,
    images: string[],
    offers: object[],
    asin: string,
    elid: string,
}
export const UPCMOKJSON: IBarcodeJSON = {
    "code": "OK",
    "total": 1,
    "offset": 0,
    "items": [
        {
            "ean": "0883929251230",
            "title": "Superman: The Movie",
            "description": "Superman, The Movie / Superman II: Richard Donner Cut, The / Superman Returns (BD) (3FE)",
            "upc": "883929251230",
            "brand": "Warner Bros.",
            "model": "1000304290",
            "color": "Gold",
            "size": "",
            "dimension": "6.5 X 5.3 X 0.3 inches",
            "weight": "0.3 Pounds",
            "category": "Electronics > Video > Televisions",
            "currency": "CAD",
            "lowest_recorded_price": 3,
            "highest_recorded_price": 66.01,
            "images": [
                "https://covers3.booksamillion.com/covers/dvd/8/83/929/251/883929251230_2727660.jpg",
                "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6934/6934294_sa.jpg",
                "https://i5.walmartimages.com/asr/41605c3a-d132-4f34-a1f8-8637b2da78d7_1.a2e4ed59d6999dd6d12b21cf83f23ec7.jpeg?odnHeight=450&odnWidth=450&odnBg=ffffff",
                "https://target.scene7.com/is/image/Target/GUEST_994a89a3-0e81-4265-9f1a-f168ba943c91?wid=1000&hei=1000",
                "https://c1.neweggimages.com/NeweggImage/productimage/A1FS_1_2014101655721143.jpg",
                "http://site.unbeatablesale.com/EB260/igme72954.gif",
                "http://c.shld.net/rpx/i/s/pi/mp/24256/4817011227?src=http%3A%2F%2Fecx.images-amazon.com%2Fimages%2FI%2F91nBQW0NcJL._SL1500_.jpg&d=5c9633e93ff8c69aba704ec6aad0cc6e662352b4",
                "http://ii.wbshop.com/fcgi-bin/iipsrv.fcgi?FIF=/images/warnerbros/source/warnerbros/7htpy6vugfwgswkx5svtzuv4jmzrwmse7sw07z13jwt3nlvkuftbmbo68wsgdphhlk8k5zi8d7cxm5c9.tif&wid=8000&cvt=jpeg&wbimage=image.jpg",
                "https://images10.newegg.com/ProductImageCompressAll200/A1FS_1_2014101655721143.jpg",
                "https://tshop.r10s.com/c8e/f2c/d912/6181/c07e/ceff/619a/11ade7b0f954ab3a295b6a.jpg?_ex=512x512"
            ],
            "offers": [
                {
                    "merchant": "Newegg Canada",
                    "domain": "Newegg Canada",
                    "title": "SUPERMAN-MOVIE/SUPERMAN 2-RICHARD DONNER CUT/SUPERMAN RETURNS (DVD/TFE)",
                    "currency": "CAD",
                    "list_price": "",
                    "price": 47.14,
                    "shipping": "Free Shipping",
                    "condition": "New",
                    "availability": "Out of Stock",
                    "link": "https://www.upcitemdb.com/norob/alink/?id=y2v243v2z223d494z2&tid=1&seq=1600757550&plt=1f1be29a5ff66967953ccbe96c077293",
                    "updated_t": 1600532067
                },
                {
                    "merchant": "WBShop.com",
                    "domain": "wbshop.com",
                    "title": "Superman, The Movie / Superman Ii: Richard Donner Cut, The / Superman Returns (Blu-ray) (3Fe) Blu-Ray from Warner Bros.",
                    "currency": "",
                    "list_price": "",
                    "price": 19.98,
                    "shipping": "4.99",
                    "condition": "New",
                    "availability": "",
                    "link": "https://www.upcitemdb.com/norob/alink/?id=y2u2y2t213z294&tid=1&seq=1600757550&plt=1497be9344c62e24e77da1cfe5b5296f",
                    "updated_t": 1511816653
                },
                {
                    "merchant": "Newegg Business",
                    "domain": "neweggbusiness.com",
                    "title": "Superman The Movie/Superman II: /Superman Returns [Blu-ray]",
                    "currency": "",
                    "list_price": "",
                    "price": 22.39,
                    "shipping": "10.00",
                    "condition": "New",
                    "availability": "",
                    "link": "https://www.upcitemdb.com/norob/alink/?id=v2v233u21363a464t2&tid=1&seq=1600757550&plt=220d17ae39259239fdd4d1dc159efc09",
                    "updated_t": 1523037949
                },
            ],
            "asin": "B008MILYYI",
            "elid": "373110350933"
        }
    ]
}