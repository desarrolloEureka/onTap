import { loginFirebase } from '@/firebase/auth';
import {
  getAllUsers,
  getUserByIdFireStore,
  updateDataUserProfile,
  updatePasswordFirebase,
  updateSwitchActivateCard,
  updateSwitchAllFirebase,
  updateSwitchProfileFirebase,
  updateTemplateSelectedFirebase,
  updateUserData,
} from '@/firebase/user';
import { DataForm } from '@/types/profile';
import { TemplateData, UserData, UserDb } from '@/types/user';
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

const userDataToSend = (user: UserData, resultUser: any) => {
  user.uid = resultUser.user.uid;
  user.email = resultUser.user.email;
  user.emailVerified = resultUser.user.emailVerified;
  user.displayName = resultUser.user.name;
  user.isAdmin = user.is_admin;
  return user;
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
        const docSnap = await getUserByIdFireStore(resultUser.user.uid);
        if (docSnap.exists()) {
          const user = docSnap.data() as UserData;
          const getUser = userDataToSend(user, resultUser);
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
  const updatedUser = await getUserByIdFireStore(userId);
  if (updatedUser.exists()) {
    const userData = updatedUser.data() as UserData;
    const getUser = reBuildUserData(userData);
    localStorage.setItem('@user', JSON.stringify(getUser));
  }
};

const reBuildUserData = (userData: UserData) => {
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
  const updatedUser = await getUserByIdFireStore(userId);
  if (updatedUser.exists()) {
    const userData = updatedUser.data() as UserData;
    const getUser = reBuildUserData(userData);
    localStorage.setItem('@user', JSON.stringify(getUser));
  }
};

const SendSwitchActivateCard = async (userId: string, switchState: boolean) => {
  await updateSwitchActivateCard(userId, { switch_activateCard: switchState });
  const updatedUser = await getUserByIdFireStore(userId);
  if (updatedUser.exists()) {
    const userData = updatedUser.data() as UserData;
    const getUser = reBuildUserData(userData);
    localStorage.setItem('@user', JSON.stringify(getUser));
  }
};

const UpdatePassword = async (password: string) => {
  const res = await updatePasswordFirebase(password);
  return res;
};

const SendBackgroundSelected = async (
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

const SendTemplateSelected = async (
  userId: string,
  data: TemplateData[],
  queryClient: any
) => {
  const templateData = data;

  await updateTemplateSelectedFirebase(userId, { templateData });

  const updatedUser = await getUserByIdFireStore(userId);
  if (updatedUser.exists()) {
    const userData = updatedUser.data() as UserData;
    const getUser = reBuildUserData(userData);
    localStorage.setItem('@user', JSON.stringify(getUser));
    queryClient.setQueryData(['user'], () => getUser);
  }
};

const SendSwitchAllForm = async (userId: string, dataForm: any) => {
  await updateSwitchAllFirebase(userId, { switchAllForm: dataForm });
};

const SendDataUserProfile = async (userId: string, data: DataForm) => {
  return updateDataUserProfile(userId, data)
    .then(async (response) => {
      const updatedUser = await getUserByIdFireStore(userId);
      if (updatedUser.exists()) {
        const userData = updatedUser.data() as UserData;

        const getUser = reBuildUserData(userData);

        localStorage.setItem('@user', JSON.stringify(getUser));
        return { success: true, error: false };
      }
    })
    .catch((error) => {
      console.error(error.message);
      return { success: false, error: error.message };
    });
};

const GetUserById = (userUid: string) => {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const updatedUser = await getUserByIdFireStore(userUid);
      if (updatedUser.exists()) {
        const userData = updatedUser.data() as UserData;
        const getUser = reBuildUserData(userData);
        localStorage.setItem('@user', JSON.stringify(getUser));
        return getUser;
      } else {
        return null;
      }
    },
    enabled: !!userUid,
  });
};

const GetUser = () =>
  useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const userLogged = localStorage.getItem('@user');
      if (userLogged) {
        const user = JSON.parse(userLogged) as UserData;
        const updatedUser = await getUserByIdFireStore(user.uid);
        if (updatedUser.exists()) {
          const userData = updatedUser.data() as UserData;
          const getUser = reBuildUserData(userData);
          localStorage.setItem('@user', JSON.stringify(getUser));
          return getUser;
        } else {
          return user;
        }
      } else {
        return null;
      }
    },
  });

export {
  GetAllUserQuery,
  GetLoginQuery,
  GetUser,
  SendDataImage,
  SendDataUserProfile,
  SendSwitchActivateCard,
  SendSwitchAllForm,
  SendSwitchProfile,
  SendTemplateSelected,
  UpdatePassword,
  SendBackgroundSelected,
  GetUserById,
};
