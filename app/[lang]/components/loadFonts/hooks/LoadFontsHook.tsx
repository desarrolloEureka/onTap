"use client";
import { saveCategoryQuerie, UpdateCategoryQuerie } from '@/reactQuery/generalQueries';
import { useEffect, useState } from 'react';
import moment from "moment";
import { GetAllBackgroundImages } from '@/reactQuery/home';
import Swal from "sweetalert2";
import { deleteBackground, saveBackgroundImage, updateBackground } from '@/firebase/generals';

interface DataCategory {
    created_at: string;
    id: string;
    name: string;
    uid: string;
}

const LoadFontsHook = () => {
    const [query, setQuery] = useState<any>([]);
    const [flag, setFlag] = useState(false);
    const [status, setStatus] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const { data } = GetAllBackgroundImages(flag);
    //Datos
    const [name, setName] = useState<string>('');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isUpdateImage, setIsUpdateImage] = useState(false);

    //Errores
    const [error, setError] = useState<string | null>(null);
    const [imageError, setImageError] = useState('');

    // Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalDeleteOpen, setIsModaDeletelOpen] = useState(false);
    const [isEditData, setIsEditData] = useState(false);
    const [rowId, setRowId] = useState(null);

    const imgStatus = selectedImage ? '' : '';

    const handleOpenModal = async () => {
        setIsEditData(false);
        setIsModalOpen(true);
    };

    // Validar si el nombre es válido
    const validateForm = () => {
        let valid = true;

        if (name.trim() === '') {
            setError('El Nombre del fondo es obligatorio.');
            valid = false;
        } else {
            setError(null);
        }

        // Validar la imagen seleccionada
        if (!selectedImage) {
            setImageError('La imagen es obligatoria');
            valid = false;
        }

        return valid;
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        handleReset();
    };

    const handleCloseDeleteModal = () => {
        setIsModaDeletelOpen(false);
        handleReset();
    };

    const handleReset = () => {
        setName('');
        setError(null);
        setRowId(null);
        setIsEditData(false);
        setSelectedImage(null);
        setImageError('');
        setIsUpdateImage(false);
        setStatus('');
        setIsSubmitting(false);
    };

    const handleEditFondo = async (data: any) => {
        setIsModalOpen(true);
        setIsEditData(true);
        setError(null);
        setName(data?.name || '');
        setSelectedImage(data?.image || '');
        setRowId(data?.id)
    };

    const handleDeleteFondo = async (data: any) => {
        setIsModaDeletelOpen(true);
        setRowId(data?.id);
    };

    const handleDeleteLogo = async () => {
        if (!rowId) return;

        setIsModaDeletelOpen(false);
        try {
            const result = await deleteBackground(rowId);
            if (result.success) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Fondo eliminado con éxito",
                    showConfirmButton: false,
                    timer: 2000,
                });
                handleReset();
            } else {
                setStatus(result.message || 'Error al eliminar el fondo');
            }
        } catch (error) {
            console.error('Error al eliminar:', error);
            setStatus('Ocurrió un error al intentar eliminar el fondo');
        } finally {
            setFlag(!flag);
            setIsModalOpen(false);
            handleReset();
        }
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
                image: selectedImage || '',
            }

            // Guardar la fondo en Firestore
            const result = await saveBackgroundImage(dataSend);
            if (result.success) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `Fondo registrado con éxito`,
                    showConfirmButton: false,
                    timer: 2000,
                });
                setIsModalOpen(false);
                handleReset();
            } else {
                setStatus(result.message);
            }

        } catch (error) {
            setStatus('Error al registrar la fondo');
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
                image: selectedImage || '',
            }

            console.log('dataSend ', dataSend);
            console.log('rowId ', rowId);

            if (!rowId) { return }

            // Guardar la fondo en Firestore;
            const result = await updateBackground(dataSend, rowId);
            if (result.success) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `Fondo actualizada con éxito`,
                    showConfirmButton: false,
                    timer: 2000,
                });
                handleReset();
            } else {
                setStatus(result.message);
            }

        } catch (error) {
            setStatus('Error al registrar la fondo');
        } finally {
            setFlag(!flag);
            setIsSubmitting(false);
            setIsModalOpen(false);
        }
    };

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

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file && file instanceof File) {
            try {
                const base64String = await convertFileToBase64(file);
                setSelectedImage(base64String);
                setIsUpdateImage(true);
                setImageError('');
            } catch (error) {
                console.error("Error handling the image:", error);
            }
        }
    };

    useEffect(() => {
        if (data) {
            console.log('data ', data);

            const formattedData = data.map(doc => (
                {
                    id: doc.id,
                    name: doc.name,
                    created_at: doc.created_at,
                    optionActions: doc,
                    image: doc.image
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
        handleEditFondo,
        handleEditData,
        handleCloseModal,
        handleOpenModal,
        isModalOpen,
        isEditData,
        rowId,
        imgStatus,
        handleImageChange,
        selectedImage,
        isUpdateImage,
        imageError,
        handleDeleteFondo,
        isModalDeleteOpen,
        setIsModaDeletelOpen,
        handleCloseDeleteModal,
        handleDeleteLogo
    };
};

export default LoadFontsHook;
