import { useState, useEffect } from "react";
import moment from "moment";
import { PaymentData } from "@/types/home";

const usePaymentsMadeReport = () => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [rows, setRows] = useState<PaymentData[]>([]);

  const handleFilter = () => {
    // Lógica de filtrado según las fechas
    const filteredData = rows.filter((row) => {
      const paymentDate = moment(row.paymentDate);
      const start = startDate ? moment(startDate) : null;
      const end = endDate ? moment(endDate) : null;
      return (
        (!start || paymentDate.isSameOrAfter(start)) &&
        (!end || paymentDate.isSameOrBefore(end))
      );
    });
    setRows(filteredData);
  };

  const handleClearFilter = () => {
    setStartDate("");
    setEndDate("");
  };

  return {
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    rows,
    handleFilter,
    handleClearFilter,
  };
};

export default usePaymentsMadeReport;
