import { QueryClient, useQuery } from '@tanstack/react-query';

const queryClient = new QueryClient();

const SetLangQuery = (lang: string) => {
  const query = useQuery({
    queryKey: ['lang'],
    queryFn: async () => lang,
    enabled: !!lang,
  });
  return query;
};

const GetLangQuery = () => {
  const query = useQuery({
    queryKey: ['lang'],
  });
  return query;
};

export { SetLangQuery, GetLangQuery };
