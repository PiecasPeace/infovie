import { UPCRequest } from '../Shortcuts';
import { IBarcodeJSON } from '../Interfaces/IBarcodeInterface';

export const RequestMovieTitleByBarcode = async (eanUpc: string[]): Promise<string[]> => {
    const titleList: string[] = [];
    try {
        //Fetching the URL link
        const request = await fetch(`${UPCRequest}${eanUpc}`)
        const result: IBarcodeJSON = await request.json();
        console.log("HERE IN RequestMovieTitleByBarcode")
        console.log(result.items)
        //getting the title from the upcDB and passing it to titleList[i]
        for (let i = 0; i < result.items.length; i++) {
            { result.items[i].title ? result.items[i].title : "NOT FOUND" }
            titleList[i] = result.items[i].title;
        };
    } catch (err) {
        console.log("FetchProblem -> requestMovieTitleByBarcode: " + err.message);
        throw err;
    }
    return titleList;
}