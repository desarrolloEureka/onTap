import { saveColorsQuerie, UpdateColorsQuerie } from '@/reactQuery/generalQueries';
import { useEffect, useState } from 'react';
import moment from "moment";
import { GetAllColors, GetAllMaterials } from '@/reactQuery/home';
import Swal from "sweetalert2";
import { Products } from '@/types/home';

const materialsData: { [key: string]: boolean } = {};

const ColorRegisterFormHook = () => {
  const [query, setQuery] = useState<any>([]);
  const [flag, setFlag] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { data: dataMaterials } = GetAllMaterials(flag);
  const { data: dataColors } = GetAllColors(flag);
  const [filteredCategories, setFilteredCategories] = useState<any[]>([]);
  const [status, setStatus] = useState<string>('');
  const [step, setStep] = useState(1);

  // Data Color
  const [name, setName] = useState<string>('');
  const [sku, setSku] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Estado para errores
  const [nameError, setNameError] = useState<string | null>(null);
  const [skuError, setSkuError] = useState<string | null>(null);
  const [skuErrorToolBar, setSkuErrorToolBar] = useState<string | null>(null);
  const [selectedMaterialsError, setSelectedMaterialsError] = useState<string | null>(null);

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditData, setIsEditData] = useState(false);
  const [rowId, setRowId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [selectedMaterials, setSelectedMaterials] = useState<Products[]>([]);
  const [material, setMaterial] = useState('');
  const [filteredMaterials, setFilteredMaterials] = useState<Products[]>([]);

  //Imagen
  const [isUpdateImage, setIsUpdateImage] = useState(false);
  //Errores
  const [imageError, setImageError] = useState('');

  useEffect(() => {
    // Filtrar materiales para eliminar los que ya están seleccionados
    if (dataMaterials) {
      const availableProducts = dataMaterials.filter(
        (material: Products) =>
          material.status === true && // Verificar que el material esté activo
          !selectedMaterials.some(p => p.sku === material.sku) // Verificar que no esté ya seleccionado
      );
      setFilteredMaterials(availableProducts);
    }
  }, [dataMaterials, selectedMaterials]);

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const handleAddMaterial = () => {
    setSelectedMaterialsError(null);
    // Encuentra el material en la lista de materiales usando el SKU
    const materialAux = dataMaterials?.find((p: Products) => p.sku === material);

    if (!materialAux) {
      setSkuErrorToolBar('Material no encontrado');
      return;
    }

    if (selectedMaterials.some((p) => p.sku === material)) {
      setSkuErrorToolBar('El material ya está en la lista');
      return;
    }

    setSelectedMaterials([...selectedMaterials, materialAux]);
    setMaterial('');
    setSkuErrorToolBar('');
  };

  const handleRemoveMaterial = (skuToRemove: string) => {
    // Filtra la lista de materiales seleccionados para eliminar el material con el SKU proporcionado
    const updatedProducts = selectedMaterials.filter(material => material.sku !== skuToRemove);

    // Actualiza el estado con la nueva lista de materiales
    setSelectedMaterials(updatedProducts);
  };

  const handleOpenModal = async () => {
    setIsEditData(false);
    setIsModalOpen(true);
  };

  const validateForm = () => {
    let valid = true;
    setNameError(null);
    setSkuError(null);
    setStatus('');

    // Validar el nombre
    if (name.trim() === '') {
      setNameError('El nombre del color es obligatorio');
      valid = false;
    }

    // Validar el SKU
    if (sku.trim() === '') {
      setSkuError('El SKU del color es obligatorio');
      valid = false;
    }

    // Validar la imagen seleccionada
    if (!selectedImage) {
      setImageError('La imagen es obligatoria');
      valid = false;
    }

    return valid;
  };

  const validateSelectedProducts = () => {
    setSelectedMaterialsError(null);
    if (selectedMaterials.length === 0) {
      setSelectedMaterialsError('Debes seleccionar al menos un material');
      return false;
    }
    return true;
  };


  const handleCloseModal = () => {
    setIsModalOpen(false);
    handleReset();
  };

  const handleReset = () => {
    setName('');
    setSku('');
    setStatus('');
    setStep(1);
    setSelectedMaterials([]);
    setMaterial('');
    setSearchTerm('');
    setFilteredMaterials([]);
    setSelectedImage(null);
    setIsUpdateImage(false);
    // Limpiar los errores
    setNameError(null);
    setSkuError(null);
    setSkuErrorToolBar(null);
    setSelectedMaterialsError(null);
    setImageError('');
    //Modal
    setIsModalOpen(false);
    setIsEditData(false);
    setRowId(null);
  };


  const handleNextStepOne = async () => {
    if (!validateForm()) return;
    setStep(2);
  }

  const handleEditProduct = async (dataMaterial: any) => {
    setIsModalOpen(true);
    setIsEditData(true);
    setName(dataMaterial.name);
    setSku(dataMaterial.sku);
    setRowId(dataMaterial.uid);
    setSelectedMaterials(dataMaterial.selectedMaterials);
    setSelectedImage(dataMaterial.image);
    setNameError(null);
    setSkuError(null);
  };

  const dataRegisterHandle = async () => {
    if (!validateForm()) return;
    if (!validateSelectedProducts()) return;

    try {
      const createdAt = moment().format();
      const dataSend = {
        sku: sku,
        created_at: createdAt,
        name: name,
        image: selectedImage,
        selectedMaterials: selectedMaterials
      };

      const result = await saveColorsQuerie(dataSend);
      if (result.success) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Color registrado con éxito`,
          showConfirmButton: false,
          timer: 2000,
        });
        setIsModalOpen(false);
        handleReset();
      } else {
        setStatus(result.message);
      }
    } catch (error) {
      setStatus('Error al registrar el color');
    } finally {
      setFlag(!flag);
      setIsSubmitting(false);
    }
  };

  const handleEditData = async (e: React.FormEvent) => {
    if (!validateForm()) return;
    if (!validateSelectedProducts()) return;

    try {
      const dataSend = {
        sku: sku,
        name: name,
        selectedMaterials: selectedMaterials,
        image: selectedImage
      };

      const result = await UpdateColorsQuerie(dataSend, rowId);

      if (result.success) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Color actualizada con éxito`,
          showConfirmButton: false,
          timer: 2000,
        });
        handleReset();
      } else {
        setStatus(result.message);
      }
    } catch (error) {
      setStatus('Error al registrar el color');
    } finally {
      setFlag(!flag);
      setIsSubmitting(false);
      setIsModalOpen(false);
    }
  };

  function resizeImage(file: File, maxWidth: number, maxHeight: number): Promise<File> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = URL.createObjectURL(file);
      image.onload = () => {
        let width = image.width;
        let height = image.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx && ctx.drawImage(image, 0, 0, width, height);
        canvas.toBlob(blob => {
          if (blob) {
            const resizedFile = new File([blob], file.name, {
              type: blob.type || 'image/jpeg',
              lastModified: Date.now()
            });
            resolve(resizedFile);
          } else {
            reject(new Error("Failed to create Blob"));
          }
        }, file.type || 'image/jpeg', 0.35);
      };
      image.onerror = () => {
        reject(new Error("Could not load image"));
      };
    });
  }

  const convertFileToBase64 = (file: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject(
            new Error("Failed to convert file to base64 string."),
          );
        }
      };
      reader.onerror = () => reject(new Error("Error reading file."));
      reader.readAsDataURL(file);
    });
  };

  // Lógica para manejar la selección de imagen   
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file && file instanceof File) {
      try {
        const resizedImage = await resizeImage(file, 750, 750);
        const base64String = await convertFileToBase64(resizedImage);
        setSelectedImage(base64String);
        setIsUpdateImage(true);
        setImageError('');
      } catch (error) {
        console.error("Error handling the image:", error);
      }
    }
  };

  useEffect(() => {
    if (dataMaterials) {
      const activeCategories = dataMaterials
        .filter((category: any) => category.status === true)
        .sort((a, b) => a.name.localeCompare(b.name));

      setFilteredCategories(activeCategories);
    }
  }, [dataMaterials]);

  useEffect(() => {
    if (dataColors && dataMaterials) {
      let idCounter = 1;
      const formattedData = dataColors.map(doc => {

        // Iterar sobre cada material en dataMaterials y validar si está en doc.selectedMaterials
        dataMaterials.forEach(material => {
          const isMaterialInSelected = doc.selectedMaterials.some((selectedMat: any) => selectedMat.sku === material.sku);
          materialsData[material.name] = isMaterialInSelected ? true : false;
        });

        return {
          id: idCounter++,
          uid: doc.id,
          optionEdit: doc,
          created_at: doc.created_at,
          sku: doc.sku,
          name: doc.name,
          image: doc.image,
          ...materialsData
        };
      });
      setQuery(formattedData);
    }
  }, [dataColors, dataMaterials]);

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
    nameError,
    skuError,
    isEditData,
    handleCloseModal,
    step,
    handleNextStepOne,
    dataMaterials: filteredCategories,
    setStep,
    status,
    searchTerm,
    setSearchTerm,
    handleSearch,
    filteredMaterials,
    handleAddMaterial,
    selectedMaterials,
    setMaterial,
    material,
    handleRemoveMaterial,
    skuErrorToolBar,
    selectedMaterialsError,
    filteredCategories,
    handleImageChange,
    selectedImage,
    isUpdateImage,
    imageError
  };
};

export default ColorRegisterFormHook;
