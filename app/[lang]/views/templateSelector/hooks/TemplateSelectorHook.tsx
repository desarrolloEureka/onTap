import { GetAllBackgroundImages, GetAllTemplates, GetBackgroundImage, GetTemplate } from '@/reactQuery/home';
import { BackgroundImages, Templates } from '@/types/home';
import { UserData } from '@/types/user';
import { useLayoutEffect, useState } from 'react';

const TemplateSelectorHook = (user: UserData, type: string) => {
  const [templateId, setTemplateId] = useState<string | null>(null);
  const [backgroundId, setBackgroundId] = useState<string | undefined | null>(null);
  const templates = GetTemplate({ id: templateId, setId: setTemplateId });
  const backgrounds = GetBackgroundImage({ id: backgroundId, setId: setBackgroundId });
  const [template, setTemplate] = useState<Templates>();
  const [background, setBackground] = useState<BackgroundImages>();

  useLayoutEffect(() => {
    const temId = user?.templateData?.find((val) => val.type === type);
    if (temId) {
      setTemplateId(temId.id);
      setBackgroundId(temId.background_id);
    }
    if (temId && templates.data && backgrounds.data) {
      const currentTemplate = templates.data;
      const currentBackground = backgrounds.data;
      currentTemplate && setTemplate(currentTemplate as Templates);
      currentBackground && setBackground(currentBackground as BackgroundImages);
    }
  }, [backgrounds.data, templates.data, type, user]);

  return { currentTemplate: template, currentBackground: background };
};

export default TemplateSelectorHook;
