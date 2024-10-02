import { saveCustomizationQuerie, UpdateCustomizationQuerie } from '@/reactQuery/generalQueries';
import { useEffect, useState } from 'react';
import moment from "moment";
import { GetAllCategories, GetAllCustomizations } from '@/reactQuery/home';
import Swal from "sweetalert2";

interface DiscountMap {
  [key: string]: string | number;
}

interface PricesMatrix {
  [key: string]: string;
}

const PersonalizationRegisterFormHook = () => {
  const [query, setQuery] = useState<any>([]);
  const [flag, setFlag] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { data } = GetAllCustomizations(flag);
  const { data: dataCategories } = GetAllCategories(flag);

  const [status, setStatus] = useState<string>('');
  const [step, setStep] = useState(1);

  // Data Personalización
  const [name, setName] = useState<string>('');
  const [sku, setSku] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [stateCustomization, setStateCustomization] = useState<boolean | null>(true);
  const [discounts, setDiscounts] = useState<DiscountMap>({});

  // Estado para errores
  const [nameError, setNameError] = useState<string | null>(null);
  const [skuError, setSkuError] = useState<string | null>(null);
  const [priceError, setPriceError] = useState<string | null>(null);
  const [stateCustomizationError, setStateCustomizationError] = useState<string | null>(null);
  const [discountErrors, setDiscountErrors] = useState<{ [key: string]: string | null }>({});

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditData, setIsEditData] = useState(false);
  const [rowId, setRowId] = useState(null);

  const handleDiscountChange = (categoryName: string, value: string) => {
    const numericValue = parseFloat(value);

    if (value.trim() === '' || (numericValue >= 0 && numericValue <= 100)) {
      setDiscounts((prev) => ({
        ...prev,
        [categoryName]: value,
      }));
    }
  };

  const handleOpenModal = async () => {
    setIsEditData(false);
    setIsModalOpen(true);
  };

  const validateForm = () => {
    let valid = true;
    setNameError(null);
    setSkuError(null);
    setPriceError(null);
    setStateCustomizationError(null);
    setStatus('');

    // Validar el nombre
    if (name.trim() === '') {
      setNameError('El nombre de la personalización obligatorio');
      valid = false;
    }

    // Validar el SKU
    if (sku.trim() === '') {
      setSkuError('El SKU de la personalización obligatorio');
      valid = false;
    }

    // Validar el precio
    const priceTrimmed = price.toString().trim();
    if (priceTrimmed === '') {
      setPriceError('El precio de la personalización obligatorio');
      valid = false;
    } else if (isNaN(Number(priceTrimmed))) {
      setPriceError('El precio debe ser un número válido');
      valid = false;
    } else if (Number(priceTrimmed) <= 0) {
      setPriceError('El precio debe ser mayor que 0');
      valid = false;
    }

    // Validar el estado del personalización
    if (stateCustomization === null) {
      setStateCustomizationError('Debes seleccionar el estado de la personalización');
      valid = false;
    }

    return valid;
  };

  const validateDiscounts = () => {
    // Obtener los nombres de las categorías desde dataCategories
    const categoryNames = dataCategories && dataCategories.map(category => category.name);

    // Obtener las categorías que están en discounts
    const discountCategories = Object.keys(discounts);

    // Filtrar las categorías que faltan en discounts o que tienen un valor vacío
    const missingOrEmptyCategories = categoryNames && categoryNames.filter(category => {
      const discountValue = discounts[category];
      const isEmpty = typeof discountValue === 'string' ? discountValue.trim() === '' : discountValue == null;
      return !discountCategories.includes(category) || isEmpty;
    });

    // Limpiar los errores previos
    const newDiscountErrors: { [key: string]: string | null } = {};
    categoryNames && categoryNames.forEach(category => {
      newDiscountErrors[category] = missingOrEmptyCategories && missingOrEmptyCategories.includes(category) ? 'Este campo es obligatorio' : null;
    });

    // Actualizar el estado de errores
    setDiscountErrors(newDiscountErrors);

    return missingOrEmptyCategories && missingOrEmptyCategories.length === 0;
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    handleReset();
  };

  const handleReset = () => {
    // Resetear todos los campos y estados
    setName('');
    setSku('');
    setPrice('');
    setStateCustomization(true);
    setStatus('');
    // Limpiar los errores
    setNameError(null);
    setSkuError(null);
    setPriceError(null);
    setStateCustomizationError(null);
    setIsEditData(false);
    setRowId(null);
    setStep(1);
    setDiscounts({});
  };

  const handleNextStep = async () => {
    if (!validateForm()) return;
    setStep(2);
  }

  const handleEditCustomization = async (dataCustomization: any) => {
    setIsModalOpen(true);
    setIsEditData(true);
    setName(dataCustomization.name);
    setSku(dataCustomization.sku);
    setPrice(dataCustomization.full_price);
    setStateCustomization(dataCustomization.status);
    setRowId(dataCustomization.uid);
    setDiscounts(dataCustomization.prices_matrix);
    setNameError(null);
    setSkuError(null);
    setPriceError(null);
    setStateCustomizationError(null);
    setStateCustomizationError(null);
  };

  const dataRegisterHandle = async () => {
    if (!validateForm()) return;
    if (!validateDiscounts()) return;

    try {
      const createdAt = moment().format();
      const dataSend = {
        sku: sku,
        created_at: createdAt,
        name: name,
        full_price: price,
        status: stateCustomization,
        prices_matrix: discounts
      };

      const result = await saveCustomizationQuerie(dataSend);
      if (result.success) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Personalización registrado con éxito`,
          showConfirmButton: false,
          timer: 2000,
        });
        setIsModalOpen(false);
        handleReset();
      } else {
        setStatus(result.message);
      }
    } catch (error) {
      setStatus('Error al registrar el personalización');
    } finally {
      setFlag(!flag);
      setIsSubmitting(false);
    }
  };

  const handleEditData = async (e: React.FormEvent) => {
    if (!validateForm()) return;
    if (!validateDiscounts()) return;

    try {
      const dataSend = {
        sku: sku,
        name: name,
        full_price: price,
        status: stateCustomization,
        prices_matrix: discounts
      };

      const result = await UpdateCustomizationQuerie(dataSend, rowId);

      if (result.success) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Personalización actualizada con éxito`,
          showConfirmButton: false,
          timer: 2000,
        });
        handleReset();
      } else {
        setStatus(result.message);
      }
    } catch (error) {
      setStatus('Error al registrar el personalización');
    } finally {
      setFlag(!flag);
      setIsSubmitting(false);
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    if (data) {
      const formattedData = data.map(doc => {
        // Extrae los valores de prices_matrix o establece un valor por defecto si no existe
        const pricesMatrix = doc.prices_matrix || {};
        const priceEntries = Object.entries(pricesMatrix);

        const sortedEntries = priceEntries.sort(([keyA], [keyB]) => keyA.localeCompare(keyB));

        // Inicializa las propiedades dinámicamente
        const dynamicPrices = sortedEntries.reduce((acc, [key, value]) => {
          // Calcula el precio con descuento basado en el valor de value
          const discountPercentage = Number(value);
          const fullPrice = Number(doc.full_price);
          const discountedPrice = fullPrice - (fullPrice * (discountPercentage / 100));
          acc[key] = discountedPrice.toFixed(2);
          return acc;
        }, {} as PricesMatrix);

        return {
          id: doc.id,
          name: doc.name,
          created_at: doc.created_at,
          status: doc.status,
          optionEdit: doc,
          sku: doc.sku,
          price: doc.full_price,
          prices_matrix: doc.prices_matrix,
          ...dynamicPrices
        };
      });

      setQuery(formattedData);
    }
  }, [data]);

  return {
    data: query,
    dataRegisterHandle,
    isSubmitting,
    handleEditCustomization,
    handleEditData,
    isModalOpen,
    setIsModalOpen,
    handleOpenModal,
    name,
    setName,
    sku,
    setSku,
    price,
    setPrice,
    stateCustomization,
    setStateCustomization,
    nameError,
    skuError,
    priceError,
    stateCustomizationError,
    isEditData,
    handleCloseModal,
    step,
    handleNextStep,
    dataCategories: dataCategories && dataCategories.sort((a, b) => a.name.localeCompare(b.name)),
    handleDiscountChange,
    discounts,
    setStep,
    discountErrors,
    status
  };
};

export default PersonalizationRegisterFormHook;