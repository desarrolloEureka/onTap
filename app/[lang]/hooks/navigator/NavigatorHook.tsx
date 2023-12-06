import { SetLangQuery } from '@/reactQuery/lang';
import { Locale } from 'i18n-config';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useHomeHook from '@/views/home/hook/homeHook';

const NavigatorHook = (lang: Locale) => {
  const router = useRouter();
  const { isLoading, users, error } = useHomeHook();
  SetLangQuery(lang);

  useEffect(() => {
    router.push('/views/login');
    // router && users ? router.push('/views/home') : router.push('/views/login');
  }, [router, users]);

  return { isLoading, error };
};

export default NavigatorHook;
