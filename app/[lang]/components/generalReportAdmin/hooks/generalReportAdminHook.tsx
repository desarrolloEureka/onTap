import { useEffect, useState } from "react";
import { GetUser } from "@/reactQuery/users";
import moment from "moment";
import { UpdateOrdersQuerie } from "@/reactQuery/generalQueries";
import {
  gridFilteredSortedRowIdsSelector,
  gridVisibleColumnFieldsSelector,
  useGridApiRef,
} from "@mui/x-data-grid";

import * as XLSX from "xlsx";
import { getUsersWithOrdersAndInvoices, getUsers } from "@/firebase/user";
import { countries } from "@/globals/constants";
import Swal from "sweetalert2";

const PendingPaymentReportsHook = ({
  handlePayUser,
}: {
  handlePayUser: any;
}) => {
  const { data, refetch } = GetUser();
  const apiRef = useGridApiRef();
  const [flag, setFlag] = useState(false);
  const [query, setQuery] = useState<any>([]);
  const [filteredQuery, setFilteredQuery] = useState<any>([]);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filtro Extra
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [rowId, setRowId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [distributorFilter, setDistributorFilter] = useState<string>(""); // Nuevo estado para el filtro de distribuidor
  const [distributors, setDistributors] = useState<any[]>([]);
  const [detalleCompra, setDetalleCompra] = useState<any>(null);

  const [paymentStatusFilter, setPaymentStatusFilter] = useState<string | null>(
    null
  );
  const [deliveryStatusFilter, setDeliveryStatusFilter] = useState<string>(""); // "Entregado" o "Pendiente de entrega"

  const formatPrice = (value: any) => {
    if (value == null || isNaN(value)) return "";
    const number = Number(value);
    return new Intl.NumberFormat("es-CO", {
      style: "decimal",
      minimumFractionDigits: 0,
    }).format(number);
  };


  const getCountryFlag = (item: any) => {
    const country = countries.find((country) => country.id === item);
    return country ? country.flag : "";
  };

  const getCountryName = (item: any) => {
    const country = countries.find((country) => country.id === item);
    return country ? country.code : "";
  };

  const formatearFecha = (fechaISO: string): string => {
    return moment(fechaISO).format("DD/MM/YYYY HH:mm:ss");
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

    // Si las fechas de inicio y fin no son válidas, salimos
    if (dateStart && dateEnd && dateEnd < dateStart) {
      //console.error('La fecha final debe ser mayor o igual a la fecha inicial');
      return;
    }

    // Si no hay fechas, devolvemos los datos sin cambios
    if (!dateStart && !dateEnd) {
      setFilteredQuery(query);
      return;
    }

    const filteredData = query.filter((user: { paymentDate: string }) => {
      const userPaymentDate = user.paymentDate;

      // Excluir los registros donde la fecha de pago es "No aplica"
      if (userPaymentDate === "No aplica") return false; // Excluye el "No aplica"

      // Si la fecha de pago no es "No aplica", convertimos y comparamos
      const userDate = new Date(userPaymentDate);

      if (dateStart && userDate < dateStart) return false; // Excluye si la fecha es menor que la fecha de inicio
      if (dateEnd && userDate > dateEnd) return false; // Excluye si la fecha es mayor que la fecha de fin

      return true; // Incluye si pasa las comparaciones
    });

    setFilteredQuery(filteredData);
  };

  // Funciones para manejar la apertura y cierre del modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleGetSelectedRows = async () => {
    const selectedRowIds = apiRef && apiRef.current.getSelectedRows();
    const selectedData = query.filter((row: any) => selectedRowIds.has(row.id));
    let successCount = 0;

    for (const order of selectedData) {
      const orderId = order.id;

      if (!orderId) {
        console.error("No se encontró un ID de orden válido");
        continue;
      }

      const result = await UpdateOrdersQuerie(orderId, true); // Actualiza el estado a "DELIVERED"
      if (result.success) {
        successCount++;

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Orden entregada con éxito",
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        Swal.fire({
          title: "Error",
          text: `Hubo un error al actualizar la orden ${orderId}: ${result.message}`,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }

    if (successCount > 0) {
      setFlag(!flag); // Cambia el valor de `flag` para forzar la actualización
    }
  };

  const mostrarDetalleCompra = (rowData: any) => {
    //console.log("detalle de la compra", rowData);
    setDetalleCompra(rowData); // Establece los datos de la fila seleccionada
    setIsModalOpen(true); // Abre el modal
  };


  const handleDeleteFilter = () => {
    setFilteredQuery(query);
    setStartDate("");
    setEndDate("");
    setDistributorFilter(""); // Resetear el filtro de distribuidor
    setPaymentStatusFilter(""); // Resetear filtro de estado de pago
    setDeliveryStatusFilter(""); // Resetear filtro de estado de entrega
  };

  const exportToExcel = (filteredQuery: any) => {
    try {
      // Validar que filteredQuery sea un array
      if (!Array.isArray(filteredQuery)) {
        throw new Error("filteredQuery debe ser un array");
      }

      // Crear una copia de los datos excluyendo las columnas no deseadas
      const filteredData = filteredQuery.map((user) => {
        const {
          edit,
          editDelete,
          optionEdit,
          lastName,
          url,
          userType,
          optionPay,
          __check__,
          ...filteredUser
        } = user;

        // Devolver los datos con la propiedad específica incluida
        return {
          ...filteredUser,
        };
      });

      // Crear una hoja de cálculo a partir de los datos filtrados
      const worksheet = XLSX.utils.json_to_sheet(filteredData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Reporte_Administrador"
      );

      // Crear un archivo Blob y descargarlo
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const data = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      // Crear un enlace de descarga y hacer clic en él
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(data);
      downloadLink.download = "Reporte_Administrador.xlsx";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (error) {
      console.error("Error al exportar a Excel:", error);
    }
  };

  function getExcelData(apiRef: any) {
    const filteredSortedRowIds = gridFilteredSortedRowIdsSelector(apiRef);
    const visibleColumnsField = gridVisibleColumnFieldsSelector(apiRef);
    const data = filteredSortedRowIds.map((id) => {
      const row: { [key: string]: any } = {};
      visibleColumnsField.forEach((field) => {
        row[field] = apiRef.current.getCellParams(id, field).value;
      });
      return row;
    });

    return data;
  }

  const handleExport = () => {
    const data = getExcelData(apiRef);
    exportToExcel(data);
  };

  useEffect(() => {
    const getquery = async () => {
      const reportDataRaw = await getUsersWithOrdersAndInvoices();
      const usersDataRaw = await getUsers();
  
      // Identificar roles correctamente
      const isAdminOrDistributor = (user: any) => user.is_admin || user.is_distributor;
      const isOnlyDistributor = (user: any) => user.is_distributor;
      const isRegularUser = (user: any) => !user.is_admin && !user.is_distributor;
  
      const reportData = reportDataRaw.filter(isRegularUser);
      const usersData = usersDataRaw.filter(isRegularUser);
  
      // Crear diccionario de distribuidores
      const distributorsDict = usersDataRaw
        .filter(isOnlyDistributor)
        .reduce((acc: Record<string, any>, user: any) => {
          acc[user.uid] = user.fullName;
          return acc;
        }, {});
  
      // Mapa para eliminar duplicados
      const userMap = new Map();
      [...reportData, ...usersData].forEach((doc: any) => {
        if (!userMap.has(doc.uid)) userMap.set(doc.uid, doc);
      });
  
      const allUserData = Array.from(userMap.values());
  
      // Transformar datos
      const reportDataFinal = allUserData.map((doc: any) => {
        const isPaid = doc?.userInvoice?.status === "PAID";
        const isDelivered = doc?.userOrder?.status === "DELIVERED";
  
        return {
          id: doc.dni || 1,
          created_at: doc?.created_at || "",
          name: `${doc.firstName} ${doc.lastName}`.trim(),
          paymentDate: isPaid ? doc.userInvoice?.paymentDate || doc.created_at : "No aplica",
          indicative: doc.indicative || "",
          phone: doc.phone || "",
          email: doc.email || "",
          plan: doc?.selectedPlan?.name || "",
          statusPay: isPaid ? "Pagado" : "Pendiente por pagar",
          deliveryStatus: isDelivered ? "Entregado" : "Pendiente de entrega",
          deliveryDate: isDelivered ? doc.userOrder.deliveryDate : "",
          idDistributor: doc.idDistributor,
          distributorName: distributorsDict[doc.idDistributor] || "Distribuidor desconocido",
          secuencialId: doc?.userOrder?.secuencialId || "",
          edit: { switch: !!doc.isActiveByAdmin, uid: doc.uid },
        };
      });
  
      // Aplicar filtros
      const filteredQuery = reportDataFinal.filter(
        (user) =>
          (!distributorFilter || user.idDistributor === distributorFilter) &&
          (!paymentStatusFilter || user.statusPay === paymentStatusFilter) &&
          (!deliveryStatusFilter || user.deliveryStatus === deliveryStatusFilter)
      );
  
      setQuery(filteredQuery);
      setFilteredQuery(filteredQuery);
  
      // Crear lista de distribuidores únicos
      const distributorsArray = [
        ...new Map(
          reportDataFinal.map((user) => [
            user.idDistributor,
            {
              id: user.idDistributor,
              name: `Distribuidor ${user.distributorName}`,
            },
          ])
        ).values(),
      ];
  
      setDistributors(distributorsArray);
    };
  
    getquery();
  }, [distributorFilter, paymentStatusFilter, deliveryStatusFilter, flag, data?.uid]);
  

  return {
    data: filteredQuery,
    formatearFecha,
    flag,
    setFlag,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    searchTerm,
    setSearchTerm,
    rowId,
    setRowId,
    isSubmitting,
    setIsSubmitting,
    query,
    setQuery,
    filteredQuery,
    setFilteredQuery,
    handleExport,
    handleDateChange,
    apiRef,
    getCountryFlag,
    getCountryName,
    handleDeleteFilter,
    distributorFilter,
    setDistributorFilter, // Nueva función para actualizar el filtro de distribuidor
    distributors,
    paymentStatusFilter,
    setPaymentStatusFilter,
    deliveryStatusFilter,
    setDeliveryStatusFilter,
    handleGetSelectedRows,
    detalleCompra,
    setDetalleCompra,
    isModalOpen,
    handleCloseModal,
    handleOpenModal,
    formatPrice,
    mostrarDetalleCompra
  };
};

export default PendingPaymentReportsHook;
