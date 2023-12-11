import { GetLoginQuery } from '@/reactQuery/users';
import { LoginHookProps } from '@/types/login';

const LoginHook = ({ user, password }: LoginHookProps) => {
  const { isLoading, data, error } = GetLoginQuery({
    user,
    password,
  });
  return { isLoading, data, error };
};

export default LoginHook;
