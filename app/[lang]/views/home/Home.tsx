'use client';
import { Locale } from 'i18n-config';
import useHomeHook from './hook/homeHook';
import useDictionary from 'app/[lang]/hooks/dictionary/useDictionary';

const Home = ({ lang }: { lang: Locale }) => {
  const { dictionary } = useDictionary({ lang });
  const { isLoading, users, error } = useHomeHook();

  return (
    <div>
      <div>Home</div>
      <button>{dictionary?.homeTitle}</button>
      <div>{JSON.stringify(users)}</div>
    </div>
  );
};

export default Home;
