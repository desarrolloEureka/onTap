import {
  arrayOfThreeItemsForEachElement,
  sortedArrayObject,
} from '@/globals/functionsTemplateSocialOne';
import { UrlDataFormValues } from '@/types/profile';

const FooterHook = ({
  socialNetworks,
  fullSocialIcons
}: {
  socialNetworks: UrlDataFormValues[] | undefined;
  fullSocialIcons?: boolean;
}) => {
  let arraySorted: any = [];
  if (!fullSocialIcons) {
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
    arraySorted = sortedArrayObject(social ?? [], 'social').arraySorted;
  } else {
    const socialAll = socialNetworks?.filter(
      (val) =>
        val.checked
    );
    arraySorted = sortedArrayObject(socialAll ?? [], 'social').arraySorted;
  }
  const result = arrayOfThreeItemsForEachElement(arraySorted);
  // console.log('result>>>', result);
  // const finalArray = result.finalArray as UrlDataFormValues[][];
  const finalArray = arraySorted;

  return { finalArray };

};

export default FooterHook;
