import { LoginFirebaseProps } from '@/types/login';
import { dataBase, app } from 'app/[lang]/firebase/firebaseConfig';
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { collection, doc, getDocs, query, where } from 'firebase/firestore';
const auth = getAuth();

const userRefByUser = (ref: any) =>
  query(collection(dataBase, 'users'), where('user_name', '==', ref.user));

export const userExist = async (user: string) => {
  let userFound = null;
  const querySnapshot = await getDocs(userRefByUser(user));
  if (querySnapshot.empty) return false;

  querySnapshot.forEach((doc) => {
    localStorage.setItem('@user', JSON.stringify(doc.data()));
    userFound = doc.data();
  });
  return userFound;
};

export const loginFirebase = async ({ user, password }: LoginFirebaseProps) => {
  const loginF = signInWithEmailAndPassword(auth, user, password);
  return loginF;
};

export const registerFirebase = async (user: string, password: string) => {
  const registerF = createUserWithEmailAndPassword(auth, user, password);
};
