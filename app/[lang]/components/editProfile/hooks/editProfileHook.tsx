import { useState, useEffect } from "react";
import {
  UpdateProfile as updateProfileData,
  fetchProfileData as fetchCurrentProfile,
} from "@/reactQuery/users"; // Renombramos las importaciones para evitar conflictos
import { useRouter } from "next/navigation";
import { getAuth } from "firebase/auth"; // Importamos getAuth de Firebase
import { colombianCitiesData } from "@/types/colombianCitiesData"; // Importamos los datos de ciudades de Colombia
import Swal from "sweetalert2"; // Asegúrate de tener la librería Swal instalada

const EditProfileHook = () => {
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [dni, setDni] = useState("");
  const [email, setEmail] = useState("");
  const [errorForm, setErrorForm] = useState<{ errorMessage: string } | null>(
    null
  );
  const [stateUpdate, setStateUpdate] = useState(false);
  const [loading, setLoading] = useState(true);

  // Para departamentos y ciudades
  const [departments, setDepartments] = useState<any[]>([]); // Ajusta el tipo según lo que necesites
  const [cities, setCities] = useState<any[]>([]);

  // Para departamentos y ciudades de entrega
  const [departmentsDelivery, setDepartmentsDelivery] = useState<any[]>([]);
  const [citiesDelivery, setCitiesDelivery] = useState<any[]>([]);

  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);

      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        try {
          const result = await fetchCurrentProfile(user.uid);

          if (result && result.success && result.data) {
            const currentProfileData = result.data;
            //console.log("Current Profile Data: ", currentProfileData); // Verificar los datos

            setFullName(currentProfileData.fullName || "");
            setAddress(currentProfileData.address || "");
            setPhoneNumber(currentProfileData.phoneNumber || "");
            setCity(currentProfileData.city || "");
            setState(currentProfileData.state || ""); // Verifica aquí si el departamento se está estableciendo correctamente
            setDocumentType(currentProfileData.documentType || "");
            setDni(currentProfileData.dni || "");
            setEmail(currentProfileData.email || "");

            // Filtra las ciudades basadas en el departamento
            if (currentProfileData.state) {
              const filteredCitiesData = colombianCitiesData.find(
                (departamento) =>
                  departamento.departamento === currentProfileData.state
              );
              const cities = filteredCitiesData
                ? filteredCitiesData.ciudades
                : [];
              setCities(cities);
            }
          } else {
            setErrorForm({
              errorMessage:
                result?.message || "Error al obtener datos del perfil.",
            });
          }
        } catch (error) {
          setErrorForm({
            errorMessage:
              "Error al obtener datos del perfil. Intenta nuevamente.",
          });
        }
      } else {
        setErrorForm({
          errorMessage: "No hay usuario autenticado. Por favor inicia sesión.",
        });
      }

      setLoading(false);
    };

    fetchProfile();
  }, []); // Solo se ejecuta cuando el componente se monta

  useEffect(() => {
    const departmentsData = colombianCitiesData; // Datos de departamentos y ciudades de Colombia
    setDepartments(departmentsData); // Inicializamos los departamentos
  }, []);

  useEffect(() => {
    if (city) {
      const filteredCitiesData = colombianCitiesData.find((departamento) =>
        departamento.ciudades.includes(city)
      );

      if (filteredCitiesData) {
        setState(filteredCitiesData.departamento); // Establecer el departamento basado en la ciudad
      }
    }
  }, [city]); // Solo se ejecuta cuando la ciudad cambia

  const handleChangeDepartament = async (e: any) => {
    try {
      const value = e.target.value;
      setState(value);

      const filteredCitiesData = colombianCitiesData.find(
        (departamento) => departamento.departamento === value
      );

      const cities = filteredCitiesData ? filteredCitiesData.ciudades : [];
      setCities(cities);
    } catch (error) {
      console.error("Error al cambiar el departamento:", error);
    }
  };

  const handleChangeCity = async (e: any) => {
    const value = e.target.value;
    setCity(value);
  };

  const handleEditProfile = async () => {
    // Validación de los datos antes de guardar
    //if (!validateProfileData()) return;

    // Prepara los datos del perfil que quieres guardar
    const profileData = {
      fullName,
      address,
      phoneNumber,
      city,
      state,
      documentType,
      dni,
      email,
    };

    try {
      // Intenta guardar los cambios (usando tu función `updateProfileData`)
      const result = await updateProfileData(profileData);

      if (result.success) {
        // Si la actualización fue exitosa, actualiza el estado y muestra un modal de éxito
        setStateUpdate(true);

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Perfil actualizado con éxito",
          showConfirmButton: false,
          timer: 2000, // Mostrar durante 2 segundos
        });

        // Resetea los datos del formulario (si es necesario)
      } else {
        // Si la respuesta de la API tiene un error, muestra el mensaje correspondiente
        setErrorForm({
          errorMessage: result.message || "No se pudo actualizar el perfil.",
        });
      }
    } catch (error) {
      // Manejo de errores, en caso de que algo falle en el proceso
      console.error("Error al actualizar el perfil:", error);
      setErrorForm({
        errorMessage: "Error al actualizar el perfil. Intenta nuevamente.",
      });
    }
  };

  const handleBack = () => {
    window.location.reload();
  };

  return {
    handleEditProfile,
    fullName,
    setFullName,
    address,
    setAddress,
    phoneNumber,
    setPhoneNumber,
    city,
    setCity,
    state,
    setState,
    documentType,
    setDocumentType,
    dni,
    setDni,
    email,
    setEmail,
    errorForm,
    stateUpdate,
    handleBack,
    loading,
    departments,
    cities,
    handleChangeDepartament,
    handleChangeCity,
  };
};

export default EditProfileHook;
