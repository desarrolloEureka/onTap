import { GetAllUserQuery } from '@/reactQuery/users';
import { User } from '@/types/user';
import { DocumentData, QuerySnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const useHomeHook = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { isLoading, data, error } = GetAllUserQuery();

  const handleUsers = (data: QuerySnapshot<DocumentData, DocumentData>) => {
    data.forEach((doc) => {
      const data = doc.data() as User;
      setUsers((prev: any) => [...prev, data]);
    });
  };

  useEffect(() => {
    data && users.length == 0 && handleUsers(data);
  }, [data, users]);

  return { isLoading, error, users };
};

export default useHomeHook;
