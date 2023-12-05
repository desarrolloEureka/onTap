'use client';
import Home from '@/views/home/Home';
import { Locale } from 'i18n-config';
import useDictionary from './hooks/dictionary/useDictionary';
import { SetLangQuery } from './reactQuery/lang';
import useHomeHook from './views/home/hook/homeHook';

const Page = ({ params: { lang } }: { params: { lang: Locale } }) => {
  const { dictionary } = useDictionary({ lang });
  const { isLoading, users, error } = useHomeHook();
  SetLangQuery(lang);
  return dictionary && <Home lang={lang} dictionary={dictionary} />;
};

export default Page;
