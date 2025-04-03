import { saveMaterialQuerie, UpdateMaterialQuerie } from '@/reactQuery/generalQueries';
import { useEffect, useState } from 'react';
import moment from "moment";
import { GetAllCategories, GetAllMaterials } from '@/reactQuery/home';
import Swal from "sweetalert2";
import { validateSKU } from '@/firebase/Documents';

interface DiscountMap {
  [key: string]: string | number;
}

interface PricesMatrix {
  [key: string]: string;
}

const MaterialRegisterFormHook = () => {
  const [query, setQuery] = useState<any>([]);
  const [flag, setFlag] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { data } = GetAllMaterials(flag);
  const { data: dataCategories } = GetAllCategories(flag);
  const [status, setStatus] = useState<string>('');
  const [step, setStep] = useState(1);

  // Data Material
  const [name, setName] = useState<string>('');
  const [sku, setSku] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [stateMaterial, setStateMaterial] = useState<boolean | null>(true);
  const [discounts, setDiscounts] = useState<DiscountMap>({});

  // Estado para errores
  const [nameError, setNameError] = useState<string | null>(null);
  const [skuError, setSkuError] = useState<string | null>(null);
  const [priceError, setPriceError] = useState<string | null>(null);
  const [stateMaterialError, setStateMaterialError] = useState<string | null>(null);
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
    setStateMaterialError(null);
    setStatus('');

    // Validar el nombre
    if (name.trim() === '') {
      setNameError('El nombre del material es obligatorio');
      valid = false;
    }

    // Validar el SKU
    if (sku.trim() === '') {
      setSkuError('El SKU del material es obligatorio');
      valid = false;
    }

    // Validar el precio
    const priceTrimmed = price.toString().trim();
    if (priceTrimmed === '') {
      setPriceError('El precio del material es obligatorio');
      valid = false;
    } else if (isNaN(Number(priceTrimmed))) {
      setPriceError('El precio debe ser un número válido');
      valid = false;
    } else if (Number(priceTrimmed) <= 0) {
      setPriceError('El precio debe ser mayor que 0');
      valid = false;
    }

    // Validar el estado del material
    if (stateMaterial === null) {
      setStateMaterialError('Debes seleccionar el estado del material');
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
    setStateMaterial(true);
    setStatus('');
    // Limpiar los errores
    setNameError(null);
    setSkuError(null);
    setPriceError(null);
    setStateMaterialError(null);
    setIsEditData(false);
    setRowId(null);
    setStep(1);
    setDiscounts({});
    setIsSubmitting(false);
  };

  const handleNextStep = async (isEdit: boolean) => {
    if (!validateForm()) return;

    if (!isEdit) {
      const isSkuAvailable = await validateSKU(sku, "materials");

      if (!isSkuAvailable) {
        setSkuError("El SKU del Material ya está registrado");
        return;
      }
    }

    setSkuError("");
    setStep(2);
  }

  const handleEditMaterial = async (dataMaterial: any) => {
    setIsModalOpen(true);
    setIsEditData(true);
    setName(dataMaterial.name);
    setSku(dataMaterial.sku);
    setPrice(dataMaterial.full_price);
    setStateMaterial(dataMaterial.status);
    setRowId(dataMaterial.uid);
    setDiscounts(dataMaterial.prices_matrix);
    setNameError(null);
    setSkuError(null);
    setPriceError(null);
    setStateMaterialError(null);
    setStateMaterialError(null);
  };

  const dataRegisterHandle = async () => {
    if (!validateForm()) return;
    if (!validateDiscounts()) return;

    setIsSubmitting(true);

    try {
      const createdAt = moment().format();
      const dataSend = {
        sku: sku,
        created_at: createdAt,
        name: name,
        full_price: price,
        status: stateMaterial,
        prices_matrix: discounts
      };

      const result = await saveMaterialQuerie(dataSend);
      if (result.success) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Material registrado con éxito`,
          showConfirmButton: false,
          timer: 2000,
        });
        setIsModalOpen(false);
        handleReset();
      } else {
        setStatus(result.message);
      }
    } catch (error) {
      setStatus('Error al registrar el material');
    } finally {
      setFlag(!flag);
      setIsSubmitting(false);
    }
  };

  const handleEditData = async (e: React.FormEvent) => {
    if (!validateForm()) return;
    if (!validateDiscounts()) return;

    setIsSubmitting(true);

    try {
      const dataSend = {
        sku: sku,
        name: name,
        full_price: price,
        status: stateMaterial,
        prices_matrix: discounts
      };

      const result = await UpdateMaterialQuerie(dataSend, rowId);

      if (result.success) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Material actualizada con éxito`,
          showConfirmButton: false,
          timer: 2000,
        });
        handleReset();
      } else {
        setStatus(result.message);
      }
    } catch (error) {
      setStatus('Error al registrar el material');
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
  }, [data, flag]);

  return {
    data: query,
    dataRegisterHandle,
    isSubmitting,
    handleEditMaterial,
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
    stateMaterial,
    setStateMaterial,
    nameError,
    skuError,
    priceError,
    stateMaterialError,
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

export default MaterialRegisterFormHook;