import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  updateDoc,
  addDoc,
  setDoc,
  arrayUnion,
  getFirestore,
} from "firebase/firestore";
import { getAuth, updatePassword, updateProfile } from "firebase/auth";
import { dataBase, firebaseConfig } from "app/[lang]/firebase/firebaseConfig";
import {
  AllRefPropsFirebase,
  GetUserByLoginProps,
  LoginRefProps,
  RefPropsFirebase,
} from "@/types/userFirebase";
import {
  DataForm,
  ProfessionalDataForm,
  SocialDataForm,
} from "@/types/profile";
import axios from "axios";

const ref = ({ ref, collection }: RefPropsFirebase) =>
  doc(dataBase, collection, ref.document);

const allRef = ({ ref }: AllRefPropsFirebase) => collection(dataBase, ref);

const loginRef = ({ user, password }: LoginRefProps) =>
  query(
    collection(dataBase, "users"),
    where("user_name", "==", user),
    where("password", "==", password)
  );

export const getUserByIdFireStore = async (user: string) =>
  await getDoc(doc(dataBase, "users", user));

// ref({ ref: user, collection: 'users' });

export const getAllUsers = async () => await getDocs(allRef({ ref: "users" }));

export const registerUserData = async (data: any) => {
  const docRef = await setDoc(doc(dataBase, "users", data.uid), data);
  return docRef;
};

export const updateUserData = async (userId: string, newData: any) => {
  const userDocRef = doc(dataBase, "users", userId);
  await updateDoc(userDocRef, newData);
};

export const updateSwitchProfileFirebase = async (
  userId: string,
  switchState: any
) => {
  const userDocRef = doc(dataBase, "users", userId);
  await updateDoc(userDocRef, switchState);
};

export const updateTemplateSelectedFirebase = async (
  userId: string,
  newData: any
) => {
  const userDocRef = doc(dataBase, "users", userId);
  await updateDoc(userDocRef, newData);
};

export const updateDataUserProfile = async (
  userId: string,
  data: SocialDataForm | ProfessionalDataForm,
  isProUser: boolean
) => {
  try {
    const profRef = isProUser
      ? { "profile.professional": data }
      : { "profile.social": data };
    const userDocRef = doc(dataBase, "users", userId);
    const res = await updateDoc(userDocRef, profRef);
    return res;
  } catch (error: any) {
    console.debug("error message", error.message);
    return null;
  }
};

export const updateSwitchAllFirebase = async (userId: string, newData: any) => {
  const userDocRef = doc(dataBase, "users", userId);
  await updateDoc(userDocRef, newData);
};

export const updatePasswordFirebase = (newPassword: string) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    return updatePassword(user, newPassword)
      .then(() => {
        console.debug("Contraseña actualizada correctamente");
        return true;
      })
      .catch((error) => {
        console.debug("Error al actualizar la contraseña:", error.message);
        return false;
      });
  } else {
    console.debug("No hay un usuario autenticado");
    return false;
  }
};

//funcion para editar el distribuidor
export const updateProfileFirebase = async (profileData: {
  fullName: string;
  address: string;
  phoneNumber: string;
  city: string;
  state: string;
}) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    try {
      // Actualizamos el displayName en Authentication
      await updateProfile(user, {
        displayName: profileData.fullName,
      });

      // Guardamos datos adicionales en Firestore
      const db = getFirestore();
      const userRef = doc(db, "users", user.uid); // se usa el UID del usuario autenticado
      await setDoc(
        userRef,
        {
          address: profileData.address,
          phoneNumber: profileData.phoneNumber,
          city: profileData.city,
          state: profileData.state,
          fullName: profileData.fullName,
        },
        { merge: true }
      );

      console.debug("Perfil actualizado correctamente");
      return true;
    } catch (error: any) {
      console.debug("Error al actualizar el perfil:", error.message);
      return false;
    }
  } else {
    console.debug("No hay un usuario autenticado");
    return false;
  }
};

export const updateSwitchActivateCard = async (
  userId: string,
  switchState: any
) => {
  try {
    const userDocRef = doc(dataBase, "users", userId);
    const res = await updateDoc(userDocRef, switchState);
    return res;
  } catch (error: any) {
    console.debug("error message", error.message);
    return null;
  }
};

export const updateSwitchStateByAdmin = async (
  userId: string,
  switchState: any
) => {
  try {
    const userDocRef = doc(dataBase, "users", userId);
    const res = await updateDoc(userDocRef, switchState);
    return res;
  } catch (error: any) {
    console.debug("error message", error.message);
    return null;
  }
};

export const updateViewsUser = async (userId: string, newData: any) => {
  const userDocRef = doc(dataBase, "users", userId);
  await updateDoc(userDocRef, newData);
};

export const updateDataUser = async (userId: string, newData: any) => {
  try {
    const userDocRef = doc(dataBase, "users", userId);
    await updateDoc(userDocRef, newData);
    return { success: true, message: "Usuario actualizado correctamente" };
  } catch (error: any) {
    console.error("Error updating user data:", error.message);
    return { success: false, message: "Error al actualizar el Usuario" };
  }
};

export const updatePreView = async (userId: string, newData: any) => {
  const userDocRef = doc(dataBase, "users", userId);
  await updateDoc(userDocRef, newData);
};

export const updateDataMetrics = async (userId: string, newData: any) => {
  const userDocRef = doc(dataBase, "users", userId);
  await updateDoc(userDocRef, {
    DataMetrics: arrayUnion(newData),
  });
};

export const updateInactiveUser = async (
  userId: string,
  newData: any
): Promise<boolean> => {
  try {
    const userDocRef = doc(dataBase, "users", userId);
    await updateDoc(userDocRef, newData);
    return true;
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    return false;
  }
};

export const checkIfUserExists = async (
  dni: string,
  email: string,
  phone: string
) => {
  const usersRef = collection(dataBase, "users");

  const dniQuery = query(usersRef, where("dni", "==", dni));
  const emailQuery = query(usersRef, where("email", "==", email));
  //const phoneQuery = query(usersRef, where('phone', '==', phone));

  const [dniSnapshot, emailSnapshot] = await Promise.all([
    getDocs(dniQuery),
    getDocs(emailQuery),
    //getDocs(phoneQuery)
  ]);

  if (!dniSnapshot.empty) return { exists: true, field: "dni" };
  if (!emailSnapshot.empty) return { exists: true, field: "email" };
  //if (!phoneSnapshot.empty) return { exists: true, field: 'phone' };

  return { exists: false, field: null };
};

const backendClient = async (accessTokenUser: string) => {
  return axios.create({
    baseURL: firebaseConfig.backendBaseUrl,
    headers: {
      Authorization: `Bearer ${accessTokenUser}`,
    },
  });
};

export const addUser = async ({
  email,
  password,
  accessTokenUser,
  uid,
}: {
  email: string;
  password: string;
  accessTokenUser: string;
  uid: string;
}) => {
  return new Promise((resolve, reject) => {
    backendClient(accessTokenUser).then(async (client) => {
      const data = await client.post(`auth/createUser`, {
        uid,
        email,
        password,
      });
      console.log(data.status);
      if (data.status === 200) {
        resolve(data);
      } else {
        reject(data);
      }
    });
  });
};
