import useHomeHook from '@/hooks/home/homeHook';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const LoginHookMain = () => {
  const router = useRouter();
  const { isLoading, user, error } = useHomeHook();

  useEffect(() => {
    user && router.push('/views/home');
  }, [router, user]);

  return { isLoading, user, error };
};

export default LoginHookMain;
