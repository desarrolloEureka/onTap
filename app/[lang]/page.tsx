'use client';
import ValidatorSession from '@/hooks/validatorSession/ValidatorSession';
import { Locale } from 'i18n-config';
import CustomCircularProgress from './components/customCircularProgress/CustomCircularProgress';
import useDictionary from './hooks/dictionary/useDictionary';

const Page = ({ params: { lang } }: { params: { lang: Locale } }) => {
  const { dictionary } = useDictionary({ lang });
  const { isLoading, error } = ValidatorSession({ lang });
  return isLoading ? (
    <CustomCircularProgress isOpen />
  ) : error ? (
    <></>
  ) : (
    <>{dictionary?.profileView?.labelError505}</>
  );
};

export default Page;
