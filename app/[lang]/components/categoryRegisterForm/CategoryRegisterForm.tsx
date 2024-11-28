import {
  Box,
  Button,
  Container,
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
import CategoryRegisterFormHook from "./hooks/CategoryRegisterFormHook";
import { Locale } from "i18n-config";
import { DataGrid, GridColDef, GridToolbarContainer } from "@mui/x-data-grid";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import { Close } from "@mui/icons-material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import SaveIcon from "@mui/icons-material/Save";

const CategoryRegisterForm = ({
  params: { lang },
}: {
  params: { lang: Locale };
}) => {
  const {
    data,
    name,
    setName,
    dataRegisterHandle,
    status,
    error,
    isSubmitting,
    handleEditCategory,
    dataCategory,
    handleEditData,
    errorModal,
    stateCategory,
    setStateCategory,
    stateCategoryError,
    handleCloseModal,
    handleOpenModal,
    isModalOpen,
    isEditData,
    rowId,
  } = CategoryRegisterFormHook();

  const dictionary = useDictionary({ lang: "es" });

  const formatearFecha = (fechaISO: string): string => {
    return moment(fechaISO).format("DD/MM/YYYY HH:mm:ss");
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
      headerName: "Fecha Registro",
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
      headerName: "Nombre Categoría",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "status",
      headerName: "Estado",
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
          {dictionary.dictionary?.backOffice.CategoriesDistriLabel}
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
              <div className="tw-w-full tw-h-[95%] tw-flex-row tw-justify-center tw-justify-items-center tw-mx-32 tw-mt-4 tw-mb-5">
                <div className="tw-w-full tw-flex tw-justify-center tw-justify-items-center">
                  <div className="tw-w-[85%] tw-h-[95%] tw-flex tw-justify-center tw-justify-items-center">
                    <TextField
                      variant="standard"
                      label={dictionary.dictionary?.backOffice.CategoryName}
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
                    />
                  </div>
                </div>
                <div className="tw-w-full tw-flex tw-justify-center tw-justify-items-center tw-mt-7">
                  <div className="tw-w-[85%] tw-h-[95%] tw-flex tw-justify-center tw-justify-items-center">
                    <div className="tw-w-[100%] tw-h-[100%] tw-flex tw-flex-col tw-justify-center tw-items-center">
                      <div className="tw-w-full">
                        <Typography
                          color="textSecondary"
                          display={"flow"}
                          className="tw-text-left tw-text-sm tw-mb-2"
                        >
                          Estado
                        </Typography>
                      </div>
                      <div className="tw-w-[100%] tw-h-[70%] tw-flex tw-items-center">
                        <Select
                          labelId="estado-label"
                          variant="standard"
                          className="tw-w-full"
                          id="estado-select"
                          defaultValue=""
                          label="Estado"
                          value={
                            stateCategory === null
                              ? ""
                              : stateCategory
                              ? "true"
                              : "false"
                          }
                          onChange={(e) =>
                            setStateCategory(e.target.value === "true")
                          }
                        >
                          <MenuItem value="true">Activo</MenuItem>
                          <MenuItem value="false">Inactivo</MenuItem>
                        </Select>
                      </div>
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
                      {/* <Button
                        variant='contained'
                        className='tw-bg-white tw-text-black tw-shadow-m tw-capitalize tw-ml-6'
                        onClick={isEditData ? handleEditData : dataRegisterHandle}
                        sx={{ width: '45px', minWidth: '45px' }}
                      >
                        <SaveIcon style={{ padding: 2, paddingLeft: 1 }} />
                      </Button> */}

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
    </div>
  );
};

export default CategoryRegisterForm;
