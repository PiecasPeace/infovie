let barcodeKEY = "";
const BarcodeURL = `https://api.upcitemdb.com/prod/trial/lookup?upc=${barcodeKEY}`

const defaultContent = {
    api_key: barcodeKEY,
    language: 'en-US'
};

function queryString(obj) {
    return Object.entries(obj)
        .map(([index, value]) => `${index}=${value}`)
        .join('&')
}

export default async function requestBarcode(url, content = {}, debug: false) {
    const obj = { ...defaultContent, ...content };

    const response = await fetch(`${BarcodeURL}/${url}?${queryString(obj)}`);
    const data = await (debug ? response.status : response.json())
}