"use client";
import { saveCategoryQuerie, UpdateCategoryQuerie } from '@/reactQuery/generalQueries';
import { useEffect, useState } from 'react';
import moment from "moment";
import { GetAllCategories } from '@/reactQuery/home';
import Swal from "sweetalert2";

interface DataCategory {
  created_at: string;
  id: string;
  name: string;
  uid: string;
}

const CategoryRegisterFormHook = () => {
  const [query, setQuery] = useState<any>([]);
  const [flag, setFlag] = useState(false);
  const [status, setStatus] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { data } = GetAllCategories(flag);
  const [dataCategory, setItemEdit] = useState<DataCategory | null>(null);
  //Datos
  const [name, setName] = useState<string>('');
  const [stateCategory, setStateCategory] = useState<boolean | null>(null);
  //Errores
  const [error, setError] = useState<string | null>(null);
  const [errorModal, setErrorModal] = useState<string | null>(null);
  const [stateCategoryError, setStateCategorytError] = useState<string | null>(null);
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
      setError('El nombre de la categoría es obligatorio.');
      valid = false;
    } else {
      setError(null);
    }

    // Validar el estado del producto
    if (stateCategory === null) {
      setStateCategorytError('Debes seleccionar el estado de la categoria');
      valid = false;
    } else {
      setStateCategorytError(null);
    }

    return valid;
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    handleReset();
  };

  const handleReset = () => {
    setName('');
    setStateCategory(null);
    setError(null);
    setErrorModal(null);
    setStateCategorytError(null);
    setRowId(null);
    setIsEditData(false);
  };


  const handleEditCategory = async (dataCategory: any) => {
    setIsModalOpen(true);
    setIsEditData(true);
    setName(dataCategory.name);
    setStateCategory(dataCategory.status);
    setRowId(dataCategory.uid);
    setError(null);
    setErrorModal(null);
    setStateCategorytError(null);
  };

  // Función para manejar el envío del formulario
  const dataRegisterHandle = async () => {
    if (!validateForm()) return; // Validar antes de enviar

    setIsSubmitting(true);
    setStatus('');

    try {
      const createdAt = moment().format();
      const dataSend = {
        created_at: createdAt,
        name: name,
        status: stateCategory || false,
      }

      // Guardar la categoría en Firestore
      const result = await saveCategoryQuerie(dataSend);
      if (result.success) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Categoría registrada con éxito`,
          showConfirmButton: false,
          timer: 2000,
        });
        setIsModalOpen(false);
        handleReset();
      } else {
        setStatus(result.message);
      }

    } catch (error) {
      setStatus('Error al registrar la categoría');
    } finally {
      setFlag(!flag);
      setIsSubmitting(false);
    }
  };

  const handleEditData = async (e: React.FormEvent) => {

    if (!validateForm()) return; // Validar antes de enviar

    setIsSubmitting(true);
    setStatus('');

    try {
      const dataSend = {
        name: name,
        status: stateCategory || false,
      }

      // Guardar la categoría en Firestore;
      const result = await UpdateCategoryQuerie(dataSend, rowId);
      if (result.success) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Categoría actualizada con éxito`,
          showConfirmButton: false,
          timer: 2000,
        });
        handleReset();
      } else {
        setStatus(result.message);
      }

    } catch (error) {
      setStatus('Error al registrar la categoría');
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
          created_at: doc.created_at,
          status: doc.status,
          optionEdit: doc,
        }));
      setQuery(formattedData);
    }
  }, [data]);

  return {
    data: query,
    name,
    setName,
    dataRegisterHandle,
    status,
    error,
    isSubmitting,
    handleEditCategory,
    dataCategory,
    handleEditData,
    errorModal,
    stateCategory,
    setStateCategory,
    stateCategoryError,
    handleCloseModal,
    handleOpenModal,
    isModalOpen,
    isEditData,
    rowId
  };
};

export default CategoryRegisterFormHook;
