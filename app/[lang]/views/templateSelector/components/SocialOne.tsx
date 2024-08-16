import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Locale } from 'i18n-config';
import useDictionary from '@/hooks/dictionary/useDictionary';
import useMediaQuery from '@mui/material/useMediaQuery';
import CustomModalAlert from '@/components/customModalAlert/CustomModalAlert';
import OneTapLogo from '@/components/oneTapLogo/OneTapLogo';
import BgImage from './bgImage/BgImage';
import Footer from './footer/Footer';
import HeroSocial from './hero/HeroSocial';
import TemplateContainerColor from './container/ContainerColor';
import ModalCookies from '@/components/customModalAlert/ModalCookies';
import { BackgroundImages } from '@/types/home';
import { UserData } from '@/types/user';

const SocialOne = ({
  params: { lang, background, data, handleAceptCookiesPage, isCookies },
}: {
  params: {
    lang: Locale;
    background: BackgroundImages;
    data: UserData;
    handleAceptCookiesPage: () => Promise<void>
    isCookies: boolean
  };
}) => {
  const { dictionary } = useDictionary({ lang });
  const [isDataError, setIsDataError] = useState(true);
  const isSmallScreen = useMediaQuery('(max-height:935px)');
  const isSmallScreenWidth = useMediaQuery('(max-width:440px)');
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleAceptCookies = async () => {
    handleAceptCookiesPage();
  };

  useEffect(() => {
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

  useLayoutEffect(() => {
    data.profile && setIsDataError(false);
  }, [data.profile]);

  return data.profile && data.profile.social ? (
    <div className='tw-flex tw-flex-col tw-relative tw-justify-center tw-items-center tw-h-screen'>
      <div className={`tw-shadow-md tw-rounded-2xl tw-bg-slate-500`}
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
          name={`${data.profile.social?.name?.checked ? data.profile.social?.name?.text : ''}  
                ${data.profile.social?.last_name?.checked ? data.profile.social?.last_name?.text : ''}`}
          profession={data.profile.social?.profession?.checked ? data.profile.social?.profession?.text : ''}
        />
        <TemplateContainerColor profile={data.profile} color='#7cab9a' />
        <Footer socialNetworks={data.profile.social?.urls} />
        <OneTapLogo />
      </div>


      <ModalCookies
        isModalAlert={isCookies}
        handleAceptCookies={handleAceptCookies}
      />
    </div>
  ) : (
    <CustomModalAlert
      isModalAlert={isDataError}
      handleModalAlert={() => setIsDataError(false)}
      title={dictionary?.generalTitle || ''}
      description={dictionary?.cardView?.dataNotFound || ''}
      isClosed={false}
    />
  );
};

export default SocialOne;
