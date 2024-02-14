import { useEffect, useState } from 'react';
import { GetUser } from '@/reactQuery/users';

const CardViewWhitOutUser = () => {
  const [type, setType] = useState<string | undefined>();
  const { data } = GetUser();

  useEffect(() => {
    if (data) {
      const type = data?.switch_profile ? 'professional' : 'social';
      setType(type);
    }
  }, [data]);

  return { user: data, type };
};

export default CardViewWhitOutUser;
