"use client";
import { UpdateDefaultPlanQuerie } from '@/reactQuery/generalQueries';
import { useEffect, useState } from 'react';
import { GetAllCategories, GetAllDefaultPlans } from '@/reactQuery/home';
import Swal from "sweetalert2";

interface DataCategory {
  created_at: string;
  id: string;
  name: string;
  uid: string;
}

interface DiscountMap {
  [key: string]: string | number;
}


interface PricesMatrix {
  [key: string]: string;
}


const PlanesRegisterHook = () => {
  const [query, setQuery] = useState<any>([]);
  const [flag, setFlag] = useState(false);
  const [price, setStatus] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { data } = GetAllDefaultPlans(flag);
  const { data: dataCategories } = GetAllCategories(flag);
  const [dataCategory, setItemEdit] = useState<DataCategory | null>(null);
  const [step, setStep] = useState(1);
  const [discounts, setDiscounts] = useState<DiscountMap>({});

  //Datos
  const [name, setName] = useState<string>('');
  const [pricePlan, setPricePlan] = useState<number | null>(null);
  //Errores
  const [error, setError] = useState<string | null>(null);
  const [errorModal, setErrorModal] = useState<string | null>(null);
  const [statePriceError, setStatePriceError] = useState<string | null>(null);
  const [discountErrors, setDiscountErrors] = useState<{ [key: string]: string | null }>({});

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditData, setIsEditData] = useState(false);
  const [rowId, setRowId] = useState(null);

  const handleOpenModal = async () => {
    setIsEditData(false);
    setIsModalOpen(true);
  };

  const handleDiscountChange = (categoryName: string, value: string) => {
    const numericValue = parseFloat(value);

    if (value.trim() === '' || (numericValue >= 0 && numericValue <= 100)) {
      setDiscounts((prev) => ({
        ...prev,
        [categoryName]: value,
      }));
    }
  };

  // Validar si el nombre es válido
  const validateForm = () => {
    let valid = true;

    if (name.trim() === '') {
      setError('El nombre de el Plan es obligatorio.');
      valid = false;
    } else {
      setError(null);
    }

    if (pricePlan === null || isNaN(pricePlan) || pricePlan <= 0) {
      setStatePriceError('El precio deber ser mayor a 0.');
      valid = false;
    } else {
      setStatePriceError(null);
    }
    return valid;
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    handleReset();
  };

  const handleReset = () => {
    setName('');
    setPricePlan(null);
    setError(null);
    setErrorModal(null);
    setStatePriceError(null);
    setIsEditData(false);
    setRowId(null);
    setStep(1);
    setDiscounts({});
  };

  const handleNextStep = async () => {
    setStep(2);
  }


  const handleEditCategory = async (dataCategory: any) => {
    setIsModalOpen(true);
    setIsEditData(true);
    setName(dataCategory.name);
    setPricePlan(dataCategory.price);
    setRowId(dataCategory.uid);
    setError(null);
    setErrorModal(null);
    setStatePriceError(null);
    setDiscounts(dataCategory.prices_matrix);
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

  const handleEditData = async (e: React.FormEvent) => {
    if (!validateForm()) return;
    if (!validateDiscounts()) return;

    setIsSubmitting(true);
    setStatus('');

    try {
      const dataSend = {
        name: name,
        price: pricePlan,
        prices_matrix: discounts
      }

      // Guardar el Plan en Firestore;
      const result = await UpdateDefaultPlanQuerie(dataSend, rowId);
      if (result.success) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Plan actualizada con éxito`,
          showConfirmButton: false,
          timer: 2000,
        });
        handleReset();
      } else {
        setStatus(result.message);
      }

    } catch (error) {
      setStatus('Error al registrar el Plan');
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
          const fullPrice = Number(doc.price);
          const discountedPrice = fullPrice - (fullPrice * (discountPercentage / 100));
          acc[key] = discountedPrice.toFixed(2);
          return acc;
        }, {} as PricesMatrix);

        return {
          id: doc.id,
          name: doc.name,
          created_at: doc.updated_at || doc.createdAt,
          price: doc.price,
          optionEdit: doc,
          ...dynamicPrices
        };
      });
      setQuery(formattedData);
    }
  }, [data]);

  return {
    data: query,
    name,
    setName,
    error,
    isSubmitting,
    handleEditCategory,
    dataCategory,
    handleEditData,
    errorModal,
    pricePlan,
    setPricePlan,
    statePriceError,
    handleCloseModal,
    handleOpenModal,
    isModalOpen,
    isEditData,
    rowId,
    dataCategories: dataCategories && dataCategories.sort((a, b) => a.name.localeCompare(b.name)),
    step,
    setStep,
    handleNextStep,
    discounts,
    handleDiscountChange,
    discountErrors,
  };
};

export default PlanesRegisterHook;
