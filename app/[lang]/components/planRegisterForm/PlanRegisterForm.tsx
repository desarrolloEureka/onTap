import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  MenuItem,
  Modal,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import useDictionary from '@/hooks/dictionary/useDictionary';
import 'react-phone-input-2/lib/style.css'
import PlanRegisterFormHook from './hooks/PlanRegisterFormHook';
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
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const PlanRegisterForm = ({ params: { lang } }: { params: { lang: Locale } }) => {
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
    handleNextStepOne,
    dataCategories,
    handleDiscountChange,
    discounts,
    setStep,
    discountErrors,
    status,
    handleNextStepTwo,
    filteredProducts,
    handleAddProduct,
    selectedProducts,
    setProduct,
    product,
    handleRemoveProduct,
    skuErrorToolBar,
    selectedProductsError,
  } = PlanRegisterFormHook();
  const dictionary = useDictionary({ lang: 'es' });

  const formatearFecha = (fechaISO: string): string => {
    return moment(fechaISO).format("DD/MM/YYYY HH:mm:ss");
  };

  const formatPrice = (value: any) => {
    if (value == null || isNaN(value)) return '';
    const number = Number(value);
    // Configura el formato para miles, usando el separador adecuado
    return new Intl.NumberFormat('es-CO', {
      style: 'decimal',
      minimumFractionDigits: 0
    }).format(number);
  };

  // Función para generar columnas dinámicas
  const generateDynamicColumns = (categories: any): GridColDef[] => {
    return categories.map((category: any) => ({
      field: category.name,
      headerName: category.name,
      minWidth: 90, // Reemplazar width por minWidth
      flex: 1, // Añadir flex para el ajuste dinámico del ancho
      headerAlign: 'center',
      align: 'center',
      type: 'number',
      renderCell: (params: any) => (
        <div className='tw-flex tw-justify-center tw-items-center'>
          <div>{formatPrice(params.value)}</div>
        </div>
      )
    }));
  };

  const columns: GridColDef[] = [
    {
      field: 'optionEdit',
      headerName: 'Acciones',
      minWidth: 120, // Reemplazar width por minWidth
      flex: 1, // Añadir flex para el ajuste dinámico del ancho
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
      flex: 2, // Mayor flex para darle más espacio
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <div className='tw-flex tw-justify-center tw-items-center'>
          <div>{formatearFecha(params.value)}</div>
        </div>
      )
    },
    { field: 'sku', headerName: 'Sku Planes', minWidth: 130, flex: 1, headerAlign: 'center', align: 'center' },
    { field: 'name', headerName: 'Planes', minWidth: 230, flex: 2, headerAlign: 'center', align: 'center' },
    { field: 'product', headerName: 'Productos que Incluye', minWidth: 230, flex: 2, headerAlign: 'center', align: 'center' },
    {
      field: 'price', headerName: 'Full Precio', minWidth: 130, flex: 1, headerAlign: 'center', align: 'center',
      renderCell: (params) => (
        <div className='tw-flex tw-justify-center tw-items-center'>
          <div>{formatPrice(params.value)}</div>
        </div>
      )
    },
    ...generateDynamicColumns(dataCategories || []), // Aplicar flex y minWidth a las columnas dinámicas
    {
      field: 'status',
      headerName: 'Estado',
      minWidth: 140,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <div className='tw-flex tw-justify-center tw-items-center'>
          <div>{params.value === true ? "Activo" : 'Inactivo'}</div>
        </div>
      )
    }
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
          {dictionary.dictionary?.backOffice.PlansLabel}
        </Typography>
        <div style={{ height: 650, width: '100%' }} className='tw-bg-white tw-shadow-m tw-rounded-2xl tw-m-6'>
          <DataGrid
            rows={data ?? []}
            columns={columns}
            slots={{ toolbar: CustomToolbar }}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
              sorting: {
                sortModel: [{ field: 'created_at', sort: 'asc' }],
              },
            }}
            pageSizeOptions={[5, 10]}
            className="tw-rounded-2xl"
            disableColumnSelector
            disableDensitySelector
            disableColumnFilter
            disableRowSelectionOnClick
            ignoreDiacritics={true}
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
                <div className='tw-w-full tw-h-[95%] tw-flex tw-justify-center tw-justify-items-center tw-mx-32 tw-mt-4 tw-mb-5'>
                  <div className="tw-w-full tw-grid tw-grid-cols-2 tw-grid-rows-2 tw-gap-7 tw-px-3">
                    <div className="tw-w-full tw-flex tw-justify-center tw-justify-items-center">
                      <div className='tw-w-[95%] tw-h-[95%] tw-flex tw-justify-center tw-justify-items-center'>
                        <TextField
                          variant='standard'
                          label={dictionary.dictionary?.backOffice.PlanSku}
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
                          label={dictionary.dictionary?.backOffice.PlanName}
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
                    <div className="tw-w-full tw-flex tw-justify-center tw-justify-items-center">
                      <div className='tw-w-[95%] tw-h-[95%] tw-flex tw-justify-center tw-justify-items-center'>
                        <TextField
                          variant='standard'
                          label={dictionary.dictionary?.backOffice.PlanPrice}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position='start'>
                                <BadgeIcon
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
                          value={price}
                          error={!!priceError}
                          helperText={priceError}
                          onChange={(e) => setPrice(e.target.value)}
                          margin="normal"
                        />
                      </div>
                    </div>
                    <div className="tw-w-full tw-flex tw-justify-center tw-items-center">
                      <div className='tw-w-[95%] tw-h-[100%] tw-flex tw-flex-col tw-justify-center tw-items-center tw-mt-3'>
                        <div className='tw-w-full -tw-mb-4'>
                          <Typography
                            color={stateProductError ? '#d32f2f' : 'textSecondary'} display={'flow'}
                            className='tw-text-left tw-text-sm'
                          >
                            {dictionary.dictionary?.backOffice.ProductState}
                          </Typography>
                        </div>

                        <div className='tw-w-[98%] tw-h-[70%] tw-flex tw-items-center'>
                          <Select
                            labelId="estado-label"
                            variant='standard'
                            className='tw-w-full'
                            id='estado-select'
                            label="Estado"
                            value={stateProduct ? "true" : "false"}
                            error={
                              !!stateProductError
                            }
                            onChange={(e) => setStateProduct(e.target.value === "true")}
                          >
                            <MenuItem value="true">Activo</MenuItem>
                            <MenuItem value="false">Inactivo</MenuItem>
                          </Select>
                        </div>
                        <div className='tw-w-full -tw-mt-3'>
                          {stateProductError && <div style={{ color: 'red', fontSize: '12px', marginLeft: 5 }}>{stateProductError}</div>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              : step && step === 2 ?
                <div className='tw-w-[90%] tw-bg-white tw-shadow-m tw-rounded-2xl tw-py-3 tw-mt-10 tw-mb-6 tw-flex tw-flex-col tw-justify-center tw-items-center'>
                  <div className='tw-w-[70%] tw-h-[95%] tw-flex tw-justify-center tw-justify-items-center tw-mx-52 tw-mt-4 tw-mb-5'>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ padding: '8px', width: '30px', border: '1px solid #DFDFDF', textAlign: 'center', color: "#000000" }}>
                              Categoría
                            </TableCell>
                            <TableCell sx={{ padding: '8px', width: '30px', border: '1px solid #DFDFDF', textAlign: 'center', color: "#000000" }}>Descuento (%)</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {dataCategories && dataCategories.map((route, index) => (
                            <TableRow key={index}>
                              <TableCell sx={{ padding: '8px', width: '30px', border: '1px solid #DFDFDF', textAlign: 'center', color: "#000000" }}>{route?.name}</TableCell>
                              <TableCell sx={{ padding: '8px', width: '30px', border: '1px solid #DFDFDF', textAlign: 'center' }}>
                                <FormControl variant="outlined" style={{ width: '90%' }}>
                                  <TextField
                                    id={`outlined-number-${route?.name}`}
                                    label=""
                                    type="number"
                                    value={discounts[route?.name] || ''}
                                    onChange={(e) => handleDiscountChange(route?.name, e.target.value)}
                                    inputProps={{ min: 0, max: 100, style: { padding: '6px 8px', height: '30px' } }}
                                    error={!!discountErrors[route?.name]}
                                    helperText={discountErrors[route?.name]}
                                  />
                                </FormControl>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                  <div className='tw-w-[70%] tw-h-[10%] tw-flex tw-justify-center tw-justify-items-center'>
                    {status && (<div style={{ color: 'red', fontSize: 14 }}>*{status}</div>)}
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
                          options={filteredProducts || []}
                          getOptionLabel={(option) => {
                            return typeof option === 'string' ? option : option.sku || "";
                          }}
                          inputValue={product}
                          onInputChange={(event, newInputValue) => setProduct(newInputValue)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="standard"
                              label={dictionary.dictionary?.backOffice.PlanSku}
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
                            onClick={handleAddProduct}
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
                          {selectedProducts.length > 0 ? (
                            selectedProducts.map((product, index) => (
                              <TableRow key={index}>
                                <TableCell>
                                  <IconButton
                                    aria-label="delete"
                                    onClick={() => handleRemoveProduct(product.sku)}
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </TableCell>
                                <TableCell>{product.sku}</TableCell>
                                <TableCell>{product.name}</TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={3} align="center">No hay productos seleccionados</TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </div>

                  <div className='tw-w-full tw-h-[95%] tw-flex tw-justify-center tw-justify-items-center tw-mx-36 -tw-mt-5 tw-mb-5'>
                    {selectedProductsError && <div style={{ color: 'red', fontSize: '14px', marginLeft: 5 }}>*{selectedProductsError}</div>}
                  </div>

                </div>
            }

            <div className='tw-w-[101%] tw-flex tw-justify-center tw-items-center tw-border-t-white tw-border-t-[0.5px] tw-border-x-0 tw-border-b-0 tw-border-solid'>
              <div className='tw-w-1/2 tw-py-4 tw-flex tw-flex-col tw-justify-center tw-items-start'>
                <div className='tw-w-40 tw-flex tw-flex-col tw-justify-center tw-items-center'>
                  <Typography style={{ fontSize: 14, color: "white" }}>
                    {step === 1 ? "Paso 1/3" : step === 2 ? "Paso 2/3" : "Paso 3/3"}
                  </Typography>
                </div>
              </div>
              <div className='tw-w-1/2 tw-py-4 tw-flex tw-justify-end tw-items-center'>
                <div className='tw-w-[100%] tw-h-full tw-flex tw-justify-end tw-items-center'>
                  {step === 1 ?
                    (
                      <div className='tw-w-[60%] tw-h-full tw-flex tw-justify-end tw-items-center'>
                        {/*  <Button
                          variant='contained'
                          className='tw-bg-white tw-text-black tw-shadow-m tw-capitalize tw-flex tw-justify-center tw-items-center tw-mr-11'
                          onClick={handleNextStepOne}
                          sx={{ width: '45px', minWidth: '45px' }}
                        >
                          <ArrowForwardIosIcon style={{ padding: 2, paddingLeft: 5 }} />
                        </Button> */}

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
                    : step === 2 ?
                      < div className='tw-w-[40%] tw-h-full tw-flex tw-justify-center tw-items-center tw-mr-16'>

                        <Button
                          variant="text"
                          className="tw-text-black tw-mr-7"
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
                          className="tw-text-black tw-mr-4"
                          onClick={handleNextStepTwo}
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
                        {/* <Button
                          variant='contained'
                          className='tw-bg-white tw-text-black tw-shadow-m tw-capitalize tw-flex tw-justify-center tw-items-center'
                          onClick={() => setStep(1)}
                          sx={{ width: '45px', minWidth: '45px' }}
                        >
                          <ArrowBackIosIcon style={{ padding: 2, paddingLeft: 10 }} />
                        </Button>
                        <Button
                          variant='contained'
                          className='tw-bg-white tw-text-black tw-shadow-m tw-capitalize tw-flex tw-justify-center tw-items-center  tw-ml-6'
                          onClick={handleNextStepTwo}
                          sx={{ width: '45px', minWidth: '45px' }}
                        >
                          <ArrowForwardIosIcon style={{ padding: 2, paddingLeft: 5 }} />
                        </Button> */}
                      </div>
                      :
                      <div className='tw-w-full tw-h-full tw-flex tw-justify-end tw-items-center'>
                        <div className='tw-w-[40%] tw-h-full tw-flex tw-justify-center tw-items-center tw-mr-16'>
                          {/* <Button
                            variant='contained'
                            className='tw-bg-white tw-text-black tw-shadow-m tw-capitalize tw-flex tw-justify-center tw-items-center'
                            onClick={() => setStep(2)}
                            sx={{ width: '45px', minWidth: '45px' }}
                          >
                            <ArrowBackIosIcon style={{ padding: 2, paddingLeft: 10 }} />
                          </Button> */}

                          <Button
                            variant="text"
                            className="tw-text-black tw-mr-4"
                            onClick={() => setStep(2)}
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

                          {/*  <Button
                            variant='contained'
                            className='tw-bg-white tw-text-black tw-shadow-m tw-capitalize tw-ml-6'
                            onClick={isEditData ? handleEditData : dataRegisterHandle}
                            sx={{ width: '45px', minWidth: '45px' }}
                          >
                            <SaveIcon style={{ padding: 2, paddingLeft: 1 }} />
                          </Button> */}
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

export default PlanRegisterForm;
