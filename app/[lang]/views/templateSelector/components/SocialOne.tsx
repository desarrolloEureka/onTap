import CustomModalAlert from '@/components/customModalAlert/CustomModalAlert';
import OneTapLogo from '@/components/oneTapLogo/OneTapLogo';
import useDictionary from '@/hooks/dictionary/useDictionary';
import { BackgroundImages } from '@/types/home';
import { UserData } from '@/types/user';
import { Locale } from 'i18n-config';
import { useEffect, useLayoutEffect, useState } from 'react';
import BgImage from './bgImage/BgImage';
import Footer from './footer/Footer';
import HeroSocial from './hero/HeroSocial';
import useMediaQuery from '@mui/material/useMediaQuery';
import TemplateContainerColor from './container/ContainerColor';
import ModalCookies from '@/components/customModalAlert/ModalCookies';

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
  const [isCookies, setIsCookies] = useState(false);

  useLayoutEffect(() => {
    data.profile && setIsDataError(false);
  }, [data.profile]);

  const isSmallScreen = useMediaQuery('(max-height:935px)');
  const isSmallScreenWidth = useMediaQuery('(max-width:440px)');

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleAceptCookies = async () => {
    console.log(JSON.stringify(true));
    await localStorage.setItem('@cookies', JSON.stringify(true));
    setIsCookies(false);
  };

  useEffect(() => {
    const cookies = localStorage.getItem('@cookies');
    if (cookies) {
      setIsCookies(false);
    } else {
      setIsCookies(true);
    }

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return data.profile ? (
    <div className='tw-flex tw-flex-col tw-relative tw-justify-center tw-items-center tw-h-screen'>
      <div
        className={`tw-shadow-md tw-rounded-2xl tw-bg-slate-500`}
        style={{
          height: isSmallScreen ? windowSize.height : '700px',
          width: isSmallScreenWidth ? windowSize.width : '380px',
          overflow: 'hidden',
        }}
      >
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
        <TemplateContainerColor profile={data.profile} color='#7cab9a' />
        <Footer socialNetworks={data.profile.social?.urls} />
      </div>
      <OneTapLogo />

      <ModalCookies
        isModalAlert={isCookies}
        handleModalAlert={() => setIsCookies(false)}
        handleAceptCookies={handleAceptCookies}
      />

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
