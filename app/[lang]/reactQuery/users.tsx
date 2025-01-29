import { loginFirebase } from "@/firebase/auth";
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
  updateViewsUser,
  updateInactiveUser,
  updatePreView,
  updateSwitchStateByAdmin,
  updateDataUser,
  updateDataMetrics,
  checkIfUserExists,
  updateProfileFirebase,
  getCurrentProfileData,
  getSubscriptionByUserId,
} from "@/firebase/user";
import {
  DataForm,
  ProfessionalDataForm,
  SocialDataForm,
} from "@/types/profile";
import { TemplateData, UserData, UserDb } from "@/types/user";
import { GetLoginQueryProps } from "@/types/userQuery";
import { useQuery } from "@tanstack/react-query";

const GetAllUserQuery = () => {
  const query = useQuery({
    queryKey: ["user"],
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
  user.isDistributor = user.is_distributor || false;
  return user;
};

const GetLoginQuery = ({ user, password, sendLogin }: GetLoginQueryProps) => {
  const query = useQuery({
    queryKey: ["user"],
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

          const subscriptionDoc = await getSubscriptionByUserId(resultUser.user.uid);
          if (subscriptionDoc) {
            getUser.subscription = subscriptionDoc;
          }

          // Guarda si el usuario es distribuidor en localStorage
          if (getUser.is_distributor) {
            await localStorage.setItem("isDistributor", "true");
          } else {
            await localStorage.setItem("isDistributor", "false");
          }

          await localStorage.setItem("@user", JSON.stringify(getUser));
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
const SendDataImage = async (
  isProUser: boolean,
  userId: string,
  base64String: string
) => {
  let imageDataKey = isProUser ? "imagePro" : "image";
  await updateUserData(userId, { [imageDataKey]: base64String });
  const updatedUser = await getUserByIdFireStore(userId);
  if (updatedUser.exists()) {
    const userData = updatedUser.data() as UserData;
    const getUser = reBuildUserData(userData);
    await localStorage.setItem("@user", JSON.stringify(getUser));
  }
};

const reBuildUserData = (userData: UserData) => {
  const userStorage = localStorage.getItem("@user");
  if (userStorage) {
    const user = JSON.parse(userStorage);
    return userDataToSend(userData, { user });
  } else {
    return userData;
  }
};

const SendSwitchProfile = async (userId: string, switchState: boolean) => {
  const urlSplit = window.location.href.split("/");
  await updateSwitchProfileFirebase(userId, {
    switch_profile: switchState,
    preview: `http://${urlSplit[2]}/es/views/cardView?uid=${userId}`,
  });
  const updatedUser = await getUserByIdFireStore(userId);
  if (updatedUser.exists()) {
    const userData = updatedUser.data() as UserData;
    const getUser = reBuildUserData(userData);
    localStorage.setItem("@user", JSON.stringify(getUser));
  }
};

const SendSwitchActivateCard = async (userId: string, switchState: boolean) => {
  await updateSwitchActivateCard(userId, { switch_activateCard: switchState });
  const updatedUser = await getUserByIdFireStore(userId);
  if (updatedUser.exists()) {
    const userData = updatedUser.data() as UserData;
    const getUser = reBuildUserData(userData);
    localStorage.setItem("@user", JSON.stringify(getUser));
  }
};

const SendSwitchEditAdmin = async (userId: string, switchState: boolean) => {
  if (switchState === false) {
    await updateSwitchStateByAdmin(userId, {
      switch_activateCard: switchState,
      isActiveByAdmin: switchState,
    });
  } else {
    await updateSwitchStateByAdmin(userId, { isActiveByAdmin: switchState });
  }
};

const SendEditData = async (userId: any, userData: any, selectedDate?: any) => {
  const res = await updateDataUser(userId, userData, selectedDate);
  return res;
};

const UpdatePassword = async (password: string) => {
  const res = await updatePasswordFirebase(password);
  return res;
};

// Definimos fetchProfileData para que acepte un argumento 'uid'
export const fetchProfileData = async (uid: string) => {
  const res = await getCurrentProfileData(uid); // Pasa el uid a la función de Firebase
  return res;
};

// Función para actualizar los datos del perfil
export const UpdateProfile = async (profileData: {
  fullName: string;
  address: string;
  phoneNumber: string;
  city: string;
  state: string;
  documentType: string;
  dni: string;
  email: string;
}) => {
  const res = await updateProfileFirebase(profileData); // Llamamos a la función que actualiza el perfil
  return res; // Retornamos la respuesta tal cual
};

const checkUserExists = async (dni: string, email: string, phone: string) => {
  const res = await checkIfUserExists(dni, email, phone);
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
    await localStorage.setItem("@user", JSON.stringify(getUser));
    queryClient.setQueryData(["user"], () => getUser);
  }
};

const SendSwitchAllForm = async (userId: string, dataForm: any) => {
  await updateSwitchAllFirebase(userId, { switchAllForm: dataForm });
};

const SendDataUserProfile = async (
  userId: string,
  data: SocialDataForm | ProfessionalDataForm,
  isProUser: boolean
) => {
  return updateDataUserProfile(userId, data, isProUser)
    .then(async (response) => {
      const updatedUser = await getUserByIdFireStore(userId);
      if (updatedUser.exists()) {
        const userData = updatedUser.data() as UserData;

        const getUser = reBuildUserData(userData);

        localStorage.setItem("@user", JSON.stringify(getUser));
        return { success: true, error: false };
      }
    })
    .catch((error) => {
      console.error(error.message);
      return { success: false, error: error.message };
    });
};

const SendViewUser = async (userId: string, numViewsNew: number) => {
  await updateViewsUser(userId, { views: numViewsNew });
};

const GetUserById = (userUid: string, refetch?: boolean) => {
  return useQuery({
    queryKey: ["user", userUid], // Clave de consulta única para cada usuario
    queryFn: async () => {
      const updatedUser = await getUserByIdFireStore(userUid);
      if (updatedUser.exists()) {
        const userData = (await updatedUser.data()) as UserData;
        const getUser = await reBuildUserData(userData);
        await localStorage.setItem("@user", JSON.stringify(getUser));
        return getUser;
      } else {
        return null;
      }
    },
    enabled: !!userUid,
    refetchOnWindowFocus: refetch ?? false,
  });
};

const GetUserByIdEdit = (userUid: string, refetch?: boolean) => {
  return useQuery({
    queryKey: ["user", userUid],
    queryFn: async () => {
      const updatedUser = await getUserByIdFireStore(userUid);
      if (updatedUser.exists()) {
        const userData = (await updatedUser.data()) as UserData;
        return userData;
      } else {
        return null;
      }
    },
    enabled: !!userUid,
    refetchOnWindowFocus: refetch ?? false,
  });
};

const GetUserByIdCard = (userUid: string, refetch?: boolean) => {
  return useQuery({
    queryKey: ["user", userUid], // Clave de consulta única para cada usuario
    queryFn: async () => {
      const updatedUser = await getUserByIdFireStore(userUid);
      if (updatedUser.exists()) {
        const userData = (await updatedUser.data()) as UserData;
        return userData;
      } else {
        return null;
      }
    },
    enabled: !!userUid,
    refetchOnWindowFocus: refetch ?? false,
  });
};

const SendInactiveUser = async (userId: string) => {
  const res = await updateInactiveUser(userId, { isActive: false });
  return res;
};

const SendDataMetrics = async (userId: string, data: any) => {
  const res = await updateDataMetrics(userId, data);
  return res;
};

const GetUser = (refetch?: boolean) =>
  useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const userLogged = await localStorage.getItem("@user");
      if (userLogged) {
        const user = (await JSON.parse(userLogged)) as UserData;
        const updatedUser = await getUserByIdFireStore(user.uid);

        if (updatedUser.exists()) {
          const userData = (await updatedUser.data()) as UserData;
          const getUser = await reBuildUserData(userData);
          const subscriptionDoc = await getSubscriptionByUserId(user.uid);
          if (subscriptionDoc) {
            getUser.subscription = subscriptionDoc;
          }

          await localStorage.setItem("@user", JSON.stringify(getUser));
          return getUser;
        } else {
          return user;
        }
      } else {
        return null;
      }
    },
    refetchOnWindowFocus: refetch ?? false,
  });

const SendPreView = async (userId: string, url: string) => {
  const res = await updatePreView(userId, { preview: url });
  return res;
};

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
  SendViewUser,
  SendInactiveUser,
  SendPreView,
  SendSwitchEditAdmin,
  SendEditData,
  SendDataMetrics,
  GetUserByIdCard,
  checkUserExists,
  GetUserByIdEdit,
};
