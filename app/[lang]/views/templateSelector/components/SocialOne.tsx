import { BackgroundImages } from '@/types/home';
import { Locale } from 'i18n-config';
import BgImage from './bgImage/BgImage';
import TemplateContainer from './container/Container';
import HeroSocial from './hero/HeroSocial';
import { UserData } from '@/types/user';
import Footer from './footer/Footer';

const SocialOne = ({
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
      <div className='tw-shadow-md tw-w-[380px] tw-rounded-2xl  tw-h-[700px]'>
        <BgImage background={background} />
        <HeroSocial
          socialNetworks={data.profile.urls}
          photo={data.image}
          name={`${
            data.profile.name?.checked ? data.profile.name?.text : ''
          }  ${data.profile.name?.checked ? data.profile.last_name?.text : ''}`}
          profession={
            data.profile.profession?.checked
              ? data.profile.profession?.text
              : ''
          }
        />
        <TemplateContainer profile={data.profile} />
        <Footer socialNetworks={data.profile.urls} />
      </div>
    </div>
  );
};
export default SocialOne;
