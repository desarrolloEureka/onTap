import {
  UrlDataFormValues,
  DataFormValues,
  ProfessionalDataForm,
  DataFormSorted,
} from '@/types/profile';
import { sortedArrayObject } from './functionsTemplateSocialOne';

export const getPrincipalDataSlide = (
  profile: ProfessionalDataForm,
  index: any
) => {
  const objectArray: any[] = [];

  const destructuringArray = (data: any) => {
    data.forEach((val: any) => {
      val.checked &&
        (val.order == 9 || val.order == 10) &&
        objectArray.push([val]);
    });
  };

  const profileProfessionalFilter = Object.entries(
    profile as DataFormSorted
  ).filter((val) => {
    return val[1].length
      ? destructuringArray(val[1])
      : val[1][index] &&
      val[1].checked &&
      (val[1].order == 4 ||
        val[1].order == 5 ||
        val[1].order == 9 ||
        val[1].order == 10) &&
      val;
  });
  // console.log('objectArray', objectArray);

  // console.log('profileProfessionalFilter', profileProfessionalFilter);
  profileProfessionalFilter.forEach((val, index) => {
    objectArray.push([val[1]]);
  });

  return objectArray;
};

export const getPrincipalProfileOrderedByObject = (
  profile: ProfessionalDataForm,
  index: any
) => {
  const finalArray: DataFormValues[][] = [];
  const objectArray: any[] = [];
  let data: any = [];
  const profileFilter = Object.entries(profile as DataFormSorted).filter(
    (val) => {
      //Filter by social and any other different data to name, last name and urls
      // console.log('val[1].length > 0 &&', val[1].length > 0 && val[1]);

      if (index == 'social') {
        return val[1].length > 0 &&
          val[1][0][index] &&
          val[1].find((val: any) => val.order != 13)
          ? val
          : val[1][index] &&
          val[1].order != 1 &&
          val[1].order != 2 &&
          val[1].order != 3 &&
          val;
      } else {
        const result =
          val[1].length > 0 &&
          val[1].find(
            (val: any) => val.order != 9 && val.order != 10 && val.order != 13
          ) &&
          val[1][0][index] &&
          val;
        return result;
      }
    }
  );

  // console.log('profileFilter', profileFilter);

  const profileProfessionalFilter = Object.entries(
    profile as DataFormSorted
  ).filter((val) => {
    return (
      val[1][index] &&
      val[1].checked &&
      val[1].order != 1 &&
      val[1].order != 2 &&
      val[1].order != 3 &&
      val[1].order != 4 &&
      val[1].order != 5 &&
      val
    );
  });

  // Ordenar los objetos por order
  profileProfessionalFilter.sort((a, b) => {
    return a[1].order - b[1].order;
  });

  profileFilter.forEach((val) => {
    const profArray: any[] = [];
    val[1].length > 0 &&
      val[1].forEach((value: any, key: number) => {
        value.checked && value.professional && profArray.push(value);
      });
    objectArray.push(profArray);
  });

  const { arraySorted } =
    objectArray.length > 0
      ? objectArray[0].length > 0
        ? sortedArrayObject(objectArray, index)
        : { arraySorted: [] }
      : { arraySorted: [] };

  // console.log('profileFilter', profileFilter);
  // console.log('objectArray>>>>>', index == 'social' && objectArray);
  // console.log('arraySorted', arraySorted);

  profileProfessionalFilter.map((val, key) => {
    finalArray.push([val[1]]);
  });
  // console.log('arraySorted', arraySorted);

  finalArray.push(...arraySorted);

  // console.log('finalArray', finalArray);

  return { finalArray };
};

export const getSocialNetworksOrderedByObject = (
  urls: UrlDataFormValues[],
  columns: number
) => {
  let count = 2;
  const finalArray: UrlDataFormValues[][][] = [];
  let data2: any[][] = [];
  let data: any[] = [];
  if (columns) {
    const urlsFiltered = urls.filter((val) => val.checked);
    const reversedArray = urlsFiltered.slice().reverse();
    reversedArray.forEach((val, key) => {
      //array into two arrays
      data.push(val);
      if (reversedArray.length >= count) {
        if (count == key + 1) {
          data2.push(data);
          data = [];
          count = count + 2;
        }
      } else {
        data2.push(data);
        data = [];
        count = 2;
      }
    });
  }

  return { finalArray: finalArray.reverse(), data: data2.reverse() };
};
