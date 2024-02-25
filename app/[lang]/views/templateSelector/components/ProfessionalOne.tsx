import { BackgroundImages } from '@/types/home';
import { UserData } from '@/types/user';
import { Locale } from 'i18n-config';
import BgImage from './bgImage/BgImage';
import TemplateContainerProfessionalOne from './container/ContainerProfessionalOne';
import HeroProfessional from './hero/HeroProfessional';
import OneTapLogo from '@/components/oneTapLogo/OneTapLogo';

const ProfessionalOne = ({
  params: { lang, background, data },
}: {
  params: {
    lang: Locale;
    background: BackgroundImages;
    data: UserData;
  };
}) => {
  return (
    <div className='tw-flex tw-flex-col tw-relative tw-justify-center tw-items-center tw-h-screen'>
      <div className='tw-shadow-md tw-w-[380px] tw-rounded-2xl tw-pt-[0px] tw-h-[700px]'>
        <BgImage background={background} />
        <HeroProfessional
          socialNetworks={data.profile.social?.urls}
          photo={data.image}
          name={`${data.profile.social?.name?.text}  ${data.profile.social?.last_name?.text}`}
          profession={
            data.profile.social?.profession?.checked
              ? data.profile.social?.profession?.text
              : ''
          }
        />
        <TemplateContainerProfessionalOne profile={data.profile} />
      </div>
      <OneTapLogo />
    </div>
  );
};
export default ProfessionalOne;
