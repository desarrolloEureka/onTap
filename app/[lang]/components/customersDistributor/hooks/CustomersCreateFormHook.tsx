import { useEffect, useState } from 'react';
import { Country } from '@/components/countries/hooks/CountriesHook';
import { countriesTable } from '@/types/formConstant';
import { Department } from '@/components/departments/hooks/DepartmentsHook';
import { colombianCitiesData } from '@/types/colombianCitiesData';
import { GetAllColors, GetAllCustomizations, GetAllMaterials, GetAllPlanesIndividual, GetAllProducts } from '@/reactQuery/home';
import { checkUserExists, GetUser } from '@/reactQuery/users';
import { Colors, Products } from '@/types/home';
import moment from 'moment';
import Swal from 'sweetalert2';
import { registerUserFb } from 'app/functions/register';

type City = string;

const CustomersCreateFormHook = () => {
    const { data, refetch } = GetUser();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [countries, setCountries] = useState<Country[]>([]);
    const [departments, setDepartments] = useState<Department[]>([]);
    const [cities, setCities] = useState<City[]>([]);
    const [step, setStep] = useState(1);
    const [flag, setFlag] = useState(false);
    const { data: dataPlans } = GetAllPlanesIndividual(flag);
    const { data: dataMaterials } = GetAllMaterials(flag);
    const { data: dataCustomizations } = GetAllCustomizations(flag);
    const { data: dataColors } = GetAllColors(flag);
    const { data: dataProducts } = GetAllProducts(flag);
    const [filteredColors, setFilteredColors] = useState<Colors[]>([]);

    //Datos distribuidor paso 1
    const [documentType, setDocumentType] = useState<string>('');
    const [documentNumber, setDocumentNumber] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [confirmEmail, setConfirmEmail] = useState<string>('');
    const [phoneCode, setPhoneCode] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [state, setState] = useState<string>('');
    const [country, setCountry] = useState<string>('');
    const [isActive, setIsActive] = useState<boolean>(true);

    //Datos Paso 2
    const [selectedPlan, setSelectedPlan] = useState<string | any>('');
    const [selectedMaterial, setSelectedMaterial] = useState<string | any>('');
    const [selectedCustomization, setSelectedCustomization] = useState<any>('');
    const [selectedColor, setSelectedColor] = useState<string>('');
    const [customization, setCustomization] = useState<boolean>(false);
    const [customName, setCustomName] = useState<string>('');
    const [customRole, setCustomRole] = useState<string>('');
    const [total, setTotal] = useState(0);
    const [totalSavings, setTotalSavings] = useState(0);
    const [selectedProducts, setSelectedProducts] = useState<Products[]>([]);
    const [product, setProduct] = useState('');
    const [filteredProducts, setFilteredProducts] = useState<Products[]>([]);

    //Datos Paso 5
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [deliveryFirstName, setDeliveryFirstName] = useState('');
    const [deliveryLastName, setDeliveryLastName] = useState('');
    const [deliveryIdType, setDeliveryIdType] = useState('');
    const [deliveryIdNumber, setDeliveryIdNumber] = useState('');
    const [deliveryPhoneNumber, setDeliveryPhoneNumber] = useState('');
    const [deliveryEmail, setDeliveryEmail] = useState('');
    const [countriesDelivery, setCountriesDelivery] = useState<Country[]>([]);
    const [departmentsDelivery, setDepartmentsDelivery] = useState<Department[]>([]);
    const [citiesDelivery, setCitiesDelivery] = useState<City[]>([]);
    const [cityDelivery, setCityDelivery] = useState<string>('');
    const [stateDelivery, setStateDelivery] = useState<string>('');
    const [countryDelivery, setCountryDelivery] = useState<string>('');
    const [addressDelivery, setAddressDelivery] = useState<string>('');
    const [postalCode, setPostalCode] = useState('');

    //Errores: 
    const [documentTypeError, setDocumentTypeError] = useState<string | null>(null);
    const [documentNumberError, setDocumentNumberError] = useState<string | null>(null);
    const [firstNameError, setFirstNameError] = useState<string | null>(null);
    const [lastNameError, setLastNameError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [confirmEmailError, setConfirmEmailError] = useState<string | null>(null);
    const [phoneNumberError, setPhoneNumberError] = useState<string | null>(null);
    const [errorPhoneCodeForm, setErrorPhoneCodeForm] = useState<string | null>(null);
    const [addressError, setAddressError] = useState<string | null>(null);
    const [cityError, setCityError] = useState<string | null>(null);
    const [stateError, setStateError] = useState<string | null>(null);
    const [countryError, setCountryError] = useState<string | null>(null);
    const [isActiveError, setIsActiveError] = useState<string | null>(null);

    // Errores Paso 2
    const [selectedPlanError, setSelectedPlanError] = useState<string | null>(null);
    const [selectedMaterialError, setSelectedMaterialError] = useState<string | null>(null);
    const [selectedCustomizationError, setSelectedCustomizationError] = useState<string | null>(null);
    const [selectedColorError, setSelectedColorError] = useState<string | null>(null);
    const [customNameError, setCustomNameError] = useState<string | null>(null);
    const [customRoleError, setCustomRoleError] = useState<string | null>(null);

    //Errores Paso 4
    const [cardNumberError, setCardNumberError] = useState<string | null>(null);
    const [expiryDateError, setExpiryDateError] = useState<string | null>(null);
    const [cvvError, setCvvError] = useState<string | null>(null);
    //
    const [deliveryFirstNameError, setDeliveryFirstNameError] = useState('');
    const [deliveryLastNameError, setDeliveryLastNameError] = useState('');
    const [deliveryIdTypeError, setDeliveryIdTypeError] = useState('');
    const [deliveryIdNumberError, setDeliveryIdNumberError] = useState('');
    const [deliveryPhoneNumberError, setDeliveryPhoneNumberError] = useState('');
    const [deliveryEmailError, setDeliveryEmailError] = useState('');
    //
    const [shippingCountryError, setShippingCountryError] = useState<string | null>(null);
    const [shippingCityError, setShippingCityError] = useState<string | null>(null);
    const [shippingStateError, setShippingStateError] = useState<string | null>(null);
    const [postalCodeError, setPostalCodeError] = useState<string | null>(null);

    const handleNextStep = async (actualStep: any) => {
        if (actualStep === 1) {
            /*   const isValid = await validateForm();
              if (!isValid) return;
              sendNextStepData(); */
            setStep(2);
        } else if (actualStep === 2) {
            //if (!validateFormStepTwo()) return;
            setStep(3);
        } else if (actualStep === 3) {
            setStep(4);
        } else if (actualStep === 4) {
            setStep(5);
        }
    }

    const sendNextStepData = async () => {
        setDeliveryFirstName(firstName);
        setDeliveryLastName(lastName);
        setDeliveryIdType(documentType);
        setDeliveryIdNumber(documentNumber);
        setDeliveryPhoneNumber(phoneNumber);
        setDeliveryEmail(email);
        /*         handleChangeCountryDelivery(country);
                handleChangeDepartamentDelivery(state);
                handleChangeCityDelivery(city); */
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
    }

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
        if (phoneCode.trim() === '') {
            setErrorPhoneCodeForm('El código de teléfono es obligatorio.');
            valid = false;
        } else {
            setErrorPhoneCodeForm(null);
        }

        // Verificar si el usuario ya existe
        const { exists, field } = await checkUserExists(documentNumber.trim(), email.trim(), phoneNumber.trim());
        if (exists) {
            field === 'dni' ?
                setDocumentNumberError('El No. Identificación ya se encuentra registrado.')
                : field === 'email' ?
                    setEmailError('El correo ya se encuentra registrado.')
                    : setPhoneNumberError('El teléfono ya se encuentra registrado.')

            valid = false;
        }

        return valid;
    };

    const validateFormStepTwo = () => {
        let valid = true;

        setSelectedPlanError(null);
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

        // Validar material seleccionado
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
        }

        return valid;
    };

    const validateFormStepFour = () => {
        let valid = true;

        setCardNumberError('');
        setExpiryDateError('');
        setCvvError('');
        setDeliveryFirstNameError('');
        setDeliveryLastNameError('');
        setDeliveryIdTypeError('');
        setDeliveryIdNumberError('');
        setDeliveryPhoneNumberError('');
        setDeliveryEmail('');
        setShippingCountryError('');
        setShippingCityError('');
        setShippingStateError('');
        setPostalCodeError('');

        /*  // Validar número de tarjeta
         if (!cardNumber) {
             setCardNumberError("El número de tarjeta es obligatorio.");
             valid = false;
         } else if (!/^\d{16}$/.test(cardNumber)) {
             setCardNumberError("El número de tarjeta debe tener 16 dígitos.");
             valid = false;
         }
 
         // Validar fecha de expiración
         if (!expiryDate) {
             setExpiryDateError("La fecha de expiración es obligatoria.");
             valid = false;
         } else {
             const [month, year] = expiryDate.split('/').map(num => num.trim());
             const currentDate = new Date();
             const expiry = new Date(Number(`20${year}`), Number(month) - 1); // Conversión a número
 
             if (expiry < currentDate) {
                 setExpiryDateError("La fecha de expiración no puede ser anterior a la fecha actual.");
                 valid = false;
             }
         }
 
         // Validar CVV
         if (!cvv) {
             setCvvError("El CVV es obligatorio.");
             valid = false;
         } else if (!/^\d{3}$/.test(cvv)) {
             setCvvError("El CVV debe tener 3 dígitos.");
             valid = false;
         } */

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
            setDeliveryPhoneNumberError("El número de teléfono debe tener entre 10 y 15 dígitos.");
            valid = false;
        }

        // Validar email del comprador
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!deliveryEmail) {
            setDeliveryEmailError("El correo electrónico del comprador es obligatorio.");
            valid = false;
        } else if (!emailRegex.test(deliveryEmail)) {
            setDeliveryEmailError("El formato del correo electrónico no es válido.");
            valid = false;
        }

        /*         // Validar país de envío
                if (!shippingCountry) {
                    setShippingCountryError("El país de envío es obligatorio.");
                    valid = false;
                }
        
                // Validar ciudad de envío
                if (!shippingCity) {
                    setShippingCityError("La ciudad de envío es obligatoria.");
                    valid = false;
                }
        
                // Validar estado de envío
                if (!shippingState) {
                    setShippingStateError("El estado de envío es obligatorio.");
                    valid = false;
                } */

        // Validar código postal
        if (!postalCode) {
            setPostalCodeError("El código postal es obligatorio.");
            valid = false;
        } else if (!/^\d{5}$/.test(postalCode)) {
            setPostalCodeError("El código postal debe tener 5 dígitos.");
            valid = false;
        }

        return valid;
    };

    const handleReset = () => {
        // Resetear estados de datos del distribuidor paso 1
        setDocumentType('');
        setDocumentNumber('');
        setFirstName('');
        setLastName('');
        setEmail('');
        setConfirmEmail('');
        setPhoneCode('');
        setPhoneNumber('');
        setAddress('');
        setCity('');
        setState('');
        setCountry('');
        setIsActive(true);

        // Resetear estados de datos paso 2
        setSelectedPlan('');
        setSelectedMaterial('');
        setSelectedCustomization('');
        setSelectedColor('');
        setCustomization(false);
        setTotal(0);
        setTotalSavings(0);
        setSelectedProducts([]);
        setProduct('');
        setFilteredProducts([]);

        // Resetear estados de datos paso 4
        setCardNumber('');
        setExpiryDate('');
        setCvv('');
        setDeliveryFirstNameError('');
        setDeliveryLastNameError('');
        setDeliveryIdTypeError('');
        setDeliveryIdNumberError('');
        setDeliveryPhoneNumberError('');
        setDeliveryEmail('');
        /*         setShippingCountry('');
                setShippingCity('');
                setShippingState(''); */
        setPostalCode('');

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
        setSelectedMaterialError(null);
        setSelectedCustomizationError(null);
        setSelectedColorError(null);

        // Resetear errores paso 4
        setCardNumberError(null);
        setExpiryDateError(null);
        setCvvError(null);
        setDeliveryFirstNameError('');
        setDeliveryLastNameError('');
        setDeliveryIdTypeError('');
        setDeliveryIdNumberError('');
        setDeliveryPhoneNumberError('');
        setDeliveryEmail('');
        setShippingCountryError(null);
        setShippingCityError(null);
        setShippingStateError(null);
        setPostalCodeError(null);
        setStep(1);
    };

    const dataRegisterHandle = async () => {
        /*  if (!validateForm()) return;
         if (!validateFormStepTwo()) return;
         if (!validateFormStepFour()) return; */

        try {
            const createdAt = moment().format();
            const trimmedDocumentNumber = documentNumber.trim();
            const trimmedEmail = email.trim().toLowerCase();
            const trimmedPhone = phoneNumber.trim();

            const dataSend = {
                // Datos distribuidor paso 1
                created_at: createdAt,
                documentType,
                documentNumber: trimmedDocumentNumber,
                firstName,
                lastName,
                email: trimmedEmail,
                phoneCode,
                phoneNumber: trimmedPhone,
                address,
                city,
                state,
                country,
                isActive,

                // Datos Paso 2
                selectedPlan,
                selectedMaterial,
                selectedCustomization,
                selectedColor,
                total,
                selectedProducts,

                // Datos Paso 4
                cardNumber,
                expiryDate,
                cvv,
                /* buyerName,
                buyerEmail, */
                /*  shippingCountry,
                 shippingCity,
                 shippingState, */
                postalCode,
            };

            // Verificar si el usuario ya existe
            /* const { exists } = await checkUserExists(trimmedDocumentNumber, trimmedEmail, trimmedPhone);
            if (exists) {
                setIsSubmitting(false);
                return;
            } */

            console.log('dataSend ', dataSend);

            //await registerUserFb({ data: dataSend });

            Swal.fire({
                position: "center",
                icon: "success",
                title: `Usuario registrado con éxito`,
                showConfirmButton: false,
                timer: 2000,
            });
            //handleReset();
        } catch (error) {
            console.log('Error al registrar el plan');
        } finally {
            setFlag(!flag);
            setIsSubmitting(false);
        }
    };

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

    const handleChangeCountryDelivery = async (e: any) => {
        try {
            const value = e.target.value;
            setCountryDelivery(value);
            const departmentsData = await colombianCitiesData;
            setStateDelivery('');
            setDepartmentsDelivery(departmentsData);
            setCitiesDelivery([]);
            setCityDelivery('');
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
    }

    // Función para actualizar el total según el plan
    const updatePlan = (value: any) => {
        const dataPlan = dataPlans?.find(plan => plan.sku === value.sku);
        const category = data?.category;
        let newTotal = 0;

        if (category && dataPlan?.prices_matrix && category in dataPlan.prices_matrix) {
            const discountPercentage = dataPlan.prices_matrix[category];
            const fullPrice = dataPlan?.full_price ?? 0;
            const discountAmount = fullPrice * (parseFloat(discountPercentage) / 100);
            newTotal += fullPrice - discountAmount;
            const updatedPlan = { ...value, finalPrice: newTotal };
            setSelectedPlan(updatedPlan);
        } else {
            console.error('Invalid category or prices_matrix for material');
        }
    };

    // Función para actualizar el total según el Material
    const updateMaterial = (value: any) => {
        const dataPlan = dataMaterials?.find(plan => plan.sku === value.sku);
        const category = data?.category;
        let newTotal = 0;

        // Verificar que category exista y que prices_matrix tenga esa propiedad
        if (category && dataPlan?.prices_matrix && category in dataPlan.prices_matrix) {
            const discountPercentage = dataPlan.prices_matrix[category];
            const fullPrice = dataPlan?.full_price ?? 0;
            const discountAmount = fullPrice * (parseFloat(discountPercentage) / 100);
            newTotal += fullPrice - discountAmount;
            const updatedMaterial = { ...value, finalPrice: newTotal };

            const filteredColors = dataColors?.filter(color =>
                color.selectedMaterials?.some((material: any) => material.sku === value.sku)
            );

            setFilteredColors(filteredColors ?? []);
            setSelectedMaterial(updatedMaterial);
        } else {
            console.error('Invalid category or prices_matrix');
        }
    };

    // Función para actualizar el total según el Color
    const updateColor = (value: any) => {
        setSelectedColor(value);
    };

    // Función para actualizar el total según el Personalización
    const updateCustomization = (value: any) => {

        if (value) {
            const dataPlan = dataCustomizations?.find(plan => plan.selectedArticle === selectedPlan.uid);

            const category = data?.category;
            let newTotal = 0;

            // Verificar que category exista y que prices_matrix tenga esa propiedad
            if (category && dataPlan?.prices_matrix && category in dataPlan.prices_matrix) {
                const discountPercentage = dataPlan.prices_matrix[category];
                const fullPrice = dataPlan?.full_price ?? 0;
                const discountAmount = fullPrice * (parseFloat(discountPercentage) / 100);
                newTotal += fullPrice - discountAmount;
                const updatedCustomization = { ...dataPlan, finalPrice: newTotal };
                setCustomization(!customization)
                setSelectedCustomization(updatedCustomization);
            } else {
                console.error('Invalid category or prices_matrix');
            }
        } else {
            setSelectedCustomization(null);
            setCustomization(!customization)
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

        if (category && productAux?.prices_matrix && category in productAux.prices_matrix) {
            const dataCustom = dataCustomizations?.find(personalization => personalization.selectedArticle === productAux.uid);
            const fullPrice = productAux?.full_price ?? 0;
            const discountPercentage = productAux.prices_matrix[category];
            const discountAmount = fullPrice * (parseFloat(discountPercentage) / 100);
            const finalPrice = fullPrice - discountAmount;
            const productWithQuantity = { ...productAux, quantity: 1, categoryPrice: finalPrice, hasPersonalization: false, customName: '', customRole: '', customStatus: dataCustom ? true : false, };

            setSelectedProducts([...selectedProducts, productWithQuantity]);
            setProduct('');

        } else {
            console.error('Categoría inválida o falta la matriz de precios en el plan');
        }
    };

    const togglePersonalization = (index: any) => {
        const updatedProducts = [...selectedProducts];
        updatedProducts[index].hasPersonalization = !updatedProducts[index].hasPersonalization;
        let newDiscountTotal = 0;

        const dataPlan = dataCustomizations?.find(personalization => personalization.selectedArticle === updatedProducts[index].uid);
        const category = data?.category;

        if (category && dataPlan?.prices_matrix && category in dataPlan.prices_matrix) {
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
        console.log('updatedProducts', updatedProducts);
        setSelectedProducts(updatedProducts);
    };


    const handlePersonalizationChange = (index: any, name: any, value: any) => {
        const updatedProducts = [...selectedProducts];
        updatedProducts[index] = {
            ...updatedProducts[index],
            [name]: value
        };
        setSelectedProducts(updatedProducts);
    };

    const handleRemoveProduct = (indexToRemove: any) => {
        setSelectedProducts((prevProducts) => prevProducts.filter((_, index) => index !== indexToRemove));
    };

    const clearSelectedPlan = () => {
        setSelectedPlan('');
        clearSelectedCustomization();
    };

    const clearSelectedMaterial = () => {
        setSelectedMaterial('');
    };

    const clearSelectedCustomization = () => {
        setSelectedCustomization('');
        setCustomName('');
        setCustomRole('');
        setCustomization(false);
    };

    const handleChangeQuantity = (index: number, newQuantity: number) => {
        const updatedProducts = [...selectedProducts];
        const product = updatedProducts[index];
        const fullPrice = product.full_price;
        const newTotalPrice = fullPrice * newQuantity;

        // Actualizar cantidad y precio total en el objeto del producto
        updatedProducts[index] = {
            ...product,
            quantity: newQuantity,
            totalPrice: newTotalPrice
        };

        setSelectedProducts(updatedProducts);
    };

    const formatPrice = (value: any) => {
        if (value == null || isNaN(value)) return '';
        const number = Number(value);
        return new Intl.NumberFormat('es-CO', {
            style: 'decimal',
            minimumFractionDigits: 0
        }).format(number);
    };

    /*     useEffect(() => {
            if (dataProducts && selectedPlan) {
                // Filtrar productos
                const filteredProducts = dataProducts.filter((product: Products) => {
                    const isInSelectedPlan = selectedPlan.selectedProducts.some((selectedProduct: Products) =>
                        selectedProduct.sku === product.sku
                    );
    
                    // Verifica que el producto no esté seleccionado
                    const isNotAlreadySelected = !selectedProducts.some((selectedProduct: Products) =>
                        selectedProduct.sku === product.sku
                    );
    
                    return product.status === true && isInSelectedPlan && isNotAlreadySelected;
                });
    
                setFilteredProducts(filteredProducts);
            }
        }, [dataProducts, selectedPlan, selectedProducts]); */

    useEffect(() => {
        if (dataProducts) {
            // Filtrar productos
            const filteredProducts = dataProducts.filter((product: Products) => {
                // Verifica que el producto no esté seleccionado
                const isNotAlreadySelected = !selectedProducts.some((selectedProduct: Products) =>
                    selectedProduct.sku === product.sku
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

    /*     useEffect(() => {
            if (selectedPlan) {
                const dataPlan = dataPlans?.find(plan => plan.sku === selectedPlan?.sku);
                const category = data?.category;
    
                if (category && dataPlan?.prices_matrix && category in dataPlan.prices_matrix) {
                    // Calcular el descuento en base al porcentaje
                    const fullPrice = dataPlan?.full_price ?? 0;
                    const discountPercentage = dataPlan.prices_matrix[category];
                    const discountAmount = fullPrice * (parseFloat(discountPercentage) / 100);
                    const finalPrice = fullPrice - discountAmount;
    
                    console.log('fullPrice ', fullPrice);
    
                    // Actualizar el total sumando el precio final del plan seleccionado
                    setTotal(fullPrice);
                } else {
                    console.error('Categoría inválida o falta la matriz de precios en el plan');
                }
            }
        }, [data?.category, dataPlans, selectedPlan]);
    
        useEffect(() => {
            if (selectedMaterial) {
                const dataPlan = dataMaterials?.find(plan => plan.sku === selectedMaterial.sku);
                const category = data?.category;
    
                // Verificar que category exista y que prices_matrix tenga esa propiedad
                if (category && dataPlan?.prices_matrix && category in dataPlan.prices_matrix) {
                    const discountPercentage = dataPlan.prices_matrix[category];
                    const fullPrice = dataPlan?.full_price ?? 0;
                    const discountAmount = fullPrice * (parseFloat(discountPercentage) / 100);
                    const finalPrice = fullPrice - discountAmount;
    
                    // Actualizar el total sumando el precio final del material seleccionado
                    setTotal(prevTotal => prevTotal + finalPrice);
                } else {
                    console.error('Invalid category or prices_matrix', { category, dataPlan });
                }
            }
        }, [selectedMaterial, dataMaterials, data]); */


    useEffect(() => {
        let newTotal = 0;
        let newDiscountTotal = 0;

        // Calcular el precio del plan seleccionado
        if (selectedPlan) {
            const dataPlan = dataPlans?.find(plan => plan.sku === selectedPlan.sku);
            const category = data?.category;

            if (category && dataPlan?.prices_matrix && category in dataPlan.prices_matrix) {
                const fullPrice = Number(dataPlan?.full_price) || 0;
                const discountPercentage = dataPlan.prices_matrix[category];
                const discountAmount = fullPrice * (parseFloat(discountPercentage) / 100);
                newDiscountTotal += fullPrice - discountAmount;
                newTotal += fullPrice;

            } else {
                console.error('Invalid category or prices_matrix for plan');
            }
        }

        // Calcular el precio del material seleccionado
        if (selectedMaterial) {
            const dataPlan = dataMaterials?.find(plan => plan.sku === selectedMaterial.sku);
            const category = data?.category;

            if (category && dataPlan?.prices_matrix && category in dataPlan.prices_matrix) {
                const fullPrice = Number(dataPlan?.full_price) || 0;
                const discountPercentage = dataPlan.prices_matrix[category];
                const discountAmount = fullPrice * (parseFloat(discountPercentage) / 100);
                newDiscountTotal += fullPrice - discountAmount;
                newTotal += fullPrice;

            } else {
                console.error('Invalid category or prices_matrix for material');
            }
        }

        // Calcular el precio de la personalización seleccionada
        if (selectedCustomization) {
            const dataPlan = dataCustomizations?.find(plan => plan.sku === selectedCustomization.sku);
            const category = data?.category;

            if (category && dataPlan?.prices_matrix && category in dataPlan.prices_matrix) {
                const fullPrice = Number(dataPlan?.full_price) || 0;
                const discountPercentage = dataPlan.prices_matrix[category];
                const discountAmount = fullPrice * (parseFloat(discountPercentage) / 100);
                newDiscountTotal += fullPrice - discountAmount;
                newTotal += fullPrice;
            } else {
                console.error('Invalid category or prices_matrix for customization');
            }
        }

        // Calcular el precio de los productos seleccionados
        selectedProducts.forEach(product => {
            const category = data?.category;
            let personalizationTotal = 0;
            let totalDiscountPersonalization = 0;

            if (category && product?.prices_matrix && category in product.prices_matrix && dataCustomizations) {
                const hasPersonalization = product?.hasPersonalization;

                if (hasPersonalization) {
                    const dataPlan = dataCustomizations?.find(personalization => personalization.selectedArticle === product.uid);
                    personalizationTotal = Number(dataPlan?.full_price || 0);
                    const discountPercentageCustom = parseFloat(dataPlan?.prices_matrix[category] || 0);
                    const discountPersonalization = personalizationTotal * (discountPercentageCustom / 100);
                    totalDiscountPersonalization = personalizationTotal - discountPersonalization;
                }

                const discountPercentage = parseFloat(product.prices_matrix[category] || 0);
                const fullPrice = Number(product?.full_price) || 0;
                const discountAmount = fullPrice * (discountPercentage / 100);
                const productTotal = fullPrice * (product.quantity || 1);

                newDiscountTotal += (fullPrice - discountAmount) * (product.quantity || 1) + totalDiscountPersonalization;
                newTotal += productTotal + personalizationTotal;
            } else {
                console.error('Invalid category or prices_matrix for customization');
            }
        });

        setTotal(newTotal);
        setTotalSavings(newDiscountTotal);
    }, [selectedPlan, selectedMaterial, selectedCustomization, selectedProducts, dataPlans, data?.category, dataMaterials, dataCustomizations]);

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
        selectedMaterialError,
        selectedCustomizationError,
        selectedColorError,
        customNameError,
        customRoleError,
        //Paso 3
        handleChangeQuantity,
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
        dataPlans: dataPlans && dataPlans.sort((a, b) => a.name.localeCompare(b.name)),
        dataMaterials: dataMaterials && dataMaterials.sort((a, b) => a.name.localeCompare(b.name)),
        dataCustomizations: dataCustomizations && dataCustomizations.sort((a, b) => a.created_at.localeCompare(b.created_at)),
        dataColors: filteredColors && filteredColors.sort((a, b) => a.name.localeCompare(b.name)),
        dataProducts: dataProducts && dataProducts.sort((a, b) => a.name.localeCompare(b.name)),
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
        expiryDateError,
        setExpiryDateError,
        cvvError,
        setCvvError,
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
        data
    };
};

export default CustomersCreateFormHook;
