'use client';
import CustomCircularProgress from '@/components/customCircularProgress/CustomCircularProgress';
import Login from '@/components/login/Login';
import useDictionary from '@/hooks/dictionary/useDictionary';
import { Locale } from 'i18n-config';
import LoginHookMain from './hooks/LoginHookMain';

const Page = ({ params: { lang } }: { params: { lang: Locale } }) => {
  const { dictionary } = useDictionary({ lang });
  const { isLoading, user } = LoginHookMain();

  //  return !user && !isLoading ? (
  return !isLoading ? (
    dictionary && <Login dictionary={dictionary} />
  ) : (
    console.log("Entre cargando..."),
    <CustomCircularProgress isOpen />
  );
};
export default Page;
