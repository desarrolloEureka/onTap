import UserHook from '@/hooks/user/UserHook';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ValidatorSession = () => {
  const router = useRouter();
  const { isLoading, user, error } = UserHook();

  useEffect(() => {
    router && user ? router.push('/views/home') : router.push('/views/login');
  }, [router, user]);

  return { isLoading, error };
};

export default ValidatorSession;
