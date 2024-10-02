import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography
} from '@mui/material';
import useDictionary from '@/hooks/dictionary/useDictionary';
import 'react-phone-input-2/lib/style.css'
import DistributorRegisterFormHook from './hooks/DistributorRegisterFormHook';
import { Locale } from 'i18n-config';
import { DataGrid, GridColDef, gridFilteredSortedRowIdsSelector, GridToolbarContainer, GridToolbarQuickFilter, gridVisibleColumnFieldsSelector, useGridApiRef } from '@mui/x-data-grid';
import { Close } from '@mui/icons-material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import SaveIcon from '@mui/icons-material/Save';
import BadgeIcon from '@mui/icons-material/Badge';
import EditIcon from '@mui/icons-material/Edit';
import moment from 'moment';
import DeleteIcon from '@mui/icons-material/Delete';
import GetAppIcon from '@mui/icons-material/GetApp';
import FilterListIcon from '@mui/icons-material/FilterList';

const DistributorRegisterForm = ({ params: { lang } }: { params: { lang: Locale } }) => {
  const {
    data,
    documentType,
    setDocumentType,
    documentNumber,
    setDocumentNumber,
    fullName,
    setFullName,
    email,
    setEmail,
    confirmEmail,
    setConfirmEmail,
    phoneNumber,
    setPhoneNumber,
    address,
    setAddress,
    city,
    state,
    country,
    category,
    setCategory,
    isActive,
    setIsActive,
    isModalOpen,
    isEditData,
    rowId,
    handleOpenModal,
    handleCloseModal,
    documentTypeError,
    documentNumberError,
    fullNameError,
    emailError,
    confirmEmailError,
    phoneNumberError,
    addressError,
    cityError,
    stateError,
    countryError,
    categoryError,
    isActiveError,
    dataCategories,
    countries,
    departments,
    cities,
    handleChangeCountry,
    handleChangeDepartament,
    handleChangeCity,
    dataRegisterHandle,
    handleEditData,
    handleEditDistribuidor,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    exportToExcel,
    handleDeleteFilter,
    handleDateChange
  } = DistributorRegisterFormHook();

  const dictionary = useDictionary({ lang: 'es' });
  const dateToday = new Date().toISOString().split('T')[0];
  const apiRef = useGridApiRef();
  const formatearFecha = (fechaISO: string): string => {
    return moment(fechaISO).format("DD/MM/YYYY HH:mm:ss");
  };

  const columns: GridColDef[] = [
    {
      field: 'optionEdit',
      headerName: 'Editar',
      minWidth: 120,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Button style={{ color: 'black' }} onClick={() => handleEditDistribuidor(params?.value)}>
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
    { field: 'documentType', headerName: 'Tipo documento', minWidth: 130, flex: 1, headerAlign: 'center', align: 'center' },
    { field: 'id', headerName: 'Id', minWidth: 130, flex: 1, headerAlign: 'center', align: 'center' },
    { field: 'name', headerName: 'Nombres y Apellidos', minWidth: 230, flex: 2, headerAlign: 'center', align: 'center' },
    { field: 'phoneNumber', headerName: 'Teléfono', minWidth: 230, flex: 2, headerAlign: 'center', align: 'center' },
    { field: 'email', headerName: 'Correo', minWidth: 230, flex: 2, headerAlign: 'center', align: 'center' },
    {
      field: 'status',
      headerName: 'Estado',
      minWidth: 140,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <div className='tw-flex tw-justify-center tw-items-center'>
          <div>{params.value === true ? 'Activo' : 'Inactivo'}</div>
        </div>
      )
    },];

  function getExcelData(apiRef: any) {
    // Select rows and columns
    const filteredSortedRowIds = gridFilteredSortedRowIdsSelector(apiRef);
    const visibleColumnsField = gridVisibleColumnFieldsSelector(apiRef);

    // Format the data. Here we only keep the value
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
      <GridToolbarContainer sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'end', width: '100%', paddingLeft: 2, paddingRight: 5, marginBottom: -2, marginTop: 1 }}>
          <Button
            className='tw-w-[90px] tw-h-[100%] tw-text-white tw-text-custom tw-mr-2'
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
          <Button
            className='tw-w-[90px] tw-h-[100%] tw-text-white tw-text-custom'
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
            onClick={() => handleExport()}
          >
            <GetAppIcon style={{ marginBottom: 5, fontSize: 30, color: '#02AF9B' }} />
            <Typography style={{ color: '#02AF9B' }}>
              Exportar
            </Typography>
          </Button>
        </Box>

        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ width: '35%', paddingBottom: 3, paddingTop: 0, paddingLeft: 2 }}>
            <Typography variant="inherit" style={{ paddingBottom: 8, fontSize: 14.4, color: "rgba(0, 0, 0, 0.6)" }}>
              Consulta General
            </Typography>
            <GridToolbarQuickFilter
              sx={{
                width: '100%',
                height: '40px',
                backgroundColor: '#f4f4f4',
                borderRadius: '8px',
                textDecoration: 'none',
                '& .MuiInputBase-root': {
                  height: '40px',
                  backgroundColor: '#f4f4f4',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  '&.MuiInput-underline:before': {
                    borderBottom: 'none',
                  },
                },
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', paddingRight: 5 }}>
            <div style={{ height: '100%', width: '50%', paddingLeft: 5, paddingRight: 15 }}>
              <div style={{ height: '100%', width: '90%' }}>
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
            <div style={{ height: '100%', width: '50%' }}>
              <div style={{ height: '100%', width: '90%' }}>
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

            <Button
              className='tw-w-[90px] tw-h-[100%] tw-text-white tw-text-custom tw-mx-5 tw-mr-9'
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
              onClick={handleDateChange}
            >
              <FilterListIcon style={{ marginBottom: 5, fontSize: 30, color: '#02AF9B' }} />
              <Typography style={{ color: '#02AF9B' }}>
                Filtrar
              </Typography>
            </Button>

            <Button
              className='tw-w-[100px] tw-h-[100%] tw-text-white tw-text-custom tw-mr-2'
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
              onClick={handleDeleteFilter}
            >
              <DeleteIcon style={{ marginBottom: 5, fontSize: 30, color: '#02AF9B' }} />
              <Typography style={{ color: '#02AF9B' }}>
                Borrar
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
          {dictionary.dictionary?.backOffice.DistributorsLabel}
        </Typography>
        <div style={{ height: 650, width: '100%' }} className='tw-bg-white tw-shadow-m tw-rounded-2xl tw-m-6'>
          <DataGrid
            apiRef={apiRef}
            rows={data ?? []}
            columns={columns}
            getRowId={(row) => row.id}
            slots={{ toolbar: CustomToolbar }}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 15 },
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
            <div className='tw-w-[90%] tw-bg-white tw-shadow-m tw-rounded-2xl tw-py-3 tw-mt-10 tw-mb-6 tw-flex tw-flex-col tw-justify-center tw-items-center'>
              <div className='tw-w-[90%] tw-h-[95%] tw-flex-row tw-justify-center tw-justify-items-center tw-mx-32 tw-mt-4 tw-mb-5'>

                <form className='tw-w-full'>
                  <div className='tw-flex tw-justify-between tw-mb-6'>
                    <FormControl fullWidth variant='outlined' className='tw-mr-2'>
                      <InputLabel>Tipo de Documento</InputLabel>
                      <Select
                        label='Tipo de Documento'
                        className='tw-w-full'
                        value={documentType}
                        error={
                          !!documentTypeError
                        }
                        onChange={(e) => setDocumentType(e.target.value)}
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

                    <TextField
                      variant='standard'
                      label='Número Documento'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <BadgeIcon
                              style={{
                                color: '#02AF9B',
                                fontSize: '1.8rem',
                                marginRight: '1rem',
                              }}
                            />
                          </InputAdornment>
                        ),
                      }}
                      fullWidth
                      className='tw-ml-2'
                      value={documentNumber}
                      error={!!documentNumberError}
                      helperText={documentNumberError}
                      onChange={(e) => setDocumentNumber(e.target.value)}
                    />
                  </div>

                  <TextField
                    variant='standard'
                    label='Razón Social'
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <BadgeIcon
                            style={{
                              color: '#02AF9B',
                              fontSize: '1.8rem',
                              marginRight: '1rem',
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                    fullWidth
                    className='tw-mb-6'
                    value={fullName}
                    error={!!fullNameError}
                    helperText={fullNameError}
                    onChange={(e) => setFullName(e.target.value)}
                  />

                  <div className='tw-flex tw-justify-between tw-mb-6'>
                    <TextField
                      variant='standard'
                      label='Correo'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <BadgeIcon
                              style={{
                                color: '#02AF9B',
                                fontSize: '1.8rem',
                                marginRight: '1rem',
                              }}
                            />
                          </InputAdornment>
                        ),
                      }}
                      fullWidth
                      className='tw-mr-2'
                      value={email}
                      error={!!emailError}
                      helperText={emailError}
                      onChange={(e) => setEmail(e.target.value)}
                      onCopy={(e) => e.preventDefault()}  // Bloquea copiar
                      onCut={(e) => e.preventDefault()}   // Bloquea cortar
                    />

                    <TextField
                      variant='standard'
                      label='Confirmar Correo'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <BadgeIcon
                              style={{
                                color: '#02AF9B',
                                fontSize: '1.8rem',
                                marginRight: '1rem',
                              }}
                            />
                          </InputAdornment>
                        ),
                      }}
                      fullWidth
                      className='tw-ml-2'
                      value={confirmEmail}
                      error={!!confirmEmailError}
                      helperText={confirmEmailError}
                      onChange={(e) => setConfirmEmail(e.target.value)}
                      onCopy={(e) => e.preventDefault()}
                      onCut={(e) => e.preventDefault()}
                      onPaste={(e) => e.preventDefault()}
                    />
                  </div>

                  <TextField
                    variant='standard'
                    label='Número Celular'
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <BadgeIcon
                            style={{
                              color: '#02AF9B',
                              fontSize: '1.8rem',
                              marginRight: '1rem',
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                    fullWidth
                    className='tw-mb-6'
                    value={phoneNumber}
                    error={!!phoneNumberError}
                    helperText={phoneNumberError}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />

                  <TextField
                    variant='standard'
                    label='Dirección'
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <BadgeIcon
                            style={{
                              color: '#02AF9B',
                              fontSize: '1.8rem',
                              marginRight: '1rem',
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                    fullWidth
                    className='tw-mb-6'
                    value={address}
                    error={!!addressError}
                    helperText={addressError}
                    onChange={(e) => setAddress(e.target.value)}
                  />

                  <div className='tw-flex tw-justify-between tw-mb-7 tw-mt-2'>

                    <FormControl fullWidth variant='outlined' className='tw-mr-2'>
                      <InputLabel>País</InputLabel>
                      <Select
                        label='País'
                        //variant='standard'
                        className='tw-w-full'
                        value={country}
                        error={
                          !!countryError
                        }
                        onChange={(e) => handleChangeCountry(e)}
                      >
                        {countries && countries.map((country: any) => (
                          <MenuItem key={country.label} value={country.label}>
                            {country.label}
                          </MenuItem>
                        ))}

                      </Select>
                    </FormControl>

                    <FormControl fullWidth variant='outlined' className='tw-ml-2'>
                      <InputLabel>Departamento</InputLabel>
                      <Select
                        label='Departamento'
                        className='tw-w-full'
                        value={state}
                        error={
                          !!stateError
                        }
                        onChange={handleChangeDepartament}
                      >
                        {departments && departments.map((dep: any) => (
                          <MenuItem key={dep.departamento} value={dep.departamento}>
                            {dep.departamento}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl fullWidth variant='outlined' className='tw-ml-2'>
                      <InputLabel>Ciudad</InputLabel>
                      <Select
                        label='Ciudad'
                        className='tw-w-full'
                        value={city}
                        error={
                          !!cityError
                        }
                        onChange={handleChangeCity}
                      >
                        {cities && cities.map((city: any) => (
                          <MenuItem key={city} value={city}>
                            {city}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>


                  <div className='tw-flex tw-justify-between tw-mb-2 tw-mt-2'>
                    <FormControl fullWidth variant='outlined' className='tw-mr-5'>
                      <InputLabel>Seleccionar Categoría / Descuento</InputLabel>
                      <Select
                        label='Seleccionar Categoría / Descuento'
                        className='tw-w-full'
                        value={category}
                        error={
                          !!categoryError
                        }
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        {dataCategories && dataCategories.map((cat: any) => (
                          <MenuItem key={cat.name} value={cat.name}>
                            {cat.name}
                          </MenuItem>
                        ))}

                      </Select>
                    </FormControl>

                    <FormControl fullWidth variant='outlined' className='tw-mb-1'>
                      <InputLabel>Estado</InputLabel>
                      <Select
                        label='Estado'
                        className='tw-w-full'
                        value={isActive ? "true" : "false"}
                        error={
                          !!isActiveError
                        }
                        onChange={(e) => setIsActive(e.target.value === "true")}
                      >
                        <MenuItem value='true'>Activo</MenuItem>
                        <MenuItem value='false'>Inactivo</MenuItem>
                      </Select>
                    </FormControl>
                  </div>

                </form>
              </div>
            </div>

            <div className='tw-w-[101%] tw-flex tw-justify-center tw-items-center tw-border-t-white tw-border-t-[0.5px] tw-border-x-0 tw-border-b-0 tw-border-solid'>
              <div className='tw-w-1/2 tw-py-4 tw-flex tw-flex-col tw-justify-center tw-items-start'>
                <div className='tw-w-40 tw-flex tw-flex-col tw-justify-center tw-items-center'>
                  <Typography style={{ fontSize: 14, color: "white" }}>
                  </Typography>
                </div>
              </div>
              <div className='tw-w-1/2 tw-py-4 tw-flex tw-justify-end tw-items-center'>
                <div className='tw-w-[100%] tw-h-full tw-flex tw-justify-end tw-items-center'>
                  <div className='tw-w-full tw-h-full tw-flex tw-justify-end tw-items-center'>
                    <div className='tw-w-[55%] tw-h-full tw-flex tw-justify-center tw-items-center tw-mr-2'>
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
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div >
  );
};

export default DistributorRegisterForm;
