//validar correo
export const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

//validar numero telefonicos
export const validatePhoneNumber = (phone: string) => {
  const re = /^[0-9]{10}$/;
  return re.test(phone);
};

