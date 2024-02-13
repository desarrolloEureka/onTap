import { useEffect } from 'react';
import { GetUserById, SendViewUser } from '@/reactQuery/users';
import { GetUser } from '@/reactQuery/users';

const CardViewHookWithUser = ({ userUid }: { userUid: string }) => {
  const { data } = GetUserById(userUid);
  const datUser = GetUser();

  useEffect(() => {
    if (datUser) {
      const uid = datUser?.data?.uid;
      if (data && uid != userUid) {
        if (data && data.switch_activateCard) {
          const viewsNow = data.views;
          const viewsNew = viewsNow + 1;
          const userId = data?.uid;
          if (userId) {
            SendViewUser(userId, viewsNew);
          }
        }
      }
    }
  }, [data]);

  return { user: data };
};

export default CardViewHookWithUser;
