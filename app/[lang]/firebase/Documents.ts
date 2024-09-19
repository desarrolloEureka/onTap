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