import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import useDictionary from "@/hooks/dictionary/useDictionary";
import "react-phone-input-2/lib/style.css";
import ProductRegisterFormHook from "./hooks/ProductRegisterFormHook";
import { Locale } from "i18n-config";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { DataGrid, GridColDef, GridToolbarContainer } from "@mui/x-data-grid";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import { Close } from "@mui/icons-material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SaveIcon from "@mui/icons-material/Save";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Fragment } from "react";

const ProductRegisterForm = ({
  params: { lang },
}: {
  params: { lang: Locale };
}) => {
  const {
    data,
    dataRegisterHandle,
    handleEditProduct,
    handleEditData,
    isModalOpen,
    handleOpenModal,
    name,
    setName,
    sku,
    setSku,
    price,
    setPrice,
    stateProduct,
    setStateProduct,
    nameError,
    skuError,
    priceError,
    stateProductError,
    isEditData,
    handleCloseModal,
    step,
    handleNextStep,
    dataCategories,
    handleDiscountChange,
    discounts,
    setStep,
    discountErrors,
    status,
  } = ProductRegisterFormHook();
  const dictionary = useDictionary({ lang: "es" });

  const formatearFecha = (fechaISO: string): string => {
    return moment(fechaISO).format("DD/MM/YYYY HH:mm:ss");
  };

  const formatPrice = (value: any) => {
    if (value == null || isNaN(value)) return "";
    const number = Number(value);
    return new Intl.NumberFormat("es-CO", {
      style: "decimal",
      minimumFractionDigits: 0,
    }).format(number);
  };

  // Función para generar columnas dinámicas
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
      minWidth: 120,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Button
          style={{ color: "black" }}
          onClick={() => handleEditProduct(params?.value)}
        >
          <EditIcon />
        </Button>
      ),
    },
    {
      field: "created_at",
      headerName: "Fecha Registro",
      minWidth: 220,
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
      field: "sku",
      headerName: "Sku",
      minWidth: 130,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "name",
      headerName: "Nombre Producto",
      minWidth: 230,
      flex: 2,
      headerAlign: "center",
      align: "left",
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
          <div>{formatPrice(params.value)}</div>
        </div>
      ),
    },
    ...generateDynamicColumns(dataCategories || []),
    {
      field: "status",
      headerName: "Estado",
      minWidth: 140,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div className="tw-flex tw-justify-center tw-items-center">
          <div>{params.value === true ? "Activo" : "Inactivo"}</div>
        </div>
      ),
    },
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
            <Button
              className="tw-w-[100%] tw-h-[100%] tw-text-white tw-text-custom"
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
        </Box>
      </GridToolbarContainer>
    );
  }

  return (
    data && (
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
            {dictionary.dictionary?.backOffice.ProductsLabel}
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
                  sortModel: [{ field: "created_at", sort: "asc" }],
                },
              }}
              pageSizeOptions={[10, 20, 30]}
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
                <div className="tw-w-[90%] tw-bg-white tw-shadow-m tw-rounded-2xl tw-py-3 tw-mt-10 tw-mb-6 tw-flex tw-flex-col tw-justify-center tw-items-center">
                  <div className="tw-w-full tw-h-[95%] tw-flex tw-justify-center tw-justify-items-center tw-mx-32 tw-mt-4 tw-mb-5">
                    <div className="tw-w-full tw-grid tw-grid-cols-2 tw-grid-rows-2 tw-gap-7 tw-px-3">
                      <div className="tw-w-full tw-flex tw-justify-center tw-justify-items-center">
                        <div className="tw-w-[95%] tw-h-[95%] tw-flex tw-justify-center tw-justify-items-center">
                          <TextField
                            variant="standard"
                            label={dictionary.dictionary?.backOffice.ProductSku}
                            disabled={isEditData ? true : false}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <MedicalInformationIcon
                                    style={{
                                      color: "#02AF9B",
                                      fontSize: "1.8rem",
                                    }}
                                  />
                                </InputAdornment>
                              ),
                              style: {
                                paddingTop: "5px",
                                paddingBottom: "5px",
                                paddingLeft: "0px",
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
                            error={!!skuError}
                            helperText={skuError}
                            value={sku}
                            onChange={(e) => setSku(e.target.value)}
                            margin="normal"
                          />
                        </div>
                      </div>
                      <div className="tw-w-full tw-flex tw-justify-center tw-justify-items-center">
                        <div className="tw-w-[95%] tw-h-[95%] tw-flex tw-justify-center tw-justify-items-center">
                          <TextField
                            variant="standard"
                            label={
                              dictionary.dictionary?.backOffice.ProductName
                            }
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <MedicalInformationIcon
                                    style={{
                                      color: "#02AF9B",
                                      fontSize: "1.8rem",
                                    }}
                                  />
                                </InputAdornment>
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
                            value={name}
                            error={!!nameError}
                            helperText={nameError}
                            onChange={(e) => setName(e.target.value)}
                            margin="normal"
                          />
                        </div>
                      </div>
                      <div className="tw-w-full tw-flex tw-justify-center tw-justify-items-center">
                        <div className="tw-w-[95%] tw-h-[95%] tw-flex tw-justify-center tw-justify-items-center">
                          <TextField
                            variant="standard"
                            label={
                              dictionary.dictionary?.backOffice.ProductPrice
                            }
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <AttachMoneyIcon
                                    style={{
                                      color: "#02AF9B",
                                      fontSize: "1.8rem",
                                    }}
                                  />
                                </InputAdornment>
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
                            value={price}
                            error={!!priceError}
                            helperText={priceError}
                            onChange={(e) => setPrice(e.target.value)}
                            margin="normal"
                          />
                        </div>
                      </div>
                      <div className="tw-w-full tw-flex tw-justify-center tw-items-center">
                        <div className="tw-w-[95%] tw-h-[100%] tw-flex tw-flex-col tw-justify-center tw-items-center tw-mt-3">
                          <div className="tw-w-full -tw-mb-4">
                            <Typography
                              color={
                                stateProductError ? "#d32f2f" : "textSecondary"
                              }
                              display={"flow"}
                              className="tw-text-left tw-text-sm"
                            >
                              {dictionary.dictionary?.backOffice.ProductState}
                            </Typography>
                          </div>
                          <div className="tw-w-[98%] tw-h-[70%] tw-flex tw-items-center">
                            <Select
                              labelId="estado-label"
                              variant="standard"
                              className="tw-w-full"
                              id="estado-select"
                              label="Estado"
                              value={stateProduct ? "true" : "false"}
                              error={!!stateProductError}
                              onChange={(e) =>
                                setStateProduct(e.target.value === "true")
                              }
                            >
                              <MenuItem value="true">Activo</MenuItem>
                              <MenuItem value="false">Inactivo</MenuItem>
                            </Select>
                          </div>
                          <div className="tw-w-full -tw-mt-3">
                            {stateProductError && (
                              <div
                                style={{
                                  color: "red",
                                  fontSize: "12px",
                                  marginLeft: 5,
                                }}
                              >
                                {stateProductError}
                              </div>
                            )}
                          </div>
                        </div>
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
                                    error={!!discountErrors[route?.name]}
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
                          onClick={handleNextStep}
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
    )
  );
};

export default ProductRegisterForm;
