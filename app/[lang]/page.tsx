'use client';
import ValidatorSession from '@/hooks/validatorSession/ValidatorSession';
import { Locale } from 'i18n-config';
import CustomCircularProgress from './components/customCircularProgress/CustomCircularProgress';

const Page = ({ params: { lang } }: { params: { lang: Locale } }) => {
  const { isLoading, error } = ValidatorSession({ lang });
  return isLoading ? (
    <CustomCircularProgress isOpen />
  ) : error ? (
    <>Error 500</>
  ) : (
    <></>
  );
};

export default Page;
