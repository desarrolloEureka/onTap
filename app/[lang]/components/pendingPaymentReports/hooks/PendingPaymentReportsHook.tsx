import { useEffect, useState } from "react";
import { GetUser } from "@/reactQuery/users";
import moment from "moment";
import {
  gridFilteredSortedRowIdsSelector,
  gridVisibleColumnFieldsSelector,
  useGridApiRef,
} from "@mui/x-data-grid";
import * as XLSX from "xlsx";
import { getUsersWithOrdersAndInvoices } from "@/firebase/user";
import { countries } from "@/globals/constants";

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
  //Extra
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [rowId, setRowId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detalleCompra, setDetalleCompra] = useState<any>(null); // o el tipo adecuado

  // Funciones para manejar la apertura y cierre del modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const mostrarDetalleCompra = (rowData: any) => {
    console.log("detalle de la compra", rowData);
    setDetalleCompra(rowData); // Establece los datos de la fila seleccionada
    setIsModalOpen(true); // Abre el modal
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

    if (dateStart && dateEnd && dateEnd < dateStart) {
      //console.error('La fecha final debe ser mayor o igual a la fecha inicial');
      return;
    }

    if (!dateStart && !dateEnd) {
      setFilteredQuery(query);
      return;
    }

    const filteredData = query.filter((user: { created_at: string }) => {
      const userDate = new Date(user.created_at);

      // Comparar si la fecha del usuario está dentro del rango
      if (dateStart && userDate < dateStart) return false;
      if (dateEnd && userDate > dateEnd) return false;

      return true;
    });
    setFilteredQuery(filteredData);
  };

  const handleGetSelectedRows = () => {
    const selectedRowIds = apiRef && apiRef.current.getSelectedRows();
    const selectedData = query.filter((row: any) => selectedRowIds.has(row.id));
    handlePayUser(selectedData, false);
    setSelectedRows(selectedData);
  };

  const handleDeleteFilter = () => {
    setFilteredQuery(query);
    setStartDate("");
    setEndDate("");
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
      XLSX.utils.book_append_sheet(workbook, worksheet, "Pagos_Pendientes");

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
      downloadLink.download = "Pagos_Pendientes.xlsx";
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
      try {
        const reportData = await getUsersWithOrdersAndInvoices();

        const reportDataFinal = reportData
          .map((doc: any) => {
            const {
              dni,
              created_at,
              firstName,
              lastName,
              indicative,
              phone,
              email,
              selectedPlan,
              userInvoice,
              userOrder,
              isActiveByAdmin,
              uid,
              idDistributor,
            } = doc;

            return {
              id: dni || 1,
              created_at: created_at || "",
              name: `${firstName || ""} ${lastName || ""}`,
              indicative: indicative || "",
              phone: phone || "",
              email: email || "",
              plan: selectedPlan?.name || "",
              userType: doc,
              optionEdit: doc,
              optionPay: doc,
              statusPay:
                userInvoice?.status === "PAID"
                  ? "Pagado"
                  : "Pendiente por pagar",
              userInvoice: userInvoice || {},
              userOrder: userOrder || {},
              edit: {
                switch: isActiveByAdmin ? true : false,
                uid: uid || "",
              },
              idDistributor: idDistributor || "",
            };
          })
          .filter(
            (user: any) =>
              user?.idDistributor === data?.uid &&
              user.userInvoice?.status !== "PAID"
          );

        setQuery(reportDataFinal);
        setFilteredQuery(reportDataFinal);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    getquery();
  }, [data?.uid, flag]);

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
    handleGetSelectedRows,
    handleDeleteFilter,
    handleOpenModal,
    handleCloseModal,
    mostrarDetalleCompra,
    isModalOpen,
    detalleCompra,
  };
};

export default PendingPaymentReportsHook;
