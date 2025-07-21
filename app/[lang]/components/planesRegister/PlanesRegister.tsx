import { Box, Button, FormControl, Grid, IconButton, InputAdornment, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import useDictionary from "@/hooks/dictionary/useDictionary";
import "react-phone-input-2/lib/style.css";
import PlanesRegisterHook from "./hooks/PlanesRegisterHook";
import { Locale } from "i18n-config";
import { DataGrid, GridColDef, GridToolbarContainer } from "@mui/x-data-grid";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import { Close } from "@mui/icons-material";
import SaveIcon from "@mui/icons-material/Save";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Fragment } from "react";

const PlanesRegister = ({
  params: { lang },
}: {
  params: { lang: Locale };
}) => {
  const {
    data,
    name,
    setName,
    error,
    handleEditCategory,
    handleEditData,
    pricePlan,
    setPricePlan,
    statePriceError,
    handleCloseModal,
    isModalOpen,
    dataCategories,
    step,
    setStep,
    handleNextStep,
    discounts,
    handleDiscountChange,
    discountErrors,
  } = PlanesRegisterHook();

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

  const formatearFecha = (fechaISO: string): string => {
    return moment(fechaISO).format("DD/MM/YYYY HH:mm:ss");
  };

  const generateDynamicColumns = (categories: any): GridColDef[] => {
    return categories.map((category: any) => ({
      field: category.name,
      headerName: category.name,
      minWidth: 90,
      flex: 1,
      headerAlign: "center",
      align: "center",
      type: "number",
      renderCell: (params: any) => (
        <div className="tw-flex tw-justify-center tw-items-center">
          <div>{formatPrice(params.value)}</div>
        </div>
      ),
    }));
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
          onClick={() => handleEditCategory(params?.value)}
        >
          <EditIcon />
        </Button>
      ),
    },
    {
      field: "created_at",
      headerName: "Última modificación",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div className="tw-flex tw-justify-center tw-items-center">
          <div>{formatearFecha(params.value)}</div>
        </div>
      ),
    },
    {
      field: "name",
      headerName: "Nombre Plan",
      minWidth: 200,
      flex: 2,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "price",
      headerName: "Full Precio",
      minWidth: 130,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div className="tw-flex tw-justify-center tw-items-center">
          <div>{'$'+ formatPrice(params.value)}</div>
        </div>
      ),
    },
    ...generateDynamicColumns(dataCategories || []),
  ];

  function CustomToolbar() {
    return (
      <GridToolbarContainer
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          padding: 2,
        }}
      >
        <Box
          sx={{
            width: "20%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingRight: 3.5,
              paddingTop: 0,
            }}
          >
          </Box>
        </Box>
      </GridToolbarContainer>
    );
  }

  return (
    <div className='tw-flex tw-items-center tw-justify-center tw-bg-[url("/images/loginBackground.png")] tw-bg-no-repeat tw-bg-center tw-bg-cover'>
      <div className="tw-shadow-m tw-rounded-2xl tw-h-[775px] tw-w-[99%] tw-flex tw-flex-col tw-justify-center tw-items-center tw-mb-5 ">
        <Typography
          className="tw-text-black tw-w-full"
          variant="h6"
          color="textPrimary"
          display={"flow"}
          align="center"
          fontWeight="bold"
        >
          {dictionary.dictionary?.backOffice.PlansLabelMenu}
        </Typography>
        <div
          style={{ height: 650, width: "100%" }}
          className="tw-bg-white tw-shadow-m tw-rounded-2xl tw-m-6"
        >
          <DataGrid
            rows={data ?? []}
            columns={columns}
            slots={{ toolbar: CustomToolbar }}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 15 },
              },
              sorting: {
                sortModel: [{ field: "created_at", sort: "desc" }],
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




            {step && step === 1 ? (
              <div className="tw-w-[90%] tw-bg-white tw-shadow-m tw-rounded-2xl tw-py-3 tw-mt-10 tw-mb-6 tw-flex tw-flex-col tw-justify-center tw-items-center tw-ml-7 tw-mr-7">
                <div className="tw-w-full tw-h-[95%] tw-flex-row tw-justify-center tw-justify-items-center tw-mx-32 tw-mt-4 tw-mb-5">
                  <div className="tw-w-full tw-flex tw-justify-center tw-justify-items-center">
                    <div className="tw-w-[85%] tw-h-[95%] tw-flex tw-justify-center tw-justify-items-center">
                      <TextField
                        variant="standard"
                        label={dictionary.dictionary?.backOffice.DefaultPlanName}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start"></InputAdornment>
                          ),
                          style: {
                            paddingTop: "5px",
                            paddingBottom: "5px",
                          },
                        }}
                        InputLabelProps={{
                          style: {
                            fontSize: 18,
                          },
                        }}
                        FormHelperTextProps={{
                          style: {
                            fontSize: 13,
                            color: "red",
                          },
                        }}
                        id="outlined"
                        className="tw-w-full tw-text-sm"
                        error={!!error}
                        helperText={error}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        margin="normal"
                        disabled
                      />
                    </div>
                  </div>
                  <div className="tw-w-full tw-flex tw-justify-center tw-justify-items-center tw-mt-5">
                    <div className="tw-w-[85%] tw-h-[95%] tw-flex tw-justify-center tw-justify-items-center ">
                      <TextField
                        variant="standard"
                        label={"Precio"}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start"></InputAdornment>
                          ),
                          style: {
                            paddingTop: "5px",
                            paddingBottom: "5px",
                          },
                        }}
                        InputLabelProps={{
                          style: {
                            fontSize: 18,
                          },
                        }}
                        FormHelperTextProps={{
                          style: {
                            fontSize: 13,
                            color: "red",
                          },
                        }}
                        id="outlined"
                        className="tw-w-full tw-text-sm"
                        error={!!statePriceError}
                        helperText={statePriceError || ' '}
                        value={pricePlan}
                        onChange={(e) => setPricePlan(Number(e.target.value))}
                        margin="normal"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="tw-w-[90%] tw-bg-white tw-shadow-m tw-rounded-2xl tw-py-3 tw-mt-10 tw-mb-6 tw-flex tw-flex-col tw-justify-center tw-items-center">
                <div className="tw-w-[70%] tw-h-[95%] tw-flex tw-justify-center tw-justify-items-center tw-mx-40 tw-mt-4 tw-mb-4">
                  <Box
                    sx={{ maxHeight: "500px", width: 300, overflow: "auto" }}
                  >
                    <Grid container spacing={1} sx={{ padding: "8px" }}>
                      <Grid item xs={6} style={{ paddingBottom: 12 }}>
                        <Typography
                          variant="h6"
                          align="center"
                          sx={{ color: "#000000", fontSize: 16 }}
                        >
                          Categoría
                        </Typography>
                      </Grid>
                      <Grid item xs={6} style={{ paddingBottom: 12 }}>
                        <Typography
                          variant="h6"
                          align="center"
                          sx={{ color: "#000000", fontSize: 16 }}
                        >
                          Descuento (%)
                        </Typography>
                      </Grid>

                      {dataCategories &&
                        dataCategories.map((route, index) => (
                          <Fragment key={index}>
                            <Grid
                              item
                              xs={6}
                              sx={{
                                padding: "8px",
                                textAlign: "center",
                                color: "#000000",
                              }}
                            >
                              <Typography
                                variant="h6"
                                align="center"
                                sx={{ color: "#000000", fontSize: 15 }}
                              >
                                {route?.name}
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              xs={6}
                              className={
                                "tw-flex tw-justify-center tw-justify-items-center"
                              }
                              sx={{ padding: "8px" }}
                            >
                              <FormControl
                                variant="outlined"
                                sx={{ width: "50%" }}
                              >
                                <TextField
                                  id={`outlined-number-${route?.name}`}
                                  label=""
                                  type="number"
                                  value={discounts[route?.name] || ""}
                                  onChange={(e) =>
                                    handleDiscountChange(
                                      route?.name,
                                      e.target.value
                                    )
                                  }
                                  inputProps={{
                                    style: {
                                      padding: "6px 8px",
                                      height: "30px",
                                    },
                                  }}
                                  //error={!!discountErrors[route?.name]}
                                  sx={{ maxWidth: "100%" }}
                                />
                              </FormControl>
                            </Grid>
                          </Fragment>
                        ))}
                    </Grid>
                  </Box>
                </div>
                <div className="tw-w-[70%] tw-h-[10%] tw-flex tw-justify-center tw-justify-items-center">
                  {status && (
                    <div style={{ color: "red", fontSize: 14 }}>
                      *{status}
                    </div>
                  )}
                </div>
              </div>
            )}



            <div className="tw-w-[101%] tw-flex tw-justify-center tw-items-center tw-border-t-white tw-border-t-[0.5px] tw-border-x-0 tw-border-b-0 tw-border-solid">
              <div className="tw-w-1/2 tw-py-4 tw-flex tw-flex-col tw-justify-center tw-items-start">
                <div className="tw-w-40 tw-flex tw-flex-col tw-justify-center tw-items-center">
                  <Typography style={{ fontSize: 14, color: "white" }}>
                    {step === 1 ? "Paso 1/2" : "Paso 2/2"}
                  </Typography>
                </div>
              </div>
              <div className="tw-w-1/2 tw-py-4 tw-flex tw-justify-end tw-items-center">
                <div className="tw-w-[100%] tw-h-full tw-flex tw-justify-end tw-items-center">
                  {step === 1 ? (
                    <div className="tw-w-[60%] tw-h-full tw-flex tw-justify-end tw-items-center">
                      <Button
                        variant="text"
                        className="tw-text-black tw-mr-12"
                        onClick={() => handleNextStep()}
                        sx={{
                          padding: "0",
                          minWidth: "auto",
                          textTransform: "none",
                          display: "flex",
                          alignItems: "center",
                        }}
                        endIcon={
                          <ArrowForwardIosIcon
                            style={{
                              marginLeft: -5,
                              fontSize: 25,
                              color: "white",
                            }}
                          />
                        }
                      >
                        <Typography style={{ color: "white" }}>
                          {dictionary.dictionary?.backOffice.nextButton}
                        </Typography>
                      </Button>
                    </div>
                  ) : (
                    <div className="tw-w-full tw-h-full tw-flex tw-justify-end tw-items-center">
                      <div className="tw-w-[85%] tw-h-full tw-flex tw-justify-center tw-items-center tw-mr-5">
                        <Button
                          variant="text"
                          className="tw-text-black tw-mr-4"
                          onClick={() => setStep(1)}
                          sx={{
                            padding: "0",
                            minWidth: "auto",
                            textTransform: "none",
                            display: "flex",
                            alignItems: "center",
                          }}
                          startIcon={
                            <ArrowBackIosIcon
                              style={{
                                marginRight: -13,
                                fontSize: 25,
                                color: "white",
                              }}
                            />
                          }
                        >
                          <Typography style={{ color: "white" }}>
                            {dictionary.dictionary?.backOffice.backButton}
                          </Typography>
                        </Button>

                        <Button
                          variant="text"
                          className="tw-text-black tw-ml-6"
                          onClick={
                            handleEditData
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
                                marginRight: -1,
                                fontSize: 25,
                                color: "white",
                              }}
                            />
                          }
                        >
                          <Typography style={{ color: "white" }}>
                            {dictionary.dictionary?.backOffice.guardar}
                          </Typography>
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default PlanesRegister;
