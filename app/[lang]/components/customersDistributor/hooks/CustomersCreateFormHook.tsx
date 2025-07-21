import { useEffect, useState } from "react";
import { Country } from "@/components/countries/hooks/CountriesHook";
import { countriesTable } from "@/types/formConstant";
import { Department } from "@/components/departments/hooks/DepartmentsHook";
import { colombianCitiesData } from "@/types/colombianCitiesData";
import {
  GetAllColors,
  GetAllCustomizations,
  GetAllDefaultPlans,
  GetAllMaterials,
  GetAllPlanesIndividual,
  GetAllProducts,
} from "@/reactQuery/home";
import { checkUserExists, GetUser } from "@/reactQuery/users";
import { Colors, Products } from "@/types/home";
import moment from "moment";
import Swal from "sweetalert2";
import { registerUserAuth, registerUserFb } from "app/functions/register";
import { generatePaymentReference } from "../../../../wompi";
import axios from "axios";
import {
  getDocumentReference,
  saveInvoiceQuerie,
  saveOrderQuerie,
  saveSubscriptionQuerie,
  UpdateUserDataQuery,
} from "@/reactQuery/generalQueries";
import { wompiConfig } from "@/firebase/firebaseConfig";
import { getLastOrder } from "@/firebase/generals";
import { getUserById, getUserByIdFireStoreFullData } from "@/firebase/user";
import { updateSubscriptionFieldByUserId } from "@/firebase/Documents";

type City = string;

interface ErrorMessages {
  quantity?: string;
  customName?: string;
  customRole?: string;
}

const CustomersCreateFormHook = ({
  handleReturnForm,
  userId
}: {
  handleReturnForm: () => void;
  userId: any
}) => {
  const { data, refetch } = GetUser();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [step, setStep] = useState(1);
  const [flag, setFlag] = useState(false);
  const { data: dataPlans } = GetAllPlanesIndividual(flag);
  const { data: defaultPlans } = GetAllDefaultPlans(flag);
  const { data: dataMaterials } = GetAllMaterials(flag);
  const { data: dataCustomizations } = GetAllCustomizations(flag);
  const { data: dataColors } = GetAllColors(flag);
  const { data: dataProducts } = GetAllProducts(flag);
  const [filteredColors, setFilteredColors] = useState<Colors[]>([]);
  const [isEditData, setIsEditData] = useState<boolean>(false);
  const [isExistingUser, setIsExistingUser] = useState<boolean>(false);

  //Datos distribuidor paso 1
  const [documentType, setDocumentType] = useState<string>("");
  const [documentNumber, setDocumentNumber] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [confirmEmail, setConfirmEmail] = useState<string>("");
  const [phoneCode, setPhoneCode] = useState<string>("CO+57");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(true);
  const [rowId, setRowId] = useState<string | null>(null);

  //Datos Paso 2
  const [selectedPlan, setSelectedPlan] = useState<string | any>("");
  const [selectedCombo, setSelectedCombo] = useState<string | any>("");
  const [selectedMaterial, setSelectedMaterial] = useState<string | any>("");
  const [selectedCustomization, setSelectedCustomization] = useState<any>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [customization, setCustomization] = useState<boolean>(false);
  const [customName, setCustomName] = useState<string>("");
  const [customRole, setCustomRole] = useState<string>("");
  const [total, setTotal] = useState(0);
  const [totalSavings, setTotalSavings] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState<Products[]>([]);
  const [product, setProduct] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Products[]>([]);

  //Datos Paso 5
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [deliveryFirstName, setDeliveryFirstName] = useState("");
  const [deliveryLastName, setDeliveryLastName] = useState("");
  const [deliveryIdType, setDeliveryIdType] = useState("");
  const [deliveryIdNumber, setDeliveryIdNumber] = useState("");
  const [deliveryPhoneNumber, setDeliveryPhoneNumber] = useState("");
  const [deliveryEmail, setDeliveryEmail] = useState("");
  const [countriesDelivery, setCountriesDelivery] = useState<Country[]>([]);
  const [departmentsDelivery, setDepartmentsDelivery] = useState<Department[]>(
    []
  );
  const [citiesDelivery, setCitiesDelivery] = useState<City[]>([]);
  const [cityDelivery, setCityDelivery] = useState<string>("");
  const [stateDelivery, setStateDelivery] = useState<string>("");
  const [countryDelivery, setCountryDelivery] = useState<string>("");
  const [addressDelivery, setAddressDelivery] = useState<string>("");
  const [postalCode, setPostalCode] = useState("");

  //Errores:
  const [documentTypeError, setDocumentTypeError] = useState<string | null>(
    null
  );
  const [documentNumberError, setDocumentNumberError] = useState<string | null>(
    null
  );
  const [firstNameError, setFirstNameError] = useState<string | null>(null);
  const [lastNameError, setLastNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [confirmEmailError, setConfirmEmailError] = useState<string | null>(
    null
  );
  const [phoneNumberError, setPhoneNumberError] = useState<string | null>(null);
  const [errorPhoneCodeForm, setErrorPhoneCodeForm] = useState<string | null>(
    null
  );
  const [addressError, setAddressError] = useState<string | null>(null);
  const [cityError, setCityError] = useState<string | null>(null);
  const [stateError, setStateError] = useState<string | null>(null);
  const [countryError, setCountryError] = useState<string | null>(null);
  const [isActiveError, setIsActiveError] = useState<string | null>(null);

  // Errores Paso 2
  const [selectedPlanError, setSelectedPlanError] = useState<string | null>(null);
  const [selectedComboError, setSelectedComboError] = useState<string | null>(null);
  const [selectedMaterialError, setSelectedMaterialError] = useState<
    string | null
  >(null);
  const [selectedCustomizationError, setSelectedCustomizationError] = useState<
    string | null
  >(null);
  const [selectedColorError, setSelectedColorError] = useState<string | null>(
    null
  );
  const [customNameError, setCustomNameError] = useState<string | null>(null);
  const [customRoleError, setCustomRoleError] = useState<string | null>(null);
  //Erroes paso 3
  const [errorMessages, setErrorMessages] = useState<
    Record<number, ErrorMessages>
  >({});
  //
  const [deliveryFirstNameError, setDeliveryFirstNameError] = useState("");
  const [deliveryLastNameError, setDeliveryLastNameError] = useState("");
  const [deliveryIdTypeError, setDeliveryIdTypeError] = useState("");
  const [deliveryIdNumberError, setDeliveryIdNumberError] = useState("");
  const [deliveryPhoneNumberError, setDeliveryPhoneNumberError] = useState("");
  const [deliveryEmailError, setDeliveryEmailError] = useState("");
  //
  const [shippingCountryError, setShippingCountryError] = useState<
    string | null
  >(null);
  const [shippingCityError, setShippingCityError] = useState<string | null>(
    null
  );
  const [shippingStateError, setShippingStateError] = useState<string | null>(
    null
  );
  const [postalCodeError, setPostalCodeError] = useState<string | null>(null);
  const [addressDeliveryError, setAddressDeliveryError] = useState("");
  //Wompi
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [acceptanceToken, setAcceptanceToken] = useState("");
  const [personalAuthToken, setPersonalAuthToken] = useState("");
  const [isAccepted, setIsAccepted] = useState(false);
  const [error, setError] = useState("");
  const [cardInfo, setCardInfo] = useState({
    number: "",
    cvc: "",
    exp_month: "",
    exp_year: "",
    card_holder: "",
    installments: "",
    idType: "",
    idNumber: "",
  });
  const [loading, setLoading] = useState(false);

  //Errores Modal Pagos
  // Estados para errores de validación
  const [cardNumberError, setCardNumberError] = useState<string | null>(null);
  const [cvcError, setCvcError] = useState<string | null>(null);
  const [expMonthError, setExpMonthError] = useState<string | null>(null);
  const [expYearError, setExpYearError] = useState<string | null>(null);
  const [cardHolderError, setCardHolderError] = useState<string | null>(null);
  const [termsError, setTermsError] = useState<string | null>(null);
  const [installmentsError, setInstallmentsError] = useState<string | null>(
    null
  );
  const [idTypeError, setIdTypeError] = useState<string | null>(null);
  const [idNumberError, setIdNumberError] = useState<string | null>(null);
  const [isChangePlan, setIsChangePlan] = useState(false);
  const [dataUserExist, setDataUserExist] = useState<any>(null);

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    setCardInfo({ ...cardInfo, [e.target.name]: e.target.value });
  };

  const handleNextStep = async (actualStep: any) => {
    if (actualStep === 1) {
      const isValid = await validateForm();
      if (!isValid) return;
      sendNextStepData();
      setStep(2);
    } else if (actualStep === 2) {
      if (!validateFormStepTwo()) return;
      setStep(3);
    } else if (actualStep === 3) {
      if (!validateFormStepThird()) return;
      setStep(4);
    } else if (actualStep === 4) {
      if (total === 0) {
        return;
      }
      setStep(5);
    } else if (actualStep === 5) {
      setStep(6);
    }
  };

  const fillUserData = async (userData: any) => {
    setDocumentType(userData.documentType || "");
    setDocumentNumber(userData.dni || "");
    setFirstName(userData.firstName || "");
    setLastName(userData.lastName || "");
    setEmail(userData.email || "");
    setConfirmEmail(userData.email || "");
    setPhoneCode(userData.phoneCode || "CO+57");
    setPhoneNumber(userData.phone || "");
    setAddress(userData.address || "");
    setCity(userData.city || "");
    setState(userData.state || "");
    setCountry(userData.country || "");
    const departmentsData = await colombianCitiesData;
    setDepartments(departmentsData);

    const filteredCitiesData = colombianCitiesData.find(
      (departamento) => departamento.departamento === userData.state
    );
    const cities = filteredCitiesData ? filteredCitiesData.ciudades : [];
    setCities(cities);

    setIsActive(userData.isActive !== undefined ? userData.isActive : true);
    setRowId(userData.id || null);
    const planObject = defaultPlans && defaultPlans.find((plan) => plan.name === userData.plan);
    setSelectedPlan(planObject || null);

    setDocumentTypeError(null);
    setDocumentNumberError(null);
    setFirstNameError(null);
    setLastNameError(null);
    setEmailError(null);
    setConfirmEmailError(null);
    setPhoneNumberError(null);
    setErrorPhoneCodeForm(null);
    setAddressError(null);
    setCityError(null);
    setStateError(null);
    setCountryError(null);
    setIsActiveError(null);
  };


  const fillDeliveryData = async (userData: any) => {
    setDeliveryFirstName(userData.firstName || "");
    setDeliveryLastName(userData.lastName || "");
    setDeliveryIdType(userData.documentType || "");
    setDeliveryIdNumber(userData.dni || "");
    setDeliveryPhoneNumber(userData.phone || "");
    setDeliveryEmail(userData.email || "");
    setCountryDelivery(userData.country || "");
    setStateDelivery(userData.state || "");
    setCityDelivery(userData.city || "");
    setAddressDelivery(userData.address || "");

    const departmentsData = await colombianCitiesData;
    setDepartmentsDelivery(departmentsData);

    const filteredCitiesData = colombianCitiesData.find(
      (departamento) => departamento.departamento === userData.state
    );
    const cities = filteredCitiesData ? filteredCitiesData.ciudades : [];
    setCitiesDelivery(cities);

    setDeliveryFirstNameError("");
    setDeliveryLastNameError("");
    setDeliveryIdTypeError("");
    setDeliveryIdNumberError("");
    setDeliveryPhoneNumberError("");
    setDeliveryEmailError("");
    setAddressDeliveryError("");
    setShippingCountryError(null);
    setShippingCityError(null);
    setShippingStateError(null);
    setPostalCodeError(null);

  };

  const sendNextStepData = async () => {
    setDeliveryFirstName(firstName);
    setDeliveryLastName(lastName);
    setDeliveryIdType(documentType);
    setDeliveryIdNumber(documentNumber);
    setDeliveryPhoneNumber(phoneNumber);
    setDeliveryEmail(email);
    setCountryDelivery(country);
    setStateDelivery(state);
    setCityDelivery(city);
    setAddressDelivery(address);

    const departmentsData = await colombianCitiesData;
    setDepartmentsDelivery(departmentsData);

    const filteredCitiesData = colombianCitiesData.find(
      (departamento) => departamento.departamento === state
    );
    const cities = filteredCitiesData ? filteredCitiesData.ciudades : [];
    setCitiesDelivery(cities);
  };

  const validateForm = async () => {
    let valid = true;

    setDocumentTypeError(null);
    setDocumentNumberError(null);
    setFirstNameError(null);
    setLastNameError(null);
    setEmailError(null);
    setConfirmEmailError(null);
    setPhoneNumberError(null);
    setErrorPhoneCodeForm(null);
    setAddressError(null);
    setCityError(null);
    setStateError(null);
    setCountryError(null);
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

    // Validar nombre
    if (!firstName) {
      setFirstNameError("El nombre es obligatorio.");
      valid = false;
    }

    // Validar Apellido completo
    if (!lastName) {
      setLastNameError("El apellido es obligatorio.");
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

    // Validar estado activo
    if (isActive === null) {
      setIsActiveError("El estado activo es obligatorio.");
      valid = false;
    }

    // Validar número de teléfono (opcional)
    if (phoneNumber.length !== 10 || !/^\d+$/.test(phoneNumber)) {
      setPhoneNumberError("El número de teléfono debe tener 10 dígitos.");
      valid = false;
    }

    // Validar código de teléfono
    if (phoneCode.trim() === "") {
      setErrorPhoneCodeForm("El código de teléfono es obligatorio.");
      valid = false;
    } else {
      setErrorPhoneCodeForm(null);
    }

    // Verificar si el usuario ya existe
    const { exists, field } = await checkUserExists(
      documentNumber.trim(),
      email.trim(),
      phoneNumber.trim()
    );

    if (exists) {
      if (field === "dni" && !isExistingUser) {
        Swal.fire({
          title: 'Usuario ya registrado',
          text: '¿Desea agregar o hacer una nueva compra para este usuario?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sí',
          cancelButtonText: 'No',
          reverseButtons: true,
        }).then(async (result) => {
          if (result.isConfirmed) {
            const userData: any = await getUserById(documentNumber.trim());
            setDataUserExist(userData)
            await fillUserData(userData);
            await fillDeliveryData(userData);
            setIsExistingUser(true);
            setStep(2);

          }
        });
      } else if (field === "email" && !isExistingUser) {
        setEmailError("El correo ya se encuentra registrado.");
        valid = false;
      } else if (field === "phoneNumber" && !isExistingUser) {
        setPhoneNumberError("El teléfono ya se encuentra registrado.");
        valid = false;
      }
    }

    return valid;
  };

  const validateFormStepTwo = () => {
    let valid = true;

    setSelectedPlanError(null);
    setSelectedComboError(null);
    setSelectedMaterialError(null);
    setSelectedCustomizationError(null);
    setSelectedColorError(null);
    setCustomNameError(null);
    setCustomRoleError(null);

    // Validar plan seleccionado
    if (!selectedPlan) {
      setSelectedPlanError("Debes seleccionar un plan.");
      valid = false;
    }

    /* if (!selectedCombo && !isExistingUser) {
      setSelectedComboError("Debes seleccionar un combo.");
      valid = false;
    } */

    if (!customName.trim() && !isExistingUser) {
      setCustomNameError("El nombre es obligatorio.");
      valid = false;
    }

    if (!customRole.trim() && !isExistingUser) {
      setCustomRoleError("El cargo es obligatorio.");
      valid = false;
    }

    /*  // Validar material seleccionado
         if (!selectedMaterial) {
             setSelectedMaterialError("Debes seleccionar un material.");
             valid = false;
         }
 
         // Validar personalización
         if (customization) {
             // Validación de Nombres
             if (!customName) {
                 setCustomNameError("El nombre personalizado es obligatorio.");
                 valid = false;
             }
 
             // Validación de Role
             if (!customRole) {
                 setCustomRoleError("El cargo personalizado es obligatorio.");
                 valid = false;
             }
         }
 
         // Validar color seleccionado
         if (!selectedColor) {
             setSelectedColorError("Debes seleccionar un color.");
             valid = false;
         } */

    return valid;
  };

  const validateFormStepThird = () => {
    let valid = true;
    const newErrorMessages: Record<number, ErrorMessages> = {};

    selectedProducts.forEach((product, index) => {
      if (product.quantity < 1) {
        valid = false;
        newErrorMessages[index] = {
          ...newErrorMessages[index],
          quantity: "La cantidad debe ser al menos 1.",
        };
      }
      if (product.hasPersonalization) {
        if (!product.customName) {
          valid = false;
          newErrorMessages[index] = {
            ...newErrorMessages[index],
            customName: "El nombre personalizado es obligatorio.",
          };
        }
        if (!product.customRole) {
          valid = false;
          newErrorMessages[index] = {
            ...newErrorMessages[index],
            customRole: "El cargo es obligatorio.",
          };
        }
      }
    });

    setErrorMessages(newErrorMessages);
    return valid;
  };

  const validateFormStepFour = () => {
    let valid = true;

    setDeliveryFirstNameError("");
    setDeliveryLastNameError("");
    setDeliveryIdTypeError("");
    setDeliveryIdNumberError("");
    setDeliveryPhoneNumberError("");
    setDeliveryEmailError("");
    setShippingCountryError("");
    setShippingCityError("");
    setShippingStateError("");
    setPostalCodeError("");
    setAddressDeliveryError("");

    // Validar nombre del comprador
    if (!deliveryFirstName) {
      setDeliveryFirstNameError("El nombre del comprador es obligatorio.");
      valid = false;
    }

    // Validar apellido del comprador
    if (!deliveryLastName) {
      setDeliveryLastNameError("El apellido del comprador es obligatorio.");
      valid = false;
    }

    // Validar tipo de identificación
    if (!deliveryIdType) {
      setDeliveryIdTypeError("El tipo de identificación es obligatorio.");
      valid = false;
    }

    // Validar número de documento
    if (!deliveryIdNumber) {
      setDeliveryIdNumberError("El número de documento es obligatorio.");
      valid = false;
    }

    // Validar teléfono del comprador
    if (!deliveryPhoneNumber) {
      setDeliveryPhoneNumberError("El número de teléfono es obligatorio.");
      valid = false;
    } else if (!/^\d{10,15}$/.test(deliveryPhoneNumber)) {
      setDeliveryPhoneNumberError(
        "El número de teléfono debe tener entre 10 y 15 dígitos."
      );
      valid = false;
    }

    // Validar email del comprador
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!deliveryEmail) {
      setDeliveryEmailError(
        "El correo electrónico del comprador es obligatorio."
      );
      valid = false;
    } else if (!emailRegex.test(deliveryEmail)) {
      setDeliveryEmailError("El formato del correo electrónico no es válido.");
      valid = false;
    }

    // Validar país de envío
    if (!countryDelivery) {
      setShippingCountryError("El país de entrega es obligatorio.");
      valid = false;
    }

    // Validar estado de envío
    if (!stateDelivery) {
      setShippingStateError("El estado de entrega es obligatorio.");
      valid = false;
    }

    // Validar ciudad de envío
    if (!cityDelivery) {
      setShippingCityError("La ciudad de entrega es obligatoria.");
      valid = false;
    }

    // Validar código postal
    if (postalCode && !/^\d{5}$/.test(postalCode)) {
      setPostalCodeError("El código postal debe tener 5 dígitos.");
      valid = false;
    }
    /* if (!postalCode) {
      setPostalCodeError("El código postal es obligatorio.");
      valid = false;
    } else if (!/^\d{5}$/.test(postalCode)) {
      setPostalCodeError("El código postal debe tener 5 dígitos.");
      valid = false;
    } */

    // Validar dirección de envío
    if (!addressDelivery) {
      setAddressDeliveryError("La dirección de envío es obligatoria.");
      valid = false;
    }

    return valid;
  };

  const validateFormPayment = () => {
    let valid = true;

    // Resetear errores
    setCardNumberError(null);
    setCvcError(null);
    setExpMonthError(null);
    setExpYearError(null);
    setCardHolderError(null);
    setTermsError(null);
    setInstallmentsError(null);
    setIdTypeError(null);
    setIdNumberError(null);

    // Validar número de tarjeta
    if (!cardInfo.number) {
      setCardNumberError("El número de tarjeta es obligatorio.");
      valid = false;
    } else if (!/^\d{16}$/.test(cardInfo.number)) {
      setCardNumberError("El número de tarjeta debe tener 16 dígitos.");
      valid = false;
    }

    // Validar CVC
    if (!cardInfo.cvc) {
      setCvcError("El CVC es obligatorio.");
      valid = false;
    } else if (!/^\d{3}$/.test(cardInfo.cvc)) {
      setCvcError("El CVC debe tener 3 dígitos.");
      valid = false;
    }

    // Validar mes de expiración
    if (!cardInfo.exp_month) {
      setExpMonthError("El mes de expiración es obligatorio.");
      valid = false;
    }

    // Validar año de expiración
    if (!cardInfo.exp_year) {
      setExpYearError("El año de expiración es obligatorio.");
      valid = false;
    }

    // Validar nombre del titular de la tarjeta
    if (!cardInfo.card_holder) {
      setCardHolderError("El nombre del titular de la tarjeta es obligatorio.");
      valid = false;
    }

    // Validar número de cuotas (installments)
    if (!cardInfo.installments) {
      setInstallmentsError("El número de cuotas es obligatorio.");
      valid = false;
    }

    // Validar tipo de identificación (idType)
    if (!cardInfo.idType) {
      setIdTypeError("El tipo de identificación es obligatorio.");
      valid = false;
    }

    // Validar número de identificación (idNumber)
    if (!cardInfo.idNumber) {
      setIdNumberError("El número de identificación es obligatorio.");
      valid = false;
    }

    // Validar aceptación de términos
    if (!isAccepted) {
      setTermsError("Debe aceptar los términos y condiciones.");
      valid = false;
    }

    return valid;
  };

  const handleReset = () => {
    // Resetear estados de datos del distribuidor paso 1
    setDocumentType("");
    setDocumentNumber("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setConfirmEmail("");
    setPhoneCode("");
    setPhoneNumber("");
    setAddress("");
    setCity("");
    setState("");
    setCountry("");
    setIsActive(true);

    // Resetear estados de datos paso 2
    setSelectedCombo("");
    setSelectedMaterial("");
    setSelectedCustomization("");
    setSelectedColor("");
    setCustomization(false);
    setTotal(0);
    setTotalSavings(0);
    setSelectedProducts([]);
    setProduct("");
    setFilteredProducts([]);

    // Resetear estados de datos de entrega
    setDeliveryFirstName("");
    setDeliveryLastName("");
    setDeliveryIdType("");
    setDeliveryIdNumber("");
    setDeliveryPhoneNumber("");
    setDeliveryEmail("");
    setAddressDelivery("");
    setPostalCode("");
    setCityDelivery("");
    setStateDelivery("");
    setCountryDelivery("");

    // Resetear estados de errores
    setDocumentTypeError(null);
    setDocumentNumberError(null);
    setFirstNameError(null);
    setEmailError(null);
    setConfirmEmailError(null);
    setPhoneNumberError(null);
    setErrorPhoneCodeForm(null);
    setAddressError(null);
    setCityError(null);
    setStateError(null);
    setCountryError(null);
    setIsActiveError(null);

    // Resetear errores paso 2
    setSelectedPlanError(null);
    setSelectedComboError(null);
    setSelectedMaterialError(null);
    setSelectedCustomizationError(null);
    setSelectedColorError(null);

    // Resetear errores de entrega
    setDeliveryFirstNameError("");
    setDeliveryLastNameError("");
    setDeliveryIdTypeError("");
    setDeliveryIdNumberError("");
    setDeliveryPhoneNumberError("");
    setDeliveryEmailError("");
    setAddressDeliveryError("");
    setShippingCountryError(null);
    setShippingCityError(null);
    setShippingStateError(null);
    setPostalCodeError(null);

    // Resetear errores de pago
    setCardNumberError(null);
    setCvcError(null);
    setExpMonthError(null);
    setExpYearError(null);
    setCardHolderError(null);
    setTermsError(null);

    // Restablecer modal y tokens relacionados
    setIsModalOpen(false);
    setAcceptanceToken("");
    setPersonalAuthToken("");
    setIsAccepted(false);
    setError("");
    setCardInfo({
      number: "",
      cvc: "",
      exp_month: "",
      exp_year: "",
      card_holder: "",
      installments: "",
      idType: "",
      idNumber: "",
    });

    setRowId(null);
    setIsExistingUser(false);

    // Resetear el paso actual
    setStep(1);
  };

  const dataRegisterHandle = async (isPay: boolean) => {
    try {
      if (isPay === false) {
        if (!validateFormStepTwo()) return;
        if (!validateFormStepThird()) return;
        if (!validateFormStepFour()) return;
        setLoading(true);
      }

      const documentRefUser: any = getDocumentReference("subscriptions");
      const createdAt = moment().format();
      const trimmedDocumentNumber = documentNumber.trim();
      const trimmedEmail = email.trim().toLowerCase();
      const trimmedPhone = phoneNumber.trim();

      const dataSend = {
        created: createdAt,
        documentType,
        dni: trimmedDocumentNumber,
        firstName,
        lastName,
        email: trimmedEmail,
        indicative: phoneCode,
        phone: trimmedPhone,
        address,
        city,
        state,
        country,
        isActive,
        idDistributor: data?.uid,
        //cardName: customName || '',
        //cardRole: customRole || '',
        plan: selectedPlan?.name || "",
      };

      // Verificar si el usuario ya existe
      const { exists } = await checkUserExists(
        trimmedDocumentNumber,
        trimmedEmail,
        trimmedPhone
      );

      if (exists && !isExistingUser) {
        setIsSubmitting(false);
        return;
      }

      if (isExistingUser) {
        const updatedUserData: any = { ...dataSend };

        delete updatedUserData.created;

        if (dataUserExist && dataUserExist?.plan != selectedPlan) {
          await updateSubscriptionFieldByUserId(rowId, selectedPlan)
        }

        rowId && await UpdateUserDataQuery(updatedUserData, rowId);


        // Crear y guardar la orden
        const orderData = await registerOrderData(rowId, isPay, false);
        await saveOrderQuerie(orderData);

        // Crear y guardar la factura
        const invoiceData = {
          ...prepareInvoiceData(
            orderData?.uid,
            orderData?.secuencialId,
            rowId,
            isPay
          ),
          paymentDate: createdAt,
        };

        await saveInvoiceQuerie(invoiceData);

        setIsModalOpen(false);
        setLoading(false);

        if (isPay === true) {
          await Swal.fire({
            position: "center",
            icon: "success",
            title: `Transacción realizada con éxito`,
            showConfirmButton: false,
            timer: 2000,
          });
        } else {
          await Swal.fire({
            position: "center",
            icon: "success",
            title: `Usuario actualizado con éxito y orden generada`,
            showConfirmButton: false,
            timer: 2000,
          });
        }

        handleReset();
        handleReturnForm();

      } else {
        // Registrar usuario en la base de datos
        const result = await registerUserAuth({
          user: trimmedEmail,
          password: trimmedDocumentNumber,
        });

        const combinedData = {
          ...result,
          ...dataSend,
          subscriptionId: documentRefUser.id,
        };

        const dataUser = await registerUserFb({ data: combinedData });
        const nextYearDate = moment().add(1, 'year').format();

        const dataSendSubscriptions = {
          userUid: dataUser?.uid,
          created_at: createdAt,
          status: 'Active',
          nextPaymentDate: nextYearDate,
          uid: documentRefUser.id,
        };

        // Crear y guardar la suscripción
        await saveSubscriptionQuerie(dataSendSubscriptions);

        // Crear y guardar la orden
        const orderData = await registerOrderData(result?.uid, isPay, true);
        await saveOrderQuerie(orderData);

        // Crear y guardar la factura
        const invoiceData = {
          ...prepareInvoiceData(
            orderData?.uid,
            orderData?.secuencialId,
            result?.uid,
            isPay
          ),
          paymentDate: createdAt,
          cardName: customName || '',
          cardRole: customRole || '',
        };

        await saveInvoiceQuerie(invoiceData);
        setIsModalOpen(false);
        setLoading(false);

        if (isPay === true) {
          await Swal.fire({
            position: "center",
            icon: "success",
            title: `Transacción realizada con éxito`,
            showConfirmButton: false,
            timer: 2000,
          });
        } else {
          await Swal.fire({
            position: "center",
            icon: "success",
            title: `Usuario registrado con éxito`,
            showConfirmButton: false,
            timer: 2000,
          });
        }

        handleReset();
        handleReturnForm();
      }

    } catch (error) {
      //console.log("Error al registrar al cliente");
    } finally {
      setFlag(!flag);
      setIsSubmitting(false);
    }
  };

  // Función para preparar los datos de la orden
  const registerOrderData = async (userUid: any, isPay: boolean, isMain: boolean) => {
    const documentRefUser: any = getDocumentReference("orders");
    const lastOrder: any = await getLastOrder();

    let newSecuencialId = 'No. OC 1';
    if (lastOrder && lastOrder.secuencialId) {
      const match = lastOrder.secuencialId.match(/^No. OC (\d+)$/);
      if (match) {
        const lastNumber = parseInt(match[1], 10);
        const nextNumber = lastNumber + 1;
        newSecuencialId = `No. OC ${nextNumber}`;
      }
    }

    const totalAmount = total;
    return {
      //orderId,
      uid: documentRefUser.id,
      userId: documentNumber.trim(),
      totalAmount,
      status: isPay === true ? "APPROVED" : "PENDING",
      createdAt: moment().format(),
      paymentDate: isPay === true ? moment().format() : "",
      selectedProducts,
      // Datos de envío
      deliveryFirstName,
      deliveryLastName,
      deliveryIdType,
      deliveryIdNumber,
      deliveryPhoneNumber,
      deliveryEmail,
      addressDelivery,
      cityDelivery,
      stateDelivery,
      countryDelivery,
      postalCode,
      userUid: userUid,
      secuencialId: newSecuencialId,
      cardName: customName || '',
      cardRole: customRole || '',
      isMainOrder: isMain,
      selectedCombo: selectedCombo,
      selectedPlan: selectedPlan,
      selectedMaterial,
      selectedCustomization,
      selectedColor,
    };
  };

  // Función para preparar los datos de la factura
  const prepareInvoiceData = (orderId: any, secuencialId: any, userUid: any, isPay: Boolean) => {
    const documentRefUser: any = getDocumentReference("invoices");
    return {
      //invoiceId,
      uid: documentRefUser.id,
      orderId,
      secuencialId,
      userId: documentNumber.trim(),
      totalAmount: total,
      status: isPay === true ? "PAID" : "PENDING",
      TicketNumber: "Wompi",
      userUid: userUid,
    };
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsAccepted(false);
    setError("");
    setCardNumberError(null);
    setCvcError(null);
    setExpMonthError(null);
    setExpYearError(null);
    setCardHolderError(null);
    setTermsError(null);
    setInstallmentsError(null);
    setIdTypeError(null);
    setIdNumberError(null);

    setCardInfo({
      number: "",
      cvc: "",
      exp_month: "",
      exp_year: "",
      card_holder: "",
      installments: "",
      idType: "",
      idNumber: "",
    });
  };

  const handleOpenModal = () => {
    if (!validateFormStepFour()) return;
    setIsModalOpen(true);
  };

  //Consumo api para obtner los tokens de aceptacion
  const handleAccept = async () => {
    setIsAccepted(!isAccepted);
    if (!isAccepted) {
      try {
        const response = await axios.get(
          `https://sandbox.wompi.co/v1/merchants/${wompiConfig?.WOMPI_PUBLIC_KEY}`
        );
        const { acceptance_token, accept_personal_auth } =
          response.data.data.presigned_acceptance;

        setAcceptanceToken(acceptance_token);
        setPersonalAuthToken(accept_personal_auth);
        setError("");
      } catch (error) {
        console.error("Error al obtener los tokens de aceptación:", error);
        setError(
          "Error al obtener los tokens de aceptación. Intenta nuevamente."
        );
      }
    }
  };

  // Función para tokenizar la tarjeta
  const tokenizeCard = async (cardDetails: any) => {
    const tokenResponse = await axios.post(
      "https://sandbox.wompi.co/v1/tokens/cards",
      cardDetails,
      {
        headers: {
          Authorization: `Bearer ${wompiConfig?.WOMPI_PUBLIC_KEY}`,
        },
      }
    );
    return tokenResponse.data.data.id;
  };

  // Función para crear la transacción
  const createTransaction = async (transactionBody: any) => {
    const transactionResponse = await axios.post(
      "https://sandbox.wompi.co/v1/transactions",
      transactionBody,
      {
        headers: {
          Authorization: `Bearer ${wompiConfig?.WOMPI_PUBLIC_KEY}`,
        },
      }
    );
    return transactionResponse.data;
  };

  // Función principal para manejar el pago
  const handlePayment = async () => {
    if (!validateFormStepTwo()) return;
    if (!validateFormStepThird()) return;
    if (!validateFormStepFour()) return;
    if (!validateFormPayment()) return;

    setLoading(true);

    try {
      const formattedData = {
        number: cardInfo.number,
        cvc: cardInfo.cvc,
        exp_month: String(cardInfo.exp_month).padStart(2, "0"),
        exp_year: String(cardInfo.exp_year).slice(-2),
        card_holder: cardInfo.card_holder,
      };

      const token = await tokenizeCard(formattedData);
      const reference = generatePaymentReference(documentNumber);
      const amout = totalSavings * 100;
      const transactionBody = {
        amount_in_cents: amout,
        reference: reference,
        currency: "COP",
        customer_email: email ?? "cliente@example.com",
        acceptance_token: acceptanceToken,
        payment_method: {
          type: "CARD",
          installments: cardInfo.installments,
          token: token,
        },
      };

      // Crear la transacción
      const transactionResponse = await createTransaction(transactionBody);
      checkPaymentStatus(transactionResponse.data.id);
    } catch (error) {
      setIsModalOpen(false);
      setLoading(false);
      await Swal.fire({
        position: "center",
        icon: "error",
        title: "Error en el pago",
        text: "Ocurrió un error al procesar el pago. Por favor, intenta de nuevo.",
        showConfirmButton: true,
      });
    }
  };

  const checkPaymentStatus = async (transactionId: any) => {
    const maxAttempts = 10; // Número máximo de intentos
    const interval = 5000; // Tiempo entre intentos en milisegundos
    let attempts = 0;

    return new Promise<void>((resolve, reject) => {
      const intervalId = setInterval(async () => {
        attempts += 1;

        try {
          const response = await fetch(
            `https://sandbox.wompi.co/v1/transactions/${transactionId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${wompiConfig?.WOMPI_PUBLIC_KEY}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error("Error al consultar el estado del pago");
          }

          const result = await response.json();
          const status = result.data.status;

          if (status === "APPROVED") {
            clearInterval(intervalId);
            //setIsModalOpen(false);
            //setLoading(false);
            await dataRegisterHandle(true);
            resolve();
          } else if (attempts >= maxAttempts) {
            setLoading(false);
            clearInterval(intervalId);
            await Swal.fire({
              position: "center",
              icon: "error",
              title: "Verificación fallida",
              text: "No se pudo confirmar el estado del pago. Por favor, intenta más tarde.",
              showConfirmButton: true,
            });
            reject(
              new Error(
                "No se pudo confirmar el estado del pago después de varios intentos."
              )
            );
          }
        } catch (error) {
          clearInterval(intervalId);
          setLoading(false);
          console.error("Error en la verificación del estado del pago:", error);
          reject(error);
        }
      }, interval);
    });
  };

  const handleChangeCountry = async (e: any) => {
    try {
      const value = e.target.value;
      setCountry(value);
      const departmentsData = await colombianCitiesData;
      setState("");
      setDepartments(departmentsData);
      setCities([]);
      setCity("");
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
  };

  const handleChangeCountryDelivery = async (e: any) => {
    try {
      const value = e.target.value;
      setCountryDelivery(value);
      const departmentsData = await colombianCitiesData;
      setStateDelivery("");
      setDepartmentsDelivery(departmentsData);
      setCitiesDelivery([]);
      setCityDelivery("");
    } catch (error) {
      console.error("Error al cambiar el país:", error);
    }
  };

  const handleChangeDepartamentDelivery = async (e: any) => {
    try {
      const value = e.target.value;
      setStateDelivery(value);

      const filteredCitiesData = colombianCitiesData.find(
        (departamento) => departamento.departamento === value
      );

      const cities = filteredCitiesData ? filteredCitiesData.ciudades : [];
      setCitiesDelivery(cities);
    } catch (error) {
      console.error("Error al cambiar el departamento:", error);
    }
  };

  const handleChangeCityDelivery = async (e: any) => {
    const value = e.target.value;
    setCityDelivery(value);
  };

  // Función para actualizar el total según el plan
  const updatePlan = (value: any) => {

    if (!value) {
      setSelectedCombo(null);
      return;
    }
    const dataPlan = dataPlans?.find((plan) => plan.sku === value.sku);
    const category = data?.category;
    let newTotal = 0;

    if (
      category &&
      dataPlan?.prices_matrix &&
      category in dataPlan.prices_matrix
    ) {
      const discountPercentage = dataPlan.prices_matrix[category];
      const fullPrice = dataPlan?.full_price ?? 0;
      const discountAmount = fullPrice * (parseFloat(discountPercentage) / 100);
      newTotal += fullPrice - discountAmount;
      const updatedPlan = { ...value, finalPrice: newTotal };
      setSelectedCombo(updatedPlan);
    } else {
      console.error("Invalid category or prices_matrix for material");
    }
  };

  /*   const updateDefaultPlan = (value: string) => {
      const selectedPlanObject = defaultPlans && defaultPlans.find(plan => plan.id === value);
      if (!selectedPlanObject) return;
  
      if (dataUserExist) {
        if (dataUserExist.plan !== selectedPlanObject.name) {
          setIsChangePlan(true);
        } else {
          setIsChangePlan(false);
          setSelectedMaterial('')
          setSelectedColor('')
          setCustomName('')
          setCustomRole('')
        }
      } else {
        setIsChangePlan(true);
      }
  
      setSelectedPlan(selectedPlanObject);
    }; */

  const updateDefaultPlan = (value: string) => {
    const selectedPlanObject = defaultPlans?.find(plan => plan.id === value);
    if (!selectedPlanObject) return;

    if (dataUserExist) {
      if (dataUserExist.plan !== selectedPlanObject.name) {
        setIsChangePlan(true);
      } else {
        setIsChangePlan(false);
        setSelectedMaterial('');
        setSelectedColor('');
        setCustomName('');
        setCustomRole('');
      }
    } else {
      setIsChangePlan(true);
    }

    // Aplicar lógica de descuento por categoría
    const category = data?.category;
    let newTotal = 0;

    if (
      category &&
      selectedPlanObject?.prices_matrix &&
      category in selectedPlanObject.prices_matrix
    ) {
      const discountPercentage = selectedPlanObject.prices_matrix[category];
      const fullPrice = selectedPlanObject?.price ?? 0;
      const discountAmount = fullPrice * (parseFloat(discountPercentage) / 100);
      newTotal = fullPrice - discountAmount;
      const updatedPlan = { ...selectedPlanObject, finalPrice: newTotal };
      setSelectedPlan(updatedPlan);
    } else {
      console.error("Invalid category or prices_matrix for default plan");
    }
  };

  // Función para actualizar el total según el Material
  const updateMaterial = (value: any) => {
    const dataPlan = dataMaterials?.find((plan) => plan.sku === value.sku);
    const category = data?.category;
    let newTotal = 0;

    // Verificar que category exista y que prices_matrix tenga esa propiedad
    if (
      category &&
      dataPlan?.prices_matrix &&
      category in dataPlan.prices_matrix
    ) {
      const discountPercentage = dataPlan.prices_matrix[category];
      const fullPrice = dataPlan?.full_price ?? 0;
      const discountAmount = fullPrice * (parseFloat(discountPercentage) / 100);
      newTotal += fullPrice - discountAmount;
      const updatedMaterial = { ...value, finalPrice: newTotal };

      const filteredColors = dataColors?.filter((color) =>
        color.selectedMaterials?.some(
          (material: any) => material.sku === value.sku
        )
      );

      setFilteredColors(filteredColors ?? []);
      setSelectedMaterial(updatedMaterial);
    } else {
      console.error("Invalid category or prices_matrix");
    }
  };

  // Función para actualizar el total según el Color
  const updateColor = (value: any) => {
    setSelectedColor(value);
  };

  // Función para actualizar el total según el Personalización
  const updateCustomization = (value: any) => {
    if (value) {
      const dataPlan = dataCustomizations?.find(
        (plan) => plan.selectedArticle === selectedCombo.uid
      );

      const category = data?.category;
      let newTotal = 0;

      // Verificar que category exista y que prices_matrix tenga esa propiedad
      if (
        category &&
        dataPlan?.prices_matrix &&
        category in dataPlan.prices_matrix
      ) {
        const discountPercentage = dataPlan.prices_matrix[category];
        const fullPrice = dataPlan?.full_price ?? 0;
        const discountAmount = fullPrice * (parseFloat(discountPercentage) / 100);
        newTotal += fullPrice - discountAmount;
        const updatedCustomization = { ...dataPlan, finalPrice: newTotal };

        setCustomization(!customization);
        setSelectedCustomization(updatedCustomization);
      } else {
        console.error("Invalid category or prices_matrix");
      }
    } else {
      setSelectedCustomization(null);
      setCustomization(!customization);
    }
  };

  const handleAddProduct = () => {
    const productAux = dataProducts?.find((p: Products) => p.sku === product);

    const category = data?.category;

    if (!productAux) {
      return;
    }

    if (selectedProducts.some((p) => p.sku === product)) {
      return;
    }

    if (
      category &&
      productAux?.prices_matrix &&
      category in productAux.prices_matrix
    ) {
      const dataCustom = dataCustomizations?.find(
        (personalization) => personalization.selectedArticle === productAux.uid
      );
      const fullPrice = productAux?.full_price ?? 0;
      const discountPercentage = productAux.prices_matrix[category];
      const discountAmount = fullPrice * (parseFloat(discountPercentage) / 100);
      const finalPrice = fullPrice - discountAmount;
      const productWithQuantity = {
        ...productAux,
        quantity: 1,
        categoryPrice: finalPrice,
        hasPersonalization: false,
        customName: "",
        customRole: "",
        customStatus: dataCustom ? true : false,
      };

      setSelectedProducts([...selectedProducts, productWithQuantity]);
      setProduct("");
    } else {
      console.error(
        "Categoría inválida o falta la matriz de precios en el plan"
      );
    }
  };

  const togglePersonalization = (index: any) => {
    const updatedProducts = [...selectedProducts];
    updatedProducts[index].hasPersonalization =
      !updatedProducts[index].hasPersonalization;
    let newDiscountTotal = 0;

    const dataPlan = dataCustomizations?.find(
      (personalization) =>
        personalization.selectedArticle === updatedProducts[index].uid
    );
    const category = data?.category;

    if (
      category &&
      dataPlan?.prices_matrix &&
      category in dataPlan.prices_matrix
    ) {
      const fullPrice = Number(dataPlan?.full_price) || 0;
      const discountPercentage = dataPlan.prices_matrix[category];
      const discountAmount = fullPrice * (parseFloat(discountPercentage) / 100);
      newDiscountTotal += fullPrice - discountAmount;

      updatedProducts[index].full_price_custom = fullPrice;
      updatedProducts[index].full_price_Discount = newDiscountTotal;
    } else {
      updatedProducts[index].full_price_custom = 0;
      updatedProducts[index].full_price_Discount = 0;
    }
    setSelectedProducts(updatedProducts);
  };

  const handlePersonalizationChange = (index: any, name: any, value: any) => {
    const updatedProducts = [...selectedProducts];
    updatedProducts[index] = {
      ...updatedProducts[index],
      [name]: value,
    };
    setSelectedProducts(updatedProducts);
  };

  const handleRemoveProduct = (indexToRemove: any) => {
    setSelectedProducts((prevProducts) =>
      prevProducts.filter((_, index) => index !== indexToRemove)
    );
  };

  const clearSelectedPlan = () => {
    setSelectedCombo("");
    clearSelectedCustomization();
  };

  const clearSelectedMaterial = () => {
    setSelectedMaterial("");
  };

  const clearSelectedCustomization = () => {
    setSelectedCustomization("");
    setCustomName("");
    setCustomRole("");
    setCustomization(false);
  };

  const handleChangeQuantity = (index: number, newQuantity: number) => {
    if (!data) {
      return; // Sal de la función si "data" es null o undefined
    }

    setSelectedProducts((prevProducts) => {
      const updatedProducts = [...prevProducts];
      const product = updatedProducts[index];

      const categoryDiscountPercentage = data.category
        ? parseFloat(product.prices_matrix[data.category] || "0")
        : 0;

      const fullPrice = product.full_price || 0;
      const discountAmount = fullPrice * (categoryDiscountPercentage / 100);

      // Calcular precios actualizados con la nueva cantidad
      const salePrice = fullPrice * newQuantity;
      const distributorPrice = (fullPrice - discountAmount) * newQuantity;

      updatedProducts[index] = {
        ...product,
        quantity: newQuantity,
        totalPrice: salePrice,
        categoryPrice: distributorPrice,
      };

      return updatedProducts;
    });
  };

  const formatPrice = (value: any) => {
    if (value == null || isNaN(value)) return "";
    const number = Number(value);
    return new Intl.NumberFormat("es-CO", {
      style: "decimal",
      minimumFractionDigits: 0,
    }).format(number);
  };

  const getDataUserExist = async (id: any) => {
    setIsExistingUser(true);
    setStep(1);
    const userData: any = await getUserById(id.trim());
    setDataUserExist(userData)
    await fillUserData(userData);
    await fillDeliveryData(userData);
  }

  useEffect(() => {
    if (userId) {
      getDataUserExist(userId);
    }
  }, [userId, defaultPlans]);

  useEffect(() => {
    if (dataProducts) {
      const filteredProducts = dataProducts.filter((product: Products) => {
        // Verifica que el producto no esté seleccionado
        const isNotAlreadySelected = !selectedProducts.some(
          (selectedProduct: Products) => selectedProduct.sku === product.sku
        );

        return product.status === true && isNotAlreadySelected;
      });

      setFilteredProducts(filteredProducts);
    }
  }, [dataProducts, selectedProducts]);

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
      if (countriesDelivery.length === 0) {
        const Countries = await countriesTable;
        setCountriesDelivery(Countries);
      }
    };
    fetchData();
  }, [countriesDelivery]);

  useEffect(() => {
    let newTotal = 0;
    let newDiscountTotal = 0;

    // Calcular el precio del plan seleccionado
    /*     if (isChangePlan && selectedPlan) {
          const dataPlan = defaultPlans?.find((plan) => plan.id === selectedPlan.id);
          const fullPrice = Number(dataPlan?.price) || 0;
          newDiscountTotal += fullPrice;
          newTotal += fullPrice;
        } */

    // Calcular el default-plan del combo seleccionado
    if (isChangePlan && selectedPlan) {
      const dataPlan = defaultPlans?.find((plan) => plan.uid === selectedPlan.uid);
      const category = data?.category;

      if (
        category &&
        dataPlan?.prices_matrix &&
        category in dataPlan.prices_matrix
      ) {
        const fullPrice = Number(dataPlan?.price) || 0;
        const discountPercentage = dataPlan.prices_matrix[category];
        const discountAmount =
          fullPrice * (parseFloat(discountPercentage) / 100);
        newDiscountTotal += fullPrice - discountAmount;
        newTotal += fullPrice;
      } else {
        console.error("Invalid category or prices_matrix for plan");
      }
    }

    // Calcular el precio del combo seleccionado
    if (selectedCombo) {
      const dataPlan = dataPlans?.find((plan) => plan.sku === selectedCombo.sku);
      const category = data?.category;

      if (
        category &&
        dataPlan?.prices_matrix &&
        category in dataPlan.prices_matrix
      ) {
        const fullPrice = Number(dataPlan?.full_price) || 0;
        const discountPercentage = dataPlan.prices_matrix[category];
        const discountAmount =
          fullPrice * (parseFloat(discountPercentage) / 100);
        newDiscountTotal += fullPrice - discountAmount;
        newTotal += fullPrice;
      } else {
        console.error("Invalid category or prices_matrix for plan");
      }
    }

    // Calcular el precio del material seleccionado
    if (selectedMaterial) {
      const dataPlan = dataMaterials?.find(
        (plan) => plan.sku === selectedMaterial.sku
      );
      const category = data?.category;

      if (
        category &&
        dataPlan?.prices_matrix &&
        category in dataPlan.prices_matrix
      ) {
        const fullPrice = Number(dataPlan?.full_price) || 0;
        const discountPercentage = dataPlan.prices_matrix[category];
        const discountAmount =
          fullPrice * (parseFloat(discountPercentage) / 100);
        newDiscountTotal += fullPrice - discountAmount;
        newTotal += fullPrice;
      } else {
        console.error("Invalid category or prices_matrix for material");
      }
    }

    // Calcular el precio de la personalización seleccionada
    if (selectedCustomization) {
      const dataPlan = dataCustomizations?.find(
        (plan) => plan.sku === selectedCustomization.sku
      );
      const category = data?.category;

      if (
        category &&
        dataPlan?.prices_matrix &&
        category in dataPlan.prices_matrix
      ) {
        const fullPrice = Number(dataPlan?.full_price) || 0;
        const discountPercentage = dataPlan.prices_matrix[category];
        const discountAmount =
          fullPrice * (parseFloat(discountPercentage) / 100);
        newDiscountTotal += fullPrice - discountAmount;
        newTotal += fullPrice;
      } else {
        console.error("Invalid category or prices_matrix for customization");
      }
    }

    // Calcular el precio de los productos seleccionados
    selectedProducts.forEach((product) => {
      const category = data?.category;
      let personalizationTotal = 0;
      let totalDiscountPersonalization = 0;

      if (
        category &&
        product?.prices_matrix &&
        category in product.prices_matrix &&
        dataCustomizations
      ) {
        const hasPersonalization = product?.hasPersonalization;

        if (hasPersonalization) {
          const dataPlan = dataCustomizations?.find(
            (personalization) => personalization.selectedArticle === product.uid
          );
          personalizationTotal = Number(dataPlan?.full_price || 0);
          const discountPercentageCustom = parseFloat(
            dataPlan?.prices_matrix[category] || 0
          );
          const discountPersonalization =
            personalizationTotal * (discountPercentageCustom / 100);
          totalDiscountPersonalization =
            personalizationTotal - discountPersonalization;
        }

        const discountPercentage = parseFloat(
          product.prices_matrix[category] || 0
        );
        const fullPrice = Number(product?.full_price) || 0;
        const discountAmount = fullPrice * (discountPercentage / 100);
        const productTotal = fullPrice * (product.quantity || 1);

        newDiscountTotal +=
          (fullPrice - discountAmount) * (product.quantity || 1) +
          totalDiscountPersonalization;
        newTotal += productTotal + personalizationTotal;
      } else {
        console.error("Invalid category or prices_matrix for customization");
      }
    });

    setTotal(newTotal);
    setTotalSavings(newDiscountTotal);
  }, [selectedCombo, selectedPlan, selectedMaterial, selectedCustomization, selectedProducts, dataPlans, data?.category, dataMaterials, dataCustomizations, defaultPlans, isChangePlan]);

  return {
    documentType,
    setDocumentType,
    documentNumber,
    setDocumentNumber,
    firstName,
    lastName,
    setFirstName,
    setLastName,
    email,
    setEmail,
    confirmEmail,
    setConfirmEmail,
    phoneNumber,
    setPhoneNumber,
    phoneCode,
    setPhoneCode,
    address,
    setAddress,
    city,
    state,
    country,
    isActive,
    setIsActive,
    countries,
    departments,
    cities,
    step,
    setStep,
    //Paso 2
    selectedPlan,
    setSelectedPlan,
    selectedCombo,
    setSelectedCombo,
    selectedMaterial,
    setSelectedMaterial,
    selectedColor,
    setSelectedColor,
    customization,
    setCustomization,

    customName,
    setCustomName,
    customRole,
    setCustomRole,

    selectedCustomization,
    setSelectedCustomization,
    total,
    totalSavings,
    setTotal,
    updatePlan,
    updateMaterial,
    updateColor,
    updateCustomization,
    product,
    setProduct,
    handleAddProduct,
    handlePersonalizationChange,
    togglePersonalization,
    handleRemoveProduct,
    clearSelectedPlan,
    clearSelectedMaterial,
    clearSelectedCustomization,
    selectedProducts,
    setSelectedProducts,
    filteredProducts,
    selectedPlanError,
    setSelectedPlanError,
    selectedComboError,
    selectedMaterialError,
    selectedCustomizationError,
    selectedColorError,
    customNameError,
    customRoleError,
    //Paso 3
    handleChangeQuantity,
    errorMessages,
    //Paso4

    //Errores
    documentTypeError,
    documentNumberError,
    firstNameError,
    lastNameError,
    emailError,
    confirmEmailError,
    phoneNumberError,
    errorPhoneCodeForm,
    addressError,
    cityError,
    stateError,
    countryError,
    isActiveError,
    handleChangeCountry,
    handleChangeDepartament,
    handleChangeCity,
    handleNextStep,
    dataPlans:
      dataPlans && dataPlans.sort((a, b) => a.name.localeCompare(b.name)),
    dataMaterials:
      dataMaterials &&
      dataMaterials.sort((a, b) => a.name.localeCompare(b.name)),
    dataCustomizations:
      dataCustomizations &&
      dataCustomizations.sort((a, b) =>
        a.created_at.localeCompare(b.created_at)
      ),
    dataColors:
      filteredColors &&
      filteredColors.sort((a, b) => a.name.localeCompare(b.name)),
    dataProducts:
      dataProducts && dataProducts.sort((a, b) => a.name.localeCompare(b.name)),
    formatPrice,
    // Paso 4
    cardNumber,
    setCardNumber,
    expiryDate,
    setExpiryDate,
    cvv,
    setCvv,

    deliveryFirstName,
    setDeliveryFirstName,
    deliveryLastName,
    setDeliveryLastName,
    deliveryIdType,
    setDeliveryIdType,
    deliveryIdNumber,
    setDeliveryIdNumber,
    deliveryPhoneNumber,
    setDeliveryPhoneNumber,
    deliveryEmail,
    setDeliveryEmail,
    postalCode,
    setPostalCode,
    //Errores Paso 4
    cardNumberError,
    setCardNumberError,
    cvcError,
    setCvcError,
    expMonthError,
    setExpMonthError,
    expYearError,
    setExpYearError,
    cardHolderError,
    setCardHolderError,
    termsError,
    setTermsError,
    deliveryFirstNameError,
    setDeliveryFirstNameError,
    deliveryLastNameError,
    setDeliveryLastNameError,
    deliveryIdTypeError,
    setDeliveryIdTypeError,
    deliveryIdNumberError,
    setDeliveryIdNumberError,
    deliveryPhoneNumberError,
    setDeliveryPhoneNumberError,
    deliveryEmailError,
    setDeliveryEmailError,
    shippingCountryError,
    setShippingCountryError,
    shippingCityError,
    setShippingCityError,
    shippingStateError,
    setShippingStateError,
    postalCodeError,
    setPostalCodeError,
    dataRegisterHandle,
    handleChangeCountryDelivery,
    handleChangeDepartamentDelivery,
    handleChangeCityDelivery,
    countriesDelivery,
    departmentsDelivery,
    citiesDelivery,
    cityDelivery,
    setCityDelivery,
    stateDelivery,
    setStateDelivery,
    countryDelivery,
    setCountryDelivery,
    addressDelivery,
    setAddressDelivery,
    data,
    addressDeliveryError,
    handleAccept,
    error,
    isAccepted,
    handleInputChange,
    cardInfo,
    handlePayment,
    isModalOpen,
    setIsModalOpen,
    handleCloseModal,
    handleOpenModal,
    loading,
    installmentsError,
    setInstallmentsError,
    idTypeError,
    setIdTypeError,
    idNumberError,
    setIdNumberError,
    isChangePlan,
    isExistingUser,
    defaultPlans,
    updateDefaultPlan
  };
};

export default CustomersCreateFormHook;
