import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  InputAdornment,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import useDictionary from '@/hooks/dictionary/useDictionary';
import 'react-phone-input-2/lib/style.css'
import ColorRegisterFormHook from './hooks/ColorRegisterFormHook';
import { Locale } from 'i18n-config';
import BadgeIcon from '@mui/icons-material/Badge';
import { DataGrid, GridColDef, GridToolbarContainer } from '@mui/x-data-grid';
import moment from 'moment';
import EditIcon from '@mui/icons-material/Edit';
import { Close } from '@mui/icons-material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SaveIcon from '@mui/icons-material/Save';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DeleteIcon from '@mui/icons-material/Delete';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import ClearIcon from '@mui/icons-material/Clear';
import Image from 'next/image';

const ColorRegisterForm = ({ params: { lang } }: { params: { lang: Locale } }) => {
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
    nameError,
    skuError,
    isEditData,
    handleCloseModal,
    step,
    handleNextStepOne,
    dataMaterials,
    setStep,
    filteredMaterials,
    handleAddMaterial,
    selectedMaterials,
    setMaterial,
    material,
    handleRemoveMaterial,
    skuErrorToolBar,
    selectedMaterialsError,
    handleImageChange,
    selectedImage,
    imageError,
    status
  } = ColorRegisterFormHook();
  const dictionary = useDictionary({ lang: 'es' });

  const formatearFecha = (fechaISO: string): string => {
    return moment(fechaISO).format("DD/MM/YYYY HH:mm:ss");
  };

  // Función para generar columnas
  const generateDynamicColumns = (materials: any): GridColDef[] => {
    return materials.map((category: any) => ({
      field: category.name,
      headerName: category.name,
      minWidth: 90,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      type: 'number',
      renderCell: (params: any) => (
        <div className='tw-flex tw-justify-center tw-items-center'>
          {params.value ? <ClearIcon /> : ' '}
        </div>
      )
    }));
  };

  const columns: GridColDef[] = [
    {
      field: 'optionEdit',
      headerName: 'Acciones',
      minWidth: 120,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Button style={{ color: 'black' }} onClick={() => handleEditProduct(params?.value)}>
          <EditIcon />
        </Button>
      )
    },
    {
      field: 'created_at',
      headerName: 'Fecha Registro',
      minWidth: 220,
      flex: 2,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <div className='tw-flex tw-justify-center tw-items-center'>
          <div>{formatearFecha(params.value)}</div>
        </div>
      )
    },
    { field: 'sku', headerName: 'Sku Color', minWidth: 130, flex: 1, headerAlign: 'center', align: 'center' },
    {
      field: 'image',
      headerName: 'Imagen',
      minWidth: 230,
      flex: 2,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <div style={{ width: 60, height: 60, position: 'relative' }}>
          <Image
            src={`${params.value}`}
            alt="Imagen"
            className="tw-h-[10] tw-object-cover tw-mt-3"
            objectFit="cover"
            layout="responsive"
            height={90}
            width={90}
          />
        </div>
      ),
    },
    { field: 'name', headerName: 'Color', minWidth: 230, flex: 2, headerAlign: 'center', align: 'center' },
    ...generateDynamicColumns(dataMaterials || [])
  ];

  function CustomToolbar() {
    return (
      <GridToolbarContainer sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: 2 }}>
        <Box sx={{ width: '20%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingRight: 3.5, paddingTop: 0 }}>
            <Button
              className='tw-w-[100%] tw-h-[100%] tw-text-white tw-text-custom'
              type='submit'
              sx={{
                padding: '0',
                minWidth: 'auto',
                textTransform: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
              style={{ textTransform: 'none' }}
              onClick={handleOpenModal}
            >
              <AddCircleRoundedIcon style={{ marginBottom: 5, fontSize: 30, color: '#02AF9B' }} />
              <Typography style={{ color: '#02AF9B' }}>
                Crear
              </Typography>
            </Button>
          </Box>
        </Box>
      </GridToolbarContainer>
    );
  }

  return data && (
    <div className='tw-flex tw-items-center tw-justify-center tw-bg-[url("/images/loginBackground.png")] tw-bg-no-repeat tw-bg-center tw-bg-cover'>
      <div className='tw-mt-3 tw-shadow-m tw-rounded-2xl tw-h-[775px] tw-w-[99%] tw-flex tw-flex-col tw-justify-center tw-items-center tw-mb-5 '>
        <Typography
          className='tw-text-black tw-w-full'
          variant='h6'
          color='textPrimary'
          display={'flow'}
          align='center'
          fontWeight='bold'
        >
          {dictionary.dictionary?.backOffice.ColorsLabelMenu}
        </Typography>
        <div style={{ height: 650, width: '100%' }} className='tw-bg-white tw-shadow-m tw-rounded-2xl tw-m-6'>
          <DataGrid
            rows={data ?? []}
            columns={columns}
            slots={{ toolbar: CustomToolbar }}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
              sorting: {
                sortModel: [{ field: 'created_at', sort: 'asc' }],
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
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        className='tw-flex tw-justify-center tw-items-center'
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: '#02AF9B',
            padding: 0.5,
            borderRadius: 3,
            position: 'relative',
          }}
        >

          <IconButton
            className='tw-absolute tw-right-1 tw-top-1'
            onClick={() => handleCloseModal()}
          >
            <Close className='tw-text-white' />
          </IconButton>
          <div className='tw-w-[100%] tw-h-[80%] tw-flex tw-flex-col tw-justify-center tw-items-center'>
            {step && step === 1 ?
              <div className='tw-w-[90%] tw-bg-white tw-shadow-m tw-rounded-2xl tw-py-3 tw-mt-10 tw-mb-6 tw-flex tw-flex-col tw-justify-center tw-items-center'>
                <div className='tw-w-full tw-h-[95%] tw-flex-row tw-justify-center tw-justify-items-center tw-mx-32 tw-mt-4 tw-mb-5'>

                  <div className="tw-w-full tw-grid tw-grid-cols-2 tw-grid-rows-1 tw-gap-7 tw-px-3">
                    <div className="tw-w-full tw-flex tw-justify-center tw-justify-items-center">
                      <div className='tw-w-[95%] tw-h-[95%] tw-flex tw-justify-center tw-justify-items-center'>
                        <TextField
                          variant='standard'
                          label={dictionary.dictionary?.backOffice.ColorSku}
                          disabled={isEditData ? true : false}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position='start'>
                                <MedicalInformationIcon
                                  style={{
                                    color: '#02AF9B',
                                    fontSize: '1.8rem'
                                  }}
                                />
                              </InputAdornment>
                            ),
                            style: {
                              paddingTop: '5px',
                              paddingBottom: '5px',
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
                              color: 'red',
                            },
                          }}
                          id='outlined'
                          className='tw-w-full tw-text-sm'
                          error={!!skuError}
                          helperText={skuError}
                          value={sku}
                          onChange={(e) => setSku(e.target.value)}
                          margin="normal"
                        />
                      </div>
                    </div>
                    <div className="tw-w-full tw-flex tw-justify-center tw-justify-items-center">
                      <div className='tw-w-[95%] tw-h-[95%] tw-flex tw-justify-center tw-justify-items-center'>
                        <TextField
                          variant='standard'
                          label={dictionary.dictionary?.backOffice.ColorName}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position='start'>
                                <MedicalInformationIcon
                                  style={{
                                    color: '#02AF9B',
                                    fontSize: '1.8rem'
                                  }}
                                />
                              </InputAdornment>
                            ),
                            style: {
                              paddingTop: '5px',
                              paddingBottom: '5px',
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
                              color: 'red',
                            },
                          }}
                          id='outlined'
                          className='tw-w-full tw-text-sm'
                          value={name}
                          error={!!nameError}
                          helperText={nameError}
                          onChange={(e) => setName(e.target.value)}
                          margin="normal"
                        />
                      </div>
                    </div>
                  </div>

                  {selectedImage && (
                    <div className="tw-w-full tw-flex tw-justify-center tw-justify-items-center tw-mt-1 tw-mb-1">
                      <div className="tw-mt-2">
                        <Image
                          src={
                            selectedImage
                              ? selectedImage
                              : ""
                          }
                          alt="Vista previa"
                          className="tw-h-[180px] tw-object-cover tw-rounded"
                          layout="responsive"
                          width={150}
                          height={150}
                        />
                      </div>
                    </div>
                  )}


                  <div className={`tw-w-full tw-flex tw-justify-center tw-justify-items-center ${!selectedImage ? 'tw-mt-7' : ''}`}>
                    <div className="tw-w-[80%] tw-flex tw-justify-center tw-justify-items-center">
                      <label
                        htmlFor="iconButton"
                        className="tw-flex tw-flex-col tw-items-start tw-justify-center"
                      >
                        <div className="tw-flex tw-flex-row tw-items-center tw-justify-center tw-h-10 tw-w-36 tw-rounded-3xl tw-bg-[#02AF9B] tw-mt-3 -tw-ml-2">
                          <Typography className="tw-font-bold tw-text-sm url-label tw-text-white">
                            Seleccionar Imagen
                          </Typography>
                        </div>

                        <input
                          type="file"
                          name="icon"
                          id="iconButton"
                          accept=".jpg, .jpeg, .png"
                          hidden
                          onChange={handleImageChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </label>
                    </div>
                  </div>
                  {imageError && (
                    <div className="tw-w-[100%] tw-flex tw-justify-center tw-justify-items-center">
                      <div className="tw-text-[#FF0000] tw-text-[13px] tw-mt-4 tw-font-normal">
                        {imageError}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              :
              <div className='tw-w-[90%] tw-bg-white tw-shadow-m tw-rounded-2xl tw-py-3 tw-mt-12 tw-mb-6 tw-flex tw-flex-col tw-justify-center tw-items-center'>
                <div className='tw-w-full tw-h-[95%] tw-flex tw-justify-center tw-justify-items-center tw-mx-36 tw-mt-4'>
                  <div className='tw-w-full tw-h-[95%] tw-flex tw-justify-center tw-justify-items-center tw-px-36 tw-mt-1'>
                    <div className='tw-w-[95%] tw-h-[95%] tw-flex tw-justify-center tw-justify-items-center tw-mx-10 tw-mt-4 tw-mb-1'>
                      <Autocomplete
                        freeSolo
                        fullWidth
                        options={filteredMaterials || []}
                        getOptionLabel={(option) => {
                          if (typeof option === 'string') {
                            return option;
                          }
                          return `${option.sku} - ${option.name || ''}`;
                        }}
                        inputValue={material}
                        onInputChange={(event, newInputValue) => setMaterial(newInputValue)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="standard"
                            label={dictionary.dictionary?.backOffice.MaterialSku}
                            error={!!skuErrorToolBar}
                            helperText={skuErrorToolBar}
                            fullWidth
                            InputProps={{
                              ...params.InputProps,
                              startAdornment: (
                                <InputAdornment position="start">
                                  <BadgeIcon style={{ color: '#02AF9B', fontSize: '1.8rem' }} />
                                </InputAdornment>
                              ),
                            }}
                          />
                        )}
                      />
                    </div>
                    <div className='tw-w-[5%] tw-h-[95%] tw-flex tw-justify-center tw-justify-items-center tw-mx-10 tw-mt-5 tw-mb-5'>
                      <div className='tw-w-[60%] tw-h-full tw-flex tw-justify-end tw-items-center'>
                        <Button
                          variant='contained'
                          className='tw-bg-white tw-text-black tw-shadow-m tw-capitalize tw-flex tw-justify-center tw-items-center tw-mr-11'
                          onClick={handleAddMaterial}
                          sx={{ width: '45px', minWidth: '45px' }}
                        >
                          <AddCircleRoundedIcon style={{ padding: 2, paddingLeft: 5 }} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='tw-w-full tw-h-[95%] tw-flex tw-justify-center tw-justify-items-center tw-mx-36'>
                  <div className='tw-w-full tw-h-[95%] tw-flex tw-justify-center tw-justify-items-center tw-mx-28 tw-mt-0 tw-mb-10'>
                    <Table className='tw-w-full tw-mt-6'>
                      <TableHead>
                        <TableRow>
                          <TableCell>Acciones</TableCell>
                          <TableCell>SKU</TableCell>
                          <TableCell>Nombre</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedMaterials.length > 0 ? (
                          selectedMaterials.map((material, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                <IconButton
                                  aria-label="delete"
                                  onClick={() => handleRemoveMaterial(material.sku)}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </TableCell>
                              <TableCell>{material.sku}</TableCell>
                              <TableCell>{material.name}</TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={3} align="center">No hay materiales seleccionados</TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
                <div className='tw-w-full tw-h-[95%] tw-flex tw-justify-center tw-justify-items-center tw-mx-36 -tw-mt-5 tw-mb-5'>
                  {selectedMaterialsError && <div style={{ color: 'red', fontSize: '14px', marginLeft: 5 }}>*{selectedMaterialsError}</div>}
                </div>

                <div className='tw-w-[70%] tw-h-[10%] tw-flex tw-justify-center tw-justify-items-center'>
                  {status && (<div style={{ color: 'red', fontSize: 14 }}>*{status}</div>)}
                </div>
              </div>
            }
            <div className='tw-w-[101%] tw-flex tw-justify-center tw-items-center tw-border-t-white tw-border-t-[0.5px] tw-border-x-0 tw-border-b-0 tw-border-solid'>
              <div className='tw-w-1/2 tw-py-4 tw-flex tw-flex-col tw-justify-center tw-items-start'>
                <div className='tw-w-40 tw-flex tw-flex-col tw-justify-center tw-items-center'>
                  <Typography style={{ fontSize: 14, color: "white" }}>
                    {step === 1 ? "Paso 1/2" : "Paso 2/2"}
                  </Typography>
                </div>
              </div>
              <div className='tw-w-1/2 tw-py-4 tw-flex tw-justify-end tw-items-center'>
                <div className='tw-w-[100%] tw-h-full tw-flex tw-justify-end tw-items-center'>
                  {step === 1 ?
                    (
                      <div className='tw-w-[60%] tw-h-full tw-flex tw-justify-end tw-items-center'>
                        <Button
                          variant="text"
                          className="tw-text-black tw-mr-12"
                          onClick={handleNextStepOne}
                          sx={{
                            padding: '0',
                            minWidth: 'auto',
                            textTransform: 'none',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                          endIcon={
                            <ArrowForwardIosIcon style={{ marginLeft: -5, fontSize: 25, color: 'white' }} />
                          }
                        >
                          <Typography style={{ color: 'white' }}>
                            {dictionary.dictionary?.backOffice.nextButton}
                          </Typography>
                        </Button>
                      </div>
                    )
                    :
                    <div className='tw-w-full tw-h-full tw-flex tw-justify-end tw-items-center'>
                      <div className='tw-w-[40%] tw-h-full tw-flex tw-justify-center tw-items-center tw-mr-16'>
                        <Button
                          variant="text"
                          className="tw-text-black tw-mr-4"
                          onClick={() => setStep(1)}
                          sx={{
                            padding: '0',
                            minWidth: 'auto',
                            textTransform: 'none',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                          startIcon={
                            <ArrowBackIosIcon style={{ marginRight: -13, fontSize: 25, color: 'white' }} />
                          }
                        >
                          <Typography style={{ color: 'white' }}>
                            {dictionary.dictionary?.backOffice.backButton}
                          </Typography>
                        </Button>

                        <Button
                          variant="text"
                          className="tw-text-black tw-ml-6"
                          onClick={isEditData ? handleEditData : dataRegisterHandle}
                          sx={{
                            padding: '0',
                            minWidth: 'auto',
                            textTransform: 'none',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                          startIcon={<SaveIcon style={{ marginRight: -1, fontSize: 25, color: 'white' }} />}
                        >
                          <Typography style={{ color: 'white' }}>
                            {dictionary.dictionary?.backOffice.guardar}
                          </Typography>
                        </Button>
                      </div>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div >
  );
};

export default ColorRegisterForm;