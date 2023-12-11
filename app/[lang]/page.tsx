'use client';
import ValidatorSession from '@/hooks/validatorSession/ValidatorSession';
import { Locale } from 'i18n-config';
import CustomCircularProgress from './components/customCircularProgress/CustomCircularProgress';
import { SetLangQuery } from './reactQuery/lang';

const Page = ({ params: { lang } }: { params: { lang: Locale } }) => {
  SetLangQuery(lang);
  const { isLoading, error } = ValidatorSession();
  return isLoading ? (
    <CustomCircularProgress isOpen />
  ) : error ? (
    <>Error 500</>
  ) : (
    <></>
  );
};

export default Page;
