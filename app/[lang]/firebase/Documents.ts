import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { dataBase } from "app/[lang]/firebase/firebaseConfig";
import { AllRefPropsFirebase, RefPropsFirebase } from "@/types/userFirebase";
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
    const categoryCollectionRef = getReference("categories");

    // Agregar un nuevo documento con el nombre de la categoría, uid y fecha de creación
    await setDoc(categoryCollectionRef, {
      ...dataSave,
      uid: categoryCollectionRef.id,
    });

    return { success: true, message: "Categoría creada correctamente" };
  } catch (error) {
    console.error("Error al crear la categoría: ", error);
    return { success: false, message: "Error al crear la categoría" };
  }
};

export const updateCategory = async (dataSave: any, idCategory: string) => {
  try {
    // Obtener la referencia del documento específico de la categoría
    const categoryDocRef = doc(dataBase, "categories", idCategory);

    // Actualizar el documento con los nuevos datos
    await updateDoc(categoryDocRef, {
      ...dataSave,
    });

    return { success: true, message: "Categoría actualizada correctamente" };
  } catch (error) {
    console.error("Error al actualizar la categoría: ", error);
    return { success: false, message: "Error al actualizar la categoría" };
  }
};

//Productos
export const saveProduct = async (dataSave: any) => {
  try {
    // Obtener la referencia a la colección de productos
    const productCollectionRef = collection(dataBase, "products");

    // Verificar si el SKU ya está registrado
    const q = query(productCollectionRef, where("sku", "==", dataSave.sku));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Si el SKU ya existe, devolver un mensaje de error
      return { success: false, message: "El SKU ya está registrado" };
    }

    // Si el SKU no está registrado, crear un nuevo documento en la colección
    const newProductRef = doc(productCollectionRef); // Crear un nuevo documento en la colección
    await setDoc(newProductRef, {
      ...dataSave,
      uid: newProductRef.id, // Usar el ID del nuevo documento
      created_at: currentDate, // Añadir la fecha de creación
    });

    return { success: true, message: "Producto creado correctamente" };
  } catch (error) {
    console.error("Error al crear el producto: ", error);
    return { success: false, message: "Error al crear el producto" };
  }
};

export const updateProduct = async (dataSave: any, idCategory: string) => {
  try {
    // Obtener la referencia del documento específico de la categoría
    const categoryDocRef = doc(dataBase, "products", idCategory);

    // Actualizar el documento con los nuevos datos
    await updateDoc(categoryDocRef, {
      ...dataSave,
    });

    return { success: true, message: "Producto actualizada correctamente" };
  } catch (error) {
    console.error("Error al actualizar la producto: ", error);
    return { success: false, message: "Error al actualizar la producto" };
  }
};

//Planes
export const savePlans = async (dataSave: any) => {
  try {
    // Obtener la referencia a la colección de productos
    const plansCollectionRef = collection(dataBase, "plans");

    // Verificar si el SKU ya está registrado
    const q = query(plansCollectionRef, where("sku", "==", dataSave.sku));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Si el SKU ya existe, devolver un mensaje de error
      return { success: false, message: "El SKU ya está registrado" };
    }

    // Si el SKU no está registrado, crear un nuevo documento en la colección
    const newProductRef = doc(plansCollectionRef); // Crear un nuevo documento en la colección
    await setDoc(newProductRef, {
      ...dataSave,
      uid: newProductRef.id, // Usar el ID del nuevo documento
      created_at: currentDate, // Añadir la fecha de creación
    });

    return { success: true, message: "Plan creado correctamente" };
  } catch (error) {
    console.error("Error al crear el plan: ", error);
    return { success: false, message: "Error al crear el plan" };
  }
};

export const updatePlans = async (dataSave: any, idCategory: string) => {
  try {
    // Obtener la referencia del documento específico de la categoría
    const plansDocRef = doc(dataBase, "plans", idCategory);

    // Actualizar el documento con los nuevos datos
    await updateDoc(plansDocRef, {
      ...dataSave,
    });

    return { success: true, message: "Plan actualizada correctamente" };
  } catch (error) {
    console.error("Error al actualizar la plan: ", error);
    return { success: false, message: "Error al actualizar la plan" };
  }
};

//Materiales
export const saveMaterial = async (dataSave: any) => {
  try {
    // Obtener la referencia a la colección de materiales
    const productCollectionRef = collection(dataBase, "materials");

    // Verificar si el SKU ya está registrado
    const q = query(productCollectionRef, where("sku", "==", dataSave.sku));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Si el SKU ya existe, devolver un mensaje de error
      return { success: false, message: "El SKU ya está registrado" };
    }

    // Si el SKU no está registrado, crear un nuevo documento en la colección
    const newProductRef = doc(productCollectionRef); // Crear un nuevo documento en la colección
    await setDoc(newProductRef, {
      ...dataSave,
      uid: newProductRef.id, // Usar el ID del nuevo documento
      created_at: currentDate, // Añadir la fecha de creación
    });

    return { success: true, message: "Material creado correctamente" };
  } catch (error) {
    console.error("Error al crear el material: ", error);
    return { success: false, message: "Error al crear el material" };
  }
};

export const updateMaterial = async (dataSave: any, idCategory: string) => {
  try {
    // Obtener la referencia del documento específico de la categoría
    const categoryDocRef = doc(dataBase, "materials", idCategory);

    // Actualizar el documento con los nuevos datos
    await updateDoc(categoryDocRef, {
      ...dataSave,
    });

    return { success: true, message: "Material actualizada correctamente" };
  } catch (error) {
    console.error("Error al actualizar la material: ", error);
    return { success: false, message: "Error al actualizar la material" };
  }
};

//Planes
export const saveColors = async (dataSave: any) => {
  try {
    // Obtener la referencia a la colección de productos
    const colorsCollectionRef = collection(dataBase, "colors");

    // Verificar si el SKU ya está registrado
    const q = query(colorsCollectionRef, where("sku", "==", dataSave.sku));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Si el SKU ya existe, devolver un mensaje de error
      return { success: false, message: "El SKU ya está registrado" };
    }

    // Si el SKU no está registrado, crear un nuevo documento en la colección
    const newColorRef = doc(colorsCollectionRef); // Crear un nuevo documento en la colección
    await setDoc(newColorRef, {
      ...dataSave,
      uid: newColorRef.id, // Usar el ID del nuevo documento
      created_at: currentDate, // Añadir la fecha de creación
    });

    return { success: true, message: "Color creado correctamente" };
  } catch (error) {
    console.error("Error al crear el color: ", error);
    return { success: false, message: "Error al crear el color" };
  }
};

export const updateColors = async (dataSave: any, idCategory: string) => {
  try {
    // Obtener la referencia del documento específico de colores
    const colorsDocRef = doc(dataBase, "colors", idCategory);

    // Actualizar el documento con los nuevos datos
    await updateDoc(colorsDocRef, {
      ...dataSave,
    });

    return { success: true, message: "Color actualizada correctamente" };
  } catch (error) {
    console.error("Error al actualizar la color: ", error);
    return { success: false, message: "Error al actualizar la color" };
  }
};

//Personalizaciónes
export const saveCustomization = async (dataSave: any) => {
  try {
    // Obtener la referencia a la colección de personalizaciónes
    const CustomizationCollectionRef = collection(dataBase, "customizations");

    // Verificar si el SKU ya está registrado
    const q = query(
      CustomizationCollectionRef,
      where("sku", "==", dataSave.sku)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Si el SKU ya existe, devolver un mensaje de error
      return { success: false, message: "El SKU ya está registrado" };
    }

    // Si el SKU no está registrado, crear un nuevo documento en la colección
    const newProductRef = doc(CustomizationCollectionRef); // Crear un nuevo documento en la colección
    await setDoc(newProductRef, {
      ...dataSave,
      uid: newProductRef.id, // Usar el ID del nuevo documento
      created_at: currentDate, // Añadir la fecha de creación
    });

    return { success: true, message: "Personalización creado correctamente" };
  } catch (error) {
    console.error("Error al crear el personalización: ", error);
    return { success: false, message: "Error al crear el personalización" };
  }
};

//Ordenes
export const saveOrders = async (dataSave: any) => {
  try {
    // Obtener la referencia a la colección de ordenes
    const collectionRef = doc(dataBase, "orders", dataSave.uid);

    await setDoc(collectionRef, {
      ...dataSave,
      paymentDate: "",
      deliveryDate: "",
    });

    return { success: true, message: "Orden creado correctamente" };
  } catch (error) {
    console.error("Error al crear el orden: ", error);
    return { success: false, message: "Error al crear el orden" };
  }
};

//Facturas
export const saveInvoices = async (dataSave: any) => {
  try {
    // Obtener la referencia a la colección de facturas
    const collectionRef = doc(dataBase, "invoices", dataSave.uid);

    await setDoc(collectionRef, {
      ...dataSave,
      paymentDate: "",
    });

    return { success: true, message: "Factura creado correctamente" };
  } catch (error) {
    console.error("Error al crear la factura: ", error);
    return { success: false, message: "Error al crear la factura" };
  }
};

// Ordenes y Facturas
export const UpdateOrdersInvoices = async (idInvoice: any, idOrden: any) => {
  try {
    const collectionInvoiceRef = doc(dataBase, "invoices", idInvoice);
    const collectionOrdenRef = doc(dataBase, "orders", idOrden);

    // Verificación de que la factura y la orden existen
    const invoiceDoc = await getDoc(collectionInvoiceRef);
    const orderDoc = await getDoc(collectionOrdenRef);

    if (!invoiceDoc.exists()) {
      return { success: false, message: "La factura no existe" };
    }

    if (!orderDoc.exists()) {
      return { success: false, message: "La orden no existe" };
    }

    const paymentDate = moment().format();

    await updateDoc(collectionInvoiceRef, {
      status: "PAID",
      paymentDate: paymentDate || "",
    });

    await updateDoc(collectionOrdenRef, {
      status: "APPROVED",
      paymentDate: paymentDate || "",
    });

    return { success: true, message: "Factura actualizada correctamente" };
  } catch (error) {
    console.error("Error al actualizar la factura: ", error);
    return { success: false, message: "Error al actualizar la factura" };
  }
};

// Función para actualizar el estado de la orden (APPROVED TO delivery)
export const UpdateOrders = async (userId: string, delivery: boolean) => {
  try {
    //console.log("userId recibido:", userId);

    // Realiza la consulta para buscar documentos donde el campo 'userId' coincida con el valor recibido
    const ordersRef = collection(dataBase, "orders");
    const q = query(ordersRef, where("userId", "==", userId)); // Consulta buscando por 'userId'

    // Obtener los documentos que coinciden con la consulta
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.error("No se encontró la orden con el userId:", userId);
      return {
        success: false,
        message: `No se encontró la orden con el userId ${userId}`,
      };
    }

    const orderDoc = querySnapshot.docs[0];
    //console.log("Datos de la orden:", orderDoc.data());

    const newStatus = delivery ? "DELIVERED" : "APPROVED";
    const orderRef = orderDoc.ref;

    // Actualizar el estado de la orden
    await updateDoc(orderRef, {
      status: newStatus,
      deliveryDate: delivery ? moment().format() : "", // Establecer fecha de entrega si 'delivery' es true
    });

    return { success: true, message: "Orden actualizada correctamente" };
  } catch (error) {
    console.error("Error al actualizar la orden: ", error);
    return {
      success: false,
      message: "Error al actualizar la orden. Detalles: ",
    };
  }
};

//Tarjetas
export const saveCards = async (dataSave: any) => {
  try {
    const cardsCollectionRef = collection(dataBase, "cards");

    const newColorRef = doc(cardsCollectionRef);
    await setDoc(newColorRef, {
      ...dataSave,
      uid: newColorRef.id,
      created_at: currentDate,
    });

    return { success: true, message: "Tarjeta creada correctamente" };
  } catch (error) {
    console.error("Error al crear la tarjeta: ", error);
    return { success: false, message: "Error al crear la tarjeta" };
  }
};

export const updateCards = async (dataSave: any, idCategory: string) => {
  try {
    // Obtener la referencia del documento específico de colores
    const cardsCollectionRef = doc(dataBase, "cards", idCategory);

    // Actualizar el documento con los nuevos datos
    await updateDoc(cardsCollectionRef, {
      ...dataSave,
    });

    return { success: true, message: "Tarjeta actualizada correctamente" };
  } catch (error) {
    console.error("Error al actualizar la tarjeta: ", error);
    return { success: false, message: "Error al actualizar la tarjeta" };
  }
};

export const updateCustomization = async (
  dataSave: any,
  idCategory: string
) => {
  try {
    // Obtener la referencia del documento específico de la personalización
    const CustomizationDocRef = doc(dataBase, "customizations", idCategory);

    // Actualizar el documento con los nuevos datos
    await updateDoc(CustomizationDocRef, {
      ...dataSave,
    });

    return {
      success: true,
      message: "Personalización actualizada correctamente",
    };
  } catch (error) {
    console.error("Error al actualizar la personalización: ", error);
    return {
      success: false,
      message: "Error al actualizar la personalización",
    };
  }
};

//Distribuidor
export const saveDistributor = async (dataSave: any) => {
  try {
    //console.log("dataSave ", dataSave);
    // Obtener la referencia a la colección de distribuidores
    const DistributorCollectionRef = collection(dataBase, "users");

    // Verificar si el SKU ya está registrado
    const q = query(DistributorCollectionRef, where("dni", "==", dataSave.dni));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Si el SKU ya existe, devolver un mensaje de error
      return { success: false, message: "El ID ya está registrado" };
    }

    const dataFinal = {
      ...dataSave,
      uid: dataSave.uid, // Usar el ID del nuevo documento
      created_at: currentDate, // Añadir la fecha de creación
    };

    const newDistributorRef = await setDoc(
      doc(dataBase, "users", dataSave.uid),
      dataFinal
    );

    return { success: true, message: "Distribuidor creado correctamente" };
  } catch (error) {
    console.error("Error al crear el distribuidor: ", error);
    return { success: false, message: "Error al crear el distribuidor" };
  }
};

export const updateDistributor = async (
  dataSave: any,
  idDistributor: string
) => {
  try {
    // Obtener la referencia del documento específico de la distribuidor
    const DistributorDocRef = doc(dataBase, "users", idDistributor);

    // Actualizar el documento con los nuevos datos
    await updateDoc(DistributorDocRef, {
      ...dataSave,
    });

    return { success: true, message: "Distribuidor actualizada correctamente" };
  } catch (error) {
    console.error("Error al actualizar la distribuidor: ", error);
    return { success: false, message: "Error al actualizar la distribuidor" };
  }
};

//editar cliente/distribuidor
export const updateUserData = async (dataSave: any, uid: string) => {
  try {
    // Obtener la referencia del documento específico del usuario
    const userDocRef = doc(dataBase, "users", uid);

    // Actualizar el documento con los nuevos datos
    await updateDoc(userDocRef, {
      ...dataSave,
    });

    return { success: true, message: "Perfil actualizado correctamente" };
  } catch (error) {
    console.error("Error al actualizar el perfil del usuario: ", error);
    return {
      success: false,
      message: "Error al actualizar el perfil del usuario",
    };
  }
};

//notificaciones
// Función para guardar la notificación
export const saveNotification = async (notificationData: any) => {
  try {
    // Obtener la referencia a la colección de notificaciones
    const notificationCollectionRef = collection(dataBase, "notifications");

    // Crear un nuevo documento en la colección
    const newNotificationRef = doc(notificationCollectionRef);
    await setDoc(newNotificationRef, {
      ...notificationData,
      id: newNotificationRef.id, // Usar el ID del nuevo documento
      createdAt: new Date().toISOString(), // Añadir la fecha de creación en formato ISO
    });

    return { success: true, message: "Notificación creada correctamente" };
  } catch (error) {
    console.error("Error al crear la notificación: ", error);
    return { success: false, message: "Error al crear la notificación" };
  }
};

export const sendNotificationsToUsers = async (tokens: string[], title: string, body: string) => {
  try {
    if (tokens?.length === 0) {
      return { success: false, message: "No tokens provided" };
    }

    const image = "https://firebasestorage.googleapis.com/v0/b/onetap-development.appspot.com/o/companieIcon%2Ficon.png?alt=media&token=4d70bda2-d86e-4456-acc7-4511095aed45"

    const responses = await Promise.all(
      tokens.map(async token => {
        try {
          const response = await fetch("/api/notifications", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token, title, body }),
          });

          const data = await response.json();
          // Revisa si la respuesta fue exitosa antes de continuar
          if (!response.ok) {
            return { token, success: false, error: data.message || 'Unknown error' };
          }

          return { token, success: true, ...data };

        } catch (error: any) {
          console.error('Error en el envío de notificación para el token:', token, error);
          return { token, success: false, error: error.message || 'Unknown error' };
        }
      })
    );

    return { success: true, message: "Notification sent successfully", responses };
  } catch (error: any) {
    console.error("Error al enviar la notificación:", error);
    return { success: false, message: "Error sent notification", error: error.message || 'Unknown error' };
  }
};



// Función para guardar la suscripción
export const saveSubscription = async (subscriptionData: any) => {
  try {
    // Crea un nuevo documento en Firestore sin ID fijo, lo que generará uno único cada vez
    const subscriptionRef = collection(dataBase, "subscription");

    await addDoc(subscriptionRef, {
      ...subscriptionData,
      createdAt: new Date().toISOString(), // Agregar la fecha de creación
    });

    return { success: true, message: "Suscripción creada correctamente" };
  } catch (error) {
    console.error("Error al crear la suscripción: ", error);
    return { success: false, message: "Error al crear la suscripción" };
  }
};

// Función para actualizar la suscripción
export const updateSubscription = async (
  dataSend: any,
  idSubscription: string
) => {
  try {
    // Obtener la referencia del documento específico de la suscripción
    const subscriptionDocRef = doc(dataBase, "subscription", idSubscription);
    // Actualizar el documento con los nuevos datos
    await updateDoc(subscriptionDocRef, {
      ...dataSend,
    });

    return { success: true, message: "Suscripción actualizada correctamente" };
  } catch (error) {
    console.error("Error al actualizar la suscripción:", error);
    return { success: false, message: "Error al actualizar la suscripción" };
  }
};

export const saveSubscriptions = async (dataSave: any) => {
  try {
    const rSubscriptionCollectionRef = collection(dataBase, "subscriptions");
    const newRSubscriptionRef = doc(rSubscriptionCollectionRef, dataSave.uid);

    await setDoc(newRSubscriptionRef, {
      uid: newRSubscriptionRef.id,
      userId: dataSave.userUid,
      nextPaymentDate: dataSave.nextPaymentDate,
      status: dataSave.status,
      created_at: currentDate,
    });

    return { success: true, message: "Suscripción creada correctamente" };
  } catch (error) {
    console.error("Error al crear la suscripción: ", error);
    return { success: false, message: "Error al crear la suscripción" };
  }
};
