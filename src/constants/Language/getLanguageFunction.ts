import {convertToUpperCaseFirstLetter} from '../utils/letters';
import {isoLanguage} from '../isoLanguage';

export const getLanguage = (value: string) => {
  const str = isoLanguage[value] || '';
  return convertToUpperCaseFirstLetter(str);
};
