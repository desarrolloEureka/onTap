import { useState, useEffect } from "react";
import { UpdateProfile } from "@/reactQuery/users";
import { useRouter } from "next/navigation";

const EditProfileHook = () => {
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const router = useRouter();
  const [errorForm, setErrorForm] = useState<{ errorMessage: string } | null>(
    null
  );
  const [stateUpdate, setStateUpdate] = useState(false);

  const handleEditProfile = async () => {
    const profileData = {
      fullName,
      address,
      phoneNumber,
      city,
      state,
    };

    try {
      const result = await UpdateProfile(profileData);
      if (result) {
        setStateUpdate(true);
        setErrorForm(null);
      } else {
        setErrorForm({ errorMessage: "No se pudo actualizar el perfil." });
      }
    } catch (error) {
      setErrorForm({ errorMessage: "Error al actualizar el perfil." });
    }
  };
  const validatePhoneNumber = (value: string) => {
    if (value.length > 10) {
      setErrorForm({
        errorMessage: "El número de teléfono no puede tener más de 10 dígitos.",
      });
    } else {
      setErrorForm(null); // Limpiar el error si la validación es correcta
    }
    setPhoneNumber(value); // Actualizar el estado del número de teléfono
  };

  const handleBack = () => {
    router.replace("/views/home");
  };

  return {
    handleEditProfile,
    setFullName,
    setAddress,
    setPhoneNumber,
    setCity,
    setState,
    errorForm,
    stateUpdate,
    handleBack,
    validatePhoneNumber,
  };
};

export default EditProfileHook;
