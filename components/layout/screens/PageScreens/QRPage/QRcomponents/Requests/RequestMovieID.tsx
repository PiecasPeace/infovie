import { buildIDUrl } from '../../../../../../services/Shortcuts';
import { IMovieIDItem } from '../../utils/interface/IDInterface';
import { tmdbITEM } from '../../utils/interface/MovieInterface';

interface IRequestMovieIDProps {
    item: IMovieIDItem;
}
const RequestMovieID = async ({ item }: IRequestMovieIDProps) => {
    const request = await fetch(buildIDUrl(item.id))
    const result: IMovieIDItem = await request.json();
    { item }
};
export default RequestMovieID;