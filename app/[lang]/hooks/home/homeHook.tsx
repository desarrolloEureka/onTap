import { GetUser } from '@/reactQuery/users';
import { UserData } from '@/types/user';
import { useEffect, useState } from 'react';

const useHomeHook = () => {
  const [user, setUser] = useState<UserData>();
  const [isLoadingData, setIsLoadingData] = useState(true);
  const { data, error } = GetUser();

  const userHandle = (data: any) => {
    setTimeout(() => {
      // setUser((prev: any) => [...prev, data]);
      setUser(data);
      setIsLoadingData(false);
    }, 2000);
  };

  useEffect(() => {
    data && !user && userHandle(data);
  }, [data, user]);

  return { isLoading: isLoadingData, error, user };
};

export default useHomeHook;
