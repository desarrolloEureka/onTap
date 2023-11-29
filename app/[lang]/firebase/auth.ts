import firebase from 'firebase/app';
import {
  doc,
  updateDoc,
  getDoc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { dataBase, app } from 'app/[lang]/firebase/firebaseConfig';

const userRef = (ref: any) => doc(dataBase, 'users', ref.document);

const userRefByUser = (ref: any) =>
  query(collection(dataBase, 'users'), where('user_name', '==', ref.user));
const allUserRef = collection(dataBase, 'users');
const countriesRef = doc(dataBase, 'countries', 'sSbpwcKROo5wEi8Naxqj');

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

export const getAllUsers = async () => await getDocs(allUserRef);
