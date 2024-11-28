"use server";

import { sendEmail } from "../brevoWithApiKey";
// import { sendEmailSMTP } from "../brevoWithSMTP";
import { plantillaBienvenida } from "../plantillas/bienvenida";

export const handleSendWelcomeEmail = async (data: any) => {
  try {
    // Para envío con SMTP usar sendEmailSMTP.
    await sendEmail({
      subject: "¡Bienvenido a OneTap Individual!",
      to: [
        {
          name: `${data.fullName}`,
          email: data.email,
        },
      ],

      htmlContent: plantillaBienvenida({
        userName: `${data.fullName}`,
        userEmail: data.email,
        password: data.dni,
        //Cambiar la URL de login a producción
        /* loginUrl: "https://one-tap-corp-dev.vercel.app/components/signIn/",
                 LINK DE LOGUEO DE BIENVENIDA DESARROLLO VERCEL*/
        loginUrl: "https://on-tap-dev.vercel.app/es/views/login",
        contactEmail: "info@onetap.com.co",
      }),
    });
  } catch (error) {
    console.log("Este fue el error: ", error);
  }
};
