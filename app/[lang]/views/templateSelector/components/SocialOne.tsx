import { BackgroundImages } from '@/types/home';
import { Locale } from 'i18n-config';
import BgImage from './bgImage/BgImage';
import TemplateContainer from './container/Container';
import HeroSocial from './hero/HeroSocial';
import { UserData } from '@/types/user';
import Footer from './footer/Footer';
import OneTapLogo from '@/components/oneTapLogo/OneTapLogo';

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
    <div className='tw-flex tw-flex-col tw-relative tw-justify-center tw-items-center tw-h-screen'>
      <div className='tw-shadow-md tw-w-[380px] tw-rounded-2xl  tw-h-[700px]'>
        <BgImage background={background} />
        <HeroSocial
          socialNetworks={data.profile.social?.urls}
          photo={data.image}
          name={`${
            data.profile.social?.name?.checked
              ? data.profile.social?.name?.text
              : ''
          }  ${
            data.profile.social?.last_name?.checked
              ? data.profile.social?.last_name?.text
              : ''
          }`}
          profession={
            data.profile.social?.profession?.checked
              ? data.profile.social?.profession?.text
              : ''
          }
        />
        <TemplateContainer profile={data.profile} />
        <Footer socialNetworks={data.profile.social?.urls} />
      </div>
      <OneTapLogo />
    </div>
  );
};
export default SocialOne;
