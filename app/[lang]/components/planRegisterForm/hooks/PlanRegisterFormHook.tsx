import { savePlansQuerie, UpdatePlansQuerie } from '@/reactQuery/generalQueries';
import { useEffect, useState } from 'react';
import moment from "moment";
import { GetAllCategories, GetAllPlanes, GetAllProducts } from '@/reactQuery/home';
import Swal from "sweetalert2";
import { Products } from '@/types/home';

interface DiscountMap {
  [key: string]: string | number;
}

interface PricesMatrix {
  [key: string]: string;
}

const PlanRegisterFormHook = () => {
  const [query, setQuery] = useState<any>([]);
  const [flag, setFlag] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { data: dataProducts } = GetAllProducts(flag);
  const { data: dataPlanes } = GetAllPlanes(flag);
  const { data: dataCategories } = GetAllCategories(flag);
  const [filteredCategories, setFilteredCategories] = useState<any[]>([]);
  const [status, setStatus] = useState<string>('');
  const [step, setStep] = useState(1);

  // Data Plan
  const [name, setName] = useState<string>('');
  const [sku, setSku] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [stateProduct, setStateProduct] = useState<boolean | null>(true);
  const [discounts, setDiscounts] = useState<DiscountMap>({});

  // Estado para errores
  const [nameError, setNameError] = useState<string | null>(null);
  const [skuError, setSkuError] = useState<string | null>(null);
  const [priceError, setPriceError] = useState<string | null>(null);
  const [stateProductError, setStateProductError] = useState<string | null>(null);
  const [discountErrors, setDiscountErrors] = useState<{ [key: string]: string | null }>({});
  const [skuErrorToolBar, setSkuErrorToolBar] = useState<string | null>(null);
  const [selectedProductsError, setSelectedProductsError] = useState<string | null>(null);

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditData, setIsEditData] = useState(false);
  const [rowId, setRowId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [selectedProducts, setSelectedProducts] = useState<Products[]>([]);
  const [product, setProduct] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Products[]>([]);

  useEffect(() => {
    // Filtrar productos para eliminar los que ya están seleccionados
    if (dataProducts) {
      const availableProducts = dataProducts.filter(
        (product: Products) =>
          product.status === true && // Verificar que el producto esté activo
          !selectedProducts.some(p => p.sku === product.sku) // Verificar que no esté ya seleccionado
      );
      setFilteredProducts(availableProducts);
    }
  }, [dataProducts, selectedProducts]);

  const handleDiscountChange = (categoryName: string, value: string) => {
    const numericValue = parseFloat(value);

    if (value.trim() === '' || (numericValue >= 0 && numericValue <= 100)) {
      setDiscounts((prev) => ({
        ...prev,
        [categoryName]: value,
      }));
    }
  };

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const handleAddProduct = () => {
    setSelectedProductsError(null);
    // Encuentra el producto en la lista de productos usando el SKU
    const productAux = dataProducts?.find((p: Products) => p.sku === product);

    if (!productAux) {
      setSkuErrorToolBar('Producto no encontrado');
      return;
    }

    if (selectedProducts.some((p) => p.sku === product)) {
      setSkuErrorToolBar('El producto ya está en la lista');
      return;
    }

    setSelectedProducts([...selectedProducts, productAux]);
    //setSelectedProducts([...selectedProducts, { sku: productAux.sku, id: productAux.id }]);
    setProduct('');
    setSkuErrorToolBar('');
  };

  const handleRemoveProduct = (skuToRemove: string) => {
    // Filtra la lista de productos seleccionados para eliminar el producto con el SKU proporcionado
    const updatedProducts = selectedProducts.filter(product => product.sku !== skuToRemove);

    // Actualiza el estado con la nueva lista de productos
    setSelectedProducts(updatedProducts);
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
    setStateProductError(null);
    setStatus('');

    // Validar el nombre
    if (name.trim() === '') {
      setNameError('El nombre del plan es obligatorio');
      valid = false;
    }

    // Validar el SKU
    if (sku.trim() === '') {
      setSkuError('El SKU del plan es obligatorio');
      valid = false;
    }

    // Validar el precio
    const priceTrimmed = price.toString().trim();
    if (priceTrimmed === '') {
      setPriceError('El precio del plan es obligatorio');
      valid = false;
    } else if (isNaN(Number(priceTrimmed))) {
      setPriceError('El precio debe ser un número válido');
      valid = false;
    } else if (Number(priceTrimmed) <= 0) {
      setPriceError('El precio debe ser mayor que 0');
      valid = false;
    }

    // Validar el estado del plan
    if (stateProduct === null) {
      setStateProductError('Debes seleccionar el estado del plan');
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

  const validateSelectedProducts = () => {
    setSelectedProductsError(null);  // Limpiar el error previamente
    if (selectedProducts.length === 0) {
      setSelectedProductsError('Debes seleccionar al menos un producto');
      return false;
    }
    return true;
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
    setStateProduct(true);
    setStatus('');
    setStep(1);
    setDiscounts({});
    setSelectedProducts([]);
    setProduct('');
    setSearchTerm('');
    setFilteredProducts([]);

    // Limpiar los errores
    setNameError(null);
    setSkuError(null);
    setPriceError(null);
    setStateProductError(null);
    setDiscountErrors({});
    setSkuErrorToolBar(null);
    setSelectedProductsError(null);

    // Opcional: resetear el estado del modal y edición si es necesario
    setIsModalOpen(false);
    setIsEditData(false);
    setRowId(null);
  };

  const handleNextStepOne = async () => {
    if (!validateForm()) return;
    setStep(2);
  }

  const handleNextStepTwo = async () => {
    if (!validateDiscounts()) return;
    setStep(3);
  }

  const handleEditProduct = async (dataProduct: any) => {
    setIsModalOpen(true);
    setIsEditData(true);
    setName(dataProduct.name);
    setSku(dataProduct.sku);
    setPrice(dataProduct.full_price);
    setStateProduct(dataProduct.status);
    setRowId(dataProduct.uid);
    setDiscounts(dataProduct.prices_matrix);
    setSelectedProducts(dataProduct.selectedProducts);
    setNameError(null);
    setSkuError(null);
    setPriceError(null);
    setStateProductError(null);
    setStateProductError(null);
  };

  const dataRegisterHandle = async () => {
    if (!validateForm()) return;
    if (!validateDiscounts()) return;
    if (!validateSelectedProducts()) return;

    try {
      const createdAt = moment().format();
      const dataSend = {
        sku: sku,
        created_at: createdAt,
        name: name,
        full_price: price,
        status: stateProduct,
        prices_matrix: discounts,
        selectedProducts: selectedProducts
      };

      const result = await savePlansQuerie(dataSend);
      if (result.success) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Plan registrado con éxito`,
          showConfirmButton: false,
          timer: 2000,
        });
        setIsModalOpen(false);
        handleReset();
      } else {
        console.log(result.message);
        setStatus(result.message);
      }
    } catch (error) {
      setStatus('Error al registrar el plan');
    } finally {
      setFlag(!flag);
      setIsSubmitting(false);
    }
  };

  const handleEditData = async (e: React.FormEvent) => {
    if (!validateForm()) return;
    if (!validateDiscounts()) return;
    if (!validateSelectedProducts()) return;

    try {
      //const skus = selectedProducts.map(product => product.sku);

      const dataSend = {
        sku: sku,
        name: name,
        full_price: price,
        status: stateProduct,
        prices_matrix: discounts,
        selectedProducts: selectedProducts
      };

      const result = await UpdatePlansQuerie(dataSend, rowId);

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
        console.log(result.message);
        setStatus(result.message);
      }
    } catch (error) {
      setStatus('Error al registrar el plan');
    } finally {
      setFlag(!flag);
      setIsSubmitting(false);
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    if (dataCategories) {
      const activeCategories = dataCategories
        .filter((category: any) => category.status === true) // Verificar que la categoría esté activa
        .sort((a, b) => a.name.localeCompare(b.name)); // Organizar alfabéticamente por nombre

      setFilteredCategories(activeCategories);
    }
  }, [dataCategories]);

  useEffect(() => {
    if (dataPlanes) {
      let idCounter = 1;
      const formattedData = dataPlanes.map(doc => {
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
          id: idCounter++,
          uid: doc.id,
          name: doc.name,
          created_at: doc.created_at,
          status: doc.status,
          optionEdit: doc,
          sku: doc.sku,
          price: doc.full_price,
          prices_matrix: doc.prices_matrix,
          product: doc.product.name,
          ...dynamicPrices
        };
      });
      setQuery(formattedData);
    }
  }, [dataPlanes]);

  return {
    data: query,
    dataRegisterHandle,
    isSubmitting,
    handleEditProduct,
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
    stateProduct,
    setStateProduct,
    nameError,
    skuError,
    priceError,
    stateProductError,
    isEditData,
    handleCloseModal,
    step,
    handleNextStepOne,
    handleNextStepTwo,
    dataCategories: filteredCategories,
    handleDiscountChange,
    discounts,
    setStep,
    discountErrors,
    status,
    searchTerm,
    setSearchTerm,
    handleSearch,
    filteredProducts,
    handleAddProduct,
    selectedProducts,
    dataProducts,
    setProduct,
    product,
    handleRemoveProduct,
    skuErrorToolBar,
    selectedProductsError,
    filteredCategories
  };
};

export default PlanRegisterFormHook;