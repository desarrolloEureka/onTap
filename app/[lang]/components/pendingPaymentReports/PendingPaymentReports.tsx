import useDictionary from "@/hooks/dictionary/useDictionary";
import { Typography, Button, TextField } from "@mui/material";
import { Modal, Box, IconButton, InputAdornment, Tooltip } from "@mui/material";
import { DataGrid, GridColDef, GridToolbarContainer } from "@mui/x-data-grid";
import { GridToolbarQuickFilter } from "@mui/x-data-grid/components";
// Iconos
import GetAppIcon from "@mui/icons-material/GetApp";
import FilterListIcon from "@mui/icons-material/FilterList";
import DeleteIcon from "@mui/icons-material/Delete";
import PendingPaymentReportsHook from "./hooks/PendingPaymentReportsHook";
import PaymentIcon from "@mui/icons-material/Payment";
import ReactCountryFlag from "react-country-flag";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import InfoIcon from "@mui/icons-material/Info";
import SubjectIcon from "@mui/icons-material/Subject";
import DescriptionIcon from "@mui/icons-material/Description";
import SaveIcon from "@mui/icons-material/Save";
import { Close } from "@mui/icons-material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
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
    handleGetSelectedRows,
    handleDeleteFilter,
    isModalOpen,
    handleCloseModal,
    handleOpenModal,
    mostrarDetalleCompra,
  } = PendingPaymentReportsHook({ handlePayUser });
  const dictionary = useDictionary({ lang: "es" });
  const dateToday = new Date().toISOString().split("T")[0];

  const columns: GridColDef[] = [
    {
      field: "detalleCompra",
      headerName: "Detalle de Compra",
      minWidth: 150,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Tooltip title="Ver detalles de la compra" arrow>
          <InfoIcon
            style={{ cursor: "pointer", color: "#1976d2" }}
            onClick={() => mostrarDetalleCompra(params.row)}
          />
        </Tooltip>
      ),
    },
    {
      field: "created_at",
      headerName: "Fecha Registro",
      minWidth: 210,
      flex: 2,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div className="tw-flex tw-justify-center tw-items-center">
          <div>{formatearFecha(params.value)}</div>
        </div>
      ),
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
      flex: 2,
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
      minWidth: 250,
      flex: 2,
    },
    {
      field: "plan",
      headerName: "Plan",
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
      field: "userType",
      headerName: "Tipo Usuario",
      minWidth: 130,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div className="tw-flex tw-justify-center tw-items-center">
          {params.value && (
            <div>{params.value.gif === true ? "Obsequio" : "Comprador"}</div>
          )}
        </div>
      ),
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
      field: "optionPay",
      headerName: "Pagar",
      minWidth: 110,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Button
          style={{ color: "black" }}
          onClick={() => handlePayUser(params.value, true)}
          disabled={params.value.userInvoice.status === "PAID"}
        >
          <PaymentIcon />
        </Button>
      ),
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
            onClick={handleGetSelectedRows}
          >
            <PaymentOutlinedIcon
              style={{ marginBottom: 5, fontSize: 30, color: "#02AF9B" }}
            />
            <Typography style={{ color: "#02AF9B" }}>Pagar</Typography>
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
            sx={{ display: "flex", alignItems: "center", paddingRight: 110 }}
          >
            <div
              style={{
                height: "100%",
                width: "50%",
                paddingLeft: 5,
                paddingRight: 15,
              }}
            >
              <div style={{ height: "100%", width: "90%" }}>
                <TextField
                  label="Fecha Inicio"
                  type="date"
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
            </div>
            <div style={{ height: "100%", width: "50%" }}>
              <div style={{ height: "100%", width: "90%" }}>
                <TextField
                  label="Fecha Fin"
                  type="date"
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
          {dictionary.dictionary?.backOffice?.labelPendingPaymentReports}
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
            checkboxSelection
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
      <Modal
        open={isModalOpen}
        onClose={() => handleCloseModal()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="tw-flex tw-justify-center tw-items-center"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "#02AF9B",
            padding: 0.5,
            borderRadius: 3,
            position: "relative",
          }}
        >
          <IconButton
            className="tw-absolute tw-right-1 tw-top-1"
            onClick={() => handleCloseModal()}
          >
            <Close className="tw-text-white" />
          </IconButton>
          <div className="tw-w-full tw-h-4/5 tw-flex tw-flex-col tw-justify-center tw-items-center tw-mx-10">
            <div className="tw-w-11/12 tw-bg-white tw-shadow-lg tw-rounded-2xl tw-py-3 tw-mt-10 tw-mb-6">
              {query?.length > 0 ? (
                <table className="tw-w-full tw-table-auto tw-border-collapse">
                  <thead>
                    <tr>
                      <th className="tw-px-4 tw-py-2 tw-text-left tw-font-semibold">
                        Nombre del Material
                      </th>
                      <th className="tw-px-4 tw-py-2 tw-text-left tw-font-semibold">
                        Precio Final del Material
                      </th>
                      <th className="tw-px-4 tw-py-2 tw-text-left tw-font-semibold">
                        SKU del Material
                      </th>
                      <th className="tw-px-4 tw-py-2 tw-text-left tw-font-semibold">
                        Estado del Material
                      </th>
                      <th className="tw-px-4 tw-py-2 tw-text-left tw-font-semibold">
                        Nombre del Plan
                      </th>
                      <th className="tw-px-4 tw-py-2 tw-text-left tw-font-semibold">
                        Precio Final del Plan
                      </th>
                      <th className="tw-px-4 tw-py-2 tw-text-left tw-font-semibold">
                        SKU del Plan
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {query.map((user: any) => {
                      console.log("User full data:", user); // Verifica todo el objeto user

                      // Accede de manera segura a los datos
                      const selectedMaterial =
                        user?.userOrder?.selectedMaterial || {};
                      const selectedPlan =
                        user?.userInvoice?.selectedPlan || {};

                      // Verifica los datos específicos
                      console.log("Selected Material:", selectedMaterial);
                      console.log("Selected Plan:", selectedPlan);

                      return (
                        <tr key={user.id}>
                          <td>{selectedMaterial?.name || "Sin nombre"}</td>
                          <td>${selectedMaterial?.finalPrice || 0}</td>
                          <td>{selectedMaterial?.sku || "Sin SKU"}</td>
                          <td>
                            {selectedMaterial?.status ? "Activo" : "Inactivo"}
                          </td>
                          <td>{selectedPlan?.name || "Sin plan"}</td>
                          <td>${selectedPlan?.finalPrice || 0}</td>
                          <td>{selectedPlan?.sku || "Sin SKU"}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <Typography variant="body1">
                  No hay datos para mostrar
                </Typography>
              )}
            </div>
          </div>
          ;
        </Box>
      </Modal>
    </div>
  );
};

export default PendingPaymentReports;
