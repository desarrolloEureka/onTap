'use client';
import Login from '@/components/login/Login';
import useDictionary from '@/hooks/dictionary/useDictionary';
import { Locale } from 'i18n-config';
import React from 'react';

const Page = ({ params: { lang } }: { params: { lang: Locale } }) => {
  const { dictionary } = useDictionary({ lang });
  return dictionary && <Login dictionary={dictionary} />;
};

export default Page;
