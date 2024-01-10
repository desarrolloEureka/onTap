import { GetUser } from '@/reactQuery/users';
import { User } from '@/types/user';
import { useEffect, useState } from 'react';

const UserHook = () => {
  const [user, setUser] = useState<User | undefined>();
  const [isLoadingData, setIsLoadingData] = useState(true);
  const { data, error } = GetUser();

  const userHandle = (data: any) => {
    setUser(data);
    setTimeout(() => {
      // setUser((prev: any) => [...prev, data]);
      setIsLoadingData(false);
    }, 1000);
  };

  useEffect(() => {
    if (data && !user) {
      userHandle(data);
    } else {
      setTimeout(() => {
        setIsLoadingData(false);
      }, 2000);
    }
  }, [data, user]);

  return { isLoading: isLoadingData, error, user };
};

export default UserHook;
