import {
  arrayOfThreeItemsForEachElement,
  sortedArrayObject,
} from '@/globals/fuctions';
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
  const { arraySorted } = sortedArrayObject(social ?? []);

  const result = arrayOfThreeItemsForEachElement(arraySorted);

  const finalArray = result.finalArray as UrlDataFormValues[][];

  return { finalArray };
};

export default FooterHook;
