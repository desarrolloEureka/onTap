import UserHook from '@/hooks/user/UserHook';
import { SetLangQuery } from '@/reactQuery/lang';
import { Locale } from 'i18n-config';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ValidatorSession = ({ lang }: { lang: Locale }) => {
  const router = useRouter();
  const { isLoading, user, error } = UserHook();
  const pathname = usePathname();
  SetLangQuery(lang);

  useEffect(() => {
    console.log('pathname', pathname);

    const path = pathname.split('es')[1];
    console.log('path', path);

    if (user) {
      if (path !== '/views/home') {
        router.push('/views/home');
      } else {
        console.log('nothing');
      }
    } else {
      error && router.push('/views/login');
    }
  }, [error, pathname, router, user]);

  return { isLoading, error };
};

export default ValidatorSession;
