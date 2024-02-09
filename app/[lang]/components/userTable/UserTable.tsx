import UserTableLogic from "./hooks/UserTable";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Container, Typography } from "@mui/material";

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 130 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'email', headerName: 'Email', width: 300 },
    { field: 'lastName', headerName: 'Last Name', width: 130 },
    { field: 'url', headerName: 'URL', width: 700 },
];

const UserTable = () => {
    const { query } = UserTableLogic();
    return (
        <div className='tw-flex tw-h-screen tw-items-center tw-justify-center tw-bg-[url("/images/loginBackground.png")] tw-bg-no-repeat tw-bg-center tw-bg-cover'>
            <>
                <Container className='tw-bg-[#02AF9B] tw-shadow-m  tw-rounded-2xl tw-h-[500px] tw-flex tw-flex-col tw-justify-center tw-items-center '>
                    <Typography
                        className='tw-text-white  tw-mt-10 tw-w-full'
                        variant='body2'
                        color='textPrimary'
                        display={'flow'}
                    >
                        Tabla de usuarios
                    </Typography>
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={query}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 5 },
                                },
                            }}
                            pageSizeOptions={[5, 10]}
                            checkboxSelection
                        />
                    </div>
                </Container>
            </>
        </div>
    );
}

export default UserTable;