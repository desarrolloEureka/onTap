import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { BackgroundImages, LogosImages, SocialNetworks, Templates } from '@/types/home';
import { AllRefPropsFirebase } from '@/types/userFirebase';
import { addDoc, collection, doc, getDocs, deleteDoc, updateDoc } from 'firebase/firestore';
import { dataBase } from './firebaseConfig';

const allRef = ({ ref }: AllRefPropsFirebase) => collection(dataBase, ref);
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

export const getAllLogosImages = async () => {
  const logosImages: LogosImages[] = [];
  const querySnapshot = await getDocs(allRef({ ref: 'social_icons' }));
  if (!querySnapshot.empty) {
    querySnapshot.forEach((doc: any) => {
      const dataResult = doc.data() as LogosImages;
      logosImages.push({ ...dataResult, id: doc.id });
    });
  }
  return logosImages;
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

export const saveSocialNetworkImage = async (imageFile: File, imageName: string) => {
  const storage = getStorage();
  const imageRef = ref(storage, `social_networks/${imageName}`);

  try {
    // Subir el nuevo archivo
    const snapshot = await uploadBytes(imageRef, imageFile);
    const imageUrl = await getDownloadURL(snapshot.ref);
    //  Registrar su referencia en Firestore
    const docRef = await addDoc(allRef({ ref: 'social_icons' }), {
      image: imageUrl,
      name: imageName,
    });

    return true;
    //return { docRef, imageUrl };
  } catch (error) {
    console.error('Error al cargar la imagen en Firebase Storage: ', error);
    return false;
  }
};

export const deleteSocialNetwork = async (imageName: string, docId: any) => {
  const storage = getStorage();

  // Crear referencia de la imagen en Firebase Storage
  const imageRef = ref(storage, `social_networks/${imageName}`);

  try {
    // Eliminar la imagen de Firebase Storage
    await deleteObject(imageRef);
    // Eliminar el documento en Firestore que contiene la referencia a la imagen
    const docRef = doc(dataBase, 'social_icons', docId);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error("Error during the delete process: ", error);
    return false;
  }
};

export const updateSocialNetwork = async (imageFile: File, oldImageName: string, newImageName: string, docId: string) => {
  const storage = getStorage();
  // Crear referencias para la imagen nueva y la antigua
  const newImageRef = ref(storage, `social_networks/${newImageName}`);
  const oldImageRef = ref(storage, `social_networks/${oldImageName}`);

  try {
    // Subir la nueva imagen al path especificado
    const snapshot = await uploadBytes(newImageRef, imageFile);
    const newImageUrl = await getDownloadURL(snapshot.ref);

    // Eliminar la imagen antigua si el nombre ha cambiado
    if (newImageName !== oldImageName) {
      await deleteObject(oldImageRef);
    }

    try {
      // Actualizar la referencia en Firestore con la nueva URL y el nuevo nombre
      const docRef = doc(dataBase, 'social_icons', docId);
      await updateDoc(docRef, {
        image: newImageUrl,
        name: newImageName
      });
      return true;
    } catch (updateError) {
      console.error("Error updating Firestore reference:", updateError);
      return false;
    }
  } catch (uploadError) {
    console.error("Error uploading image to Storage:", uploadError);
    return false;
  }
};