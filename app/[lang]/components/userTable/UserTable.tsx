import UserTableLogic from "./hooks/UserTable";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Container, Typography } from "@mui/material";
import Link from "next/link";
import useDictionary from "@/hooks/dictionary/useDictionary";

const columns: GridColDef[] = [
    { field: 'id', headerName: 'Cedula', width: 130 },
    { field: 'name', headerName: 'Nombre', width: 130 },
    { field: 'email', headerName: 'Correo', width: 300 },
    {
        field: 'url', headerName: 'URL', width: 700,
        renderCell: (params) => (
            <Link href={`${params.value}`}>{params.value}</Link>
        )
    },
    { field: 'plan', headerName: 'Plan', width: 130}
];

const UserTable = () => {
    const { query } = UserTableLogic();
    const dictionary = useDictionary({ lang: 'es' });
    return (
        <div className='tw-flex tw-h-screen tw-items-center tw-justify-center tw-bg-[url("/images/loginBackground.png")] tw-bg-no-repeat tw-bg-center tw-bg-cover'>
            <div className='tw-bg-[#02AF9B] tw-shadow-m tw-mx-20 tw-px-10 tw-rounded-2xl tw-h-[800px] tw-w-full tw-flex tw-flex-col tw-justify-center tw-items-center '>
                <Typography
                    className='tw-text-white  tw-mt-10 tw-w-full'
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
                    />
                </div>
            </div>
        </div>
    );
}

export default UserTable;