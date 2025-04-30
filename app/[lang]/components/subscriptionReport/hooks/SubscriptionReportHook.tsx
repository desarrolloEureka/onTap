import { useEffect, useState } from 'react';
import { getUsersWithOrdersAndInvoices } from '@/firebase/user';
import * as XLSX from "xlsx";

const SubscriptionReportHook = () => {
  const [flag, setFlag] = useState(false);
  const [query, setQuery] = useState<any>([]);
  const [filteredQuery, setFilteredQuery] = useState<any>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  //Filtro
  const [subscriptionStatus, setSubscriptionStatus] = useState("");

  const handleChange = (value: string) => {
    setSubscriptionStatus(value);
  };

  const exportToExcel = (filteredQuery: any[]) => {
    try {
      if (!Array.isArray(filteredQuery)) {
        throw new Error("filteredQuery debe ser un array");
      }

      const formatDate = (date: any): string => {
        const d = new Date(date);
        if (isNaN(d.getTime())) return "";
        const day = String(d.getDate()).padStart(2, "0");
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const year = d.getFullYear();
        const hours = String(d.getHours()).padStart(2, "0");
        const minutes = String(d.getMinutes()).padStart(2, "0");
        const seconds = String(d.getSeconds()).padStart(2, "0");
        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
      };

      const filteredData = filteredQuery.map((user) => {
        const {
          edit,
          editDelete,
          optionEdit,
          lastName,
          url,
          urlQR,
          ...filteredUser
        } = user;

        return {
          "Fecha Registro": formatDate(user.created_at),
          "Fecha Pago": formatDate(user.fecha_pago),
          "Fecha Suscripción": formatDate(user.fecha_suscripcion),
          "Fecha Vencimiento": formatDate(user.fecha_vencimiento),
          "No. Identificación": user.id,
          "Nombres y Apellidos": user.name,
          "Indicativo": user.indicative,
          "Teléfono": user.phone,
          "Correo": user.email,
          "Estado Suscripción": user.estado_suscripcion,
        };
      });

      const worksheet = XLSX.utils.json_to_sheet(filteredData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Suscripciones");

      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const data = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(data);
      downloadLink.download = "Suscripciones.xlsx";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (error) {
      console.error("Error al exportar a Excel:", error);
    }
  };

  const handleDateChange = () => {
    const dateStart = startDate ? new Date(startDate) : null;
    const dateEnd = endDate ? new Date(endDate) : null;

    if (dateStart) {
      dateStart.setDate(dateStart.getDate() + 1);
      dateStart.setHours(0, 0, 0, 0);
    }

    if (dateEnd) {
      dateEnd.setDate(dateEnd.getDate() + 1);
      dateEnd.setHours(23, 59, 59, 999);
    }

    if (!dateStart && !dateEnd) {
      setFilteredQuery(query);
      return;
    }

    const parseDate = (input: string | number | Date): Date => {
      let date: Date;

      if (typeof input === "string") {
        const parts = input.split("/");
        date = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
      } else if (typeof input === "number") {
        date = new Date(input);
      } else {
        date = input;
      }

      // Normaliza la hora para evitar desfases por zona horaria
      date.setHours(12, 0, 0, 0);
      return date;
    };

    const filteredData = query.filter((user: {
      fecha_pago: string | number | Date,
      fecha_suscripcion: string | number | Date,
      fecha_vencimiento: string | number | Date
    }) => {
      const fechas = [
        parseDate(user.fecha_pago),
        parseDate(user.fecha_suscripcion),
        parseDate(user.fecha_vencimiento)
      ];

      return fechas.some(userDate => {
        if (dateStart && dateEnd) {
          return userDate >= dateStart && userDate <= dateEnd;
        } else if (dateStart) {
          return userDate >= dateStart;
        } else if (dateEnd) {
          return userDate <= dateEnd;
        }
        return true;
      });
    });

    setFilteredQuery(filteredData);
  };

  const handleDeleteFilter = () => {
    setFilteredQuery(query);
    setStartDate("");
    setEndDate("");
  };

  useEffect(() => {
    const getquery = async () => {
      const usersDataSanpShot = await getUsersWithOrdersAndInvoices();
      const usersData = usersDataSanpShot.map((doc: any) => {

        return {
          uid: doc.uid || "",
          is_admin: doc.is_admin,
          is_distributor: doc.is_distributor || false,
          //
          created_at: doc?.created || '',
          fecha_pago: doc.gif === true ? doc?.created || '' : doc?.userSubscription?.updatedAt || doc?.created || '',
          fecha_suscripcion: doc.gif === true ? doc?.created || '' : doc?.userSubscription?.updatedAt || doc?.created || '',
          fecha_vencimiento: doc?.userSubscription?.nextPaymentDate || '',
          id: doc.dni || '',
          name: doc.firstName + " " + doc.lastName || "",
          indicative: doc.indicative || "",
          phone: doc.phone || "",
          email: doc.email || "-",
          estado_suscripcion: doc?.userSubscription?.status || "",
          autoPaymentAuthorized: doc?.autoPaymentAuthorized || false,
        };
      })
        .filter((user) =>
          !user.is_admin &&
          !user.is_distributor
        );

      setQuery(usersData);
      setFilteredQuery(usersData);
    };

    getquery();
  }, [flag]);

  useEffect(() => {
    if (!subscriptionStatus) {
      setFilteredQuery(query);
      return;
    }

    const filteredByStatus = query.filter(
      (user: { estado_suscripcion: string }) =>
        user.estado_suscripcion === subscriptionStatus
    );

    setFilteredQuery(filteredByStatus);
  }, [subscriptionStatus, query]);

  return {
    query: filteredQuery,
    exportToExcel,
    handleDateChange,
    handleDeleteFilter,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    searchTerm,
    setSearchTerm,
    subscriptionStatus,
    setSubscriptionStatus,
    handleChange
  };
};

export default SubscriptionReportHook;