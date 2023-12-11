import { GetUser } from '@/reactQuery/users';
import { User } from '@/types/user';
import { useEffect, useState } from 'react';

const useHomeHook = () => {
  const [user, setUser] = useState<User[]>([]);
  const { isLoading, data, error } = GetUser();

  useEffect(() => {
    data && user.length == 0 && setUser((prev: any) => [...prev, data]);
  }, [data, user]);

  return { isLoading, error, user };
};

export default useHomeHook;
