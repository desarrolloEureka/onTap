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
import ProfessionalTwo from './components/ProfessionalTwo';

const TemplateSelector = ({
  user,
  type,
  lang,
  handleAceptCookies,
  isCookies
}: {
  user: UserData;
  type: string;
  lang: Locale;
  isCookies: boolean
  handleAceptCookies: () => Promise<void>
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
                handleAceptCookiesPage: handleAceptCookies,
                isCookies: isCookies
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
                handleAceptCookiesPage: handleAceptCookies,
                isCookies: isCookies
              }}
            />
          );
        case 'ProfessionalOne':
          return (
            <ProfessionalTwo
              params={{
                lang: 'es',
                background: currentBackground,
                data: user,
                handleAceptCookiesPage: handleAceptCookies,
                isCookies: isCookies
              }}
            />
          );
        case 'ProfessionalTwo':
          return (
            <ProfessionalTwo
              params={{
                lang: 'es',
                background: currentBackground,
                data: user,
                handleAceptCookiesPage: handleAceptCookies,
                isCookies: isCookies
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
                handleAceptCookiesPage: handleAceptCookies,
                isCookies: isCookies
              }}
            />
          );
      }
    } else {
      return <CustomCircularProgress isOpen />;
    }
  } else {
    if (type === 'professional') {
      return (<CustomModalAlert
        isModalAlert={isDataError}
        handleModalAlert={() => setIsDataError(false)}
        title={dictionary?.generalTitle || ''}
        description={dictionary?.cardView?.completeDataProfesional || ''}
        isClosed={false}
      />
      )
    } else {
      return (
        <CustomModalAlert
          isModalAlert={isDataError}
          handleModalAlert={() => setIsDataError(false)}
          title={dictionary?.generalTitle || ''}
          description={dictionary?.cardView?.completeDataSocial || ''}
          isClosed={false}
        />
      );
    }

  }
};

export default TemplateSelector;
