import CustomModalAlert from '@/components/customModalAlert/CustomModalAlert';
import useDictionary from '@/hooks/dictionary/useDictionary';
import { BackgroundImages, Templates } from '@/types/home';
import { UserData } from '@/types/user';
import { Locale } from 'i18n-config';
import React, { useState, useLayoutEffect } from 'react';
import BgImage from './bgImage/BgImage';
import OneTapLogo from '@/components/oneTapLogo/OneTapLogo';
import HeroSocial from './hero/HeroSocial';
import Footer from './footer/Footer';
import TemplateContainer from './container/Container';
import CustomAvatar from './avatar/CustomAvatar';
import zIndex from '@mui/material/styles/zIndex';
import RectangularCustomAvatar from './avatar/RectangularCustomAvatar';
import { Box } from '@mui/system';
import SaveContactButtonColor from './saveContactButton/SaveContactButtonColor';
import TemplateContainerColor from './container/ContainerColor';

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

  return data.profile ? (
    <div className='tw-flex tw-flex-col tw-relative tw-justify-center tw-items-center tw-h-screen'>
      <div className='tw-justify-center tw-shadow-md tw-w-[380px] tw-rounded-2xl tw-h-[700px] tw-bg-slate-500'>
        <BgImage background={background} />
        <Box className='tw-w-full tw-flex tw-flex-col tw-align-middle tw-items-center '>
          <RectangularCustomAvatar
            image={data.image}
            name={data.profile.social?.name?.text || ''}
            ml={0}
            size={140}
            square={true}
            profession={data.profile.social?.profession?.text}
          />
        </Box>
        <div className='tw-w-full tw-flex tw-flex-col tw-items-center tw-mt-10 tw-bg-black tw-bg-opacity-25 tw-relative tw-z-20'>
          <div className='tw-w-full tw-flex tw-flex-col tw-align-middle tw-items-center tw-mt-10'>
            <TemplateContainerColor profile={data.profile} color='#396593' />
          </div>
        </div>
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

export default SocialTwo;
