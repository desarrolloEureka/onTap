import useDictionary from "@/hooks/dictionary/useDictionary";
import { Typography, Button, TextField } from "@mui/material";
import { Box } from "@mui/material";
import { DataGrid, GridColDef, GridToolbarContainer } from "@mui/x-data-grid";
import { GridToolbarQuickFilter } from "@mui/x-data-grid/components";
// Iconos
import GetAppIcon from "@mui/icons-material/GetApp";
import FilterListIcon from "@mui/icons-material/FilterList";
import DeleteIcon from "@mui/icons-material/Delete";
import GeneralReportAdmin from "./hooks/generalReportAdminHook";
import ReactCountryFlag from "react-country-flag";

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";

const PendingPaymentReports = ({ handlePayUser }: { handlePayUser: any }) => {
  const {
    data,
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
    setDistributorFilter,
    distributorFilter,
    distributors,
    paymentStatusFilter,
    setPaymentStatusFilter,
    deliveryStatusFilter,
    setDeliveryStatusFilter,
  } = GeneralReportAdmin({ handlePayUser });
  const dictionary = useDictionary({ lang: "es" });
  const dateToday = new Date().toISOString().split("T")[0];

  const columns: GridColDef[] = [
    {
      field: "paymentDate",
      headerName: "Fecha de Pago",
      minWidth: 210,
      flex: 2,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        // Verifica si el estado del pago es "Pagado"
        const isPaid = params.row.statusPay === "Pagado";
        return (
          <div className="tw-flex tw-justify-center tw-items-center">
            {isPaid && params.value ? (
              <div>{formatearFecha(params.value)}</div>
            ) : (
              <div>No aplica</div>
            )}
          </div>
        );
      },
    },
    {
      field: "deliveryDate",
      headerName: "Fecha de Entrega",
      minWidth: 210,
      flex: 2,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const isDelivered = params.row.deliveryStatus === "Entregado";
        return (
          <div className="tw-flex tw-justify-center tw-items-center">
            {isDelivered && params.value ? (
              <div>{formatearFecha(params.value)}</div>
            ) : (
              <div>No aplica</div>
            )}
          </div>
        );
      },
    },
    {
      field: "id",
      headerName: "No. Identificación",
      minWidth: 160,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "name",
      headerName: "Nombres y Apellidos",
      minWidth: 230,
      flex: 1,
    },
    {
      field: "indicative",
      headerName: "Indicativo",
      minWidth: 90,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div className="tw-flex tw-justify-center tw-items-center">
          {params.value && (
            <ReactCountryFlag
              countryCode={getCountryFlag(params.value ? params.value : "")}
              svg
              style={{ marginRight: "5px", width: "29px", height: "20px" }}
            />
          )}
          <div>{getCountryName(params.value)}</div>
        </div>
      ),
    },
    {
      field: "phone",
      headerName: "Teléfono",
      minWidth: 180,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "email",
      headerName: "Correo",
      minWidth: 180,
      flex: 1,
    },
    {
      field: "statusPay",
      headerName: "Estado Pago",
      minWidth: 110,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div className="tw-flex tw-justify-center tw-items-center">
          {params.value && <div>{params.value}</div>}
        </div>
      ),
    },
    {
      field: "deliveryStatus",
      headerName: "Estado de Entrega",
      minWidth: 210,
      flex: 2,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const isDelivered = params.row.deliveryStatus === "Entregado";
        return (
          <div className="tw-flex tw-justify-center tw-items-center">
            {isDelivered ? (
              <span>Entregado</span>
            ) : (
              <span>Pendiente de entrega</span>
            )}
          </div>
        );
      },
    },
  ];

  function CustomToolbar() {
    return (
      <GridToolbarContainer
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            width: "100%",
            paddingLeft: 2,
            paddingRight: 5,
            marginBottom: 0,
            marginTop: 1,
          }}
        >
          <Button
            className="tw-w-[90px] tw-h-[100%] tw-text-white tw-text-custom tw-mx-5 tw-mr-4"
            type="submit"
            sx={{
              padding: "0",
              minWidth: "auto",
              textTransform: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            style={{ textTransform: "none" }}
            onClick={handleDateChange}
          >
            <FilterListIcon
              style={{ marginBottom: 5, fontSize: 30, color: "#02AF9B" }}
            />
            <Typography style={{ color: "#02AF9B" }}>Filtrar</Typography>
          </Button>

          <Button
            className="tw-w-[100px] tw-h-[100%] tw-text-white tw-text-custom tw-mr-4"
            type="submit"
            sx={{
              padding: "0",
              minWidth: "auto",
              textTransform: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            style={{ textTransform: "none" }}
            onClick={handleDeleteFilter}
          >
            <DeleteIcon
              style={{ marginBottom: 5, fontSize: 30, color: "#02AF9B" }}
            />
            <Typography style={{ color: "#02AF9B" }}>Borrar</Typography>
          </Button>

          <Button
            className="tw-w-[90px] tw-h-[100%] tw-text-white tw-text-custom tw-mr-4"
            type="submit"
            sx={{
              padding: "0",
              minWidth: "auto",
              textTransform: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            style={{ textTransform: "none" }}
            onClick={() => handleExport()}
          >
            <GetAppIcon
              style={{ marginBottom: 5, fontSize: 30, color: "#02AF9B" }}
            />
            <Typography style={{ color: "#02AF9B" }}>Exportar</Typography>
          </Button>
        </Box>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "35%",
              paddingBottom: 3,
              paddingTop: 0,
              paddingLeft: 2,
            }}
          >
            <Typography
              variant="inherit"
              style={{
                paddingBottom: 8,
                fontSize: 14.4,
                color: "rgba(0, 0, 0, 0.6)",
              }}
            >
              Consulta General
            </Typography>
            <GridToolbarQuickFilter
              sx={{
                width: "100%",
                height: "40px",
                backgroundColor: "#f4f4f4",
                borderRadius: "8px",
                textDecoration: "none",
                "& .MuiInputBase-root": {
                  height: "40px",
                  backgroundColor: "#f4f4f4",
                  borderRadius: "8px",
                  textDecoration: "none",
                  "&.MuiInput-underline:before": {
                    borderBottom: "none",
                  },
                },
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              paddingRight: 110,
              gap: 2, // Espacio entre elementos
            }}
          >
            <div
              style={{
                flex: 1,
                paddingLeft: 50,
                paddingRight: 15,
              }}
            >
              <TextField
                label="Fecha Inicio"
                type="date"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  max: dateToday,
                }}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div style={{ flex: 1 }}>
              <TextField
                label="Fecha Fin"
                type="date"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  max: dateToday,
                }}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <div
              style={{
                display: "flex",
                gap: "16px", // Define el espacio entre los elementos
                justifyContent: "flex-start",
                flexWrap: "nowrap", // Evita que los elementos se envuelvan
              }}
            >
              {/* Filtro para Distribuidor */}
              <FormControl
                variant="outlined"
                sx={{
                  flex: "1 1 200px", // Asegura que los filtros tengan el mismo ancho y se ajusten
                  minWidth: 200, // Define un ancho mínimo
                  margin: "0 8px", // Añade márgenes a la izquierda y derecha
                }}
              >
                <InputLabel id="distributorFilter-label">
                  Distribuidor
                </InputLabel>
                <Select
                  labelId="distributorFilter-label"
                  id="distributorFilter"
                  value={distributorFilter}
                  onChange={(e) => setDistributorFilter(e.target.value)}
                  label="Distribuidor"
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 300,
                        width: "auto",
                      },
                    },
                  }}
                  sx={{
                    width: "100%", // Asegura que el Select ocupe el 100% del ancho de su contenedor
                  }}
                >
                  {distributors.length > 0 ? (
                    distributors.map((distributor) => (
                      <MenuItem key={distributor.id} value={distributor.id}>
                        {distributor.name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <CircularProgress
                          size={20}
                          style={{ marginRight: "10px", color: "#02AF9B" }}
                        />
                        <Typography variant="body2">Cargando...</Typography>
                      </div>
                    </MenuItem>
                  )}
                </Select>
              </FormControl>

              {/* Filtro para Estado de Pago */}
              <FormControl
                variant="outlined"
                sx={{
                  flex: "1 1 200px", // Asegura que tenga el mismo ancho y se ajuste
                  minWidth: 200,
                  margin: "0 8px", // Añade márgenes a la izquierda y derecha
                }}
              >
                <InputLabel id="paymentStatusFilter-label">
                  Estado de Pago
                </InputLabel>
                <Select
                  labelId="paymentStatusFilter-label"
                  id="paymentStatusFilter"
                  value={paymentStatusFilter || ""}
                  onChange={(e) => setPaymentStatusFilter(e.target.value || "")}
                  label="Estado de Pago"
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 300,
                        width: "auto",
                      },
                    },
                  }}
                  sx={{
                    width: "100%", // Asegura que el Select ocupe el 100% del ancho de su contenedor
                  }}
                >
                  <MenuItem value="">Selecciona un estado de pago</MenuItem>
                  <MenuItem value="Pagado">Pagado</MenuItem>
                  <MenuItem value="Pendiente por pagar">
                    Pendiente por pagar
                  </MenuItem>
                </Select>
              </FormControl>

              {/* Filtro para Estado de Entrega */}
              <FormControl
                variant="outlined"
                sx={{
                  flex: "1 1 200px", // Asegura que tenga el mismo ancho y se ajuste
                  minWidth: 200,
                  margin: "0 8px", // Añade márgenes a la izquierda y derecha
                }}
              >
                <InputLabel id="deliveryStatusFilter-label">
                  Estado de Entrega
                </InputLabel>
                <Select
                  labelId="deliveryStatusFilter-label"
                  id="deliveryStatusFilter"
                  value={deliveryStatusFilter || ""}
                  onChange={(e) => setDeliveryStatusFilter(e.target.value)}
                  label="Estado de Entrega"
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 300,
                        width: "auto",
                      },
                    },
                  }}
                  sx={{
                    width: "100%", // Asegura que el Select ocupe el 100% del ancho de su contenedor
                  }}
                >
                  <MenuItem value="">Selecciona un estado de entrega</MenuItem>
                  <MenuItem value="Entregado">Entregado</MenuItem>
                  <MenuItem value="Pendiente de entrega">
                    Pendiente de entrega
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
          </Box>
        </Box>
      </GridToolbarContainer>
    );
  }

  return (
    <div className='tw-flex tw-items-center tw-justify-center tw-bg-[url("/images/loginBackground.png")] tw-bg-no-repeat tw-bg-center tw-bg-cover'>
      <div className="tw-mt-3 tw-shadow-m tw-rounded-2xl tw-h-[775px] tw-w-[99%] tw-flex tw-flex-col tw-justify-center tw-items-center tw-mb-5 ">
        <Typography
          className="tw-text-black tw-w-full"
          variant="h6"
          color="textPrimary"
          display={"flow"}
          align="center"
          fontWeight="bold"
        >
          {dictionary.dictionary?.backOffice?.labelReportAdmin}
        </Typography>
        <div
          style={{ height: 650, width: "100%" }}
          className="tw-bg-white tw-shadow-m tw-rounded-2xl tw-m-6"
        >
          <DataGrid
            apiRef={apiRef}
            rows={data ?? []}
            columns={columns}
            slots={{ toolbar: CustomToolbar }}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 15 },
              },
              columns: {
                columnVisibilityModel: {
                  status: false,
                  traderName: false,
                },
              },
              sorting: {
                sortModel: [{ field: "created_at", sort: "asc" }],
              },
            }}
            pageSizeOptions={[15, 25]}
            className="tw-rounded-2xl"
            disableColumnSelector
            disableDensitySelector
            disableColumnFilter
            disableRowSelectionOnClick
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#dddddd",
                color: "#000000",
                fontWeight: "bold",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PendingPaymentReports;
