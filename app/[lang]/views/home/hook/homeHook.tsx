import { GetUser } from '@/reactQuery/users';
import { User } from '@/types/user';
import { useEffect, useState } from 'react';

const useHomeHook = () => {
  const [user, setUser] = useState<User>();
  const { isLoading, data, error } = GetUser();

  useEffect(() => {
    // setUser((prev: any) => [...prev, data])
    data && user && setUser(data);
  }, [data, user]);

  return { isLoading, error, user };
};

export default useHomeHook;
