import { useState } from "react";
import { UpdatePassword } from "@/reactQuery/users"; // Importamos funcion para actualizar contraseña (firebase)
import { LoginError } from "@/types/login";
import { useRouter } from "next/navigation";
import useDictionary from "@/hooks/dictionary/useDictionary";
import Swal from "sweetalert2";

const ChangePasswordHook = () => {
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [stateUpdate, setStateUpdate] = useState<boolean>(false);
  const [errorForm, setErrorForm] = useState<LoginError | null>(null);
  const router = useRouter();
  const dictionary = useDictionary({ lang: "es" });

  const handleResetPasswordFields = () => {
    // Resetear los campos de las contraseñas
    setPassword(""); // Resetea el campo de la contraseña
    setPasswordConfirm(""); // Resetea el campo de la confirmación de la contraseña
  };

  const handleChangePassword = async () => {
    // Verificamos que las contraseñas sean válidas
    if (password && passwordConfirm && password === passwordConfirm) {
      setErrorForm(null); // Resetea el error

      try {
        // Llamamos a la función UpdatePassword (esta devuelve true/false)
        const resUpdate = await UpdatePassword(password);
        setStateUpdate(resUpdate); // Actualiza el estado

        // Manejo de la respuesta
        if (!resUpdate) {
          // Si no se pudo actualizar, mostramos un error
          setErrorForm({
            errorType: 3,
            errorMessage:
              dictionary?.dictionary?.newPassword?.updateError ||
              "Error al actualizar la contraseña",
          });

          // Mostrar SweetAlert con error
          Swal.fire({
            icon: "error",
            title: "Error",
            text:
              dictionary?.dictionary?.newPassword?.updateError ||
              "No se pudo actualizar la contraseña. Inténtalo de nuevo.",
          });
        } else {
          // Si la actualización fue exitosa
          console.debug("Contraseña actualizada correctamente");

          // Mostrar SweetAlert con éxito
          Swal.fire({
            icon: "success",
            title: "Éxito",
            text: "Tu contraseña se ha actualizado correctamente.",
            showConfirmButton: false,
            timer: 2000, // Se cerrará automáticamente después de 2 segundos
          });

          // Llamamos a la función para resetear los campos
          handleResetPasswordFields();
        }
      } catch (error) {
        // Si ocurre algún error durante la actualización
        console.error("Error al actualizar la contraseña:", error);
        setErrorForm({
          errorType: 3,
          errorMessage: "Error al actualizar la contraseña",
        });

        // Mostrar SweetAlert con error
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al actualizar la contraseña. Inténtalo de nuevo.",
        });
      }
    } else {
      // Manejo de errores de validación (las contraseñas no coinciden o no están completas)
      setErrorForm({
        errorType: !password ? 1 : 2,
        errorMessage: !password
          ? dictionary?.dictionary?.newPassword?.mandatoryPassword ||
            "La contraseña es obligatoria"
          : dictionary?.dictionary?.newPassword?.mandatoryRepeatPassword ||
            "Por favor, confirme la contraseña",
      });

      // Mostrar SweetAlert con advertencia
      Swal.fire({
        icon: "warning",
        title: "Error de validación",
        text: !password
          ? dictionary?.dictionary?.newPassword?.mandatoryPassword ||
            "La contraseña es obligatoria"
          : dictionary?.dictionary?.newPassword?.mandatoryRepeatPassword ||
            "Por favor, confirme la contraseña",
      });
    }
  };

  const handleBack = () => {
    router.replace("/views/home");
  };

  return {
    handleChangePassword,
    setPassword,
    password,
    passwordConfirm,
    setPasswordConfirm,
    errorForm,
    stateUpdate,
    handleBack,
  };
};

export default ChangePasswordHook;
