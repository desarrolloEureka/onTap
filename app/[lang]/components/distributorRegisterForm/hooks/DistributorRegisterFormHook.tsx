import { getDocumentReference, saveDistributorQuerie, UpdateDistributortionQuerie } from '@/reactQuery/generalQueries';
import { useEffect, useState } from 'react';
import moment from "moment";
import { GetAllCategories, GetAllDistributors } from '@/reactQuery/home';
import Swal from "sweetalert2";
import { Country } from '@/components/countries/hooks/CountriesHook';
import { countriesTable } from '@/types/formConstant';
import { Department } from '@/components/departments/hooks/DepartmentsHook';
import { colombianCitiesData } from '@/types/colombianCitiesData';
import { addUser } from '@/firebase/user';
import * as XLSX from 'xlsx';
import { GetUser } from '@/reactQuery/users';
import { registerUserAuth, registerUserAuthDistributor } from 'app/functions/register';

type City = string;

const DistributorRegisterFormHook = () => {
  const datUser = GetUser();
  //Generales
  const [query, setQuery] = useState<any>([]);
  const [filteredQuery, setFilteredQuery] = useState<any>([]);
  const [flag, setFlag] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { data } = GetAllDistributors(flag);
  const { data: dataCategories } = GetAllCategories(flag);
  const [countries, setCountries] = useState<Country[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [status, setStatus] = useState<string>('');
  const [accessTokenUser, setAccessTokenUser] = useState<string>("");

  //Datos distribuidor
  const [documentType, setDocumentType] = useState<string>('');
  const [documentNumber, setDocumentNumber] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [confirmEmail, setConfirmEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [isActive, setIsActive] = useState<boolean>(true);
  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditData, setIsEditData] = useState(false);
  const [rowId, setRowId] = useState(null);
  //Errores: 
  const [documentTypeError, setDocumentTypeError] = useState<string | null>(null);
  const [documentNumberError, setDocumentNumberError] = useState<string | null>(null);
  const [fullNameError, setFullNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [confirmEmailError, setConfirmEmailError] = useState<string | null>(null);
  const [phoneNumberError, setPhoneNumberError] = useState<string | null>(null);
  const [addressError, setAddressError] = useState<string | null>(null);
  const [cityError, setCityError] = useState<string | null>(null);
  const [stateError, setStateError] = useState<string | null>(null);
  const [countryError, setCountryError] = useState<string | null>(null);
  const [categoryError, setCategoryError] = useState<string | null>(null);
  const [isActiveError, setIsActiveError] = useState<string | null>(null);
  //Filtros
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleOpenModal = async () => {
    setIsEditData(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    handleReset();
  }

  const handleReset = () => {
    setDocumentType('');
    setDocumentNumber('');
    setFullName('');
    setEmail('');
    setConfirmEmail('');
    setPhoneNumber('');
    setAddress('');
    setCity('');
    setState('');
    setCountry('');
    setCategory('');
    setIsActive(true);
    setDocumentTypeError(null);
    setDocumentNumberError(null);
    setFullNameError(null);
    setEmailError(null);
    setConfirmEmailError(null);
    setPhoneNumberError(null);
    setAddressError(null);
    setCityError(null);
    setStateError(null);
    setCountryError(null);
    setCategoryError(null);
    setIsActiveError(null);
    setIsEditData(false);
    setRowId(null);
    setCities([]);
  };

  const validateForm = () => {
    let valid = true;

    setDocumentTypeError(null);
    setDocumentNumberError(null);
    setFullNameError(null);
    setEmailError(null);
    setConfirmEmailError(null);
    setPhoneNumberError(null);
    setAddressError(null);
    setCityError(null);
    setStateError(null);
    setCountryError(null);
    setCategoryError(null);
    setIsActiveError(null);

    // Validar tipo de documento
    if (!documentType) {
      setDocumentTypeError("El tipo de documento es obligatorio.");
      valid = false;
    }

    // Validar número de documento
    if (!documentNumber) {
      setDocumentNumberError("El número de documento es obligatorio.");
      valid = false;
    } else if (documentNumber.length < 5 || !/^\d+$/.test(documentNumber)) {
      setDocumentNumberError("Debe ser un número y tener al menos 5 dígitos.");
      valid = false;
    }

    // Validar nombre completo
    if (!fullName) {
      setFullNameError("El nombre completo es obligatorio.");
      valid = false;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("El correo electrónico es obligatorio.");
      valid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError("El formato del correo electrónico no es válido.");
      valid = false;
    }

    // Validar confirmación de email
    if (confirmEmail !== email) {
      setConfirmEmailError("Los correos electrónicos no coinciden.");
      valid = false;
    }

    // Validar ciudad
    if (!city) {
      setCityError("La ciudad es obligatoria.");
      valid = false;
    }

    // Validar estado
    if (!state) {
      setStateError("El estado es obligatorio.");
      valid = false;
    }

    // Validar país
    if (!country) {
      setCountryError("El país es obligatorio.");
      valid = false;
    }

    // Validar categoría
    if (!category) {
      setCategoryError("La categoría es obligatoria.");
      valid = false;
    }

    // Validar estado activo
    if (isActive === null) {
      setIsActiveError("El estado activo es obligatorio.");
      valid = false;
    }

    return valid;
  };

  const dataRegisterHandle = async () => {
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      const createdAt = moment().format();
      const dataSend = {
        documentType,
        dni: documentNumber,
        fullName,
        email,
        phoneNumber,
        address,
        city,
        state,
        country,
        category,
        isActive,
        created_at: createdAt,
        is_admin: false,
        is_distributor: true,
        isActiveByAdmin: true
      };

      if (accessTokenUser) {
        const emailUser = dataSend?.email?.trim().toLowerCase();
        const password = dataSend?.dni.trim();

        const resultAuth = await registerUserAuthDistributor({ user: emailUser, password: password });

        const combinedData = {
          ...dataSend,
          uid: resultAuth,
        }

        const result = await saveDistributorQuerie(combinedData);

        if (result.success) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `Distribuidor registrado con éxito`,
            showConfirmButton: false,
            timer: 2000,
          });
          handleReset();
        } else {
          setStatus(result.message);
        }
      }


    } catch (error) {
      setStatus('Error al registrar al distribuidor');
    } finally {
      setFlag(!flag);
      setIsSubmitting(false);
      setIsModalOpen(false);
    }
  }

  const handleEditData = async (e: React.FormEvent) => {
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      const dataSend = {
        documentType,
        documentNumber,
        fullName,
        email,
        phoneNumber,
        address,
        city,
        state,
        country,
        category,
        isActive,
      };

      const result = await UpdateDistributortionQuerie(dataSend, rowId);

      if (result.success) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Distribuidor actualizada con éxito`,
          showConfirmButton: false,
          timer: 2000,
        });
        handleReset();
      } else {
        setStatus(result.message);
      }
    } catch (error) {
      setStatus('Error al registrar al distribuidor');
    } finally {
      setFlag(!flag);
      setIsSubmitting(false);
      setIsModalOpen(false);
    }
  }

  const handleChangeCountry = async (e: any) => {
    try {
      const value = e.target.value;
      setCountry(value);
      const departmentsData = await colombianCitiesData;
      setState('');
      setDepartments(departmentsData);
      setCities([]);
      setCity('');
    } catch (error) {
      console.error("Error al cambiar el país:", error);
    }
  };

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
  }

  const handleEditDistribuidor = async (dataDistribuidor: any) => {
    setIsModalOpen(true);
    setIsEditData(true);
    setDocumentType(dataDistribuidor.documentType || '');
    setDocumentNumber(dataDistribuidor.dni || '');
    setFullName(dataDistribuidor.fullName || '');
    setEmail(dataDistribuidor.email || '');
    setConfirmEmail(dataDistribuidor.email || '');
    setPhoneNumber(dataDistribuidor.phoneNumber || '');
    setAddress(dataDistribuidor.address || '');
    setCity(dataDistribuidor.city || '');
    setState(dataDistribuidor.state || '');
    setCountry(dataDistribuidor.country || '');
    setCategory(dataDistribuidor.category || '');
    setIsActive(dataDistribuidor.isActive !== undefined ? dataDistribuidor.isActive : true);
    setRowId(dataDistribuidor.uid || null);

    try {
      const departmentsData = await colombianCitiesData;
      const filteredCitiesData = departmentsData.find(
        (departamento) => departamento.departamento === dataDistribuidor.state
      );
      const cities = filteredCitiesData ? filteredCitiesData.ciudades : [];
      setDepartments(departmentsData);
      setCities(cities);
    } catch (error) {
      console.error("Error al cargar datos de departamentos y ciudades:", error);
    }
  };

  const exportToExcel = (filteredQuery: any) => {
    try {
      if (!Array.isArray(filteredQuery)) {
        throw new Error("filteredQuery debe ser un array");
      }

      // Crear una copia de los datos excluyendo las columnas no deseadas
      const filteredData = filteredQuery.map((user) => {
        const { edit, optionEdit, ...filteredUser } = user;

        // Devolver los datos con la propiedad específica incluida
        return {
          ...filteredUser
        };
      });

      // Crear una hoja de cálculo a partir de los datos filtrados
      const worksheet = XLSX.utils.json_to_sheet(filteredData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Usuarios");

      // Crear un archivo Blob y descargarlo
      const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

      // Crear un enlace de descarga y hacer clic en él
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(data);
      downloadLink.download = 'Usuarios.xlsx';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (error) {
      console.error('Error al exportar a Excel:', error);
    }
  };

  const handleDeleteFilter = () => {
    setFilteredQuery(query);
    setStartDate('');
    setEndDate('');
  };

  const handleDateChange = () => {
    const dateStart = startDate ? new Date(startDate) : null;
    const dateEnd = endDate ? new Date(endDate) : null;

    if (dateStart) {
      dateStart.setDate(dateStart.getDate() + 1);
      dateStart.setHours(0, 0, 0, 0);
    }

    if (dateEnd) {
      dateEnd.setDate(dateEnd.getDate() + 1);
      dateEnd.setHours(23, 59, 59, 999);
    }

    if (!dateStart && !dateEnd) {
      setFilteredQuery(query);
      return;
    }

    const filteredData = query.filter((user: { date: string | number | Date; }) => {
      let userDate: Date;

      if (typeof user.date === 'string') {
        const userDateParts = user.date.split('/');
        userDate = new Date(`${userDateParts[2]}-${userDateParts[1]}-${userDateParts[0]}`);
      } else if (typeof user.date === 'number') {
        userDate = new Date(user.date);
      } else {
        userDate = user.date;
      }

      userDate.setDate(userDate.getDate() + 1);

      if (dateStart && dateEnd) {
        return userDate >= dateStart && userDate <= dateEnd;
      } else if (dateStart) {
        return userDate >= dateStart;
      } else if (dateEnd) {
        return userDate <= dateEnd;
      }
      return true;
    });
    setFilteredQuery(filteredData);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (countries.length === 0) {
        const Countries = await countriesTable;
        setCountries(Countries);
      }
    };
    fetchData();
  }, [countries]);

  useEffect(() => {
    const fetchData = async () => {
      const tokenUser = await localStorage.getItem('@userToken');
      setAccessTokenUser(tokenUser ? tokenUser : '');
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      const formattedData = data.map(doc => {
        return {
          optionEdit: doc,
          created_at: doc.created_at,
          documentType: doc.documentType,
          id: doc.dni,
          name: doc.fullName,
          phoneNumber: doc.phoneNumber,
          email: doc.email,
          status: doc.isActive
        };
      });

      setQuery(formattedData);
      setFilteredQuery(formattedData);
    }
  }, [data]);

  return {
    data: filteredQuery,
    isSubmitting,
    documentType,
    setDocumentType,
    documentNumber,
    setDocumentNumber,
    fullName,
    setFullName,
    email,
    setEmail,
    confirmEmail,
    setConfirmEmail,
    phoneNumber,
    setPhoneNumber,
    address,
    setAddress,
    city,
    state,
    country,
    category,
    setCategory,
    isActive,
    setIsActive,
    isModalOpen,
    isEditData,
    rowId,
    handleOpenModal,
    handleCloseModal,
    dataCategories: dataCategories && dataCategories.sort((a, b) => a.name.localeCompare(b.name)),
    countries,
    departments,
    cities,
    handleChangeCountry,
    handleChangeDepartament,
    handleChangeCity,
    handleEditDistribuidor,
    exportToExcel,
    handleDeleteFilter,
    handleDateChange,
    //Errores
    documentTypeError,
    documentNumberError,
    fullNameError,
    emailError,
    confirmEmailError,
    phoneNumberError,
    addressError,
    cityError,
    stateError,
    countryError,
    categoryError,
    isActiveError,
    dataRegisterHandle,
    handleEditData,
    startDate,
    setStartDate,
    endDate,
    setEndDate
  };
};

export default DistributorRegisterFormHook;
