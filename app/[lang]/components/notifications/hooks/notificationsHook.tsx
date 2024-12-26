import { useEffect, useState } from "react";
import { saveNotificationQuerie, sendNotificationsToUsersQuery } from "@/reactQuery/generalQueries";
import Swal from "sweetalert2";
import { GetAllNotifications } from "@/reactQuery/home";
import { GetUser } from "@/reactQuery/users";
import { getAllUsers } from "@/firebase/user";

export interface Notification {
  id: string;
  subject: string;
  description: string;
  createdAt: string;
  creator: string;
}

const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredQuery, setFilteredQuery] = useState<any>([]);
  const [query, setQuery] = useState<any>([]);
  const [subjetError, setSubjetError] = useState<string | null>(null);
  const [descripcionError, setDescripcionError] = useState<string | null>(null);
  const [flag, setFlag] = useState(false);

  const queryResult = GetAllNotifications(flag); // Llamamos a la consulta
  const dataUser = GetUser();

  const validateNotifications = () => {
    setSubjetError("");
    setDescripcionError("");

    let valid = true;
    if (subject.trim() === "") {
      setSubjetError("El asunto es requerido");
      valid = false;
    }

    if (description.trim() === "") {
      setDescripcionError("La descripción es requerida");
      valid = false;
    }
    return valid;
  };

  useEffect(() => {
    if (queryResult.data) {
      // Mapear los datos y luego ordenarlos por "createdAt" en orden descendente
      const notificationsData = queryResult.data
        .map((doc: Notification) => ({
          id: doc.id,
          created_at: doc.createdAt,
          subject: doc.subject,
          description: doc.description,
        }))
        .sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        ); // Orden descendente por fecha

      setQuery(notificationsData);
      setFilteredQuery(notificationsData);
    } else {
      console.warn("No notifications found.");
    }
  }, [queryResult.data]);

  // Filtra las notificaciones según el término de búsqueda
  const filteredNotifications = notifications.filter(
    (notification) =>
      notification.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //filtrado de fechas
  const handleDeleteFilter = () => {
    setFilteredQuery(query);
    setStartDate("");
    setEndDate("");
  };

  const handleDateChange = () => {
    const dateStart = startDate ? new Date(startDate) : null;
    const dateEnd = endDate ? new Date(endDate) : null;

    // Ajustar la fecha de inicio al primer milisegundo del día siguiente
    if (dateStart) {
      dateStart.setDate(dateStart.getDate() + 1);
      dateStart.setHours(0, 0, 0, 0);
    }

    // Ajustar la fecha final al último milisegundo del día siguiente
    if (dateEnd) {
      dateEnd.setDate(dateEnd.getDate() + 1);
      dateEnd.setHours(23, 59, 59, 999);
    }

    // Validación: la fecha final no puede ser inferior a la fecha de inicio
    if (dateStart && dateEnd && dateStart > dateEnd) {
      console.error(
        "La fecha de inicio debe ser menor o igual a la fecha final."
      );
      setFilteredQuery([]); // Establecer resultado vacío si las fechas no son válidas
      return;
    }

    // Si no se seleccionan fechas, restaurar la consulta completa
    if (!dateStart && !dateEnd) {
      setFilteredQuery(query);
      return;
    }

    // Filtrar datos en función del rango de fechas
    const filteredData = query.filter((user: { created_at: string }) => {
      const userDate = new Date(user.created_at);
      if (dateStart && userDate < dateStart) return false;
      if (dateEnd && userDate > dateEnd) return false;
      return true;
    });

    // Actualizar el estado con los datos filtrados
    setFilteredQuery(filteredData);
  };

  // Funciones para manejar la apertura y cierre del modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
    setStatus(""); // Limpiar el estado al abrir el modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSubject("");
    setDescription("");
    setStatus(""); // Resetear el estado de estatus al cerrar el modal
  };

  const handleSaveNotification = async () => {
    if (!validateNotifications()) return;

    const newNotification: Notification = {
      id: generateId(),
      subject,
      description,
      createdAt: new Date().toISOString(),
      creator: dataUser?.data?.uid || "",
    };
    try {
      const result = await saveNotificationQuerie(newNotification); // Llama a la función de guardado
      if (result.success) {
        const usersDataSanpShot = await getAllUsers();
        const employees = usersDataSanpShot.docs;

        const tokens = employees.map((doc) => {
          const token = doc.data().token;
          return token;
        }).filter(token => token !== undefined);

        await sendNotificationsToUsersQuery(tokens, subject, description)
        handleCloseModal();
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Notificación guardada con éxito`,
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        setStatus(result.message);
      }
    } catch (error) {
      console.error("Error al guardar la notificación:", error);
      setStatus("Error al guardar la notificación");
    } finally {
      setFlag(!flag);
    }
  };

  const generateId = () => {
    return `id-${notifications.length + 1}-${Date.now()}`;
  };

  return {
    notifications: filteredNotifications,
    isModalOpen,
    subject,
    description,
    status,
    handleOpenModal,
    handleCloseModal,
    handleSaveNotification,
    setSubject,
    setDescription,
    searchTerm,
    setSearchTerm,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    handleDateChange,
    handleDeleteFilter,
    query: filteredQuery,
    subjetError,
    descripcionError,
    validateNotifications,
  };
};

export default useNotifications;
