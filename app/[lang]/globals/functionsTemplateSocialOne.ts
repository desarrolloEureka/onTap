import {
  DataForm,
  DataFormSorted,
  DataFormValues,
  SocialDataForm,
} from '@/types/profile';

export const capitalizeFirstLetter = (text: string) => {
  const firstLetter = text.charAt(0);
  const firstLetterCap = firstLetter.toUpperCase();
  const remainingLetters = text.slice(1);
  const result = firstLetterCap + remainingLetters;
  return result;
};

export const sortedArrayObject = (data: any[], index: string) => {
  const arraySorted = data.sort((x, y) => {
    
    const xx = Array.isArray(x) && x.length > 0 ? x[0]?.order : x?.order;
    const yy = Array.isArray(y) && y.length > 0 ? y[0]?.order : y?.order;
    //array sorted
    if (index == 'social' ? xx > yy : x[0]?.order > y[0]?.order) {
      return 1;
    }
    if (index == 'social' ? xx < yy : x[0]?.order < y[0].order) {
      return -1;
    }
    return 0;
  });

  return { arraySorted };
};

export const getPrincipalProfileOrderedByObject = (
  profile: SocialDataForm,
  index: any
) => {
  const finalArray: DataFormValues[][] = [];
  const objectArray: any[] = [];
  let data: any = [];

  if (!profile || typeof profile !== 'object') {
    return { finalArray: [] }; // O cualquier valor por defecto que prefieras.
  }

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

  profileFilter.forEach((val) => {
    const destructuringArray = (data: any) => {
      data.forEach((val: any) => {
        val.checked && objectArray.push(val);
      });
    };

    const social =
      val[1].length > 0 ? destructuringArray(val[1]) : val[1].checked && val[1];

    const profArray: any[] = [];
    val[1].length > 0 &&
      val[1].forEach((value: any, key: number) => {
        value.checked && value.professional && profArray.push(value);
      });

    index == 'social'
      ? social && objectArray.push(social)
      : objectArray.push(profArray);
  });

  const { arraySorted } =
    objectArray.length > 0
      ? index == 'social'
        ? sortedArrayObject(objectArray, index)
        : objectArray[0].length > 0
          ? sortedArrayObject(objectArray, index)
          : { arraySorted: [] }
      : { arraySorted: [] };

  // console.log('profileFilter', profileFilter);
  // console.log('objectArray>>>>>', index == 'social' && objectArray);
  // console.log('arraySorted', arraySorted);
  let count = 3;
  let countN = 1;
  if (index == 'social' && arraySorted.length > count) {
    arraySorted.forEach((val, key) => {
      //array into two arrays
      data.push(val);
      if (count == key) {
        finalArray.push(data);
        data = [];
        count = count + 4;
      } else {
        if (countN == arraySorted.length) {
          finalArray.push(data);
        }
      }
      countN++;
    });
  } else if (index == 'social' && arraySorted.length <= count) {
    finalArray.push(arraySorted);
  } else {
    profileProfessionalFilter.map((val, key) => {
      finalArray.push([val[1]]);
    });
    finalArray.push(...arraySorted);
  }
  // console.log('finalArray', finalArray);

  return { finalArray };
};


export const getPrincipalProfileOrderedSocialTwo = (
  profile: SocialDataForm,
  index: any
) => {
  const finalArray: DataFormValues[][] = [];
  const objectArray: any[] = [];
  let data: any = [];

  const profileFilter = Object.entries(profile as DataFormSorted).filter(
    (val) => {
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

  profileFilter.forEach((val) => {
    const destructuringArray = (data: any) => {
      data.forEach((val: any) => {
        val.checked && objectArray.push(val);
      });
    };

    const social =
      val[1].length > 0 ? destructuringArray(val[1]) : val[1].checked && val[1];

    const profArray: any[] = [];
    val[1].length > 0 &&
      val[1].forEach((value: any, key: number) => {
        value.checked && value.professional && profArray.push(value);
      });

    index == 'social'
      ? social && objectArray.push(social)
      : objectArray.push(profArray);
  });

  const { arraySorted } =
    objectArray.length > 0
      ? index == 'social'
        ? sortedArrayObject(objectArray, index)
        : objectArray[0].length > 0
          ? sortedArrayObject(objectArray, index)
          : { arraySorted: [] }
      : { arraySorted: [] };

  let count = 2;
  let countN = 1;
  if (index == 'social' && arraySorted.length > count) {
    arraySorted.forEach((val, key) => {
      data.push(val);
      if (count == key) {
        finalArray.push(data);
        data = [];
        count = count + 3;
      } else {
        if (countN == arraySorted.length) {
          finalArray.push(data);
        }
      }
      countN++;
    });
  } else if (index == 'social' && arraySorted.length <= count) {
    finalArray.push(arraySorted);
  } else {
    profileProfessionalFilter.map((val, key) => {
      finalArray.push([val[1]]);
    });
    finalArray.push(...arraySorted);
  }

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
