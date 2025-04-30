import { useEffect, useState } from 'react';
import { GetUser } from '@/reactQuery/users';

const CardViewWhitOutUser = (typeParam: string | null) => {
  const [type, setType] = useState<string | undefined>();
  const { data } = GetUser(true);
  
  useEffect(() => {
    if (typeParam) {
      const type = typeParam;
      setType(type);
    }
  }, [typeParam]);

  return { user: data, type };
};

export default CardViewWhitOutUser;