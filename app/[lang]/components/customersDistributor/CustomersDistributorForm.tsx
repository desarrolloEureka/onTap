import Link from "next/link";
import {
  Typography,
  Button,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Modal, Box, IconButton, Tooltip } from "@mui/material";
import { DataGrid, GridColDef, GridToolbarContainer } from "@mui/x-data-grid";
import { GridToolbarQuickFilter } from "@mui/x-data-grid/components";
// AnotherComponent.ts
import editAndUpdateUserProfile from "./hooks/CustomersCreateFormHook"; // Subimos una carpeta

import useDictionary from "@/hooks/dictionary/useDictionary";
// Icons
import { Close } from "@mui/icons-material";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import BadgeIcon from "@mui/icons-material/Badge";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import GetAppIcon from "@mui/icons-material/GetApp";
import FilterListIcon from "@mui/icons-material/FilterList";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import EditIcon from "@mui/icons-material/Edit";

import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import WorkIcon from "@mui/icons-material/Work";

//QR
import ReactCountryFlag from "react-country-flag";
import { countries } from "../../globals/constants";
import SaveIcon from "@mui/icons-material/Save";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import CustomersDistributorHook from "./hooks/CustomersDistributorHook";
import PaymentIcon from "@mui/icons-material/Payment";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import React from "react";
import { Department } from "../departments/hooks/DepartmentsHook";
import moment from "moment";

const CustomersDistributorForm = ({
  handleCreateUser,
  handlePayUser,
  setUserId
}: {
  handleCreateUser: any;
  handlePayUser: any;
  setUserId: any;
}) => {
  const {
    data,
    isModalOpen,
    setDni,
    dni,
    name,
    setName,
    email,
    setEmail,
    plan,
    setPlan,
    dataRegisterHandle,
    handleDateChange,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    phoneCode,
    setPhoneCode,
    phone,
    setPhone,
    handleCloseModal,
    isEditData,
    confirmEmail,
    setConfirmEmail,
    errorDniForm,
    errorNameForm,
    errorPlanForm,
    errorPhoneForm,
    errorPhoneCodeForm,
    errorMailForm,
    errorConfirmEmailForm,
    handleEditData,
    apiRef,
    formatearFecha,
    getCountryFlag,
    getCountryName,
    handleGetSelectedRows,
    handleExport,
    selectedRows,
    mostrarDetalleCompra,
    detalleCompra,
    formatPrice,
    handleDeleteFilter,
    query,
    isModalOpen2,
    isModalOpen3,
    setIsModalOpen3,
    handleUpdatePerfil,
    handleOpenModalAndLoadData,

    setDocumentType,
    setDocumentNumber,
    setFirstName,
    setPhoneNumber,
    setAddress,
    setCity,
    setCountry,
    setIsActive,
    setLastName,
    setDepartments,
    setCities,
    setState,

    documentType,
    documentNumber,
    firstName,
    lastName,
    phoneNumber,
    address,
    city,
    state,
    country,
    isActive,
    departments,
    cities,

    handleChangeDepartament,
    handleChangeCity,
    handleNewBuy
  } = CustomersDistributorHook({ handlePayUser, setUserId, handleCreateUser });
  const dictionary = useDictionary({ lang: "es" });
  const dateToday = new Date().toISOString().split("T")[0];


  const getFormattedDate = (date: any) => {
    return moment(date).format("DD/MM/YYYY HH:mm:ss");
  };

  const calculateTotalDiscount = () => {
    const planPrice = detalleCompra?.userOrder?.selectedPlan?.finalPrice || 0;
    const comboPrice = detalleCompra?.userOrder?.selectedCombo?.finalPrice || 0;
    const materialPrice = detalleCompra?.userOrder?.selectedMaterial?.finalPrice || 0;
    const customizacion = detalleCompra?.userOrder?.selectedCustomization?.finalPrice || 0;

    // Calculando la cantidad de productos con precio distribuidor
    const totalDistributorPrice =
      detalleCompra?.userOrder?.selectedProducts?.reduce(
        (acc: number, product: any) =>
          acc +
          (product.categoryPrice || 0) +
          (product.full_price_Discount || 0),
        0
      ) || 0;
    return planPrice + materialPrice + totalDistributorPrice + customizacion + comboPrice;
  };

  const totalDiscount = calculateTotalDiscount();

  const columns: GridColDef[] = [
    {
      field: "optionEdit",
      headerName: "Editar",
      minWidth: 100,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Button
          style={{ color: "black" }}
          onClick={() => handleOpenModalAndLoadData(params?.value)}
        >
          <EditIcon />
        </Button>
      ),
    },
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
            style={{ cursor: "pointer", color: "#02AF9B" }}
            onClick={() => mostrarDetalleCompra(params?.row)}
          />
        </Tooltip>
      ),
    },
    {
      field: "NuevaCompra",
      headerName: "Nueva Compra",
      minWidth: 120,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <ShoppingCartIcon
          style={{ cursor: "pointer", color: "#02AF9B" }}
          onClick={() => handleNewBuy(params?.row)}
        />
      ),
    },
    {
      field: "secuencialId",
      headerName: "No. OC",
      minWidth: 150,
      flex: 2,
      renderCell: (params) => (
        <div className="tw-flex tw-justify-center tw-items-center">
          <div>{params.value}</div>
        </div>
      ),
      sortComparator: (v1, v2) => {
        const extractNumber = (val: any) => {
          const match = val?.match(/\d+/);
          return match ? parseInt(match[0], 10) : 0;
        };

        return extractNumber(v1) - extractNumber(v2);
      },
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
      field: "idUser",
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
      minWidth: 200,
      flex: 2,
    },
    {
      field: "combo",
      headerName: "Combo",
      minWidth: 170,
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
      minWidth: 210,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div className="tw-flex tw-justify-center tw-items-center">
          {params.value && (
            <div>{params.value?.idDistributor ? "Registrado por distribuidor" : params.value.gif ? "Obsequio" : "Comprador"}</div>

          )}
        </div>
      ),
    },
    {
      field: "paymentDate",
      headerName: "Fecha Pago Suscripcion",
      minWidth: 190,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div className="tw-flex tw-justify-center tw-items-center">
          {params.value ? getFormattedDate(params.value) : 'Pendiente'}
        </div>
      ),
    },
    {
      field: "paymentDateInvoice",
      headerName: "Fecha Pago",
      minWidth: 190,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div className="tw-flex tw-justify-center tw-items-center">
          {params.value ? getFormattedDate(params.value) : ' - '}
        </div>
      ),
    },
    {
      field: "statusPay",
      headerName: "Estado Pago",
      minWidth: 250,
      flex: 2,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div className="tw-flex tw-justify-center tw-items-center">
          {params.value && <div>{params.value}</div>}
        </div>
      ),
    },
    {
      field: "autoPaymentAuthorized",
      headerName: "Pago Automático",
      minWidth: 130,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div className="tw-flex tw-justify-center tw-items-center">
          <>
            {params.value ? (
              <div className="tw-flex tw-items-center tw-gap-1">
                <CheckCircleIcon className="tw-text-green-500" />
                <span>Sí</span>
              </div>
            ) : (
              <div className="tw-flex tw-items-center tw-gap-1">
                <CancelIcon className="tw-text-red-500" />
                <span>No</span>
              </div>
            )}
          </>
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
          disabled={params?.value?.userInvoice?.status === "PAID"}
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
            onClick={handleCreateUser}
          >
            <AddCircleRoundedIcon
              style={{ marginBottom: 5, fontSize: 30, color: "#02AF9B" }}
            />
            <Typography style={{ color: "#02AF9B" }}>Crear</Typography>
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
          {dictionary.dictionary?.backOffice?.LabelCustomersDistributor}
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
                //sortModel: [{ field: "created_at", sort: "desc" }],
                sortModel: [{ field: "secuencialId", sort: "desc" }],
              },
            }}
            pageSizeOptions={[15, 25]}
            className="tw-rounded-2xl"
            disableColumnSelector
            disableDensitySelector
            disableColumnFilter
            disableRowSelectionOnClick
            checkboxSelection
            ignoreDiacritics={true}
            isRowSelectable={(params) =>
              params.row.userInvoice?.status !== "PAID"
            }
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

      {/* Modal para crear un cliente de distribuidor */}
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

          <div className="tw-w-[100%] tw-h-[80%] tw-flex tw-flex-col tw-justify-center tw-items-center">
            <div className="tw-w-[90%] tw-bg-white tw-shadow-m tw-rounded-2xl tw-py-3 tw-mt-10 tw-mb-6 tw-flex tw-flex-col tw-justify-center tw-items-center">
              <div className="tw-w-full tw-h-[95%] tw-flex-row tw-justify-center tw-justify-items-center tw-mx-20 tw-mt-2 tw-mb-2">
                <div className="tw-w-full tw-flex tw-justify-center tw-justify-items-center">
                  <TextField
                    variant="standard"
                    label={dictionary.dictionary?.backOffice.dni}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <BadgeIcon
                            style={{
                              color: "#02AF9B",
                              fontSize: "1.8rem",
                              marginRight: "1rem",
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                    id="outlined-required"
                    value={dni}
                    className="tw-mb-4 tw-w-[300px] tw-text-sm tw-mt-4"
                    onChange={(e) => setDni(e.target.value)}
                    error={Boolean(errorDniForm)}
                    helperText={errorDniForm}
                  />
                </div>
                <div className="tw-w-full tw-flex tw-justify-center tw-justify-items-center tw-mt-1">
                  <TextField
                    id="outlined-required"
                    value={name}
                    variant="standard"
                    label={dictionary.dictionary?.backOffice.Nombre}
                    className="tw-mb-4 tw-w-[300px] tw-text-sm"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonOutlinedIcon
                            style={{
                              color: "#02AF9B",
                              fontSize: "1.8rem",
                              marginRight: "1rem",
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                    onChange={(e) => setName(e.target.value)}
                    error={Boolean(errorNameForm)}
                    helperText={errorNameForm}
                  />
                </div>

                <div className="tw-w-full tw-flex tw-justify-center tw-justify-items-center tw-mt-1">
                  <TextField
                    id="outlined-required"
                    value={email}
                    variant="standard"
                    className="tw-mb-4 tw-w-[300px] tw-text-sm"
                    label={dictionary.dictionary?.backOffice.Email}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AlternateEmailIcon
                            style={{
                              color: "#02AF9B",
                              fontSize: "1.8rem",
                              marginRight: "1rem",
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                    onChange={(e) => setEmail(e.target.value)}
                    error={Boolean(errorMailForm)}
                    helperText={errorMailForm}
                    onCopy={(e) => e.preventDefault()} // Bloquea copiar
                    onCut={(e) => e.preventDefault()} // Bloquea cortar
                  />
                </div>
                <div className="tw-w-full tw-flex tw-justify-center tw-justify-items-center tw-mt-1">
                  <TextField
                    id="outlined"
                    value={confirmEmail}
                    variant="standard"
                    className="tw-mb-4 tw-w-[300px] tw-text-sm"
                    label={dictionary.dictionary?.backOffice.ConfirmEmail}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AlternateEmailIcon
                            style={{
                              color: "#02AF9B",
                              fontSize: "1.8rem",
                              marginRight: "1rem",
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                    onChange={(e) => setConfirmEmail(e.target.value)}
                    error={Boolean(errorConfirmEmailForm)}
                    helperText={errorConfirmEmailForm}
                    onCopy={(e) => e.preventDefault()} // Bloquea copiar
                    onCut={(e) => e.preventDefault()} // Bloquea cortar
                    onPaste={(e) => e.preventDefault()} // Bloquea pegar
                  />
                </div>
                <div className="tw-w-full tw-flex tw-justify-center tw-justify-items-center tw-mt-1 ">
                  <div className="tw-w-[300px] tw-flex tw-items-start tw-justify-center tw-mb-4 tw-mt-3">
                    <div className="tw-w-[40%] tw-items-start">
                      <Select
                        variant="outlined"
                        className="tw-w-[100%] tw-text-center"
                        value={phoneCode}
                        style={{ height: "48px" }}
                        required
                        id="outlined-required"
                        defaultValue=""
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxHeight: 150,
                            },
                          },
                        }}
                        onChange={(e) => setPhoneCode(e.target.value)}
                        error={Boolean(errorPhoneCodeForm)}
                      >
                        {countries.map((country) => (
                          <MenuItem key={country.id} value={country.id}>
                            <ReactCountryFlag
                              countryCode={country.flag}
                              svg
                              style={{ marginRight: "8px" }}
                            />
                            {country.code}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                    <div className="tw-h-[100%] tw-w-[60%] tw-items-start tw-ml-2">
                      <TextField
                        id="standard-number"
                        value={phone}
                        variant="standard"
                        className="tw-w-full"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          inputMode: "numeric",
                          maxLength: 10,
                        }}
                        label={dictionary.dictionary?.backOffice.Phone}
                        onChange={(e) => setPhone(e.target.value)}
                        error={Boolean(errorPhoneForm)}
                        helperText={errorPhoneForm}
                      />
                    </div>
                  </div>
                </div>
                <div className="tw-w-full tw-flex tw-justify-center tw-justify-items-center tw-mt-0">
                  <div className="tw-w-[300px] tw-flex-row tw-items-start tw-justify-start tw-mb-4 tw-mt-1">
                    <Typography
                      color="textSecondary"
                      display={"flow"}
                      className="tw-text-left tw-text-sm tw-mb-2"
                    >
                      {dictionary.dictionary?.backOffice.Plan}
                    </Typography>
                    <div className="tw-relative">
                      <PersonOutlinedIcon
                        style={{
                          color: "#02AF9B",
                          fontSize: "1.8rem",
                          marginTop: "1rem",
                          marginLeft: "1rem",
                          position: "absolute",
                        }}
                      />
                      <Select
                        className="tw-w-[300px] tw-text-center tw-mb-4"
                        required
                        id="outlined-required"
                        value={plan}
                        variant="outlined"
                        onChange={(e) => setPlan(e.target.value)}
                        error={Boolean(errorPlanForm)}
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxHeight: 150,
                            },
                          },
                        }}
                      >
                        <MenuItem value="standard">
                          {dictionary.dictionary?.backOffice.StandardPlan}
                        </MenuItem>
                        <MenuItem value="premium">
                          {dictionary.dictionary?.backOffice.PremiumPlan}
                        </MenuItem>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tw-w-[101%] tw-flex tw-justify-center tw-items-center tw-border-t-white tw-border-t-[0.5px] tw-border-x-0 tw-border-b-0 tw-border-solid">
              <div className="tw-w-1/2 tw-py-4 tw-flex tw-flex-col tw-justify-center tw-items-start">
                <div className="tw-w-40 tw-flex tw-flex-col tw-justify-center tw-items-center"></div>
              </div>
              <div className="tw-w-1/2 tw-py-4 tw-flex tw-justify-end tw-items-center">
                <div className="tw-w-[100%] tw-h-full tw-flex tw-justify-end tw-items-center">
                  <div className="tw-w-full tw-h-full tw-flex tw-justify-end tw-items-center">
                    <div className="tw-w-[40%] tw-h-full tw-flex tw-justify-center tw-items-center tw-mr-10">
                      <Button
                        variant="text"
                        className="tw-text-black tw-ml-6"
                        onClick={
                          isEditData ? handleEditData : dataRegisterHandle
                        }
                        sx={{
                          padding: "0",
                          minWidth: "auto",
                          textTransform: "none",
                          display: "flex",
                          alignItems: "center",
                        }}
                        startIcon={
                          <SaveIcon
                            style={{
                              paddingLeft: 1,
                              fontSize: 25,
                              color: "white",
                            }}
                          />
                        }
                      >
                        <Typography style={{ color: "white" }}>
                          Guardar
                        </Typography>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>

      {/* Modal para abrir el detalle de la venta */}
      <Modal
        open={isModalOpen2}
        onClose={(event, reason) => {
          if (reason === "backdropClick") {
            // con esta propiedad se evita el cierre de modal cuando se da click afuera
            return;
          }
          handleCloseModal(); // Cierra el modal solo si no fue un clic en el fondo
        }}
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
            maxWidth: "1000px",
            maxHeight: "90vh",
          }}
        >
          <IconButton
            className="tw-absolute tw-right-1 tw-top-1"
            onClick={() => handleCloseModal()}
          >
            <Close className="tw-text-white" />
          </IconButton>
          <div className="tw-w-[100%] tw-h-[80%] tw-flex tw-flex-col tw-justify-center tw-items-center tw-mx-10 tw-my-2">
            <div className="tw-w-11/12 tw-bg-white tw-shadow-lg tw-rounded-2xl tw-py-3 tw-mt-10 tw-mb-6">
              {/* Título del Modal */}
              <div className="tw-flex tw-items-center tw-justify-center tw-mb-6">
                <Typography
                  variant="h5"
                  className="tw-font-semibold tw-text-gray-800"
                >
                  Detalle Resumen De Compra -
                </Typography>
                {detalleCompra ? (
                  <Typography variant="h5" className="tw-font-semibold tw-text-gray-800 tw-ml-4">
                    {detalleCompra.secuencialId || "No disponible"}
                  </Typography>
                ) : (
                  <Typography variant="h5" className="tw-font-semibold tw-text-gray-800 tw-ml-4">
                    No disponible
                  </Typography>
                )}
              </div>

              <Box
                sx={{
                  overflowY: "auto",
                  maxHeight: "45vh",
                }}
              >
                {query?.length > 0 ? (
                  <table className="tw-w-full tw-table-auto tw-border-collapse">
                    <thead className="tw-bg-gray-100">
                      <tr>
                        <th className="tw-px-6 tw-py-4 tw-text-left tw-font-semibold tw-border-b tw-border-gray-300">
                          Descripción
                        </th>
                        <th className="tw-px-6 tw-py-4 tw-text-center tw-font-semibold tw-border-b tw-border-gray-300">
                          Cantidad
                        </th>
                        <th className="tw-px-6 tw-py-4 tw-text-center tw-font-semibold tw-border-b tw-border-gray-300">
                          Precio Venta
                        </th>
                        <th className="tw-px-6 tw-py-4 tw-text-center tw-font-semibold tw-border-b tw-border-gray-300">
                          Total
                        </th>
                        <th className="tw-px-6 tw-py-4 tw-text-center tw-font-semibold tw-border-b tw-border-gray-300">
                          Precio Distribuidor
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Combo Seleccionado */}
                      {detalleCompra?.userOrder?.selectedCombo &&
                        <tr className="tw-border-b tw-border-gray-200 hover:tw-bg-gray-50">
                          <td className="tw-px-6 tw-py-4">
                            Combo Seleccionado:{" "}
                            <span className="tw-font-medium">
                              {detalleCompra?.userOrder?.selectedCombo?.name}
                            </span>
                          </td>
                          <td className="tw-text-center">1</td>
                          <td className="tw-text-center">{`$${formatPrice(
                            detalleCompra?.userOrder?.selectedCombo?.full_price
                          )}`}</td>
                          <td className="tw-text-center">{`$${formatPrice(
                            detalleCompra?.userOrder?.selectedCombo?.full_price
                          )}`}</td>
                          <td className="tw-text-center">{`$${formatPrice(
                            detalleCompra?.userOrder?.selectedCombo?.finalPrice
                          )}`}</td>
                        </tr>
                      }
                      {detalleCompra?.optionPay?.plan && (
                        <tr className="tw-border-b tw-border-gray-200 hover:tw-bg-gray-50">
                          <td className="tw-px-6 tw-py-4">
                            Plan Seleccionado:{" "}
                            <span className="tw-font-medium">
                              {detalleCompra?.userOrder?.selectedPlan?.name}
                            </span>
                          </td>
                          <td className="tw-text-center">1</td>
                          <td className="tw-text-center">{`$${formatPrice(
                            detalleCompra?.userOrder?.selectedPlan?.price
                          )}`}</td>
                          <td className="tw-text-center">{`$${formatPrice(
                            detalleCompra?.userOrder?.selectedPlan?.price
                          )}`}</td>
                          <td className="tw-text-center">{`$${formatPrice(
                            detalleCompra?.userOrder?.selectedPlan?.finalPrice
                          )}`}</td>
                        </tr>
                      )}

                      {/* Materiales Seleccionados */}
                      {detalleCompra?.userOrder?.selectedMaterial && (
                        <tr className="tw-border-b tw-border-gray-200 hover:tw-bg-gray-50">
                          <td className="tw-px-6 tw-py-4">
                            Materiales Seleccionados:{" "}
                            <span className="tw-font-medium">
                              {detalleCompra?.userOrder?.selectedMaterial?.name}
                            </span>
                          </td>
                          <td className="tw-text-center">1</td>
                          <td className="tw-text-center">{`$${formatPrice(
                            detalleCompra?.userOrder?.selectedMaterial?.full_price
                          )}`}</td>
                          <td className="tw-text-center">{`$${formatPrice(
                            detalleCompra?.userOrder?.selectedMaterial?.full_price
                          )}`}</td>
                          <td className="tw-text-center">{`$${formatPrice(
                            detalleCompra?.userOrder?.selectedMaterial?.finalPrice
                          )}`}</td>
                        </tr>
                      )}

                      {/* Productos Seleccionados */}
                      {detalleCompra?.userOrder?.selectedProducts?.map(
                        (product: any, index: any) => (
                          <React.Fragment key={index}>
                            <tr className="tw-border-b tw-border-gray-200 hover:tw-bg-gray-50">
                              <td className="tw-px-6 tw-py-4">{product.name}</td>
                              <td className="tw-text-center">
                                {product.quantity}
                              </td>
                              <td className="tw-text-center">
                                ${formatPrice(product.full_price)}
                              </td>
                              <td className="tw-text-center">
                                $
                                {formatPrice(
                                  product.full_price * product.quantity
                                )}
                              </td>
                              <td className="tw-text-center">
                                ${formatPrice(product.categoryPrice)}
                              </td>
                            </tr>
                            {product.hasPersonalization && (
                              <tr className="tw-border-b tw-border-gray-200 hover:tw-bg-gray-50 tw-text-gray-600">
                                <td className="tw-px-6 tw-py-4">
                                  Personalización: {product.name}
                                </td>
                                <td className="tw-text-center">1</td>
                                <td className="tw-text-center">
                                  ${formatPrice(product?.full_price_custom || 0)}
                                </td>
                                <td className="tw-text-center">
                                  ${formatPrice(product?.full_price_custom || 0)}
                                </td>
                                <td className="tw-text-center">
                                  $
                                  {formatPrice(product?.full_price_Discount || 0)}
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        )
                      )}

                      {/* Customización Seleccionada */}
                      {detalleCompra?.userOrder?.selectedCustomization ? (
                        <tr className="tw-border-b tw-border-gray-200 hover:tw-bg-gray-50">
                          <td className="tw-px-6 tw-py-4">
                            Personalización:{" "}
                            <span className="tw-font-medium">
                              {detalleCompra?.userOrder?.selectedCustomization
                                ?.name || ""}
                            </span>
                          </td>
                          <td className="tw-text-center">1</td>
                          <td className="tw-text-center">{`$${formatPrice(
                            detalleCompra?.userOrder?.selectedCustomization
                              ?.full_price
                          )}`}</td>
                          <td className="tw-text-center">{`$${formatPrice(
                            detalleCompra?.userOrder?.selectedCustomization
                              ?.full_price
                          )}`}</td>
                          <td className="tw-text-center">{`$${formatPrice(
                            detalleCompra?.userOrder?.selectedCustomization
                              ?.finalPrice
                          )}`}</td>
                        </tr>
                      ) : null}
                    </tbody>
                    <tfoot>
                      <tr className="tw-bg-gray-100">
                        <td
                          colSpan={4}
                          className="tw-px-6 tw-py-4 tw-text-right tw-font-bold tw-border-t tw-border-gray-300"
                        >
                          SubTotal:
                        </td>
                        <td className="tw-px-6 tw-py-4 tw-text-center tw-font-bold tw-border-t tw-border-gray-300">
                          $
                          {formatPrice(
                            detalleCompra?.userOrder?.totalAmount || 0
                          )}
                        </td>
                      </tr>
                      <tr className="tw-bg-gray-100">
                        <td
                          colSpan={4}
                          className="tw-px-6 tw-py-4 tw-text-right tw-font-bold tw-border-t tw-border-gray-300"
                        >
                          Total:
                        </td>
                        <td className="tw-px-6 tw-py-4 tw-text-center tw-font-bold tw-border-t tw-border-gray-300">
                          ${formatPrice(totalDiscount || 0)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                ) : (
                  <Typography variant="body1" className="tw-text-center tw-my-4">
                    No hay datos para mostrar
                  </Typography>
                )}
              </Box>

              <div className="tw-flex tw-items-center tw-justify-center tw-mb-3 tw-mt-5">
                <Typography
                  variant="h5"
                  className="tw-font-semibold tw-text-gray-800"
                >
                  Datos Personalización
                </Typography>
              </div>

              <div className="tw-flex tw-flex-col tw-items-center tw-mb-2 tw-mx-7">
                <FormControl
                  fullWidth
                  variant="outlined"
                  className="tw-mb-6"
                >
                  <div className="tw-flex tw-justify-between tw-mb-2 tw-mt-4">
                    <TextField
                      variant="standard"
                      label="Nombres en la tarjeta"
                      InputProps={{
                        readOnly: true,
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon
                              style={{
                                color: "#02AF9B",
                                fontSize: "1.8rem",
                                marginRight: "1rem",
                              }}
                            />
                          </InputAdornment>
                        ),
                      }}
                      fullWidth
                      className="tw-mr-2"
                      value={detalleCompra?.userOrder?.cardName || detalleCompra?.cardName || ""}
                    />

                    <TextField
                      variant="standard"
                      label="Cargo en la tarjeta"
                      InputProps={{
                        readOnly: true,
                        startAdornment: (
                          <InputAdornment position="start">
                            <WorkIcon
                              style={{
                                color: "#02AF9B",
                                fontSize: "1.8rem",
                                marginRight: "1rem",
                              }}
                            />
                          </InputAdornment>
                        ),
                      }}
                      fullWidth
                      className="tw-ml-2"
                      value={detalleCompra?.userOrder?.cardRole || detalleCompra?.cardRole || ""}
                    />
                  </div>
                </FormControl>

              </div>

            </div>
          </div>
        </Box>
      </Modal>

      {/* Modal para editar perfil de cliente de distribuidor */}
      <Modal
        open={isModalOpen3}
        onClose={(event, reason) => {
          if (reason === "backdropClick") {
            // con esta propiedad se evita el cierre de modal cuando se da click afuera
            return;
          }
          handleCloseModal(); // Cierra el modal solo si no fue un clic en el fondo
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="tw-flex tw-justify-center tw-items-center"
        sx={{
          zIndex: 1,
        }}
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

          <div className="tw-w-[100%] tw-h-[80%] tw-flex tw-flex-col tw-justify-center tw-items-center">
            <div className="tw-w-[90%] tw-bg-white tw-shadow-m tw-rounded-2xl tw-py-3 tw-mt-10 tw-mb-6 tw-flex tw-flex-col tw-justify-center tw-items-center">
              <div className="tw-w-[90%] tw-h-[95%] tw-flex-row tw-justify-center tw-justify-items-center tw-mx-32 tw-mt-4 tw-mb-5">
                <form className="tw-w-full">
                  <h2
                    id="modal-modal-title"
                    className="tw-text-xl tw-font-semibold tw-text-center tw-mb-6"
                  ></h2>
                  <div className="tw-flex tw-flex-col">
                    <div className="tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-mb-4">
                      {/* Selector de Tipo de Documento */}
                      <FormControl
                        variant="outlined"
                        className="tw-w-1/2 tw-flex tw-items-center tw-ml-4"
                      >
                        <InputLabel>Tipo de Documento</InputLabel>
                        <Select
                          label="Tipo de Documento"
                          value={documentType}
                          onChange={(e) => setDocumentType(e.target.value)}
                          className="tw-w-full"
                        >
                          <MenuItem value="AS">AS</MenuItem>
                          <MenuItem value="CC">CC</MenuItem>
                          <MenuItem value="CD">CD</MenuItem>
                          <MenuItem value="CE">CE</MenuItem>
                          <MenuItem value="CN">CN</MenuItem>
                          <MenuItem value="MS">MS</MenuItem>
                          <MenuItem value="NIT">NIT</MenuItem>
                          <MenuItem value="PA">PA</MenuItem>
                          <MenuItem value="PE">PE</MenuItem>
                          <MenuItem value="RC">RC</MenuItem>
                        </Select>
                      </FormControl>

                      {/* Campo para Número de Documento */}
                      <TextField
                        label="Número de Documento"
                        variant="outlined"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <DriveFileRenameOutlineIcon
                                style={{
                                  color: "#02AF9B",
                                  fontSize: "1.8rem",
                                  marginRight: "1rem",
                                }}
                              />
                            </InputAdornment>
                          ),
                        }}
                        className="tw-w-1/2"
                        value={documentNumber}
                        onChange={(e) => setDocumentNumber(e.target.value)}
                      />
                    </div>

                    <div className="tw-flex tw-justify-between tw-mb-2">
                      <TextField
                        label="Nombre"
                        variant="outlined"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonIcon
                                style={{
                                  color: "#02AF9B",
                                  fontSize: "1.8rem",
                                  marginRight: "1rem",
                                }}
                              />
                            </InputAdornment>
                          ),
                        }}
                        fullWidth
                        className="tw-ml-2"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        margin="normal"
                      />
                      <TextField
                        label="Apellido"
                        variant="outlined"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonIcon
                                style={{
                                  color: "#02AF9B",
                                  fontSize: "1.8rem",
                                  marginRight: "1rem",
                                }}
                              />
                            </InputAdornment>
                          ),
                        }}
                        fullWidth
                        className="tw-ml-2"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        margin="normal"
                      />
                    </div>
                    <TextField
                      label="Correo Electrónico"
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon
                              style={{
                                color: "#02AF9B",
                                fontSize: "1.8rem",
                                marginRight: "1rem",
                              }}
                            />
                          </InputAdornment>
                        ),
                      }}
                      fullWidth
                      className="tw-ml-2"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      margin="normal"
                      disabled
                    />
                    <TextField
                      label="Número de Teléfono"
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CallIcon
                              style={{
                                color: "#02AF9B",
                                fontSize: "1.8rem",
                                marginRight: "1rem",
                              }}
                            />
                          </InputAdornment>
                        ),
                      }}
                      fullWidth
                      className="tw-ml-2"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      margin="normal"
                    />
                    <TextField
                      label="Dirección"
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <HomeIcon
                              style={{
                                color: "#02AF9B",
                                fontSize: "1.8rem",
                                marginRight: "1rem",
                              }}
                            />
                          </InputAdornment>
                        ),
                      }}
                      fullWidth
                      className="tw-ml-2"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      margin="normal"
                    />
                    <div className="tw-flex tw-justify-between tw-mb-7 tw-mt-2">
                      <FormControl
                        fullWidth
                        variant="outlined"
                        className="tw-ml-2"
                      >
                        <InputLabel>Departamento</InputLabel>
                        <Select
                          label="Departamento"
                          value={state}
                          onChange={handleChangeDepartament}
                        >
                          {departments &&
                            departments.map((dep: Department) => (
                              <MenuItem
                                key={dep.departamento}
                                value={dep.departamento}
                              >
                                {dep.departamento}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                      <FormControl
                        fullWidth
                        variant="outlined"
                        className="tw-ml-2"
                      >
                        <InputLabel>Ciudad</InputLabel>
                        <Select
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          label="Ciudad"
                        >
                          {cities.map((city) => (
                            <MenuItem key={city} value={city}>
                              {city}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>

                    <div className="tw-w-[101%] tw-flex tw-justify-center tw-items-center tw-border-t-white tw-border-t-[0.5px] tw-border-x-0 tw-border-b-0 tw-border-solid">
                      <div className="tw-w-1/2 tw-py-4 tw-flex tw-flex-col tw-justify-center tw-items-start">
                        <div className="tw-w-40 tw-flex tw-flex-col tw-justify-center tw-items-center">
                          <Typography
                            style={{ fontSize: 14, color: "white" }}
                          ></Typography>
                        </div>
                      </div>
                      <div className="tw-w-1/2 tw-py-4 tw-flex tw-justify-end tw-items-center">
                        <div className="tw-w-[100%] tw-h-full tw-flex tw-justify-end tw-items-center">
                          <div className="tw-w-full tw-h-full tw-flex tw-justify-end tw-items-center">
                            <div className="tw-w-[55%] tw-h-full tw-flex tw-justify-center tw-items-center tw-mr-2">
                              <Button
                                variant="text"
                                className="tw-text-black tw-ml-6"
                                onClick={handleUpdatePerfil}
                                sx={{
                                  padding: "0",
                                  minWidth: "auto",
                                  textTransform: "none",
                                  display: "flex",
                                  alignItems: "center",
                                }}
                                startIcon={
                                  <SaveIcon
                                    style={{
                                      marginRight: -1,
                                      fontSize: 25,
                                      color: "black",
                                    }}
                                  />
                                }
                              >
                                <Typography style={{ color: "black" }}>
                                  {dictionary.dictionary?.backOffice.guardar}
                                </Typography>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default CustomersDistributorForm;
