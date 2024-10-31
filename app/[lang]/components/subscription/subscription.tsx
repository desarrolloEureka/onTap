import React from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import Close from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import InputAdornment from "@mui/material/InputAdornment";
import SubjectIcon from "@mui/icons-material/Subject";
import DescriptionIcon from "@mui/icons-material/Description";
import EditIcon from "@mui/icons-material/Edit";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import {
  DataGrid,
  GridColDef,
  GridToolbarQuickFilter,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import useSubscription from "./hooks/subscriptionHook";
import useDictionary from "@/hooks/dictionary/useDictionary";
import { Locale } from "i18n-config";

const SubscriptionView: React.FC<{ params: { lang: Locale } }> = ({
  params: { lang },
}) => {
  const {
    subscriptions,
    isModalOpen,
    annualFee,
    setAnnualFee,
    description,
    setDescription,
    handleOpenModal,
    handleCloseModal,
    handleSaveSubscription,
    handleEditSubscription,
    feeError,
    descriptionError,
    isSubmitting,
    isEditData,
    query,
    handleEditData,
  } = useSubscription();

  const dictionary = useDictionary({ lang: "es" });
  const formatPrice = (value: any) => {
    if (value == null || isNaN(value)) return "";
    const number = Number(value);
    // Configura el formato para miles, usando el separador adecuado
    return new Intl.NumberFormat("es-CO", {
      style: "decimal",
      minimumFractionDigits: 0,
    }).format(number);
  };

  const columns: GridColDef[] = [
    {
      field: "optionEdit",
      headerName: "Editar",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Button
          style={{ color: "black" }}
          onClick={() => handleEditSubscription(params.row)} // Pasa `params.row` que representa la fila completa
        >
          <EditIcon />
        </Button>
      ),
    },

    {
      field: "annual_fee",
      headerName: "Valor",
      flex: 1,
      headerAlign: "left",
      align: "left",
      cellClassName: "tw-pl-12",
      headerClassName: "tw-pl-12",
      renderCell: (params: any) => (
        <div className="tw-flex tw-justify-center tw-items-center">
          <AttachMoneyIcon
            style={{
              color: "#fffff", // Cambia el color según tus necesidades
              marginRight: "4px", // Espacio entre el icono y el texto
            }}
          />
          <div>{formatPrice(params.value)}</div>
        </div>
      ),
    },

    {
      field: "description",
      headerName: "Descripción",
      flex: 3,
      headerAlign: "left",
      align: "left",
      cellClassName: "tw-pl-12",
      headerClassName: "tw-pl-12",
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
            marginBottom: -2,
            marginTop: 1,
          }}
        >
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
            sx={{ display: "flex", alignItems: "center", paddingRight: 5 }}
          ></Box>
        </Box>
      </GridToolbarContainer>
    );
  }

  return (
    <div className="tw-flex tw-items-center tw-justify-center tw-bg-[url('/images/loginBackground.png')] tw-bg-no-repeat tw-bg-center tw-bg-cover">
      <div className="tw-mt-3 tw-shadow-m tw-rounded-2xl tw-h-[775px] tw-w-[99%] tw-flex tw-flex-col tw-justify-center tw-items-center tw-mb-5">
        <Typography
          className="tw-text-black tw-w-full"
          variant="h6"
          color="textPrimary"
          display="flow"
          align="center"
          fontWeight="bold"
        >
          {dictionary.dictionary?.backOffice.SubscriptionLabel}
        </Typography>

        <div
          style={{ height: 650, width: "100%" }}
          className="tw-bg-white tw-shadow-m tw-rounded-2xl tw-m-6"
        >
          <DataGrid
            rows={query}
            columns={columns}
            //slots={{ toolbar: CustomToolbar }}
            autoHeight
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 15 },
              },
              sorting: {
                sortModel: [{ field: "createdAt", sort: "desc" }],
              },
            }}
            pageSizeOptions={[10, 20, 30]}
            getRowId={(row) => row.id}
            disableColumnSelector
            disableDensitySelector
            disableColumnFilter
            disableRowSelectionOnClick
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#dddddd", // Fondo del header
                color: "#000000", // Color del texto del header
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
        className="tw-flex tw-justify-center tw-items-center "
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
          <div className="tw-w-[100%] tw-h-[80%] tw-flex tw-flex-col tw-justify-center tw-items-center tw-mx-40">
            <div className="tw-w-[90%] tw-bg-white tw-shadow-m tw-rounded-2xl tw-py-3 tw-mt-10 tw-mb-6 tw-flex tw-flex-col tw-justify-center tw-items-center">
              <div className="tw-w-full tw-h-[95%] tw-flex-row tw-justify-center tw-justify-items-center tw-mx-32 tw-mt-4 tw-mb-5">
                <div className="tw-w-full tw-flex tw-justify-center tw-justify-items-center">
                  <div className="tw-w-[85%] tw-h-[95%] tw-flex tw-justify-center tw-justify-items-center">
                    <TextField
                      variant="standard"
                      label="Valor"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AttachMoneyIcon
                              style={{
                                color: "#02AF9B",
                                fontSize: "1.8rem",
                                marginRight: "1rem",
                              }}
                            />
                          </InputAdornment>
                        ),
                      }}
                      InputLabelProps={{
                        style: {
                          fontSize: 18,
                        },
                      }}
                      id="subject"
                      className="tw-w-full tw-text-sm"
                      required
                      value={annualFee}
                      error={!!feeError}
                      helperText={feeError}
                      onChange={(e) => {
                        const value = e.target.value;
                        // Convertir el valor a número, o dejarlo como "" si no es válido
                        setAnnualFee(value === "" ? "" : parseFloat(value));
                      }}
                    />
                  </div>
                </div>
                <div className="tw-w-full tw-flex tw-justify-center tw-justify-items-center tw-mt-7">
                  <div className="tw-w-[85%] tw-h-[95%] tw-flex tw-justify-center tw-justify-items-center">
                    <TextField
                      variant="standard"
                      label="Descripción"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <DescriptionIcon
                              style={{
                                color: "#02AF9B",
                                fontSize: "1.8rem",
                                marginRight: "1rem",
                              }}
                            />
                          </InputAdornment>
                        ),
                      }}
                      multiline
                      rows={3} // Define una altura de 4 filas para el área de texto
                      InputLabelProps={{
                        style: {
                          fontSize: 18,
                        },
                      }}
                      id="description"
                      className="tw-w-full tw-text-sm"
                      required
                      value={description}
                      error={!!descriptionError}
                      helperText={
                        descriptionError || `${description.length}/120`
                      } // Muestra la longitud actual
                      onChange={(e) => {
                        // Limita a 120 caracteres
                        if (e.target.value.length <= 120) {
                          setDescription(e.target.value);
                        }
                      }}
                      margin="normal"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="tw-w-full tw-flex tw-justify-end tw-items-center tw-border-t-white tw-border-t-[0.5px] tw-border-x-0 tw-border-b-0 tw-border-solid tw-p-4">
              <Button
                variant="text"
                className="tw-text-black tw-ml-6"
                onClick={isEditData ? handleEditData : handleSaveSubscription}
                sx={{
                  padding: "0",
                  minWidth: "auto",
                  textTransform: "none",
                  display: "flex",
                  alignItems: "center",
                }}
                startIcon={
                  <SaveIcon
                    style={{ paddingLeft: 1, fontSize: 25, color: "white" }} // Asegúrate de que este color sea el correcto
                  />
                }
              >
                <Typography style={{ color: "white" }}>
                  {isEditData ? "Actualizar" : "Guardar"}
                </Typography>
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default SubscriptionView;
