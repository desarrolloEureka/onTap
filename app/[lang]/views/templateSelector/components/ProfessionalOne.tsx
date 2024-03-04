import { BackgroundImages } from '@/types/home';
import { UserData } from '@/types/user';
import { Locale } from 'i18n-config';
import BgImage from './bgImage/BgImage';
import TemplateContainerProfessionalOne from './container/ContainerProfessionalOne';
import HeroProfessional from './hero/HeroProfessional';
import OneTapLogo from '@/components/oneTapLogo/OneTapLogo';
import CustomModalAlert from '@/components/customModalAlert/CustomModalAlert';
import { useEffect, useState } from 'react';
import useDictionary from '@/hooks/dictionary/useDictionary';
import useMediaQuery from '@mui/material/useMediaQuery';

const ProfessionalOne = ({
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

  const isSmallScreen = useMediaQuery('(max-height:935px)');
  const isSmallScreenWidth = useMediaQuery('(max-width:440px)');

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

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
      <div className={`tw-shadow-md tw-rounded-2xl tw-pt-[0px]`} style={{ height: isSmallScreen ? windowSize.height : '700px', width: isSmallScreenWidth ? windowSize.width : '380px', overflow: 'hidden' }}>
        <BgImage background={background} />
        <HeroProfessional
          socialNetworks={data.profile.professional?.urls}
          photo={data.image}
          name={`${data.profile.professional?.name?.text}  ${data.profile.professional?.last_name?.text}`}
          profession={
            data.profile.professional?.profession?.checked
              ? data.profile.professional?.profession?.text
              : ''
          }
        />
        <TemplateContainerProfessionalOne profile={data.profile} />
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
export default ProfessionalOne;
