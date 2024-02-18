import FontsTableLogic from "./hooks/FontsTableLogic";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Image from 'next/image';
import { Container, Typography } from "@mui/material";
import Link from "next/link";
import useDictionary from "@/hooks/dictionary/useDictionary";

const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nombre de Fondo', width: 130 },
    {
        field: 'image', headerName: 'Imagen', width: 130,
        renderCell: (params) => (
            <Image src={`${params.value}`} alt="image" width={100} height={100} />
        )
    }
];

const FontsTable = () => {
    const { data } = FontsTableLogic();//campo name(text) y campo image(imagen)
    return (
            <div className='tw-bg-[#02AF9B] tw-shadow-m tw-mx-20 tw-px-10 tw-rounded-2xl tw-h-[600px] tw-w-[500px] tw-flex tw-flex-col tw-justify-center tw-items-center '>
                <div style={{ height: 600, width: '100%' }} className='tw-bg-white tw-shadow-m tw-rounded-2xl tw-mt-10'>
                    <DataGrid
                        rows={data ?? []}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }}
                        pageSizeOptions={[5, 10]}
                        checkboxSelection
                        className="tw-rounded-2xl tw-mb-3"
                    />
                </div>
            </div>
    );
}

export default FontsTable;