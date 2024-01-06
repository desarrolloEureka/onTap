import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  updateDoc
} from 'firebase/firestore';
import { dataBase } from 'app/[lang]/firebase/firebaseConfig';
import {
  AllRefPropsFirebase,
  GetUserByLoginProps,
  LoginRefProps,
  RefPropsFirebase,
} from '@/types/userFirebase';
import { UserData } from '@/types/user';

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

/* guia firebase - update */
/* Crear insertar dato  */

/* addDoc ---> crea nuevos documentos(Usuarios) */

/* Actualiza un documento:
Para actualizar algunos campos de un documento sin reemplazarlo por completo, usa los métodos update() específicos para cada lenguaje: */

export const updateUserData = async (userId: string, newData: any) => {
  const userDocRef = doc(dataBase, 'users', userId);
  await updateDoc(userDocRef, newData);
};

export const getUserByLogin = async ({
  user,
  password,
}: GetUserByLoginProps) => {
  const querySnapshot = await getDocs(loginRef({ user, password }));
  let userData: any = null;
  if (!querySnapshot.empty) {
    querySnapshot.forEach((doc: any) => {
      const dataResult = doc.data() as UserData;
      userData = dataResult;
    });
    localStorage.setItem('@user', JSON.stringify(userData));
  } else {
    return null;
  }
  return userData;
};
