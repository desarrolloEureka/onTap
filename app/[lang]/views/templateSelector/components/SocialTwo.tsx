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
import ModalCookies from '@/components/customModalAlert/ModalCookies';

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
  const [isCookies, setIsCookies] = useState(false);
  const [isAcceptCookies, setIsAcceptCookies] = useState(false);

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

  const handleAceptCookies = async () => {
    console.log(JSON.stringify(true));
    await localStorage.setItem('@cookies', JSON.stringify(true));
    setIsCookies(false);
    setIsAcceptCookies(true);
  };

  useEffect(() => {
    const cookies = localStorage.getItem('@cookies');
    if (cookies) {
      setIsCookies(false);
      setIsAcceptCookies(true);
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

  return (
    isCookies && isAcceptCookies === false ? (
      <ModalCookies
        isModalAlert={isCookies}
        handleModalAlert={() => setIsCookies(false)}
        handleAceptCookies={handleAceptCookies}
      />
    ) : data.profile && isAcceptCookies === true ? (
      <div className='tw-flex tw-flex-col tw-relative tw-justify-center tw-items-center tw-h-screen'>
        <div className={`tw-justify-center tw-items-center tw-shadow-2xl tw-rounded-2xl tw-bg-slate-500`} style={{ height: isSmallScreen ? windowSize.height : '670px', width: isSmallScreenWidth ? windowSize.width : '380px', overflow: 'hidden' }}>

          <BgImage background={background} />
          <Box className='tw-w-full tw-flex tw-flex-col tw-align-middle tw-items-center '>
            <RectangularCustomAvatar
              image={data.image}
              //name={data.profile.social?.name?.text + " " + data.profile.social?.last_name?.text || ''}
              name={`${data.profile.social?.name?.checked
                ? data.profile.social?.name?.text
                : ''
                }  ${data.profile.social?.last_name?.checked
                  ? data.profile.social?.last_name?.text
                  : ''
                }`}
              ml={0}
              size={isSmallScreenTwo ? 100 : 140}
              //size={140}
              square={true}
              profession={data.profile.social?.profession?.text}
            />
          </Box>
          <div className={`tw-flex tw-flex-col tw-h-[510px] tw-rounded-3xl tw-items-center ${isSmallScreenTwo ? 'tw-mt-2' : 'tw-mt-3'}  tw-bg-white tw-bg-opacity-[50%] tw-relative tw-z-20`} style={{ width: isSmallScreenWidth ? windowSize.width : '380px' }}>
            <div className={`tw-w-full tw-flex tw-flex-col tw-align-middle tw-items-center ${isSmallScreenThree ? 'tw-mt-5' : 'tw-mt-9'}`}>
              <TemplateContainerColor profile={data.profile} color='#396593' />
              <Footer socialNetworks={data.profile.social?.urls} fullSocialIcons />
            </div>
          </div>
        </div>
        <div className='tw-mt-4 tw-z-30 tw-relative'>
          <OneTapLogo />
        </div>

        <ModalCookies
          isModalAlert={isCookies}
          handleModalAlert={() => setIsCookies(false)}
          handleAceptCookies={handleAceptCookies}
        />

      </div>
    ) : isAcceptCookies === false ? (
      null
    ) : (
      <CustomModalAlert
        isModalAlert={isDataError}
        handleModalAlert={() => setIsDataError(false)}
        title={dictionary?.generalTitle || ''}
        description={dictionary?.cardView?.dataNotFound || ''}
        isClosed={true}
      />
    )
  );
};

export default SocialTwo;