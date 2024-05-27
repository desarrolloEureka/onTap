import Link from "next/link";
import { Typography, Button, TextField, InputAdornment, Select, MenuItem } from "@mui/material";
import { Modal, Box, IconButton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
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
        setIsModalFail } = UserTableLogic();
    const dictionary = useDictionary({ lang: 'es' });
    const columns: GridColDef[] = [
        { field: 'date', headerName: 'Fecha Registro', width: 170 },
        { field: 'id', headerName: 'No. Identificación', width: 160 },
        { field: 'name', headerName: 'Nombres y Apellidos', width: 230 },
        { field: 'email', headerName: 'Correo', width: 280 },
        { field: 'plan', headerName: 'Plan', width: 110 },
        { field: 'userType', headerName: 'Tipo Usuario', width: 130 }, //Es para que se pueda identifica si es un usuario comprador o solo le reglaran la tarjeta
        {
            field: 'url', headerName: 'URL', width: 140,
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
            field: 'status', headerName: 'Estado del Cliente', width: 130,
            renderCell: (params) => (
                <div>
                    {params.value}
                </div>)
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
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 15 },
                            },
                        }}
                        pageSizeOptions={[15, 30]}
                        checkboxSelection
                        className="tw-rounded-2xl"

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