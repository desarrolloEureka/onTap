import CustomModalAlert from '@/components/customModalAlert/CustomModalAlert';
import OneTapLogo from '@/components/oneTapLogo/OneTapLogo';
import useDictionary from '@/hooks/dictionary/useDictionary';
import { BackgroundImages } from '@/types/home';
import { UserData } from '@/types/user';
import { Locale } from 'i18n-config';
import { useLayoutEffect, useState } from 'react';
import BgImage from './bgImage/BgImage';
import TemplateContainer from './container/Container';
import Footer from './footer/Footer';
import HeroSocial from './hero/HeroSocial';
import useMediaQuery from '@mui/material/useMediaQuery';

const SocialOne = ({
  params: { lang, background, data },
}: {
  params: {
    lang: Locale;
    background: BackgroundImages;
    data: UserData;
  };
}) => {
  const { dictionary } = useDictionary({ lang });
  const [isDataError, setIsDataError] = useState(true);

  useLayoutEffect(() => {
    data.profile && setIsDataError(false);
  }, [data.profile]);

  const isSmallScreen = useMediaQuery('(max-height:668px)');/* pantalla sea igual o menor a 668 píxeles */
  const isSmallScreenTwo = useMediaQuery('(max-height:896px)');
  const isSmallScreenthree = useMediaQuery('(max-height:933px)');

  return data.profile ? (
    <div className='tw-flex tw-flex-col tw-relative tw-justify-center tw-items-center tw-h-screen'>
      <div className={`tw-shadow-md tw-w-[380px] tw-rounded-2xl tw-bg-slate-500 ${isSmallScreen && 'tw-h-[571px]'} ${isSmallScreenTwo && 'tw-h-[785px]'} ${isSmallScreenthree && 'tw-h-[930px]'}`}>
        <BgImage background={background} />
        <HeroSocial
          socialNetworks={data.profile.social?.urls}
          photo={data.image}
          name={`${data.profile.social?.name?.checked
            ? data.profile.social?.name?.text
            : ''
            }  ${data.profile.social?.last_name?.checked
              ? data.profile.social?.last_name?.text
              : ''
            }`}
          profession={
            data.profile.social?.profession?.checked
              ? data.profile.social?.profession?.text
              : ''
          }
        />
        <TemplateContainer profile={data.profile} />
        <Footer socialNetworks={data.profile.social?.urls} />
      </div>
      <OneTapLogo />
    </div>
  ) : (
    <CustomModalAlert
      isModalAlert={isDataError}
      handleModalAlert={() => setIsDataError(false)}
      title={dictionary?.generalTitle || ''}
      description={dictionary?.cardView?.dataNotFound || ''}
      isClosed={true}
    />
  );
};
export default SocialOne;
