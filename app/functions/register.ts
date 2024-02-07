import { registerFirebase } from '@/firebase/auth';
import { UserCredential } from 'firebase/auth';

export const registerUser = async ({
  user,
  password,
}: {
  user: string;
  password: string;
}) => {
  const result: UserCredential = await registerFirebase(user, password);
  const userData = {
    uid: result.user.uid,
    emailVerified: result.user.emailVerified,
    name: '',
    plan: '',
    isActive: true,
    is_admin: false,
    views: 0,
    switch_activateCard: true,
    switch_profile: true,
    preView: `http://backoffice.onetap.com.co/es/views/cardView?uid=${result.user.uid}type=social`,
  };
  return userData;
};
