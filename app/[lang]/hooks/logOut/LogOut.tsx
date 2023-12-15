import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const LogOut = () => {
  const queryClient = new QueryClient();
  const router = useRouter();

  const logOut = () => {
    localStorage.clear();
    queryClient.clear();
    router.replace('/views/login');
  };
  return { logOut };
};

export default LogOut;
