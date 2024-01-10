import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  updateDoc,
} from 'firebase/firestore';
import { getAuth, updatePassword } from 'firebase/auth';
import { dataBase } from 'app/[lang]/firebase/firebaseConfig';
import {
  AllRefPropsFirebase,
  GetUserByLoginProps,
  LoginRefProps,
  RefPropsFirebase,
} from '@/types/userFirebase';

const ref = ({ ref, collection }: RefPropsFirebase) =>
  doc(dataBase, collection, ref.document);

const allRef = ({ ref }: AllRefPropsFirebase) => collection(dataBase, ref);

const loginRef = ({ user, password }: LoginRefProps) =>
  query(
    collection(dataBase, 'users'),
    where('user_name', '==', user),
    where('password', '==', password)
  );

export const getUserById = async (user: string) =>
  await getDoc(doc(dataBase, 'users', user));

// ref({ ref: user, collection: 'users' });

export const getAllUsers = async () => await getDocs(allRef({ ref: 'users' }));

export const updateUserData = async (userId: string, newData: any) => {
  const userDocRef = doc(dataBase, 'users', userId);
  await updateDoc(userDocRef, newData);
};

export const updateSwitchProfileFirebase = async (
  userId: string,
  switchState: any
) => {
  const userDocRef = doc(dataBase, 'users', userId);
  await updateDoc(userDocRef, switchState);
};

export const updateTemplateSelectedFirebase = async (
  userId: string,
  newData: any
) => {
  const userDocRef = doc(dataBase, 'users', userId);
  await updateDoc(userDocRef, newData);
};

export const updateSwitchAllFirebase = async (userId: string, newData: any) => {
  const userDocRef = doc(dataBase, 'users', userId);
  await updateDoc(userDocRef, newData);
};

export const updatePasswordFirebase = (newPassword: string) => {
  const auth = getAuth();
  const user = auth.currentUser;
  console.log('newPassword ', newPassword);

  if (user) {
    return updatePassword(user, newPassword)
      .then(() => {
        //console.log("Contraseña actualizada correctamente");
        return true;
      })
      .catch((error) => {
        console.error('Error al actualizar la contraseña:', error.message);
        return false;
      });
  } else {
    console.error('No hay un usuario autenticado');
    return false;
  }
};

export const updateSwitchActivateCard = async (
  userId: string,
  switchState: any
) => {
  try {
    const userDocRef = doc(dataBase, 'users', userId);
    const res = await updateDoc(userDocRef, switchState);
    return res;
  } catch (error: any) {
    console.debug('error message', error.message);
    return null;
  }
};
