import { getAllUsers, getUserByLogin } from '@/firebase/user';
import { GetLoginQueryProps } from '@/types/userQuery';
import { useQuery } from '@tanstack/react-query';

const GetAllUserQuery = () => {
  const query = useQuery({
    queryKey: ['user'],
    queryFn: async () => await getAllUsers(),
    refetchOnWindowFocus: false,
  });
  return query;
};

const GetLoginQuery = ({ user, password }: GetLoginQueryProps) => {
  const query = useQuery({
    queryKey: ['user'],
    queryFn: async () => await getUserByLogin({ user, password }),
  });
  return query;
};

const GetUser = () =>
  useQuery({
    queryKey: ['user'],
    queryFn: () => {
      const userLogged = localStorage.getItem('@user');
      return userLogged ? JSON.parse(userLogged) : null;
    },
  });

export { GetAllUserQuery, GetLoginQuery, GetUser };
