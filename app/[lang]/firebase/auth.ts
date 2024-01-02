import { LoginFirebaseProps } from '@/types/login';
import { dataBase, app } from 'app/[lang]/firebase/firebaseConfig';
import {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { collection, doc, getDocs, query, where } from 'firebase/firestore';
const auth = getAuth();

const userRefByUser = (ref: any) =>
  query(collection(dataBase, 'users'), where('user_name', '==', ref.user));

export const userExist = async (user: string) => {
  //this function must be removed
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
  try {
    const loginF = await signInWithEmailAndPassword(auth, user, password);
    return loginF;
  } catch (error: any) {
    console.debug('error message', error.message);
    return null;
  }
};

export const registerFirebase = async (user: string, password: string) => {
  const registerF = createUserWithEmailAndPassword(auth, user, password);
};

export const resetPasswordFirebase = async (email: string) => {
  try {
    const resetF = await sendPasswordResetEmail(auth, email);
    return resetF;
  } catch (error: any) {
    console.debug('error message', error.message);
    return null;
  }
};

export const changePasswordFirebase = async (
  oobCode: string,
  confirmPassword: string
) => {
  try {
    console.log('wwwwww');
    const setPassword = await confirmPasswordReset(
      auth,
      oobCode,
      confirmPassword
    );
    console.log('setPassword', setPassword);

    return true;
  } catch (error: any) {
    console.debug('error message', error.message);
    return null;
  }
};
