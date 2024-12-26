import { useState } from "react";
import { UpdatePassword } from "@/reactQuery/users"; // Tu función para actualizar contraseña
import { LoginError } from "@/types/login";
import { useRouter } from "next/navigation";
import useDictionary from "@/hooks/dictionary/useDictionary";
import Swal from "sweetalert2";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/auth"; // Asegúrate de que esta importación es correcta

const ChangePasswordHook = () => {
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [stateUpdate, setStateUpdate] = useState<boolean>(false);
  const [errorForm, setErrorForm] = useState<LoginError | null>(null);
  const router = useRouter();
  const dictionary = useDictionary({ lang: "es" });

  const handleResetPasswordFields = () => {
    setPassword("");
    setPasswordConfirm("");
  };

  const handleChangePassword = async () => {
    if (password && passwordConfirm && password === passwordConfirm) {
      setErrorForm(null);

      try {
        const resUpdate = await UpdatePassword(password);
        setStateUpdate(resUpdate);

        if (!resUpdate) {
          setErrorForm({
            errorType: 3,
            errorMessage:
              dictionary?.dictionary?.newPassword?.updateError ||
              "Error al actualizar la contraseña",
          });
          Swal.fire({
            icon: "error",
            title: "Error",
            text:
              dictionary?.dictionary?.newPassword?.updateError ||
              "No se pudo actualizar la contraseña. Inténtalo de nuevo.",
          });
        } else {
          console.debug("Contraseña actualizada correctamente");

          Swal.fire({
            icon: "success",
            title: "Éxito",
            text: "Tu contraseña se ha actualizado correctamente.",
            showConfirmButton: false,
            timer: 2000,
          });

          handleResetPasswordFields();

          // cierre de sesión después de la actualización de la contraseña
          try {
            // Cerrar sesión de Firebase
            await signOut(auth);
            console.debug("Sesión cerrada exitosamente");

            // Limpiar localStorage y cookies
            localStorage.clear();
            sessionStorage.clear();

            // Redirigir a la página de inicio de sesión
            router.replace("/views/login");
          } catch (error) {
            console.error("Error al cerrar sesión:", error);
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Hubo un problema al cerrar sesión. Inténtalo de nuevo.",
            });
          }
        }
      } catch (error) {
        console.error("Error al actualizar la contraseña:", error);
        setErrorForm({
          errorType: 3,
          errorMessage: "Error al actualizar la contraseña",
        });
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al actualizar la contraseña. Inténtalo de nuevo.",
        });
      }
    } else {
      setErrorForm({
        errorType: !password ? 1 : 2,
        errorMessage: !password
          ? dictionary?.dictionary?.newPassword?.mandatoryPassword ||
            "La contraseña es obligatoria"
          : dictionary?.dictionary?.newPassword?.mandatoryRepeatPassword ||
            "Por favor, confirme la contraseña",
      });
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
    // Recarga la página completamente, como un "Ctrl + R"
    window.location.reload();
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
