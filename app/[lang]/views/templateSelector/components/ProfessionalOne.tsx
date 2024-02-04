import { BackgroundImages } from '@/types/home';
import { Locale } from 'i18n-config';
import BgImage from './bgImage/BgImage';
import TemplateContainer from './container/Container';
import HeroProfessional from './hero/HeroProfessional';
import { UserData } from '@/types/user';
import Footer from './footer/Footer';
import TemplateContainerProfessionalOne from './container/ContainerProfessionalOne';

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
        {/*<Footer socialNetworks={data.profile.urls} /> */}
      </div>
    </div>
  );
};
export default ProfessionalOne;
