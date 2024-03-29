import { BackgroundImages, SocialNetworks, Templates } from '@/types/home';
import { AllRefPropsFirebase } from '@/types/userFirebase';
import { addDoc, collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { dataBase } from './firebaseConfig';

const allRef = ({ ref }: AllRefPropsFirebase) => collection(dataBase, ref);

const countriesRef = doc(dataBase, 'countries', 'sSbpwcKROo5wEi8Naxqj');

export const getAllTemplates = async () => {
  const templatesData: Templates[] = [];
  const querySnapshot = await getDocs(allRef({ ref: 'templates' }));
  if (!querySnapshot.empty) {
    querySnapshot.forEach((doc: any) => {
      const dataResult = doc.data() as Templates;
      templatesData.push({ ...dataResult, id: doc.id });
    });
  }
  return templatesData;
};

export const getAllBackgroundImages = async () => {
  const backgroundImages: BackgroundImages[] = [];
  const querySnapshot = await getDocs(allRef({ ref: 'background_images' }));
  if (!querySnapshot.empty) {
    querySnapshot.forEach((doc: any) => {
      const dataResult = doc.data() as BackgroundImages;
      backgroundImages.push({ ...dataResult, id: doc.id });
    });
  }
  return backgroundImages;
};

//La imagen se recive en base 64(imagen), tambien se recive el nombre de la imagen(image)
export const saveBackgroundImage = async (image: string, name: string) => {
  const docRef = await addDoc(allRef({ ref: 'background_images' }), {
    image,
    name,
  });
  return docRef;

}

export const getAllSocialNetworks = async () => {
  const backgroundImages: SocialNetworks[] = [];
  const querySnapshot = await getDocs(allRef({ ref: 'social_icons' }));
  if (!querySnapshot.empty) {
    querySnapshot.forEach((doc: any) => {
      const dataResult = doc.data() as SocialNetworks;
      backgroundImages.push({ ...dataResult, id: doc.id });
    });
  }
  return backgroundImages;
};
