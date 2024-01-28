import { BackgroundImages } from '@/types/home';
import { Locale } from 'i18n-config';
import BgImage from './bgImage/BgImage';
import TemplateContainer from './container/Container';
import Hero from './hero/Hero';
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
        <Hero
          socialNetworks={data.profile.urls}
          photo={data.image}
          name={`${data.profile.name?.text} '' ${data.profile.last_name?.text}`}
        />
        <TemplateContainer profile={data.profile} />
        <Footer socialNetworks={data.profile.urls} />
      </div>
    </div>
  );
};
export default SocialOne;
