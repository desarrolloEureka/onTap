import crypto from "crypto";
import CryptoJS from "crypto-js";
import axios from "axios";
import { config as configDotenv } from "dotenv";
import { wompiConfig } from "@/firebase/firebaseConfig";

export const generatePaymentReference = (userId) => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  const baseString = `${userId}-${timestamp}-${randomString}`;
  const hash = crypto.createHash("sha256").update(baseString).digest("hex");
  return `ref_${hash}`;
};

// Función para generar la firma de integridad
export const generateIntegritySignature = (
  reference,
  amount,
  currency,
  secretKey,
  expirationTime
) => {
  // Asegurarse que amount sea una cadena en el formato requerido, por ejemplo "100.00"
  const formattedAmount = parseFloat(amount).toFixed(2);

  // Concatenar los valores en el orden esperado por Wompi
  let concatenatedString = `${reference}${formattedAmount}${currency}`;

  if (expirationTime) {
    concatenatedString += `${expirationTime}`;
  }

  concatenatedString += secretKey;

  // Generar el hash SHA256 usando CryptoJS
  const hashHex = CryptoJS.SHA256(concatenatedString).toString(
    CryptoJS.enc.Hex
  );

  return hashHex;
};
// Función para obtener el token de la tarjeta
export const getCardToken = async (cardInfo) => {
  try {
    const cardData = {
      number: cardInfo.number, // Número de la tarjeta
      exp_month: cardInfo.exp_month, // Mes de expiración
      exp_year: cardInfo.exp_year, // Año de expiración
      cvc: cardInfo.cvc, // CVC
      card_holder: cardInfo.card_holder, // Titular de la tarjeta
    };

    const response = await axios.post(
      `${wompiConfig?.WOMPI_BASE_URL}/tokens/cards`,
      cardData,
      {
        headers: {
          Authorization: `Bearer ${wompiConfig?.WOMPI_PUBLIC_KEY}`,
        },
      }
    );

    if (response.data.status === "CREATED") {
      return { success: true, token: response.data.data.id };
    } else {
      throw new Error("Error al generar el token");
    }
  } catch (error) {
    console.error("Error al obtener el token de la tarjeta:", error);
    return { success: false, error: error.message };
  }
};

// Función para obtener los tokens de aceptación
const getAcceptanceTokens = async () => {
  try {
    const response = await axios.get(
      `${wompiConfig?.WOMPI_BASE_URL}/merchants/${wompiConfig?.WOMPI_PUBLIC_KEY}`
    );
    const acceptance_token =
      response.data.data.presigned_acceptance.acceptance_token;
    const accept_personal_auth =
      response.data.data.presigned_personal_data_auth.acceptance_token;

    return { acceptance_token, accept_personal_auth };
  } catch (error) {
    console.error("Error al obtener los tokens de aceptación:", error);
    throw new Error(
      "Error al obtener los tokens de aceptación. Intenta nuevamente."
    );
  }
};

// Función para crear la fuente de pago
export const createPaymentSource = async (token, customerEmail) => {
  try {
    const { acceptance_token, accept_personal_auth } =
      await getAcceptanceTokens();

    const paymentSourceData = {
      type: "CARD",
      token: token,
      customer_email: customerEmail,
      acceptance_token: acceptance_token,
      accept_personal_auth: accept_personal_auth,
    };

    // Hacer la solicitud POST a la API de Wompi
    const response = await axios.post(
      `${wompiConfig?.WOMPI_BASE_URL}/payment_sources`,
      paymentSourceData,
      {
        headers: {
          Authorization: `Bearer ${wompiConfig?.WOMPI_PRIVATE_KEY}`,
        },
      }
    );

    if (response.data && response.data.data.status === "AVAILABLE") {
      return { success: true, dataCard: response.data.data };
    } else {
      throw new Error("Error al crear la fuente de pago");
    }
  } catch (error) {
    console.error("Error al crear la fuente de pago:", error);
    return { success: false, error: error.message };
  }
};
