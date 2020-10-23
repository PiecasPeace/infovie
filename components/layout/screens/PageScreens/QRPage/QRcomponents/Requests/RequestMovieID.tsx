import { buildIDUrl } from '../../../../../../services/Shortcuts';
import { movieIDItem } from '../../utils/interface/IDInterface';
import { tmdbITEM } from '../../utils/interface/MovieInterface';

interface IRequestMovieIDProps {
    item: movieIDItem;
}
const RequestMovieID = async ({ item }: IRequestMovieIDProps) => {
    const request = await fetch(buildIDUrl(item.id))
    const result: movieIDItem = await request.json();
    { item }
};
export default RequestMovieID;