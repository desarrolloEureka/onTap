import { registerFirebase } from '@/firebase/auth';
import { registerUserData } from '@/firebase/user';
import { UserCredential } from 'firebase/auth';

export const registerUserAuth = async ({
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
    phone: '',
    indicative: '',
    isActive: true,
    is_admin: false,
    views: 0,
    switch_activateCard: true,
    switch_profile: true,
    preview: `http://backoffice.onetap.com.co/es/views/cardView?uid=${result.user.uid}`,
    gif: false,
    email: '',
    dni: '',
    isActiveByAdmin: false,
    created: 0,
    templateData: [{
      type: '',
      id: '',
      background_id: '',
      checked: true
    }]
  };
  return userData;
};

export const registerUserAuthDistributor = async ({
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
  };
  return userData;
};

export const registerUserFb = async ({ data }: { data: any }) => {
  const result = await registerUserData(data);
  //console.log('result::::', result);
  return result;
};
