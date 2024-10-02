import {
    addDoc,
    collection,
    doc,
    getDocs,
    query,
    setDoc,
    updateDoc,
    where,
} from 'firebase/firestore';
import { dataBase } from 'app/[lang]/firebase/firebaseConfig';
import {
    AllRefPropsFirebase,
    RefPropsFirebase,
} from '@/types/userFirebase';
import moment from "moment";

const ref = ({ ref, collection }: RefPropsFirebase) =>
    doc(dataBase, collection, ref.document);

const allRef = ({ ref }: AllRefPropsFirebase) => collection(dataBase, ref);

export const getReference = (reference: string) => {
    const documentRef = doc(allRef({ ref: reference }));
    return documentRef;
};

const currentDate = moment().format();

// Función para guardar una nueva categoría
export const saveCategory = async (dataSave: any) => {
    try {
        // Obtener la referencia de la colección 'categories'
        const categoryCollectionRef = getReference('categories');

        // Agregar un nuevo documento con el nombre de la categoría, uid y fecha de creación
        await setDoc(categoryCollectionRef, {
            ...dataSave,
            uid: categoryCollectionRef.id,
        });

        return { success: true, message: 'Categoría creada correctamente' };
    } catch (error) {
        console.error('Error al crear la categoría: ', error);
        return { success: false, message: 'Error al crear la categoría' };
    }
};

export const updateCategory = async (dataSave: any, idCategory: string) => {
    try {
        // Obtener la referencia del documento específico de la categoría
        const categoryDocRef = doc(dataBase, 'categories', idCategory);

        // Actualizar el documento con los nuevos datos
        await updateDoc(categoryDocRef, {
            ...dataSave,
        });

        return { success: true, message: 'Categoría actualizada correctamente' };
    } catch (error) {
        console.error('Error al actualizar la categoría: ', error);
        return { success: false, message: 'Error al actualizar la categoría' };
    }
};

//Productos
export const saveProduct = async (dataSave: any) => {
    try {
        // Obtener la referencia a la colección de productos
        const productCollectionRef = collection(dataBase, 'products');

        // Verificar si el SKU ya está registrado
        const q = query(productCollectionRef, where('sku', '==', dataSave.sku));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            // Si el SKU ya existe, devolver un mensaje de error
            return { success: false, message: 'El SKU ya está registrado' };
        }

        // Si el SKU no está registrado, crear un nuevo documento en la colección
        const newProductRef = doc(productCollectionRef); // Crear un nuevo documento en la colección
        await setDoc(newProductRef, {
            ...dataSave,
            uid: newProductRef.id,  // Usar el ID del nuevo documento
            created_at: currentDate // Añadir la fecha de creación
        });

        return { success: true, message: 'Producto creado correctamente' };
    } catch (error) {
        console.error('Error al crear el producto: ', error);
        return { success: false, message: 'Error al crear el producto' };
    }
};

export const updateProduct = async (dataSave: any, idCategory: string) => {
    try {
        // Obtener la referencia del documento específico de la categoría
        const categoryDocRef = doc(dataBase, 'products', idCategory);

        // Actualizar el documento con los nuevos datos
        await updateDoc(categoryDocRef, {
            ...dataSave,
        });

        return { success: true, message: 'Producto actualizada correctamente' };
    } catch (error) {
        console.error('Error al actualizar la producto: ', error);
        return { success: false, message: 'Error al actualizar la producto' };
    }
};

//Planes
export const savePlans = async (dataSave: any) => {
    try {
        // Obtener la referencia a la colección de productos
        const plansCollectionRef = collection(dataBase, 'plans');

        // Verificar si el SKU ya está registrado
        const q = query(plansCollectionRef, where('sku', '==', dataSave.sku));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            // Si el SKU ya existe, devolver un mensaje de error
            return { success: false, message: 'El SKU ya está registrado' };
        }

        // Si el SKU no está registrado, crear un nuevo documento en la colección
        const newProductRef = doc(plansCollectionRef); // Crear un nuevo documento en la colección
        await setDoc(newProductRef, {
            ...dataSave,
            uid: newProductRef.id,  // Usar el ID del nuevo documento
            created_at: currentDate // Añadir la fecha de creación
        });

        return { success: true, message: 'Plan creado correctamente' };
    } catch (error) {
        console.error('Error al crear el plan: ', error);
        return { success: false, message: 'Error al crear el plan' };
    }
};

export const updatePlans = async (dataSave: any, idCategory: string) => {
    try {
        // Obtener la referencia del documento específico de la categoría
        const plansDocRef = doc(dataBase, 'plans', idCategory);

        // Actualizar el documento con los nuevos datos
        await updateDoc(plansDocRef, {
            ...dataSave,
        });

        return { success: true, message: 'Plan actualizada correctamente' };
    } catch (error) {
        console.error('Error al actualizar la plan: ', error);
        return { success: false, message: 'Error al actualizar la plan' };
    }
};

//Materiales
export const saveMaterial = async (dataSave: any) => {
    try {
        // Obtener la referencia a la colección de materiales
        const productCollectionRef = collection(dataBase, 'materials');

        // Verificar si el SKU ya está registrado
        const q = query(productCollectionRef, where('sku', '==', dataSave.sku));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            // Si el SKU ya existe, devolver un mensaje de error
            return { success: false, message: 'El SKU ya está registrado' };
        }

        // Si el SKU no está registrado, crear un nuevo documento en la colección
        const newProductRef = doc(productCollectionRef); // Crear un nuevo documento en la colección
        await setDoc(newProductRef, {
            ...dataSave,
            uid: newProductRef.id,  // Usar el ID del nuevo documento
            created_at: currentDate // Añadir la fecha de creación
        });

        return { success: true, message: 'Material creado correctamente' };
    } catch (error) {
        console.error('Error al crear el material: ', error);
        return { success: false, message: 'Error al crear el material' };
    }
};

export const updateMaterial = async (dataSave: any, idCategory: string) => {
    try {
        // Obtener la referencia del documento específico de la categoría
        const categoryDocRef = doc(dataBase, 'materials', idCategory);

        // Actualizar el documento con los nuevos datos
        await updateDoc(categoryDocRef, {
            ...dataSave,
        });

        return { success: true, message: 'Material actualizada correctamente' };
    } catch (error) {
        console.error('Error al actualizar la material: ', error);
        return { success: false, message: 'Error al actualizar la material' };
    }
};

//Planes
export const saveColors = async (dataSave: any) => {
    try {
        // Obtener la referencia a la colección de productos
        const colorsCollectionRef = collection(dataBase, 'colors');

        // Verificar si el SKU ya está registrado
        const q = query(colorsCollectionRef, where('sku', '==', dataSave.sku));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            // Si el SKU ya existe, devolver un mensaje de error
            return { success: false, message: 'El SKU ya está registrado' };
        }

        // Si el SKU no está registrado, crear un nuevo documento en la colección
        const newColorRef = doc(colorsCollectionRef); // Crear un nuevo documento en la colección
        await setDoc(newColorRef, {
            ...dataSave,
            uid: newColorRef.id,  // Usar el ID del nuevo documento
            created_at: currentDate // Añadir la fecha de creación
        });

        return { success: true, message: 'Color creado correctamente' };
    } catch (error) {
        console.error('Error al crear el color: ', error);
        return { success: false, message: 'Error al crear el color' };
    }
};

export const updateColors = async (dataSave: any, idCategory: string) => {
    try {
        // Obtener la referencia del documento específico de colores
        const colorsDocRef = doc(dataBase, 'colors', idCategory);

        // Actualizar el documento con los nuevos datos
        await updateDoc(colorsDocRef, {
            ...dataSave,
        });

        return { success: true, message: 'Color actualizada correctamente' };
    } catch (error) {
        console.error('Error al actualizar la color: ', error);
        return { success: false, message: 'Error al actualizar la color' };
    }
};

//Personalizaciónes
export const saveCustomization = async (dataSave: any) => {
    try {
        // Obtener la referencia a la colección de personalizaciónes
        const CustomizationCollectionRef = collection(dataBase, 'customizations');

        // Verificar si el SKU ya está registrado
        const q = query(CustomizationCollectionRef, where('sku', '==', dataSave.sku));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            // Si el SKU ya existe, devolver un mensaje de error
            return { success: false, message: 'El SKU ya está registrado' };
        }

        // Si el SKU no está registrado, crear un nuevo documento en la colección
        const newProductRef = doc(CustomizationCollectionRef); // Crear un nuevo documento en la colección
        await setDoc(newProductRef, {
            ...dataSave,
            uid: newProductRef.id,  // Usar el ID del nuevo documento
            created_at: currentDate // Añadir la fecha de creación
        });

        return { success: true, message: 'Personalización creado correctamente' };
    } catch (error) {
        console.error('Error al crear el personalización: ', error);
        return { success: false, message: 'Error al crear el personalización' };
    }
};

export const updateCustomization = async (dataSave: any, idCategory: string) => {
    try {
        // Obtener la referencia del documento específico de la personalización
        const CustomizationDocRef = doc(dataBase, 'customizations', idCategory);

        // Actualizar el documento con los nuevos datos
        await updateDoc(CustomizationDocRef, {
            ...dataSave,
        });

        return { success: true, message: 'Personalización actualizada correctamente' };
    } catch (error) {
        console.error('Error al actualizar la personalización: ', error);
        return { success: false, message: 'Error al actualizar la personalización' };
    }
};

//Distribuidor
export const saveDistributor = async (dataSave: any) => {
    try {
        console.log('dataSave ', dataSave);
        // Obtener la referencia a la colección de distribuidores
        const DistributorCollectionRef = collection(dataBase, 'users');

        // Verificar si el SKU ya está registrado
        const q = query(DistributorCollectionRef, where('dni', '==', dataSave.dni));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            // Si el SKU ya existe, devolver un mensaje de error
            return { success: false, message: 'El ID ya está registrado' };
        }

        const dataFinal = {
            ...dataSave,
            uid: dataSave.uid,  // Usar el ID del nuevo documento
            created_at: currentDate // Añadir la fecha de creación
        }

        const newDistributorRef = await setDoc(doc(dataBase, 'users', dataSave.uid), dataFinal);

        return { success: true, message: 'Distribuidor creado correctamente' };
    } catch (error) {
        console.error('Error al crear el distribuidor: ', error);
        return { success: false, message: 'Error al crear el distribuidor' };
    }
};

export const updateDistributor = async (dataSave: any, idDistributor: string) => {
    try {
        // Obtener la referencia del documento específico de la distribuidor
        const DistributorDocRef = doc(dataBase, 'users', idDistributor);

        // Actualizar el documento con los nuevos datos
        await updateDoc(DistributorDocRef, {
            ...dataSave,
        });

        return { success: true, message: 'Distribuidor actualizada correctamente' };
    } catch (error) {
        console.error('Error al actualizar la distribuidor: ', error);
        return { success: false, message: 'Error al actualizar la distribuidor' };
    }
};
