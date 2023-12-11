import { collection, doc, getDocs, query, where } from 'firebase/firestore';
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

export const getUserById = (user: string) =>
  ref({ ref: user, collection: 'users' });

export const getAllUsers = async () => await getDocs(allRef({ ref: 'users' }));

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
