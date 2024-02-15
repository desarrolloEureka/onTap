import { GetAllBackgroundImages, GetAllTemplates } from '@/reactQuery/home';
import { BackgroundImages, Templates } from '@/types/home';
import { UserData } from '@/types/user';
import { useLayoutEffect, useState } from 'react';

const TemplateSelectorHook = (user: UserData, type: string) => {
  const templates = GetAllTemplates();
  const backgrounds = GetAllBackgroundImages();
  const [template, setTemplate] = useState<Templates>();
  const [background, setBackground] = useState<BackgroundImages>();

  useLayoutEffect(() => {
    const bgId = user?.templateData?.find((val) => val.type === type);
    if (bgId && templates.data && backgrounds.data) {
      const currentTemplate = templates.data.find((val) => val.id == bgId.id);
      const currentBackground = backgrounds.data.find(
        (val) => val.id == bgId.background_id
      );
      currentTemplate && setTemplate(currentTemplate);
      setBackground(currentBackground);
    }
  }, [backgrounds.data, templates.data, type, user]);

  return { currentTemplate: template, currentBackground: background };
};

export default TemplateSelectorHook;
