import { UrlDataFormValues, DataFormValues } from '@/types/profile';
import { sortedArrayObject } from './functionsTemplateSocialOne';

export const getSocialNetworksOrderedByObject = (
  urls: UrlDataFormValues[],
  columns: number
) => {
  let count = 2;
  const finalArray: UrlDataFormValues[][][] = [];
  let newData2: any[][] = [];
  let data2: any[][] = [];
  let data: any[] = [];
  const isPair = urls.length % 2 == 0;
  if (columns) {
    urls.forEach((val, key) => {
      //array into two arrays
      data.push(val);
      if (urls.length >= count) {
        if (count == key + 1) {
          data2.push(data);
          data = [];
          count = count + 2;
        }
      }
    });
  }

  return { finalArray: finalArray.reverse(), data: data2 };
};
