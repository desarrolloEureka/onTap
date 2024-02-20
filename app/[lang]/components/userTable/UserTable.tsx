import UserTableLogic from "./hooks/UserTable";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Container, Typography } from "@mui/material";
import Link from "next/link";
import useDictionary from "@/hooks/dictionary/useDictionary";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LinkIcon from '@mui/icons-material/Link';


const columns: GridColDef[] = [
    { field: 'date', headerName: 'Fecha Registro', width: 130 },
    { field: 'id', headerName: 'No. Identificación', width: 160 },
    { field: 'name', headerName: 'Nombres y Apellidos', width: 270 },
    { field: 'email', headerName: 'Correo', width: 300 },
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
        field: 'status', headerName: 'Estado del Cliente', width: 150,
        renderCell: (params) => (
            <div>
                {params.value}
            </div>)
    },
    { field: 'edit', headerName: 'Editar', width: 110 },//Boton? a donde?
];

const UserTable = () => {
    const { query } = UserTableLogic();
    const dictionary = useDictionary({ lang: 'es' });
    return (
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
        </div>
    );
}

export default UserTable;