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
    if (!isLoading) {
      if (user) {
        const path = pathname.split('es')[1];
        if (path !== '/views/home') {
          router.push('/views/home');
        } else {
          user.isAdmin && router.push('/views/backOffice');
        }
      } else {
        !user && error == null && router.push('/views/login');
      }
    }
  }, [error, isLoading, pathname, router, user]);

  return { isLoading, error };
};

export default ValidatorSession;
