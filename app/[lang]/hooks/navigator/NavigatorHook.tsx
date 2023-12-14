import { SetLangQuery } from '@/reactQuery/lang';
import { Locale } from 'i18n-config';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useHomeHook from '@/hooks/home/homeHook';

const NavigatorHook = (lang: Locale) => {
  const router = useRouter();
  const { isLoading, user, error } = useHomeHook();
  SetLangQuery(lang);

  useEffect(() => {
    router && user ? router.push('/views/home') : router.push('/views/login');
  }, [router, user]);

  return { isLoading, error };
};

export default NavigatorHook;
