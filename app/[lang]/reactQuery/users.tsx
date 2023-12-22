import { loginFirebase } from '@/firebase/auth';
import { getAllUsers, getUserById, getUserByLogin } from '@/firebase/user';
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

const GetLoginQuery = ({ user, password, sendLogin }: GetLoginQueryProps) => {
  const query = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const resultUser = await loginFirebase({
        user: user!,
        password: password!,
      });

      if (resultUser && resultUser.user) {
        const docSnap = await getUserById(resultUser.user.uid);
        if (docSnap.exists()) {
          const user = docSnap.data();

          const getUser = {
            uid: resultUser.user.uid,
            email: resultUser.user.email!,
            emailVerified: resultUser.user.emailVerified,
            displayName: user.name,
            isAdmin: user.is_admin,
          };
          localStorage.setItem('@user', JSON.stringify(getUser));
          return getUser;
        } else {
          return null;
        }
      } else {
        //create account if user not exist and exist in woocommerce
        return null;
      }
    },
    retry: false,
    enabled: sendLogin,
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
