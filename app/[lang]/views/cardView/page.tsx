import React from 'react';
import HomeThree from './components/HomeThree';
import { Locale } from 'i18n-config';

function Page({ params: { lang } }: { params: { lang: Locale } }) {
  return <HomeThree params={{ lang: 'es' }} />;
}

export default Page;
