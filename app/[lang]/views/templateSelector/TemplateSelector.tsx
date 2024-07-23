import { UserData } from '@/types/user';
import SocialOne from './components/SocialOne';
import TemplateSelectorHook from './hooks/TemplateSelectorHook';
import ProfessionalOne from './components/ProfessionalOne';
import CustomCircularProgress from '@/components/customCircularProgress/CustomCircularProgress';
import CustomModalAlert from '@/components/customModalAlert/CustomModalAlert';
import useDictionary from '@/hooks/dictionary/useDictionary';
import { useState } from 'react';
import { Locale } from 'i18n-config';
import SocialTwo from './components/SocialTwo';

const TemplateSelector = ({
  user,
  type,
  lang,
}: {
  user: UserData;
  type: string;
  lang: Locale;
}) => {
  const { dictionary } = useDictionary({ lang });
  const [isDataError, setIsDataError] = useState(true);
  const { currentBackground, currentTemplate } = TemplateSelectorHook(
    user,
    type
  );

  if (user.profile) {
    if (currentTemplate && currentBackground && user) {
      switch (currentTemplate.name) {
        case 'SocialOne':
          return (
            <SocialOne
              params={{
                lang: 'es',
                background: currentBackground,
                data: user,
              }}
            />
          );
        case 'SocialTwo':
          return (
            <SocialTwo
              params={{
                lang: 'es',
                background: currentBackground,
                data: user,
              }}
            />
          );
        case 'ProfessionalOne':
          return (
            <ProfessionalOne
              params={{
                lang: 'es',
                background: currentBackground,
                data: user,
              }}
            />
          );
        default:
          return (
            <SocialOne
              params={{
                lang: 'es',
                background: currentBackground,
                data: user,
              }}
            />
          );
      }
    } else {
      return <CustomCircularProgress isOpen />;
    }
  } else {
    <CustomModalAlert
      isModalAlert={isDataError}
      handleModalAlert={() => setIsDataError(false)}
      title={dictionary?.generalTitle || ''}
      description={dictionary?.cardView?.dataNotFound || ''}
      isClosed={true}
    />;
  }
};

export default TemplateSelector;
