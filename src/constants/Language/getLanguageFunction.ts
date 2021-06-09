import {convertToUpperCaseFirstLetter} from '../../components/utils/letters';
import {isoLanguage} from '../isoLanguage';

export const getLanguage = (value: string) => {
  const str = isoLanguage[value] || '';
  return convertToUpperCaseFirstLetter(str);
};
