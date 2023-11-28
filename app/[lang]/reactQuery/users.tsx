import { getAllUsers, userExist } from '@/firebase/auth';
import { useQuery } from '@tanstack/react-query';

const GetAllUserQuery = () => {
  const query = useQuery({
    queryKey: ['user'],
    queryFn: async () => await getAllUsers(),
    refetchOnWindowFocus: false,
  });
  return query;
};

export { GetAllUserQuery };
