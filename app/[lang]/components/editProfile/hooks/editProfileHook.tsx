import { useState, useEffect } from "react";
import { UpdateProfile as updateProfileData, GetUser } from "@/reactQuery/users";
import { colombianCitiesData } from "@/types/colombianCitiesData";
import Swal from "sweetalert2";

type CityData = { departamento: string; ciudades: string[] };

const getCitiesByDepartment = (department: string): string[] => {
  return colombianCitiesData.find(d => d.departamento === department)?.ciudades || [];
};

const getDepartmentByCity = (city: string): string | null => {
  const found = colombianCitiesData.find(d => d.ciudades.includes(city));
  return found ? found.departamento : null;
};

const EditProfileHook = () => {
  const { data, refetch } = GetUser();
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [dni, setDni] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [departments, setDepartments] = useState<CityData[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [errorForm, setErrorForm] = useState<{ errorMessage: string } | null>(null);
  const [stateUpdate, setStateUpdate] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setDepartments(colombianCitiesData);
  }, []);

  useEffect(() => {
    if (!data) {
      setLoading(false);
      return;
    }

    const {
      fullName = "",
      address = "",
      phoneNumber = "",
      city = "",
      state = "",
      documentType = "",
      dni = "",
      email = ""
    } = data;

    setFullName(fullName);
    setAddress(address);
    setPhoneNumber(phoneNumber);
    setCity(city);
    setState(state);
    setDocumentType(documentType);
    setDni(dni);
    setEmail(email);

    if (state) {
      setCities(getCitiesByDepartment(state));
    }

    setLoading(false);
  }, [data]);

  // Si cambia la ciudad, detectar y setear el departamento correspondiente
  useEffect(() => {
    if (city) {
      const department = getDepartmentByCity(city);
      if (department) setState(department);
    }
  }, [city]);

  const handleChangeDepartament = (e: any) => {
    const value = e.target.value;
    setState(value);
    setCities(getCitiesByDepartment(value));
  };

  const handleChangeCity = (e: any) => {
    setCity(e.target.value);
  };

  const handleEditProfile = async () => {
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
      const result = await updateProfileData(profileData, data?.uid);

      if (result.success) {
        setStateUpdate(true);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Perfil actualizado con éxito",
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        setErrorForm({ errorMessage: result.message || "No se pudo actualizar el perfil." });
      }
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      setErrorForm({
        errorMessage: "Error al actualizar el perfil. Intenta nuevamente.",
      });
    }
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
    loading,
    departments,
    cities,
    handleChangeDepartament,
    handleChangeCity,
  };
};

export default EditProfileHook;
