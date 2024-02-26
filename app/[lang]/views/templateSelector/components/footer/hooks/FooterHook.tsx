import {
  arrayOfThreeItemsForEachElement,
  sortedArrayObject,
} from '@/globals/functionsTemplateSocialOne';
import { UrlDataFormValues } from '@/types/profile';

const FooterHook = ({
  socialNetworks,
}: {
  socialNetworks: UrlDataFormValues[] | undefined;
}) => {
  const social = socialNetworks?.filter(
    (val) =>
      val.icon != 'whatsapp' &&
      val.icon != 'twitter' &&
      val.icon != 'instagram' &&
      val.icon != 'facebook' &&
      val.icon != 'tiktok' &&
      val.icon != 'messenger' &&
      val.checked
  );
  const { arraySorted } = sortedArrayObject(social ?? [], 'social');

  const result = arrayOfThreeItemsForEachElement(arraySorted);
  // console.log('result>>>', result);
  // const finalArray = result.finalArray as UrlDataFormValues[][];
  const finalArray = arraySorted;

  return { finalArray };
};

export default FooterHook;
