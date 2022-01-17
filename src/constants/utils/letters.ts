export const convertToUpperCaseFirstLetter = (value: string) =>
  value ? value.charAt(0).toUpperCase() + value.slice(1) : '';
