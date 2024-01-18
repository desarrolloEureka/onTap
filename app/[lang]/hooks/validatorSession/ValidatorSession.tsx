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
    const path = pathname.split(lang)[1];
    if (user) {
      user.isAdmin
        ? router.push('/views/backOffice')
        : path !== '/views/home'
        && router.push('/views/home')
    } else {
      !isLoading && router.push('/views/login');
    }
  }, [isLoading, lang, pathname, router, user]);

  return { isLoading, error };
};

export default ValidatorSession;
