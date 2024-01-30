import { GetUserById } from '@/reactQuery/users';

const CardViewHookWithUser = ({ userUid }: { userUid: string }) => {
  const { data } = GetUserById(userUid);
  return { user: data };
};

export default CardViewHookWithUser;
