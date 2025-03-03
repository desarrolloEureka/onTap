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
} from "@mui/material";
import { Modal, Box, IconButton } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  gridFilteredSortedRowIdsSelector,
  GridToolbarContainer,
  gridVisibleColumnFieldsSelector,
  useGridApiRef,
} from "@mui/x-data-grid";
import { GridToolbarQuickFilter } from "@mui/x-data-grid/components";
import UserTableLogic from "./hooks/UserTable";
import SwitchEdit from "./SwitchEdit";
import useDictionary from "@/hooks/dictionary/useDictionary";
// Icons
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import LinkIcon from "@mui/icons-material/Link";
import EditIcon from "@mui/icons-material/Edit";
import { Close } from "@mui/icons-material";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import BadgeIcon from "@mui/icons-material/Badge";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import VisibilityIcon from "@mui/icons-material/Visibility";
import GetAppIcon from "@mui/icons-material/GetApp";
import FilterListIcon from "@mui/icons-material/FilterList";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
//QR
import { QRCodeSVG } from "qrcode.react";
import ReactCountryFlag from "react-country-flag";
import { countries } from "../../globals/constants";
import SaveIcon from "@mui/icons-material/Save";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import moment from "moment";

const UserTable = () => {
  const {
    query,
    setFlag,
    flag,
    handleOpenModal,
    isModalOpen,
    setDni,
    dni,
    name,
    setName,
    lastName,
    setLastName,
    email,
    setEmail,
    plan,
    setPlan,
    type,
    setType,
    dataRegisterHandle,
    handleSeeQR,
    isModalQR,
    setIsModalQR,
    urlQR,
    handleDownloadQR,
    handleDateChange,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    handleDeleteFilter,
    phoneCode,
    setPhoneCode,
    phone,
    setPhone,
    exportToExcel,
    handleCloseModal,
    isEditData,
    confirmEmail,
    setConfirmEmail,
    errorDniForm,
    errorNameForm,
    errorLastNameForm,
    errorPlanForm,
    errorPhoneForm,
    errorPhoneCodeForm,
    errorMailForm,
    errorConfirmEmailForm,
    errorEmailMismatch,
    handleEditUser,
    handleEditData,
    openEditProfile,
    selectedDate,
    setSelectedDate,
    errorDateForm,
    setErrorDateForm
  } = UserTableLogic();
  const dictionary = useDictionary({ lang: "es" });
  const dateToday = new Date().toISOString().split("T")[0];
  const apiRef = useGridApiRef();

  const getCountryFlag = (item: any) => {
    const country = countries.find((country) => country.id === item);
    return country ? country.flag : "";
  };

  const getCountryName = (item: any) => {
    const country = countries.find((country) => country.id === item);
    return country ? country.code : "";
  };

  const getFormattedDate = (date: any) => {
    return moment(date).format("DD/MM/YYYY HH:mm:ss");
  };

  const getUrlFormatted = (url: any) => {
    const urlFormatted =
      url &&
      url
        //Produccion
        /*.replace(
          /localhost:3000|on-taptawny.vercel.app/g,
          "backoffice.onetap.com.co"
        )*/
        //Desarrollo
        .replace(
          /https?:\/\/backoffice\.onetap\.com\.co/g,
          "https://on-tap-dev.vercel.app"
        );
    return urlFormatted ? urlFormatted : "";
  };

  const columns: GridColDef[] = [
    {
      field: "optionEdit",
      headerName: "Editar",
      minWidth: 110,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Button
          style={{ color: "black" }}
          onClick={() => handleEditUser(params.value)}
        >
          <EditIcon />
        </Button>
      ),
    },
    {
      field: "socialEdit",
      headerName: "Editar Social", // Título de la columna
      minWidth: 110,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Button
          style={{ color: "black" }}
          onClick={() => openEditProfile("social", params.row.uid)} // Pasamos "social" al hacer clic
        >
          <EditIcon />
        </Button>
      ),
    },
    {
      field: "professionalEdit", // Campo único para la columna de "Editar Profesional"
      headerName: "Editar Profesional", // Título de la columna
      minWidth: 110,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Button
          style={{ color: "black" }}
          onClick={() => openEditProfile("professional", params.row.uid)} // Pasamos "professional" al hacer clic
        >
          <EditIcon />
        </Button>
      ),
    },
    {
      field: "date",
      headerName: "Fecha Registro",
      minWidth: 190,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div className="tw-flex tw-justify-center tw-items-center">
          <div>{getFormattedDate(params.value)}</div>
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
          {params.value && <div>{params.value.plan}</div>}
        </div>
      ),
    },
    {
      field: "userType",
      headerName: "Tipo Usuario",
      minWidth: 200,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div className="tw-flex tw-justify-center tw-items-center">
          {params.value && (
            /*  <div>{params.value.gif === true ? "Obsequio" : "Comprador"}</div> */
            <div>{params.value?.idDistributor ? "Registrado por distribuidor" : params.value.gif ? "Obsequio" : "Comprador"}</div>
          )}
        </div>
      ),
    },
    {
      field: "paymentDate",
      headerName: "Fecha Pago",
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
      field: "nextPaymentDate",
      headerName: "Fecha Vencimiento Suscripción",
      minWidth: 230,
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
      field: "url",
      headerName: "URL",
      minWidth: 100,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div className="tw-flex tw-justify-center tw-items-center">
          {params.value && (
            <>
              <Link
                className="tw-mr-5"
                href={getUrlFormatted(params.value.preview)}
              >
                <LinkIcon />{" "}
              </Link>
              <div
                onClick={() => {
                  navigator.clipboard.writeText(
                    getUrlFormatted(params.value.preview)
                  );
                }}
              >
                <ContentCopyIcon />
              </div>
            </>
          )}
        </div>
      ),
    },
    {
      field: "urlQR",
      headerName: "QR",
      minWidth: 110,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div className="tw-flex tw-justify-center tw-items-center">
          {params.value && (
            <>
              <Button
                style={{ color: "black" }}
                onClick={() =>
                  handleSeeQR(getUrlFormatted(params.value.preview))
                }
              >
                <VisibilityIcon />
              </Button>
            </>
          )}
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
      field: "edit",
      headerName: "Inactivo/Activo",
      minWidth: 120,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div>
          <SwitchEdit
            isActive={params.value.switch}
            uid={params.value.uid}
            onSwitchChange={handleSwitchChange}
          />
        </div>
      ),
    },
  ];

  const handleSwitchChange = () => {
    setFlag(!flag);
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
            marginBottom: -2,
            marginTop: 1,
          }}
        >
          <Button
            className="tw-w-[90px] tw-h-[100%] tw-text-white tw-text-custom tw-mx-5 tw-mr-2"
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
            className="tw-w-[100px] tw-h-[100%] tw-text-white tw-text-custom tw-mr-2"
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
            className="tw-w-[90px] tw-h-[100%] tw-text-white tw-text-custom tw-mr-2"
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
            onClick={handleOpenModal}
          >
            <AddCircleRoundedIcon
              style={{ marginBottom: 5, fontSize: 30, color: "#02AF9B" }}
            />
            <Typography style={{ color: "#02AF9B" }}>Crear</Typography>
          </Button>
          <Button
            className="tw-w-[90px] tw-h-[100%] tw-text-white tw-text-custom"
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
          {dictionary.dictionary?.backOffice.UserTable}
        </Typography>
        <div
          style={{ height: 650, width: "100%" }}
          className="tw-bg-white tw-shadow-m tw-rounded-2xl tw-m-6"
        >
          <DataGrid
            apiRef={apiRef}
            rows={query ?? []}
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
                sortModel: [{ field: "date", sort: "desc" }],
              },
            }}
            pageSizeOptions={[15, 25]}
            className="tw-rounded-2xl"
            disableColumnSelector
            disableDensitySelector
            disableColumnFilter
            disableRowSelectionOnClick
            ignoreDiacritics={true}
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
          <div className="tw-w-[100%] tw-h-[80%] tw-flex tw-flex-col tw-justify-center tw-items-center">
            <div className="tw-w-[90%] tw-bg-white tw-shadow-m tw-rounded-2xl tw-py-3 tw-mt-10 tw-mb-6 tw-flex tw-flex-col tw-justify-center tw-items-center">
              <div className="tw-w-[90%] tw-h-[95%] tw-flex-row tw-justify-center tw-justify-items-center tw-mx-40 tw-mt-4 tw-mb-5">


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
                    fullWidth
                    className="tw-mb-6"
                    onChange={(e) => setDni(e.target.value)}
                    error={Boolean(errorDniForm)}
                    helperText={errorDniForm}
                  />
                </div>

                <div className="tw-flex tw-justify-between tw-mb-6">
                  <TextField
                    id="outlined-required"
                    value={name}
                    variant="standard"
                    label={dictionary.dictionary?.backOffice.Nombre}
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
                    fullWidth
                    className="tw-mr-2"
                    onChange={(e) => setName(e.target.value)}
                    error={Boolean(errorNameForm)}
                    helperText={errorNameForm}
                  />

                  <TextField
                    id="outlined-required"
                    value={lastName}
                    variant="standard"
                    label={"Apellidos"}
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
                    fullWidth
                    className="tw-ml-2"
                    onChange={(e) => setLastName(e.target.value)}
                    error={Boolean(errorLastNameForm)}
                    helperText={errorLastNameForm}
                  />
                </div>

                <div className="tw-flex tw-justify-between tw-mb-6">
                  <TextField
                    id="outlined-required"
                    value={email}
                    variant="standard"
                    fullWidth
                    className="tw-mr-2"
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

                  <TextField
                    id="outlined"
                    value={confirmEmail}
                    variant="standard"
                    fullWidth
                    className="tw-ml-2"
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

                <div className="tw-w-full tw-flex tw-justify-center tw-justify-items-center">
                  <div className="tw-w-[100%] tw-flex tw-items-start tw-justify-center tw-mb-4 tw-mt-3">
                    <div className="tw-w-[20%] tw-items-start">
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
                    <div className="tw-h-[100%] tw-w-[80%] tw-items-start tw-ml-2">
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

                <div className="tw-flex tw-justify-between tw-mb-6">
                  {isEditData && (
                    <div className="tw-w-full">
                      <Typography
                        color="textSecondary"
                        display={"flow"}
                        className="tw-text-left tw-text-sm tw-mb-2"
                      >
                        Fecha Pago
                      </Typography>
                      <TextField
                        type="date"
                        fullWidth
                        className="tw-mr-2"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        error={Boolean(errorDateForm)}
                        helperText={errorDateForm}
                      />
                    </div>
                  )}

                  <div className="tw-w-full ">
                    <Typography
                      color="textSecondary"
                      display={"flow"}
                      className="tw-text-left tw-text-sm tw-mb-2"
                    >
                      {dictionary.dictionary?.backOffice.Plan}
                    </Typography>
                    <div className="tw-relative">

                      <Select
                        fullWidth
                        className="tw-ml-2"
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

      <Modal
        open={isModalQR}
        onClose={setIsModalQR}
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
            padding: 5,
            borderRadius: 3,
            position: "relative",
          }}
        >
          <IconButton
            className="tw-absolute tw-right-1 tw-top-1"
            onClick={() => setIsModalQR(false)}
          >
            <Close className="tw-text-white" />
          </IconButton>

          {urlQR && (
            <div className="tw-w-[100%] tw-h-[80%] tw-flex tw-flex-col tw-justify-center tw-justify-items-center tw-pl-3 tw-pr-3">
              <Box className="tw-w-[100%] tw-bg-white tw-shadow-m tw-rounded-2xl tw-p-10 tw-mt-4 tw-flex tw-flex-col tw-justify-center tw-items-center">
                <div className="tw-w-[380px] tw-flex tw-justify-center tw-items-center">
                  <QRCodeSVG
                    id="qrcode-svg"
                    value={urlQR}
                    size={380}
                    className=""
                  />
                </div>
              </Box>
              <Box className="tw-w-[100%] tw-bg-white tw-shadow-m tw-rounded-2xl tw-p-10 tw-mt-4 tw-flex tw-flex-col tw-justify-center tw-items-center">
                <div className="tw-w-[350px] tw-flex tw-justify-center tw-items-center">
                  <Button
                    variant="contained"
                    className="tw-mx-auto tw-mt-4 tw-w-[200px] tw-bg-[#02AF9B] tw-text-white tw-shadow-m"
                    onClick={() => handleDownloadQR()}
                  >
                    Descargar QR
                  </Button>
                </div>
              </Box>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default UserTable;
