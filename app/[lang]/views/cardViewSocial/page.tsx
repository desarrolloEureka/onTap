'use client';
import React, { useLayoutEffect, useState } from 'react';
import { Locale } from 'i18n-config';
import SocialOne from './components/SocialOne';
import { GetUser, GetUserById } from '@/reactQuery/users';
import { GetAllBackgroundImages, GetAllTemplates } from '@/reactQuery/home';
import SocialTwo from './components/SocialTwo';
import { BackgroundImages, Templates } from '@/types/home';
import { useSearchParams } from 'next/navigation';

function Page({ params: { lang } }: { params: { lang: Locale } }) {
  const searchParams = useSearchParams();
  const user = GetUser();
  const uid = searchParams.get('uid');
  const [userUid, setUserUid] = useState<string>('');
  const { data } = GetUserById(userUid);
  const templates = GetAllTemplates();
  const backgrounds = GetAllBackgroundImages();
  const [currentTemplate, setCurrentTemplate] = useState<Templates>();
  const [currentBackground, setCurrentBackground] =
    useState<BackgroundImages>();

  useLayoutEffect(() => {
    if (userUid) {
      const bgId = data?.templateData?.find((val) => val.type === 'social');
      const currentTemplate = templates?.data?.find(
        (val) => val.id == bgId?.id
      );
      const currentBackground = backgrounds?.data?.find(
        (val) => val.id == bgId?.background_id
      );
      currentTemplate && setCurrentTemplate(currentTemplate);
      setCurrentBackground(currentBackground);
    }
    user?.data ? setUserUid(user.data?.uid) : uid && setUserUid(uid);
  }, [backgrounds?.data, data, templates?.data, uid, user.data, userUid]);

  if (currentTemplate && currentBackground && data) {
    switch (currentTemplate.name) {
      case 'SocialOne':
        return (
          <SocialOne
            params={{
              lang: 'es',
              background: currentBackground,
              data: data,
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
              data: data,
            }}
          />
        );
    }
  }
}

export default Page;
