import CustomModalAlert from '@/components/customModalAlert/CustomModalAlert';
import useDictionary from '@/hooks/dictionary/useDictionary';
import { BackgroundImages, Templates } from '@/types/home';
import { UserData } from '@/types/user';
import { Locale } from 'i18n-config';
import React, { useState, useLayoutEffect, useEffect } from 'react';
import BgImage from './bgImage/BgImage';
import OneTapLogo from '@/components/oneTapLogo/OneTapLogo';
import HeroSocial from './hero/HeroSocial';
import Footer from './footer/Footer';
import CustomAvatar from './avatar/CustomAvatar';
import zIndex from '@mui/material/styles/zIndex';
import RectangularCustomAvatar from './avatar/RectangularCustomAvatar';
import { Box } from '@mui/system';
import SaveContactButtonColor from './saveContactButton/SaveContactButtonColor';
import TemplateContainerColor from './container/ContainerColor';
import useMediaQuery from '@mui/material/useMediaQuery';

const SocialTwo = ({
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

  const isSmallScreen = useMediaQuery('(max-height:935px)');
  const isSmallScreenTwo = useMediaQuery('(max-height:700px)');
  const isSmallScreenThree = useMediaQuery('(max-height:781px)');
  const isSmallScreenWidth = useMediaQuery('(max-width:440px)');

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  console.log("height ", windowSize.height);
  console.log("width  ", windowSize.width);

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

  return data.profile ? (
    <div className='tw-flex tw-flex-col tw-relative tw-justify-center tw-items-center tw-h-screen'>
      {/* <div className='tw-justify-center tw-shadow-2xl tw-w-[380px] tw-rounded-2xl tw-h-[670px] tw-bg-slate-500'> */}
      <div className={`tw-justify-center tw-items-center tw-shadow-2xl tw-rounded-2xl tw-bg-slate-500`} style={{ height: isSmallScreen ? windowSize.height : '670px', width: isSmallScreenWidth ? windowSize.width : '380px', overflow: 'hidden' }}>

        <BgImage background={background} />
        <Box className='tw-w-full tw-flex tw-flex-col tw-align-middle tw-items-center '>
          <RectangularCustomAvatar
            image={data.image}
            name={data.profile.social?.name?.text || ''}
            ml={0}
            size={isSmallScreenTwo ? 100 : 140}
            //size={140}
            square={true}
            profession={data.profile.social?.profession?.text}
          />
        </Box>
        <div className={`tw-flex tw-flex-col tw-h-[510px] tw-rounded-3xl tw-items-center ${isSmallScreenTwo ? 'tw-mt-5' : 'tw-mt-8'}  tw-bg-white tw-bg-opacity-[50%] tw-relative tw-z-20`} style={{ width: isSmallScreenWidth ? windowSize.width : '380px' }}>
          <div className={`tw-w-full tw-flex tw-flex-col tw-align-middle tw-items-center ${isSmallScreenThree ? 'tw-mt-5' : 'tw-mt-9'}`}>
            <TemplateContainerColor profile={data.profile} color='#396593' />
            <Footer socialNetworks={data.profile.social?.urls} fullSocialIcons />
          </div>
        </div>
      </div>
      <div className='tw-mt-4 tw-z-30 tw-relative'>
        <OneTapLogo />
      </div>
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

export default SocialTwo;
