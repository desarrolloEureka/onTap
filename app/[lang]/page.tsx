'use client';
import { CircularProgress } from '@mui/material';
import { Locale } from 'i18n-config';
import NavigatorHook from './hooks/navigator/NavigatorHook';

const Page = ({ params: { lang } }: { params: { lang: Locale } }) => {
  const { isLoading, error } = NavigatorHook(lang);
  return isLoading ? <CircularProgress /> : error ? <>Error 500</> : <></>;
};

export default Page;
