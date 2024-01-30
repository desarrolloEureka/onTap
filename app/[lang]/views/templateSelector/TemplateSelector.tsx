import { UserData } from '@/types/user';
import SocialOne from './components/SocialOne';
import SocialTwo from './components/SocialTwo';
import TemplateSelectorHook from './hooks/TemplateSelectorHook';

const TemplateSelector = ({ user }: { user: UserData }) => {
  const { currentBackground, currentTemplate } = TemplateSelectorHook(user);

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
              template: currentTemplate,
              background: currentBackground,
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
