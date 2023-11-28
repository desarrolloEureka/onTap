import { getDictionary } from '@/types/getDictionary';
import { Locale } from 'i18n-config';
import React from 'react';

const Home = async ({ lang }: { lang: Locale }) => {
  const dict = await getDictionary(lang);
  return (
    <div>
      <div>Home</div>
      <button>{dict.homeTitle}</button>
    </div>
  );
};

export default Home;
