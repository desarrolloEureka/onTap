import crypto from 'crypto';
import CryptoJS from "crypto-js";

export const generatePaymentReference = (userId) => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  const baseString = `${userId}-${timestamp}-${randomString}`;
  const hash = crypto.createHash('sha256').update(baseString).digest('hex');
  return `ref_${hash}`;
};

// Función para generar la firma de integridad
/* export const generateIntegritySignature = (reference, amount, currency, secretKey, expirationTime) => {
  let concatenatedString = `${reference}${amount}${currency}`;

  if (expirationTime) {
    concatenatedString += `${expirationTime}`;
  }

  concatenatedString += secretKey;

  // Generar el hash SHA256 usando CryptoJS
  const hashHex = CryptoJS.SHA256(concatenatedString).toString(CryptoJS.enc.Hex);

  return hashHex;
};
 */

// Función para generar la firma de integridad
export const generateIntegritySignature = (reference, amount, currency, secretKey, expirationTime) => {
  // Asegurarse que amount sea una cadena en el formato requerido, por ejemplo "100.00"
  const formattedAmount = parseFloat(amount).toFixed(2);
  
  // Concatenar los valores en el orden esperado por Wompi
  let concatenatedString = `${reference}${formattedAmount}${currency}`;

  if (expirationTime) {
    concatenatedString += `${expirationTime}`;
  }

  concatenatedString += secretKey;

  // Generar el hash SHA256 usando CryptoJS
  const hashHex = CryptoJS.SHA256(concatenatedString).toString(CryptoJS.enc.Hex);

  return hashHex;
};
