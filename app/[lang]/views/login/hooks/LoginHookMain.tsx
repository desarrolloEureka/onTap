import UserHook from '@/hooks/user/UserHook';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const LoginHookMain = () => {
  const router = useRouter();
  const { isLoading, user, error } = UserHook();

  useEffect(() => {
    user && router.push('/views/home');
  }, [router, user]);

  return { isLoading, user, error };
};

export default LoginHookMain;
