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

export const getAllOrders = async () =>
  await getDocs(collection(dataBase, "orders"));

//traer todos los usuarios
export const getUsers = async () => {
  const usersSnapshot = await getAllUsers();
  const usersData = usersSnapshot.docs.map((doc) => doc.data());
  return usersData;
};

// Función que mezcla los datos de los usuarios con las órdenes y las facturas
export const getUsersWithOrdersAndInvoices = async () => {
  const usersSnapshot = await getAllUsers();
  const usersData = usersSnapshot.docs.map((doc) => doc.data());

  const ordersSnapshot = await getAllOrders();
  const ordersData = ordersSnapshot.docs.map((doc) => doc.data());

  const invoicesSnapshot = await getDocs(collection(dataBase, "invoices"));
  const invoicesData = invoicesSnapshot.docs.map((doc) => doc.data());

  const subscriptionsSnapshot = await getDocs(collection(dataBase, "subscriptions"));
  const subscriptionsData = subscriptionsSnapshot.docs.map((doc) => doc.data());

  // Mezclar los usuarios con sus órdenes y facturas usando uid y userUid como clave común
  const usersWithOrdersAndInvoices = usersData
    .map((user) => {
      // Buscar una única orden que coincida con el uid del usuario
      const userOrder = ordersData.find((order) => order.userUid === user.uid);

      // Buscar una única factura que coincida con el userUid del usuario
      const userInvoice = invoicesData.find(
        (invoice) => invoice.userUid === user.uid
      );

      // Buscar una única suscripción que coincida con el uid del usuario
      const userSubscription = subscriptionsData.find(
        (subscription) => subscription.userId === user.uid
      );

      //if (userOrder && userInvoice) {
      return {
        ...user,
        userOrder: userOrder || null,
        userInvoice: userInvoice || null,
        userSubscription: userSubscription || null,
      };
      // }
      //return null;
    })
    .filter((user) => user !== null);

  return usersWithOrdersAndInvoices;
};

export const registerUserData = async (data: any) => {
  const docRef = await setDoc(doc(dataBase, "users", data.uid), data);
  return data;
};

export const updateUserData = async (uid: string, newData: any) => {
  if (!uid || typeof uid !== "string" || uid.trim() === "") {
    console.error("Error: El uid no es válido", uid);
    throw new Error("El uid proporcionado no es válido");
  }

  if (
    !newData ||
    typeof newData !== "object" ||
    Object.keys(newData).length === 0
  ) {
    console.error("Error: Los datos proporcionados son inválidos", newData);
    throw new Error("Los datos proporcionados no son válidos");
  }

  try {
    // Referencia al documento del usuario en Firestore usando el uid
    const userDocRef = doc(dataBase, "users", uid);

    // Actualización de los datos del usuario
    await updateDoc(userDocRef, newData);
    return { uid, ...newData };
  } catch (error) {
    console.error("Error al actualizar el perfil del usuario:", error);
    throw new Error("No se pudo actualizar el perfil del usuario");
  }
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
        console.debug("Error al actualizar la contraseñaaaaaa:", error.message);
        return false;
      });
  } else {
    console.debug("No hay un usuario autenticado");
    return false;
  }
};

// optener datos de usuario
export const getCurrentProfileData = async (uid: string) => {
  const auth = getAuth();
  const user = auth.currentUser;

  const userUid = uid || user?.uid;
  if (userUid) {
    try {
      const usersRef = collection(dataBase, "users");
      const userQuery = query(usersRef, where("uid", "==", userUid));
      const userSnapshot = await getDocs(userQuery);

      if (!userSnapshot.empty) {
        return { success: true, data: userSnapshot.docs[0].data() }; // Devuelve los datos del usuario
      } else {
        return { success: false, message: "User not found." };
      }
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  } else {
    return {
      success: false,
      message: "No UID provided and no authenticated user.",
    };
  }
};

export const updateProfileFirebase = async (profileData: {
  fullName: string;
  address: string;
  phoneNumber: string;
  city: string;
  state: string;
  documentType: string;
  dni: string;
  email: string;
}) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    try {
      const db = getFirestore();
      const userRef = doc(db, "users", user.uid); // Usamos el UID del usuario autenticado

      // Primero obtenemos los datos del perfil actual
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const currentProfileData = userDoc.data();
        console.debug("Datos actuales del perfil:", currentProfileData);

        // Aquí, puedes modificar los datos de Firestore con los nuevos datos
        await setDoc(
          userRef,
          {
            address: profileData.address,
            phoneNumber: profileData.phoneNumber,
            city: profileData.city,
            state: profileData.state,
            fullName: profileData.fullName,
            documentType: profileData.documentType, // Nuevo campo
            dni: profileData.dni, // Nuevo campo
            email: profileData.email, // Nuevo campo
          },
          { merge: true } // Merge para no sobrescribir datos no mencionados
        );

        console.debug("Perfil actualizado correctamente");

        // Retornamos los datos **actualizados** del perfil
        const updatedUserDoc = await getDoc(userRef); // Nuevos datos después de la actualización
        const updatedProfileData = updatedUserDoc.data();

        return { success: true, data: updatedProfileData }; // Retornamos los datos actualizados
      } else {
        console.debug("No se encontró el perfil del usuario");
        return { success: false, message: "Perfil no encontrado" };
      }
    } catch (error: any) {
      console.debug("Error al actualizar el perfil:", error.message);
      return { success: false, message: error.message };
    }
  } else {
    console.debug("No hay un usuario autenticado");
    return { success: false, message: "No hay usuario autenticado" };
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

export const updateDataUser = async (userId: string, newData: any, selectedDate?: any) => {
  try {
    const userDocRef = doc(dataBase, "users", userId);
    await updateDoc(userDocRef, newData);

    const ordersRef = collection(dataBase, "subscriptions");
    const q = query(ordersRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

   /*  const ordersRef = collection(dataBase, "orders");
    const q = query(ordersRef, where("userUid", "==", userId));
    const querySnapshot = await getDocs(q); */

    const updatePromises = querySnapshot.docs.map(async (orderDoc) => {
      const orderDocRef = doc(dataBase, "subscriptions", orderDoc.id);
      //await updateDoc(orderDocRef, { paymentDate: selectedDate });
      await updateDoc(orderDocRef, { created_at: selectedDate });
    });

    await Promise.all(updatePromises);

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
      if (data.status === 200) {
        resolve(data);
      } else {
        reject(data);
      }
    });
  });
};
