export const sliceArrayLength = (arr: any, num: number) =>
  arr.length > num ? arr.slice(0, num) : arr;
