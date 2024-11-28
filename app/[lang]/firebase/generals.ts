import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import {
  BackgroundImages,
  Categories,
  Colors,
  Customizations,
  Distributors,
  LogosImages,
  Plans,
  Products,
  SocialNetworks,
  Templates,
  Notification,
  Subscription,
  Cards,
} from "@/types/home";
import { AllRefPropsFirebase } from "@/types/userFirebase";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  deleteDoc,
  updateDoc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { dataBase } from "./firebaseConfig";
import { GetUser } from "@/reactQuery/users";

const allRef = ({ ref }: AllRefPropsFirebase) => collection(dataBase, ref);
export const getTemplate = async ({ id }: { id: string }) => {
  const querySnapshot = await getDoc(doc(dataBase, "templates", id));
  if (querySnapshot.exists()) {
    return querySnapshot.data();
  }
  return null;
};

export const getBackgroundImage = async ({ id }: { id: string }) => {
  const querySnapshot = await getDoc(doc(dataBase, "background_images", id));
  if (querySnapshot.exists()) {
    return querySnapshot.data();
  }
  return null;
};

export const getAllTemplates = async () => {
  const templatesData: Templates[] = [];
  const querySnapshot = await getDocs(allRef({ ref: "templates" }));
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
  const querySnapshot = await getDocs(allRef({ ref: "background_images" }));
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
  const querySnapshot = await getDocs(allRef({ ref: "social_icons" }));
  if (!querySnapshot.empty) {
    querySnapshot.forEach((doc: any) => {
      const dataResult = doc.data() as LogosImages;
      logosImages.push({ ...dataResult, id: doc.id });
    });
  }
  return logosImages;
};

export const getAllCategories = async () => {
  const categoriesData: Categories[] = [];
  const querySnapshot = await getDocs(allRef({ ref: "categories" }));
  if (!querySnapshot.empty) {
    querySnapshot.forEach((doc: any) => {
      const dataResult = doc.data() as Categories;
      categoriesData.push({ ...dataResult, id: doc.id });
    });
  }
  return categoriesData;
};

export const getAllNotifications = async () => {
  const notificationsData: Notification[] = [];
  const querySnapshot = await getDocs(allRef({ ref: "notifications" }));
  if (!querySnapshot.empty) {
    querySnapshot.forEach((doc: any) => {
      const dataResult = doc.data() as Notification;
      notificationsData.push({ ...dataResult, id: doc.id });
    });
  }
  return notificationsData;
};

export const getAllSubscriptions = async () => {
  const subscriptionsData: Subscription[] = [];
  const subscriptionRef = collection(dataBase, "subscription"); // Referencia a la colección de suscripciones
  const querySnapshot = await getDocs(subscriptionRef); // Obtener todos los documentos

  if (!querySnapshot.empty) {
    querySnapshot.forEach((doc) => {
      const dataResult = doc.data() as Subscription; // Extraer los datos del documento
      subscriptionsData.push({ ...dataResult, id: doc.id }); // Agregar el ID y los datos al array
    });
  }
  return subscriptionsData; // Retornar el array de suscripciones
};

export const getAllProducts = async () => {
  const categoriesData: Products[] = [];
  const querySnapshot = await getDocs(allRef({ ref: "products" }));
  if (!querySnapshot.empty) {
    querySnapshot.forEach((doc: any) => {
      const dataResult = doc.data() as Products;
      categoriesData.push({ ...dataResult, id: doc.id });
    });
  }
  return categoriesData;
};

export const getAllMaterials = async () => {
  const categoriesData: Products[] = [];
  const querySnapshot = await getDocs(allRef({ ref: "materials" }));
  if (!querySnapshot.empty) {
    querySnapshot.forEach((doc: any) => {
      const dataResult = doc.data() as Products;
      categoriesData.push({ ...dataResult, id: doc.id });
    });
  }
  return categoriesData;
};

export const getAllPlans = async () => {
  const categoriesData: Plans[] = [];
  const querySnapshot = await getDocs(allRef({ ref: "plans" }));

  if (!querySnapshot.empty) {
    querySnapshot.forEach((doc) => {
      const dataResult = doc.data() as Plans;

      if (Array.isArray(dataResult?.selectedProducts)) {
        dataResult.selectedProducts.forEach((prod) => {
          categoriesData.push({ ...dataResult, id: doc.id, product: prod });
        });
      } else {
        console.warn(`No 'selectedProducts' array found in document ${doc.id}`);
      }
    });
  } else {
    console.warn("No documents found in the query.");
  }

  return categoriesData;
};

export const getAllPlansIndividual = async () => {
  const categoriesData: Plans[] = [];
  const querySnapshot = await getDocs(allRef({ ref: "plans" }));

  if (!querySnapshot.empty) {
    querySnapshot.forEach((doc: any) => {
      const dataResult = doc.data() as Plans;
      categoriesData.push({ ...dataResult, id: doc.id });
    });
  }

  return categoriesData;
};

export const getAllColors = async () => {
  const colorsData: Colors[] = [];
  const querySnapshot = await getDocs(allRef({ ref: "colors" }));
  if (!querySnapshot.empty) {
    querySnapshot.forEach((doc: any) => {
      const dataResult = doc.data() as Colors;
      colorsData.push({ ...dataResult, id: doc.id });
    });
  }
  return colorsData;
};

export const getAllCustomizations = async () => {
  const customizationData: Customizations[] = [];
  const querySnapshot = await getDocs(allRef({ ref: "customizations" }));
  if (!querySnapshot.empty) {
    querySnapshot.forEach((doc: any) => {
      const dataResult = doc.data() as Customizations;
      customizationData.push({ ...dataResult, id: doc.id });
    });
  }
  return customizationData;
};

export const getAllDistributors = async () => {
  const distributorsData: Distributors[] = [];

  const distributorsQuery = query(
    allRef({ ref: "users" }),
    where("is_distributor", "==", true)
  );

  const querySnapshot = await getDocs(distributorsQuery);
  if (!querySnapshot.empty) {
    querySnapshot.forEach((doc: any) => {
      const dataResult = doc.data() as Distributors;
      distributorsData.push({ ...dataResult, id: doc.dni });
    });
  }

  return distributorsData;
};

export const getAllCards = async (idUser: any) => {
  const colorsData: Cards[] = [];
  const cardsQuery = query(allRef({ ref: "cards" }), where("idUser", "==", idUser));
  const querySnapshot = await getDocs(cardsQuery);

  if (!querySnapshot.empty) {
    querySnapshot.forEach((doc: any) => {
      const dataResult = doc.data() as Cards;
      colorsData.push({ ...dataResult, id: doc.id });
    });
  }
  return colorsData;
};

/* export const getAllDistributors = async () => {
  const distributorsData: Distributors[] = [];
  const querySnapshot = await getDocs(allRef({ ref: 'distributors' }));
  if (!querySnapshot.empty) {
    querySnapshot.forEach((doc: any) => {
      const dataResult = doc.data() as Distributors;
      distributorsData.push({ ...dataResult, id: doc.id });
    });
  }
  return distributorsData;
}; */

//La imagen se recive en base 64(imagen), tambien se recive el nombre de la imagen(image)
export const saveBackgroundImage = async (image: string, name: string) => {
  const docRef = await addDoc(allRef({ ref: "background_images" }), {
    image,
    name,
  });
  return docRef;
};

export const getAllSocialNetworks = async () => {
  const backgroundImages: SocialNetworks[] = [];
  const querySnapshot = await getDocs(allRef({ ref: "social_icons" }));
  if (!querySnapshot.empty) {
    querySnapshot.forEach((doc: any) => {
      const dataResult = doc.data() as SocialNetworks;
      backgroundImages.push({ ...dataResult, id: doc.id });
    });
  }
  return backgroundImages;
};

export const saveSocialNetworkImage = async (
  imageFile: File,
  imageName: string
) => {
  const storage = getStorage();
  const imageRef = ref(storage, `social_networks/${imageName}`);

  try {
    // Subir el nuevo archivo
    const snapshot = await uploadBytes(imageRef, imageFile);
    const imageUrl = await getDownloadURL(snapshot.ref);
    //  Registrar su referencia en Firestore
    const docRef = await addDoc(allRef({ ref: "social_icons" }), {
      image: imageUrl,
      name: imageName,
    });

    return true;
    //return { docRef, imageUrl };
  } catch (error) {
    console.error("Error al cargar la imagen en Firebase Storage: ", error);
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
    const docRef = doc(dataBase, "social_icons", docId);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error("Error during the delete process: ", error);
    return false;
  }
};

export const updateSocialNetwork = async (
  imageFile: File,
  oldImageName: string,
  newImageName: string,
  docId: string
) => {
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
      const docRef = doc(dataBase, "social_icons", docId);
      await updateDoc(docRef, {
        image: newImageUrl,
        name: newImageName,
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
