import { loginFirebase } from '@/firebase/auth';
import {
  getAllUsers,
  getUserById,
  updateSwitchActivateCard,
  updateSwitchAllFirebase,
  updateUserData,
  updateSwitchProfileFirebase,
  updatePasswordFirebase,
  updateTemplateSelectedFirebase,
} from '@/firebase/user';
import { UserData, UserDb } from '@/types/user';
import { GetLoginQueryProps } from '@/types/userQuery';
import { useQuery } from '@tanstack/react-query';

const GetAllUserQuery = () => {
  const query = useQuery({
    queryKey: ['user'],
    queryFn: async () => await getAllUsers(),
    refetchOnWindowFocus: false,
  });
  return query;
};

const userDataToSend = (user: UserDb, resultUser: any) => {
  const getUser = {
    uid: resultUser.user.uid,
    email: resultUser.user.email!,
    emailVerified: resultUser.user.emailVerified,
    displayName: user.name,
    isAdmin: user.is_admin,
    profile: { ...user },
  };
  return getUser;
};

const GetLoginQuery = ({ user, password, sendLogin }: GetLoginQueryProps) => {
  const query = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const resultUser = await loginFirebase({
        user: user!,
        password: password!,
      });

      if (resultUser && resultUser.user) {
        const docSnap = await getUserById(resultUser.user.uid);
        if (docSnap.exists()) {
          const user = docSnap.data() as UserDb;
          const getUser = userDataToSend(user, resultUser);
          console.log('getUser', getUser);

          localStorage.setItem('@user', JSON.stringify(getUser));
          return getUser;
        } else {
          return null;
        }
      } else {
        //create account if user not exist and exist in woocommerce
        return null;
      }
    },
    retry: false,
    enabled: sendLogin,
  });
  return query;
};

/* Actualizar react query*/
const SendDataImage = async (userId: string, base64String: string) => {
  await updateUserData(userId, { image: base64String });
  const updatedUser = await getUserById(userId);
  if (updatedUser.exists()) {
    const userData = updatedUser.data() as UserDb;
    const getUser = reBuildUserData(userData);
    localStorage.setItem('@user', JSON.stringify(getUser));
  }
};

const reBuildUserData = (userData: UserDb) => {
  const userStorage = localStorage.getItem('@user');
  if (userStorage) {
    const user = JSON.parse(userStorage);
    return userDataToSend(userData, { user });
  } else {
    return userData;
  }
};

const SendSwitchProfile = async (userId: string, switchState: boolean) => {
  await updateSwitchProfileFirebase(userId, { switch_profile: switchState });
  const updatedUser = await getUserById(userId);
  if (updatedUser.exists()) {
    const userData = updatedUser.data() as UserDb;
    const getUser = reBuildUserData(userData);
    localStorage.setItem('@user', JSON.stringify(getUser));
  }
};

const SendSwitchActivateCard = async (userId: string, switchState: boolean) => {
  await updateSwitchActivateCard(userId, { switch_activateCard: switchState });
  const updatedUser = await getUserById(userId);
  if (updatedUser.exists()) {
    const userData = updatedUser.data() as UserDb;
    const getUser = reBuildUserData(userData);
    localStorage.setItem('@user', JSON.stringify(getUser));
  }
};

const UpdatePassword = async (password: string) => {
  const res = await updatePasswordFirebase(password);
  return res;
};

const SendTemplateSelected = async (
  userId: string,
  backgroundSelect: string,
  templateSelect: string
) => {
  const templateData = {
    template_id: templateSelect,
    background_id: backgroundSelect,
  };

  await updateTemplateSelectedFirebase(userId, { templateData });
};

const SendSwitchAllForm = async (userId: string, dataForm: any) => {
  await updateSwitchAllFirebase(userId, { switchAllForm: dataForm });
};

const GetUser = () =>
  useQuery({
    queryKey: ['user'],
    queryFn: () => {
      const userLogged = localStorage.getItem('@user');
      return userLogged ? (JSON.parse(userLogged) as UserData) : null;
    },
  });

export {
  SendDataImage,
  GetAllUserQuery,
  GetLoginQuery,
  GetUser,
  SendSwitchProfile,
  SendSwitchActivateCard,
  UpdatePassword,
  SendTemplateSelected,
  SendSwitchAllForm,
};
