import { BackgroundImages, Templates } from '@/types/home';
import { Locale } from 'i18n-config';
import React from 'react';

const SocialTwo = ({
  params: { lang, template, background },
}: {
  params: { lang: Locale; template: Templates; background: BackgroundImages };
}) => {
  return <div>SocialTwo</div>;
};

export default SocialTwo;
