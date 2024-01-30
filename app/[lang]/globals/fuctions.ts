import { DataForm, DataFormValues } from '@/types/profile';

export const capitalizeFirstLetter = (text: string) => {
  const firstLetter = text.charAt(0);
  const firstLetterCap = firstLetter.toUpperCase();
  const remainingLetters = text.slice(1);
  const result = firstLetterCap + remainingLetters;
  return result;
};

export const sortedArrayObject = (data: any[]) => {
  const arraySorted = data.sort((x, y) => {
    //array sorted
    if (x.order > y.order) {
      return 1;
    }
    if (x.order < y.order) {
      return -1;
    }
    return 0;
  });

  return { arraySorted };
};

export const getPrincipalSocialNetworksOrderedByObject = (
  profile: DataForm
) => {
  const finalArray: DataFormValues[][] = [];
  const objectArray: any[] = [];
  let data: any = [];
  const profileFilter = Object.entries(profile).filter((val) => {
    // console.log('val', val);

    // console.log('val[1]', val[1] && !val[1].length && val[1]);

    //Filter by social and any other different data to name, last name and urls
    return val[1].length &&
      val[1][0].social &&
      val[1][0].checked &&
      val[1][0].order != 13
      ? val
      : val[1].social &&
          val[1].checked &&
          val[1].order != 1 &&
          val[1].order != 2 &&
          val;
  });

  profileFilter.forEach((val) => {
    //remove from the array
    objectArray.push(val[1].length > 0 ? val[1][0] : val[1]);
  });

  const { arraySorted } = sortedArrayObject(objectArray);

  if (arraySorted.length > 3) {
    arraySorted.forEach((val, key) => {
      //array into two arrays
      data.push(val);
      (key == 3 || key == 4) && (finalArray.push(data), (data = []));
    });
  } else {
    finalArray.push(arraySorted);
  }
  return { finalArray };
};

export const getSecondarySocialNetworksOrderedByObject = (
  profile: DataForm
) => {
  const finalArray: DataFormValues[][] = [];
  let data: any = [];
  const profileFilter = Object.entries(profile).filter((val) => {
    //Filter by social and any other different data to name, last name and urls
    return val[1].length && val[1][0].social && val[1][0].order != 13
      ? val
      : val[1].social && val[1].order != 1 && val[1].order != 2 && val;
  });

  const { arraySorted } = sortedArrayObject(profileFilter);

  arraySorted.forEach((val, key) => {
    //array into two arrays
    data.push(val);
    (key == 3 || key == 4) && (finalArray.push(data), (data = []));
  });
  return { finalArray };
};

export const arrayOfThreeItemsForEachElement = (data: any[]) => {
  let tempArray: any[] = [];
  let count = 2;
  const finalArray: any[][] = [];
  if (data.length > 2) {
    data.forEach((val, key) => {
      //array into two arrays
      tempArray.push(val);
      key == count &&
        (finalArray.push(tempArray), (tempArray = []), (count = count + 3));
    });
  } else {
    finalArray.push(data);
  }

  return { finalArray };
};
