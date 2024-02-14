import { useEffect, useState } from 'react';
import { GetUserById, SendViewUser } from '@/reactQuery/users';
import { GetUser } from '@/reactQuery/users';

const CardViewHookWithUser = ({ userUid }: { userUid: string }) => {
  const { data } = GetUserById(userUid);
  const [type, setType] = useState<string | undefined>();

  // const datUser = GetUser();

  useEffect(() => {
    // if (datUser) {
    // const uid = datUser?.data?.uid;
    if (data) {
      const type = data?.switch_profile ? 'professional' : 'social';
      setType(type);
      if (data && data.switch_activateCard) {
        const viewsNow = data.views;
        const viewsNew = viewsNow + 1;
        const userId = data?.uid;
        if (userId) {
          SendViewUser(userId, viewsNew);
        }
      }
    }
    // }
  }, [data]);

  return { user: data, type };
};

export default CardViewHookWithUser;
