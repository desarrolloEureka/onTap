import React from 'react';
import Home from '@/views/home/Home';
import { Locale } from 'i18n-config';
import { getDictionary } from '@/types/getDictionary';

const page = async ({ params: { lang } }: { params: { lang: Locale } }) => {
  const dict = await getDictionary(lang);
  return <Home lang={lang} />;
  // return <div>home</div>;
};

export default page;
