import { useState } from "react";
import { UpdatePassword } from "@/reactQuery/users"; // Importamos funcion para actualizar contraseña (firebase)
import { LoginError } from "@/types/login";
import { useRouter } from "next/navigation";
import useDictionary from "@/hooks/dictionary/useDictionary";

const ChangePasswordHook = () => {
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [stateUpdate, setStateUpdate] = useState<boolean>(false);
  const [errorForm, setErrorForm] = useState<LoginError | null>(null);
  const router = useRouter();
  const dictionary = useDictionary({ lang: "es" });

  const handleChangePassword = async () => {
    // Verificamos que las contraseñas sean válidas
    if (password && passwordConfirm && password === passwordConfirm) {
      setErrorForm(null); // Resetea el error

      // Llamamos a la función UpdatePassword
      const resUpdate = await UpdatePassword(password);
      setStateUpdate(resUpdate); // Actualiza el estado

      // Manejo de la respuesta
      if (!resUpdate) {
        setErrorForm({
          errorType: 3,
          errorMessage:
            dictionary?.dictionary?.newPassword?.updateError ||
            "Error al actualizar la contraseña",
        });
      } else {
        console.debug("Contraseña actualizada correctamente");
      }
    } else {
      // Manejo de errores de validación
      setErrorForm({
        errorType: !password ? 1 : 2,
        errorMessage: !password
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
    setPasswordConfirm,
    errorForm,
    stateUpdate,
    handleBack,
  };
};

export default ChangePasswordHook;
