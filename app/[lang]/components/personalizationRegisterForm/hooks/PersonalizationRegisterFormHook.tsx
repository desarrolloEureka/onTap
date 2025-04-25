import { saveCustomizationQuerie, UpdateCustomizationQuerie } from '@/reactQuery/generalQueries';
import { useEffect, useState } from 'react';
import moment from "moment";
import { GetAllCategories, GetAllCustomizations, GetAllPlanesIndividual, GetAllProducts } from '@/reactQuery/home';
import Swal from "sweetalert2";
import { validateSKU } from '@/firebase/Documents';

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
  const { data: dataProducts } = GetAllProducts(flag);
  const { data: dataPlanes } = GetAllPlanesIndividual(flag);

  const [status, setStatus] = useState<string>('');
  const [step, setStep] = useState(1);

  // Data Personalización
  const [name, setName] = useState<string>('');
  const [sku, setSku] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [stateCustomization, setStateCustomization] = useState<boolean | null>(true);
  const [typeCustomization, setTypeCustomization] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);
  const [articleList, setArticleList] = useState<any | null>([]);
  const [discounts, setDiscounts] = useState<DiscountMap>({});

  // Estado para errores
  const [nameError, setNameError] = useState<string | null>(null);
  const [skuError, setSkuError] = useState<string | null>(null);
  const [priceError, setPriceError] = useState<string | null>(null);
  const [stateCustomizationError, setStateCustomizationError] = useState<string | null>(null);
  const [typeCustomizationError, seTypeCustomizationError] = useState<string | null>(null);
  const [selectedArticleError, setSelectedArticleError] = useState<string | null>(null);
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
    seTypeCustomizationError(null);
    setSelectedArticleError(null);
    setStatus('');

    /* // Validar el nombre
    if (name.trim() === '') {
      setNameError('El nombre de la personalización obligatorio');
      valid = false;
    } */

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

    /* // Validar el tipo de la personalización
    if (typeCustomization === null) {
      seTypeCustomizationError('Debes seleccionar el tipo de la personalización');
      valid = false;
    } */

    // Validar el selecciono un articulo
    if (selectedArticle === null) {
      setSelectedArticleError('Debes seleccionar un artículo');
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
    setName('');
    setSku('');
    setPrice('');
    setStateCustomization(true);
    setTypeCustomization(null);
    setSelectedArticle(null);
    setArticleList([]);
    setDiscounts({});

    // Limpiar los errores
    setNameError(null);
    setSkuError(null);
    setPriceError(null);
    setStateCustomizationError(null);
    seTypeCustomizationError(null);
    setSelectedArticleError(null);
    setDiscountErrors({});
    setIsEditData(false);
    setRowId(null);
    setStep(1);
  };


  const handleNextStep = async (isEdit: boolean) => {
    if (!validateForm()) return;

    if (!isEdit) {
      const isSkuAvailable = await validateSKU(sku, "customizations");

      if (!isSkuAvailable) {
        setSkuError("El SKU del Personalizacion ya está registrado");
        return;
      }
    }

    setSkuError("");
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
    setTypeCustomization(dataCustomization.type);

    const selectedUids = (data || []).map((item: any) => item.selectedArticle);
    if (dataCustomization.type === 'Producto') {
      // Filtrar dataProducts para obtener los que NO están en selectedUids
      const filteredProducts = dataProducts && dataProducts.filter((product: any) => !selectedUids.includes(product.uid) || product.uid === dataCustomization.selectedArticle);
      setArticleList(filteredProducts);
    } else {
      // Filtrar dataPlanes para obtener los que NO están en selectedUids
      const filteredPlanes = dataPlanes && dataPlanes.filter((plan: any) => !selectedUids.includes(plan.uid) || plan.uid === dataCustomization.selectedArticle);
      setArticleList(filteredPlanes);
    }
    setSelectedArticle(dataCustomization.selectedArticle);
    setNameError(null);
    setSkuError(null);
    setPriceError(null);
    setStateCustomizationError(null);
    seTypeCustomizationError(null);
    setSelectedArticleError(null);
  };

  const dataRegisterHandle = async () => {
    if (!validateForm()) return;
    if (!validateDiscounts()) return;

    try {
      const createdAt = moment().format();
      const dataSend = {
        sku: sku,
        created_at: createdAt,
        //name: name,
        type: typeCustomization || 'Plan',
        selectedArticle,
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
        //name: name,
        type: typeCustomization,
        selectedArticle,
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

  const filterDataArticles = (e: any) => {
    setTypeCustomization(e);

    // Obtiene los selectedArticle de cada elemento
    const selectedUids = (data || []).map((item: any) => item.selectedArticle);

    if (e === 'Producto') {
      // Filtrar dataProducts para obtener los que NO están en selectedUids
      const filteredProducts = dataProducts && dataProducts.filter((product: any) => !selectedUids.includes(product.uid));
      setArticleList(filteredProducts);
    } else {
      // Filtrar dataPlanes para obtener los que NO están en selectedUids
      const filteredPlanes = dataPlanes && dataPlanes.filter((plan: any) => !selectedUids.includes(plan.uid));
      setArticleList(filteredPlanes);
    }
  };

  useEffect(() => {
    if (!isEditData) {
      const selectedUids = (data || []).map((item: any) => item.selectedArticle);
      const filteredPlanes = dataPlanes && dataPlanes.filter((plan: any) => !selectedUids.includes(plan.uid));
      setArticleList(filteredPlanes);
    }
  }, [data, dataPlanes, isEditData, isModalOpen])

  useEffect(() => {
    if (data && dataProducts && dataPlanes) {
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

        let foundItem = null;

        if (doc.type === 'Producto') {
          foundItem = dataProducts.find(product => product.uid === doc.selectedArticle);
        } else if (doc.type === 'Plan') {
          foundItem = dataPlanes.find(plan => plan.uid === doc.selectedArticle);
        }

        return {
          id: doc.id,
          name: doc.name,
          created_at: doc.created_at,
          status: doc.status,
          optionEdit: doc,
          sku: doc.sku,
          price: doc.full_price,
          prices_matrix: doc.prices_matrix,
          type: doc.type,
          article: foundItem?.name || '',
          ...dynamicPrices
        };
      });

      setQuery(formattedData);
    }
  }, [data, dataPlanes, dataProducts]);

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
    status,
    typeCustomization,
    setTypeCustomization,
    typeCustomizationError,
    seTypeCustomizationError,
    selectedArticle,
    setSelectedArticle,
    articleList,
    setArticleList,
    filterDataArticles,
    selectedArticleError,
    setSelectedArticleError
  };
};

export default PersonalizationRegisterFormHook;