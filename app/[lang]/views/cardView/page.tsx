'use client';
import { Locale } from 'i18n-config';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import CardViewWhitOutUser from './hooks/CardViewWhitOutUser';
import CardViewHookWithUser from './hooks/CardViewHookWithUser';
import TemplateSelector from '../templateSelector/TemplateSelector';

const Page = ({ params: { lang } }: { params: { lang: Locale } }) => {
  const searchParams = useSearchParams();
  const uid = searchParams.get('uid');
  const { user } = uid
    ? CardViewHookWithUser({ userUid: uid })
    : CardViewWhitOutUser();

  return user && <TemplateSelector user={user} />;
};

export default Page;
