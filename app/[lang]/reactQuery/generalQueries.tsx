import {
  getReference,
  saveCategory,
  saveColors,
  saveCustomization,
  saveDistributor,
  saveMaterial,
  savePlans,
  saveProduct,
  updateCategory,
  updateColors,
  updateCustomization,
  updateDistributor,
  updateMaterial,
  updatePlans,
  updateProduct,
  updateSubscription,
  saveSubscription,
  saveNotification,
  saveOrders,
  saveInvoices,
} from "@/firebase/Documents";

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

//Materiales
export const saveMaterialQuerie = async (dataSave: any) => {
  const res = await saveMaterial(dataSave);
  return res;
};

export const UpdateMaterialQuerie = async (dataSave: any, idMaterial: any) => {
  const res = await updateMaterial(dataSave, idMaterial);
  return res;
};

//Colores
export const saveColorsQuerie = async (dataSave: any) => {
  const res = await saveColors(dataSave);
  return res;
};

export const UpdateColorsQuerie = async (dataSave: any, idProduct: any) => {
  const res = await updateColors(dataSave, idProduct);
  return res;
};

//Personalizaciónes
export const saveCustomizationQuerie = async (dataSave: any) => {
  const res = await saveCustomization(dataSave);
  return res;
};

//Orden
export const saveOrderQuerie = async (dataSave: any) => {
  const res = await saveOrders(dataSave);
  return res;
};

//Facturas
export const saveInvoiceQuerie = async (dataSave: any) => {
  const res = await saveInvoices(dataSave);
  return res;
};

export const UpdateCustomizationQuerie = async (
  dataSave: any,
  idCustomization: any
) => {
  const res = await updateCustomization(dataSave, idCustomization);
  return res;
};

//Distribuidor
export const saveDistributorQuerie = async (dataSave: any) => {
  const res = await saveDistributor(dataSave);
  return res;
};

export const UpdateDistributortionQuerie = async (
  dataSave: any,
  idDistributor: any
) => {
  const res = await updateDistributor(dataSave, idDistributor);
  return res;
};

export const getDocumentReference = (ref: string) => {
  return getReference(ref);
};

//notificaciones
export const saveNotificationQuerie = async (dataSave: any) => {
  const res = await saveNotification(dataSave);
  return res;
};

//suscripciones
// Función para guardar la suscripción
export const saveSubscriptionQuery = async (subscriptionData: any) => {
  const res = await saveSubscription(subscriptionData);
  return res;
};

// Función para actualizar la suscripción
export const updateSubscriptionQuery = async (
  dataSend: any,
  idSubscription: any
) => {
  const res = await updateSubscription(dataSend, idSubscription);
  return res;
};
