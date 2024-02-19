import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const LogOut = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const logOut = () => {
    queryClient.removeQueries();
    localStorage.clear();
    router.replace('/views/login');
  };
  return { logOut };
};

export default LogOut;
