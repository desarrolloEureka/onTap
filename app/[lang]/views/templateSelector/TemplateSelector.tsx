import { UserData } from '@/types/user';
import SocialOne from './components/SocialOne';
import SocialTwo from './components/SocialTwo';
import TemplateSelectorHook from './hooks/TemplateSelectorHook';
import ProfessionalOne from './components/ProfessionalOne';

const TemplateSelector = ({ user }: { user: UserData }) => {
  const { currentBackground, currentTemplate } = TemplateSelectorHook(user);
console.log( currentBackground && currentTemplate)
  if (currentTemplate && currentBackground && user) {
    switch (currentTemplate.name) {
      case 'SocialOne':
        return (
          <ProfessionalOne
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
              template: currentTemplate,
              background: currentBackground,
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
  }
};

export default TemplateSelector;
