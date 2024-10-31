import Link from "next/link";
import { Typography, Button, TextField, InputAdornment, Select, MenuItem } from "@mui/material";
import { Modal, Box, IconButton } from '@mui/material';
import { DataGrid, GridColDef, gridFilteredSortedRowIdsSelector, GridToolbarContainer, gridVisibleColumnFieldsSelector, useGridApiRef } from '@mui/x-data-grid';
import { GridToolbarQuickFilter } from '@mui/x-data-grid/components';

import useDictionary from "@/hooks/dictionary/useDictionary";
// Icons
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LinkIcon from '@mui/icons-material/Link';
import EditIcon from '@mui/icons-material/Edit';
import { Close } from '@mui/icons-material';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import BadgeIcon from '@mui/icons-material/Badge';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import VisibilityIcon from '@mui/icons-material/Visibility';
import GetAppIcon from '@mui/icons-material/GetApp';
import FilterListIcon from '@mui/icons-material/FilterList';
import DeleteIcon from '@mui/icons-material/Delete';

//QR
import { QRCodeSVG } from 'qrcode.react';
import ReactCountryFlag from 'react-country-flag';
import { countries } from '../../globals/constants'
import SaveIcon from '@mui/icons-material/Save';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import SwitchEdit from "../userTable/SwitchEdit";
import CustomersDistributorHook from "./hooks/CustomersDistributorHook";

const CustomersDistributorForm = ({ handleCreateUser }: { handleCreateUser: any }) => {
    const {
        setFlag,
        flag,
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
        errorPlanForm,
        errorPhoneForm,
        errorPhoneCodeForm,
        errorMailForm,
        errorConfirmEmailForm,
        handleEditUser,
        handleEditData
    } = CustomersDistributorHook();

    const dictionary = useDictionary({ lang: 'es' });
    const dateToday = new Date().toISOString().split('T')[0];
    const apiRef = useGridApiRef();

    const getCountryFlag = (item: any) => {
        const country = countries.find(country => country.id === item);
        return country ? country.flag : '';
    };

    const getCountryName = (item: any) => {
        const country = countries.find(country => country.id === item);
        return country ? country.code : '';
    };

    const getFormattedDate = (date: any) => {
        const formattedDate = `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()}`;
        return formattedDate ? formattedDate : '';
    };

    const getUrlFormatted = (url: any) => {
        const urlFormatted = url && url.replace(/localhost:3000|on-tap-tawny.vercel.app/g, 'backoffice.onetap.com.co');
        return urlFormatted ? urlFormatted : '';
    };

    const columns: GridColDef[] = [
        {
            field: 'optionEdit',
            headerName: 'Editar',
            minWidth: 110,
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <Button style={{ color: 'black' }} onClick={() => handleEditUser(params.value)}>
                    <EditIcon />
                </Button>
            )
        },
        {
            field: 'date',
            headerName: 'Fecha Registro',
            minWidth: 130,
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <div className='tw-flex tw-justify-center tw-items-center'>
                    <div>
                        {getFormattedDate(params.value)}
                    </div>
                </div>
            )
        },
        {
            field: 'hour',
            headerName: 'Hora Registro',
            minWidth: 130,
            flex: 1,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'id',
            headerName: 'No. Identificación',
            minWidth: 160,
            flex: 1,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'name',
            headerName: 'Nombres y Apellidos',
            minWidth: 230,
            flex: 2
        },
        {
            field: 'indicative',
            headerName: 'Indicativo',
            minWidth: 90,
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <div className='tw-flex tw-justify-center tw-items-center'>
                    {params.value && (
                        <ReactCountryFlag
                            countryCode={getCountryFlag(params.value ? params.value : '')}
                            svg
                            style={{ marginRight: '5px', width: '29px', height: '20px' }}
                        />
                    )}
                    <div>
                        {getCountryName(params.value)}
                    </div>
                </div>
            )
        },
        {
            field: 'phone',
            headerName: 'Teléfono',
            minWidth: 180,
            flex: 1,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'email',
            headerName: 'Correo',
            minWidth: 250,
            flex: 2
        },
        {
            field: 'plan',
            headerName: 'Plan',
            minWidth: 110,
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <div className='tw-flex tw-justify-center tw-items-center'>
                    {params.value && (
                        <div>
                            {params.value.plan}
                        </div>
                    )}
                </div>
            )
        },
        {
            field: 'userType',
            headerName: 'Tipo Usuario',
            minWidth: 130,
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <div className='tw-flex tw-justify-center tw-items-center'>
                    {params.value && (
                        <div>
                            {params.value.gif === true ? "Obsequio" : "Comprador"}
                        </div>
                    )}
                </div>
            )
        },
        {
            field: 'url',
            headerName: 'URL',
            minWidth: 100,
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <div className='tw-flex tw-justify-center tw-items-center'>
                    {params.value && (
                        <>
                            <Link className="tw-mr-5" href={getUrlFormatted(params.value.preview)}><LinkIcon /> </Link>
                            <div onClick={() => { navigator.clipboard.writeText(getUrlFormatted(params.value.preview)) }}>
                                <ContentCopyIcon />
                            </div>
                        </>
                    )}
                </div>
            )
        },
        {
            field: 'urlQR',
            headerName: 'QR',
            minWidth: 110,
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <div className='tw-flex tw-justify-center tw-items-center'>
                    {params.value && (
                        <>
                            <Button style={{ color: 'black' }} onClick={() => handleSeeQR(getUrlFormatted(params.value.preview))}>
                                <VisibilityIcon />
                            </Button>
                        </>
                    )}
                </div>
            )
        },
        {
            field: 'edit',
            headerName: 'Inactivo/Activo',
            minWidth: 120,
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <div>
                    <SwitchEdit
                        isActive={params.value.switch}
                        uid={params.value.uid}
                        onSwitchChange={handleSwitchChange}
                    />
                </div>
            )
        }
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
            <GridToolbarContainer sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'end', width: '100%', paddingLeft: 2, paddingRight: 5, marginBottom: 0, marginTop: 1 }}>
                    <Button
                        className='tw-w-[90px] tw-h-[100%] tw-text-white tw-text-custom tw-mr-4'
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
                        onClick={handleCreateUser}
                    >
                        <AddCircleRoundedIcon style={{ marginBottom: 5, fontSize: 30, color: '#02AF9B' }} />
                        <Typography style={{ color: '#02AF9B' }}>
                            Crear
                        </Typography>
                    </Button>

                    <Button
                        className='tw-w-[90px] tw-h-[100%] tw-text-white tw-text-custom tw-mr-4'
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
                            className='tw-w-[100px] tw-h-[100%] tw-text-white tw-text-custom tw-mr-4'
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

    return (
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
                    {dictionary.dictionary?.backOffice?.LabelCustomersDistributor}
                </Typography>
                <div style={{ height: 650, width: '100%' }} className='tw-bg-white tw-shadow-m tw-rounded-2xl tw-m-6'>
                    <DataGrid
                        apiRef={apiRef}
                        rows={[]}
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
                                sortModel: [{ field: 'date', sort: 'desc' }],
                            },
                        }}
                        pageSizeOptions={[15, 25]}
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
                            <div className='tw-w-full tw-h-[95%] tw-flex-row tw-justify-center tw-justify-items-center tw-mx-20 tw-mt-2 tw-mb-2'>
                                <div className="tw-w-full tw-flex tw-justify-center tw-justify-items-center">
                                    <TextField
                                        variant='standard'
                                        label={dictionary.dictionary?.backOffice.dni}
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
                                        id='outlined-required'
                                        value={dni}
                                        className='tw-mb-4 tw-w-[300px] tw-text-sm tw-mt-4'
                                        onChange={(e) => setDni(e.target.value)}
                                        error={Boolean(errorDniForm)}
                                        helperText={errorDniForm}
                                    />
                                </div>
                                <div className="tw-w-full tw-flex tw-justify-center tw-justify-items-center tw-mt-1">
                                    <TextField
                                        id='outlined-required'
                                        value={name}
                                        variant='standard'
                                        label={dictionary.dictionary?.backOffice.Nombre}
                                        className='tw-mb-4 tw-w-[300px] tw-text-sm'
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position='start'>
                                                    <PersonOutlinedIcon
                                                        style={{
                                                            color: '#02AF9B',
                                                            fontSize: '1.8rem',
                                                            marginRight: '1rem',
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
                                        id='outlined-required'
                                        value={email}
                                        variant='standard'
                                        className='tw-mb-4 tw-w-[300px] tw-text-sm'
                                        label={dictionary.dictionary?.backOffice.Email}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position='start'>
                                                    <AlternateEmailIcon
                                                        style={{
                                                            color: '#02AF9B',
                                                            fontSize: '1.8rem',
                                                            marginRight: '1rem',
                                                        }}
                                                    />
                                                </InputAdornment>
                                            ),
                                        }}
                                        onChange={(e) => setEmail(e.target.value)}
                                        error={Boolean(errorMailForm)}
                                        helperText={errorMailForm}
                                        onCopy={(e) => e.preventDefault()}  // Bloquea copiar
                                        onCut={(e) => e.preventDefault()}   // Bloquea cortar
                                    />
                                </div>
                                <div className="tw-w-full tw-flex tw-justify-center tw-justify-items-center tw-mt-1">
                                    <TextField
                                        id='outlined'
                                        value={confirmEmail}
                                        variant='standard'
                                        className='tw-mb-4 tw-w-[300px] tw-text-sm'
                                        label={dictionary.dictionary?.backOffice.ConfirmEmail}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position='start'>
                                                    <AlternateEmailIcon
                                                        style={{
                                                            color: '#02AF9B',
                                                            fontSize: '1.8rem',
                                                            marginRight: '1rem',
                                                        }}
                                                    />
                                                </InputAdornment>
                                            ),
                                        }}
                                        onChange={(e) => setConfirmEmail(e.target.value)}
                                        error={Boolean(errorConfirmEmailForm)}
                                        helperText={errorConfirmEmailForm}
                                        onCopy={(e) => e.preventDefault()}  // Bloquea copiar
                                        onCut={(e) => e.preventDefault()}   // Bloquea cortar
                                        onPaste={(e) => e.preventDefault()} // Bloquea pegar
                                    />
                                </div>
                                <div className="tw-w-full tw-flex tw-justify-center tw-justify-items-center tw-mt-1 ">
                                    <div className='tw-w-[300px] tw-flex tw-items-start tw-justify-center tw-mb-4 tw-mt-3'>
                                        <div className='tw-w-[40%] tw-items-start'>
                                            <Select
                                                variant='outlined'
                                                className='tw-w-[100%] tw-text-center'
                                                value={phoneCode}
                                                style={{ height: '48px' }}
                                                required
                                                id='outlined-required'
                                                defaultValue=''
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
                                                        <ReactCountryFlag countryCode={country.flag} svg style={{ marginRight: '8px' }} />
                                                        {country.code}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </div>
                                        <div className='tw-h-[100%] tw-w-[60%] tw-items-start tw-ml-2'>
                                            <TextField
                                                id="standard-number"
                                                value={phone}
                                                variant='standard'
                                                className='tw-w-full'
                                                InputLabelProps={{
                                                    shrink: true
                                                }}
                                                inputProps={{
                                                    inputMode: 'numeric',
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
                                    <div className='tw-w-[300px] tw-flex-row tw-items-start tw-justify-start tw-mb-4 tw-mt-1'>
                                        <Typography
                                            color='textSecondary'
                                            display={'flow'}
                                            className='tw-text-left tw-text-sm tw-mb-2'
                                        >
                                            {dictionary.dictionary?.backOffice.Plan}
                                        </Typography>
                                        <div className='tw-relative'>
                                            <PersonOutlinedIcon
                                                style={{
                                                    color: '#02AF9B',
                                                    fontSize: '1.8rem',
                                                    marginTop: '1rem',
                                                    marginLeft: '1rem',
                                                    position: 'absolute',
                                                }}
                                            />
                                            <Select
                                                className='tw-w-[300px] tw-text-center tw-mb-4'
                                                required
                                                id='outlined-required'
                                                value={plan}
                                                variant='outlined'
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
                                                <MenuItem value='standard'>{dictionary.dictionary?.backOffice.StandardPlan}</MenuItem>
                                                <MenuItem value='premium'>{dictionary.dictionary?.backOffice.PremiumPlan}</MenuItem>
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='tw-w-[101%] tw-flex tw-justify-center tw-items-center tw-border-t-white tw-border-t-[0.5px] tw-border-x-0 tw-border-b-0 tw-border-solid'>
                            <div className='tw-w-1/2 tw-py-4 tw-flex tw-flex-col tw-justify-center tw-items-start'>
                                <div className='tw-w-40 tw-flex tw-flex-col tw-justify-center tw-items-center'>
                                </div>
                            </div>
                            <div className='tw-w-1/2 tw-py-4 tw-flex tw-justify-end tw-items-center'>
                                <div className='tw-w-[100%] tw-h-full tw-flex tw-justify-end tw-items-center'>
                                    <div className='tw-w-full tw-h-full tw-flex tw-justify-end tw-items-center'>
                                        <div className='tw-w-[40%] tw-h-full tw-flex tw-justify-center tw-items-center tw-mr-10'>

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
                                                startIcon={<SaveIcon style={{ paddingLeft: 1, fontSize: 25, color: 'white' }} />}
                                            >
                                                <Typography style={{ color: 'white' }}>
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
                        padding: 5,
                        borderRadius: 3,
                        position: 'relative',
                    }}
                >

                    <IconButton
                        className='tw-absolute tw-right-1 tw-top-1'
                        onClick={() => setIsModalQR(false)}
                    >
                        <Close className='tw-text-white' />
                    </IconButton>

                    {urlQR && (
                        <div className='tw-w-[100%] tw-h-[80%] tw-flex tw-flex-col tw-justify-center tw-justify-items-center tw-pl-3 tw-pr-3'>
                            <Box className='tw-w-[100%] tw-bg-white tw-shadow-m tw-rounded-2xl tw-p-10 tw-mt-4 tw-flex tw-flex-col tw-justify-center tw-items-center'>
                                <div className='tw-w-[380px] tw-flex tw-justify-center tw-items-center'>
                                    <QRCodeSVG id="qrcode-svg" value={urlQR} size={380} className='' />

                                </div>
                            </Box>
                            <Box className='tw-w-[100%] tw-bg-white tw-shadow-m tw-rounded-2xl tw-p-10 tw-mt-4 tw-flex tw-flex-col tw-justify-center tw-items-center'>
                                <div className='tw-w-[350px] tw-flex tw-justify-center tw-items-center'>
                                    <Button
                                        variant='contained'
                                        className='tw-mx-auto tw-mt-4 tw-w-[200px] tw-bg-[#02AF9B] tw-text-white tw-shadow-m'
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
        </div >
    );
}

export default CustomersDistributorForm;