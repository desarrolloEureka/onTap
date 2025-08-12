import UserHook from '@/hooks/user/UserHook';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const LoginHookMain = () => {
  const router = useRouter();
  const { isLoading, user, error } = UserHook();

  useEffect(() => {
    if (user) {
      //if (user.isActive === true) {
      if (user.isActive === true && user.isActiveByAdmin === true && !user.is_distributor && user?.subscription?.status === "Active") {
        user && router.push('/views/home');
      } else {
        !isLoading;
      }
    }
  }, [isLoading, router, user]);

  return { isLoading, user, error };
};

export default LoginHookMain;
