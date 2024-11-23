import { useEffect, useState } from "react";
import { GetUser } from "@/reactQuery/users";
import moment from "moment";
import {
  gridFilteredSortedRowIdsSelector,
  gridVisibleColumnFieldsSelector,
  useGridApiRef,
} from "@mui/x-data-grid";
import * as XLSX from "xlsx";
import { getUsersWithOrdersAndInvoices, getUsers } from "@/firebase/user";
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

  // Filtro Extra
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [rowId, setRowId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [distributorFilter, setDistributorFilter] = useState<string>(""); // Nuevo estado para el filtro de distribuidor
  const [distributors, setDistributors] = useState<any[]>([]);

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

  const handleDeleteFilter = () => {
    setFilteredQuery(query);
    setStartDate("");
    setEndDate("");
    setDistributorFilter(""); // Resetear el filtro de distribuidor
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
      XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte_Entregas");

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
      downloadLink.download = "Reporte_Entregas.xlsx";
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
      const reportData = await getUsersWithOrdersAndInvoices();
      const usersData = await getUsers();
      const allUserData = [
        ...reportData,
        ...usersData.filter(
          (doc: any) => !reportData.some((doc2: any) => doc2?.uid === doc?.uid)
        ),
      ];
      const reportDataFinal = allUserData.map((doc: any) => {
        const isPaid = doc?.userInvoice?.status === "PAID";
        const isDelivered = doc?.userOrder?.status === "DELIVERED";

        return {
          id: doc.dni || 1,
          created_at: doc?.created_at || "",
          name: `${doc.firstName} ${doc.lastName}` || "",
          indicative: doc.indicative || "",
          phone: doc.phone || "",
          email: doc.email || "",
          plan: doc?.selectedPlan?.name,
          userType: doc,
          optionEdit: doc,
          optionPay: doc,
          statusPay: isPaid ? "Pagado" : "Pendiente por pagar",
          deliveryStatus: isDelivered ? "Entregado" : "Pendiente de entrega",
          deliveryDate: isDelivered ? doc.userOrder.deliveryDate : "",
          userInvoice: doc.userInvoice,
          userOrder: doc.userOrder,
          edit: {
            switch: doc.isActiveByAdmin === true ? true : false || "",
            uid: doc.uid,
          },
          idDistributor: doc.idDistributor, // ID del distribuidor
          fullName: doc.fullName || "",
        };
      });

      // Filtrar por distribuidor
      const filteredByDistributor = reportDataFinal.filter((user: any) =>
        distributorFilter ? user.idDistributor === distributorFilter : true
      );

      setQuery(filteredByDistributor);
      setFilteredQuery(filteredByDistributor);

      // Obtener distribuidores únicos y almacenarlos como array
      const uniqueDistributors = [
        ...new Set(reportDataFinal.map((user: any) => user.idDistributor)),
      ];

      // Convertir el array de IDs en un array de objetos con el nombre del distribuidor
      const distributorsArray = uniqueDistributors.map((id) => {
        const Distribuitor = usersData.find((doc) => doc.uid === id);
        return {
          id,
          name: `Distribuidor ${
            Distribuitor ? Distribuitor.fullName : "desconcido"
          }`,
        };
      });

      setDistributors(distributorsArray);
    };

    getquery();
  }, [data?.uid, flag, distributorFilter]);

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
  };
};

export default PendingPaymentReportsHook;
