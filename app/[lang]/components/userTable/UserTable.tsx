import Link from "next/link";
import { Typography, Button, TextField, InputAdornment, Select, MenuItem, InputLabel } from "@mui/material";
import { Modal, Box, IconButton } from '@mui/material';
import { DataGrid, GridColDef, GridToolbarContainer } from '@mui/x-data-grid';
import { GridToolbarQuickFilter } from '@mui/x-data-grid/components';
import UserTableLogic from "./hooks/UserTable";
import SwitchEdit from "./SwitchEdit";
import ModalStateEdit from "./ModalStateEdit";
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
import SearchIcon from '@mui/icons-material/Search';
//QR
import { QRCodeSVG } from 'qrcode.react';
import ReactCountryFlag from 'react-country-flag';
import { countries } from '../../globals/constants'

const UserTable = () => {
    const {
        query,
        setFlag,
        flag,
        handleEditData,
        isModalEdit,
        setIsModalEdit,
        dataUser,
        setDni,
        dni,
        name,
        setName,
        email,
        setEmail,
        plan,
        setPlan,
        type,
        setType,
        dataRegisterHandle,
        isModalSuccess,
        setIsModalSuccess,
        isModalFail,
        handleSeeQR,
        setIsModalFail,
        isModalQR,
        setIsModalQR,
        urlQR,
        setUrlQR,
        handleDownloadQR,
        handleDateChange,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        searchTerm,
        setSearchTerm,
        handleDeleteFilter,
        phoneCode,
        setPhoneCode,
        phone,
        setPhone
    } = UserTableLogic();

    const dictionary = useDictionary({ lang: 'es' });
    const dateToday = new Date().toISOString().split('T')[0];

    const getCountryFlag = (item: any) => {
        const country = countries.find(country => country.id === item);
        return country ? country.flag : '';
    };

    const getCountryName = (item: any) => {
        const country = countries.find(country => country.id === item);
        return country ? country.code : '';
    };

    const columns: GridColDef[] = [
        { field: 'date', headerName: 'Fecha Registro', width: 130, headerAlign: 'center', align: 'center' },
        { field: 'hour', headerName: 'Hora Registro', width: 130, headerAlign: 'center', align: 'center' },
        { field: 'id', headerName: 'No. Identificación', width: 160, headerAlign: 'center', align: 'center' },
        { field: 'name', headerName: 'Nombres y Apellidos', width: 230 },
        {
            field: 'indicative', headerName: 'Indicativo', width: 90, headerAlign: 'center', align: 'center',
            renderCell: (params) => (
                <div className='tw-flex tw-justify-center tw-items-center'>
                    {params.value && (
                        <ReactCountryFlag countryCode={getCountryFlag(params.value ? params.value : '')} svg style={{ marginRight: '5px', width: '29px', height: '20px' }} />
                    )}
                    <div>
                        {getCountryName(params.value)}
                    </div>
                </div>
            )
        },
        { field: 'phone', headerName: 'Teléfono ', width: 180, headerAlign: 'center', align: 'center' },
        { field: 'email', headerName: 'Correo', width: 250 },
        { field: 'plan', headerName: 'Plan', width: 110, headerAlign: 'center', align: 'center' },
        { field: 'userType', headerName: 'Tipo Usuario', width: 130, headerAlign: 'center', align: 'center' }, //Es para que se pueda identifica si es un usuario comprador o solo le reglaran la tarjeta
        {
            field: 'url', headerName: 'URL', width: 100, headerAlign: 'center', align: 'center',
            renderCell: (params) => (
                //mostrar los iconos de link y copy al lado del url
                <div className='tw-flex tw-justify-center tw-items-center'>
                    <Link className="tw-mr-5" href={`${params.value}`}><LinkIcon /> </Link>
                    <div onClick={() => { navigator.clipboard.writeText(`${params.value}`) }}>
                        <ContentCopyIcon />
                    </div>
                </div>
            )
        },
        {
            field: 'urlQR', headerName: 'QR', width: 110,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <Button style={{ color: 'black' }} onClick={() => handleSeeQR(params.value)}>
                    <VisibilityIcon />
                </Button>
            )
        },
        {
            field: 'status', headerName: 'Estado del Cliente', width: 130, headerAlign: 'center', align: 'center',
            renderCell: (params) => (
                <div>
                    {params.value}
                </div>
            )
        },
        {
            field: 'edit', headerName: 'Editar', width: 110,
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
        },
        {
            field: 'optionEdit', headerName: 'Editar', width: 110,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <Button style={{ color: 'black' }} onClick={() => handleEditData(params.value)}>
                    <EditIcon />
                </Button>
            )
        }
    ];

    const handleSwitchChange = () => {
        setFlag(!flag);
    };

    function CustomToolbar() {
        return (
            <GridToolbarContainer sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 1 }}>
                <Box sx={{ width: '35%', paddingBottom: 3, paddingTop: 1, paddingLeft: 2 }}>
                    <Typography variant="inherit" style={{ paddingBottom: 9, fontSize: 14.4, color: "rgba(0, 0, 0, 0.6)" }}>
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
                        className='tw-w-[100%] tw-h-[100%] tw-text-white tw-text-custom border tw-bg-[#02AF9B] tw-mx-4'
                        type='submit'
                        style={{ textTransform: 'none' }}
                        onClick={handleDateChange}
                    >
                        Filtrar
                    </Button>

                    <Button
                        className='tw-w-[100%] tw-h-[100%] tw-text-white tw-text-custom border tw-bg-[#02AF9B]'
                        type='submit'
                        style={{ textTransform: 'none' }}
                        onClick={handleDeleteFilter}
                    >
                        Borrar
                    </Button>
                </Box>
            </GridToolbarContainer>
        );
    }

    return query && (
        <div className='tw-flex tw-items-center tw-justify-center tw-bg-[url("/images/loginBackground.png")] tw-bg-no-repeat tw-bg-center tw-bg-cover'>
            <div className='tw-bg-[#02AF9B] tw-mt-4 tw-shadow-m tw-mx-20 tw-px-10 tw-rounded-2xl tw-h-[800px] tw-w-full tw-flex tw-flex-col tw-justify-center tw-items-center '>
                <Typography
                    className='tw-text-white  tw-mt-1 tw-w-full'
                    variant='h6'
                    color='textPrimary'
                    display={'flow'}
                    align='center'
                    fontWeight='bold'
                >
                    {dictionary.dictionary?.backOffice.UserTable}
                </Typography>

                <div style={{ height: 600, width: '100%' }} className='tw-bg-white tw-shadow-m tw-rounded-2xl tw-mt-10'>
                    <DataGrid
                        rows={query}
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
                        }}
                        pageSizeOptions={[15, 30]}
                        //checkboxSelection
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
                open={isModalEdit}
                onClose={setIsModalEdit}
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
                        onClick={() => setIsModalEdit(false)}
                    >
                        <Close className='tw-text-white' />
                    </IconButton>

                    {dataUser && (
                        <div className='tw-w-[100%] tw-h-[80%] tw-flex tw-justify-center tw-justify-items-center tw-pl-3 tw-pr-3'>
                            <Box className='tw-w-[95%] tw-bg-white tw-shadow-m tw-rounded-2xl tw-p-11 tw-mt-4 tw-flex tw-flex-col tw-justify-center tw-items-center' component='form'>
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
                                    required
                                    id='outlined-required'
                                    value={dni}
                                    className='tw-mb-4 tw-w-[300px] tw-text-sm tw-mt-4'
                                    onChange={(e) => setDni(e.target.value)}
                                />

                                <TextField
                                    required
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
                                />
                                <TextField
                                    required
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
                                />

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
                                        >
                                            {countries.map((country) => (
                                                <MenuItem key={country.id} value={country.id}>
                                                    <ReactCountryFlag countryCode={country.flag} svg style={{ marginRight: '8px' }} />
                                                    {country.code}
                                                    {/*  {country.name} ({country.code}) */}
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
                                        />
                                    </div>
                                </div>

                                <div className='tw-w-[300px]'>
                                    <Typography
                                        color='textSecondary'
                                        display={'flow'}
                                        className='tw-text-left tw-text-sm tw-mb-2'
                                    >
                                        {dictionary.dictionary?.backOffice.Plan}*
                                    </Typography>
                                </div>
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
                                    >
                                        <MenuItem value='standard'>{dictionary.dictionary?.backOffice.StandardPlan}</MenuItem>
                                        <MenuItem value='premium'>{dictionary.dictionary?.backOffice.PremiumPlan}</MenuItem>
                                    </Select>
                                </div>
                                {/* Tipo Usuario */}
                                <div className='tw-w-[300px]'>
                                    <Typography
                                        color='textSecondary'
                                        display={'flow'}
                                        className='tw-text-left tw-text-sm tw-mb-2'
                                    >
                                        {dictionary.dictionary?.backOffice.TypeUser}*
                                    </Typography>
                                </div>
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
                                        value={type}
                                        variant='outlined'
                                        onChange={(e) => setType(e.target.value)}
                                    >
                                        <MenuItem value='Obsequio'>{dictionary.dictionary?.backOffice.TypeGift}</MenuItem>
                                        <MenuItem value='Comprador'>{dictionary.dictionary?.backOffice.TypeBuyer}</MenuItem>
                                    </Select>
                                </div>

                                <Button
                                    variant='contained'
                                    className='tw-mx-auto tw-mt-4 tw-w-[200px] tw-bg-[#02AF9B] tw-text-white tw-shadow-m'
                                    onClick={dataRegisterHandle}
                                >
                                    {dictionary.dictionary?.backOffice.guardar}
                                </Button>

                            </Box>
                        </div>
                    )}
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
                            <Box className='tw-w-[83%] tw-bg-white tw-shadow-m tw-rounded-2xl tw-p-10 tw-mt-4 tw-flex tw-flex-col tw-justify-center tw-items-center'>
                                <div className='tw-w-[380px] tw-flex tw-justify-center tw-items-center'>
                                    <QRCodeSVG id="qrcode-svg" value={urlQR} size={380} className='' />

                                </div>
                            </Box>
                            <Box className='tw-w-[83%] tw-bg-white tw-shadow-m tw-rounded-2xl tw-p-10 tw-mt-4 tw-flex tw-flex-col tw-justify-center tw-items-center'>
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

            <ModalStateEdit
                isModalAlert={isModalSuccess}
                handleModalAlert={setIsModalSuccess}
                title={dictionary.dictionary?.generalTitle || ''}
                description={dictionary.dictionary?.backOffice?.alertSuccessEdit || ''}
                isClosed={true}
            />

            <ModalStateEdit
                isModalAlert={isModalFail}
                handleModalAlert={setIsModalFail}
                title={dictionary.dictionary?.generalTitle || ''}
                description={dictionary.dictionary?.backOffice?.alertFailEdit || ''}
                isClosed={true}
            />

        </div>
    );
}

export default UserTable;