import { saveCategory, savePlans, saveProduct, updateCategory, updatePlans, updateProduct } from '@/firebase/Documents';

//Categorias
export const saveCategoryQuerie = async (dataSave: any) => {
    const res = await saveCategory(dataSave);
    return res;
};

export const UpdateCategoryQuerie = async (dataSave: any, idCategory: any) => {
    const res = await updateCategory(dataSave, idCategory);
    return res;
};

//Productos
export const saveProductQuerie = async (dataSave: any) => {
    const res = await saveProduct(dataSave);
    return res;
};

export const UpdateProductQuerie = async (dataSave: any, idProduct: any) => {
    const res = await updateProduct(dataSave, idProduct);
    return res;
};

//Planes
export const savePlansQuerie = async (dataSave: any) => {
    const res = await savePlans(dataSave);
    return res;
};

export const UpdatePlansQuerie = async (dataSave: any, idProduct: any) => {
    const res = await updatePlans(dataSave, idProduct);
    return res;
};