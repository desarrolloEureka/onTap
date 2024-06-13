import { useEffect, useState } from 'react';
import { GetUserById, SendViewUser } from '@/reactQuery/users';

const CardViewHookWithUser = ({ userUid }: { userUid: string }) => {
  const { data: userData } = GetUserById(userUid);
  const [type, setType] = useState<string | undefined>();
  const [viewsIncremented, setViewsIncremented] = useState(false);

  useEffect(() => {
    if (userData) {
      const newUserType = userData.switch_profile ? 'professional' : 'social';
      setType(newUserType);

      if (!viewsIncremented && userData.switch_activateCard) {
        const userId = userData.uid;
        const viewsNow = userData.views;
        const viewsNew = viewsNow + 1;

        SendViewUser(userId, viewsNew)
          .then(() => {
            setViewsIncremented(true);
          })
          .catch((error) => {
            console.error('Error sending view:', error);
          });
      }
    }
  }, [userData, viewsIncremented]);

  return { user: userData, type };
};

export default CardViewHookWithUser;
