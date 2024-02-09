import { BackgroundImages } from '@/types/home';
import { UserData } from '@/types/user';
import { Locale } from 'i18n-config';
import BgImage from './bgImage/BgImage';
import TemplateContainerProfessionalOne from './container/ContainerProfessionalOne';
import HeroProfessional from './hero/HeroProfessional';

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
    <div className='tw-flex tw-relative tw-justify-center tw-items-center tw-h-screen'>
      <div className='tw-shadow-md tw-w-[380px] tw-rounded-2xl tw-pt-[0px] tw-h-[700px]'>
        <BgImage background={background} />
        <HeroProfessional
          socialNetworks={data.profile.urls}
          photo={data.image}
          name={`${data.profile.name?.text}  ${data.profile.last_name?.text}`}
          profession={data.profile.profession?.text}
        />
        <TemplateContainerProfessionalOne profile={data.profile} />
      </div>
    </div>
  );
};
export default ProfessionalOne;
