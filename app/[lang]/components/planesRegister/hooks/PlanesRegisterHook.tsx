"use client";
import { saveCategoryQuerie, UpdateCategoryQuerie, UpdateDefaultPlanQuerie } from '@/reactQuery/generalQueries';
import { useEffect, useState } from 'react';
import moment from "moment";
import { GetAllDefaultPlans } from '@/reactQuery/home';
import Swal from "sweetalert2";

interface DataCategory {
  created_at: string;
  id: string;
  name: string;
  uid: string;
}

const PlanesRegisterHook = () => {
  const [query, setQuery] = useState<any>([]);
  const [flag, setFlag] = useState(false);
  const [price, setStatus] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { data } = GetAllDefaultPlans(flag);
  const [dataCategory, setItemEdit] = useState<DataCategory | null>(null);
  //Datos
  const [name, setName] = useState<string>('');
  const [pricePlan, setPricePlan] = useState<number | null>(null);
  //Errores
  const [error, setError] = useState<string | null>(null);
  const [errorModal, setErrorModal] = useState<string | null>(null);
  const [statePriceError, setStatePriceError] = useState<string | null>(null);
  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditData, setIsEditData] = useState(false);
  const [rowId, setRowId] = useState(null);

  const handleOpenModal = async () => {
    setIsEditData(false);
    setIsModalOpen(true);
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
    setRowId(null);
    setIsEditData(false);
  };


  const handleEditCategory = async (dataCategory: any) => {
    setIsModalOpen(true);
    setIsEditData(true);
    setName(dataCategory.name);
    setPricePlan(dataCategory.price);
    setRowId(dataCategory.uid);
    setError(null);
    setErrorModal(null);
    setStatePriceError(null);
  };

  const handleEditData = async (e: React.FormEvent) => {

    if (!validateForm()) return; // Validar antes de enviar

    setIsSubmitting(true);
    setStatus('');

    try {
      const dataSend = {
        name: name,
        price: pricePlan,
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
      const formattedData = data.map(doc => (
        {
          id: doc.id,
          name: doc.name,
          created_at: doc.updated_at || doc.createdAt,
          price: doc.price,
          optionEdit: doc,
        }));
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
    rowId
  };
};

export default PlanesRegisterHook;
