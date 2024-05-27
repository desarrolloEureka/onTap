'use client';
import React from 'react';
import { Locale } from 'i18n-config';
import useDictionary from '@/hooks/dictionary/useDictionary';
import { DataGrid, GridColDef, GridToolbarQuickFilter } from '@mui/x-data-grid';
import ReportTableLogic from './hooks/ReportTableLogic';
import { Container, Typography, Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box } from '@mui/system';

const TrafficReport = ({ params: { lang } }: { params: { lang: Locale } }) => {
    const { dictionary } = useDictionary({ lang });

    const dataDetail = [
        {
            "id": 1,
            "Date": "2024-05-22",
            "Time": "08:30",
            "IP": "192.168.1.1",
            "Device_Type": "Samsung",
            "Operating_System": "Android",
            "City": "Los Angeles",
            "Country": "USA",
            "View_Count": 5
        },
        {
            "id": 2,
            "Date": "2024-05-21",
            "Time": "10:15",
            "IP": "10.0.0.2",
            "Device_Type": "Apple",
            "Operating_System": "iOS",
            "City": "New York",
            "Country": "USA",
            "View_Count": 3
        },
        {
            "id": 3,
            "Date": "2024-05-20",
            "Time": "14:00",
            "IP": "172.16.0.1",
            "Device_Type": "Xiaomi",
            "Operating_System": "Android",
            "City": "Bogotá",
            "Country": "Colombia",
            "View_Count": 7
        },
        {
            "id": 4,
            "Date": "2024-05-19",
            "Time": "16:45",
            "IP": "192.168.0.10",
            "Device_Type": "Huawei",
            "Operating_System": "Android",
            "City": "Cali",
            "Country": "Colombia",
            "View_Count": 4
        },
        {
            "id": 5,
            "Date": "2024-05-18",
            "Time": "18:20",
            "IP": "10.1.1.1",
            "Device_Type": "iOS",
            "Operating_System": "Android",
            "City": "Medellín",
            "Country": "Colombia",
            "View_Count": 6
        },
        {
            "id": 6,
            "Date": "2024-05-17",
            "Time": "09:30",
            "IP": "192.168.2.1",
            "Device_Type": "Samsung",
            "Operating_System": "Android",
            "City": "Miami",
            "Country": "USA",
            "View_Count": 8
        },
        {
            "id": 7,
            "Date": "2024-05-16",
            "Time": "12:45",
            "IP": "10.0.0.5",
            "Device_Type": "LG",
            "Operating_System": "Android",
            "City": "Miami",
            "Country": "USA",
            "View_Count": 2
        },
        {
            "id": 8,
            "Date": "2024-05-15",
            "Time": "20:10",
            "IP": "172.16.1.1",
            "Device_Type": "Motorola",
            "Operating_System": "Android",
            "City": "Medellín",
            "Country": "Colombia",
            "View_Count": 9
        },
        {
            "id": 9,
            "Date": "2024-05-14",
            "Time": "11:20",
            "IP": "192.168.0.2",
            "Device_Type": "Motorola",
            "Operating_System": "Android",
            "City": "São Paulo",
            "Country": "Brazil",
            "View_Count": 1
        },
        {
            "id": 10,
            "Date": "2024-05-13",
            "Time": "17:30",
            "IP": "10.0.0.1",
            "Device_Type": "iOS",
            "Operating_System": "Android",
            "City": "Bogotá",
            "Country": "Colombia",
            "View_Count": 10
        }
    ]

    const {
        data,
        flag,
        setFlag,
        seeDetail,
        setSeeDetail,
        dataDetailUser,
        setDataDetailUser
    } = ReportTableLogic();

    const handleSeeDetail = async (data: any) => {
        console.log('data ---> ', data);
        setSeeDetail(true);
        setDataDetailUser(data);
    };

    const columns: GridColDef[] = [
        { field: 'dateRegister', headerName: 'Fecha Registro', width: 170, headerAlign: 'center', align: 'center' },
        { field: 'id', headerName: 'No. Identificació', width: 150, headerAlign: 'center', align: 'center' },
        { field: 'name', headerName: 'Nombres', width: 170, headerAlign: 'center', align: 'center' },
        { field: 'email', headerName: 'Correo', width: 250, headerAlign: 'center', align: 'center' },
        {
            field: 'optionDetail', headerName: 'Ver detalle', width: 100,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <Button style={{ color: 'black' }} onClick={() => handleSeeDetail(params?.value)}>
                    <VisibilityIcon />
                </Button>
            )
        },
    ];

    const columnsDetail: GridColDef[] = [
        { field: 'Date', headerName: 'Fecha Registro', width: 170, headerAlign: 'center', align: 'center' },
        { field: 'Time', headerName: 'No. Identificación', width: 150, headerAlign: 'center', align: 'center' },
        { field: 'IP', headerName: 'IP', width: 115, headerAlign: 'center', align: 'center' },
        { field: 'Device_Type', headerName: 'Correo', width: 115, headerAlign: 'center', align: 'center' },
        { field: 'Operating_System', headerName: 'Sistema Operativo', width: 115, headerAlign: 'center', align: 'center' },
        { field: 'City', headerName: 'Ciudad', width: 115, headerAlign: 'center', align: 'center' },
        { field: 'Country', headerName: 'País', width: 115, headerAlign: 'center', align: 'center' },
        { field: 'View_Count', headerName: 'Cantidad Veces Visualizaciones"', width: 115, headerAlign: 'center', align: 'center' },
    ];

    return (
        <div className='tw-flex  tw-items-center tw-justify-center tw-bg-[url("/images/loginBackground.png")]  tw-flex-col tw-bg-no-repeat tw-bg-center tw-bg-cover'>
            {seeDetail ?
                <>
                    <div className='tw-bg-[#02AF9B] tw-mt-4 tw-shadow-m tw-mx-20 tw-px-10 tw-rounded-2xl tw-h-[800px] tw-w-[1100px] tw-flex tw-flex-col tw-justify-center tw-items-center '>
                        <div style={{ height: 100, width: '100%' }} className='tw-bg-white tw-shadow-m tw-rounded-2xl tw-mt-0 tw-mb-5'>

                            <div style={{ height: '33%', width: '97%' }} className='tw-flex tw-justify-end tw-items-center'>
                                <div style={{ height: '100%', width: '35%' }} className=''>
                                    <Typography className=' tw-text-lg tw-font-bold tw-text-black tw-text-end'>
                                        {/* {dataDetailUser ? dataDetailUser?.name : ''} */}
                                    </Typography>
                                </div>
                            </div>
                            <div style={{ height: '33%', width: '97%' }} className='tw-flex tw-justify-end tw-items-center'>
                                <div style={{ height: '100%', width: '35%' }} className=''>
                                    <Typography className=' tw-text-sm  tw-text-black tw-text-end'>
                                        {/* {dataDetailUser ? dataDetailUser?.dni : ''} */}
                                    </Typography>
                                </div>
                            </div>
                            <div style={{ height: '33%', width: '97%' }} className='tw-flex tw-justify-end tw-items-center'>
                                <div style={{ height: '100%', width: '35%' }} className=''>
                                    <Typography className=' tw-text-sm  tw-text-black tw-text-end'>
                                        {/* {dataDetailUser ? dataDetailUser?.email : ''} */}
                                    </Typography>
                                </div>
                            </div>

                        </div>
                        <div style={{ height: 600, width: '100%' }} className='tw-bg-white tw-shadow-m tw-rounded-2xl tw-mt-0'>
                            <DataGrid
                                rows={dataDetail ?? []}
                                disableColumnFilter
                                disableColumnSelector
                                disableDensitySelector
                                disableRowSelectionOnClick
                                columns={columnsDetail}
                                slots={{ toolbar: GridToolbarQuickFilter }}
                                slotProps={{
                                    toolbar: {
                                        sx: {
                                            width: '50%',
                                            margin: '0 auto',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            paddingBottom: 3,
                                            paddingTop: 2,
                                            '& .MuiInputBase-root': {
                                                height: '40px',
                                                backgroundColor: '#f4f4f4',
                                                borderRadius: '8px',
                                                textDecoration: 'none',
                                                '&.MuiInput-underline:before': {
                                                    borderBottom: 'none',
                                                },
                                            },
                                        },
                                    },
                                }}
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 15 },
                                    },
                                }}
                                pageSizeOptions={[15, 30, 60]}
                                rowHeight={75}
                                checkboxSelection
                                className="tw-rounded-2xl"
                            />
                        </div>
                    </div>
                </>
                :
                <div className='tw-bg-[#02AF9B] tw-mt-4 tw-shadow-m tw-mx-20 tw-px-10 tw-rounded-2xl tw-h-[800px] tw-w-[900px] tw-flex tw-flex-col tw-justify-center tw-items-center '>
                    <div style={{ height: 700, width: '100%' }} className='tw-bg-white tw-shadow-m tw-rounded-2xl tw-mt-0'>
                        <DataGrid
                            rows={data ?? []}
                            disableColumnFilter
                            disableColumnSelector
                            disableDensitySelector
                            disableRowSelectionOnClick
                            columns={columns}
                            slots={{ toolbar: GridToolbarQuickFilter }}
                            slotProps={{
                                toolbar: {
                                    sx: {
                                        width: '50%',
                                        margin: '0 auto',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        paddingBottom: 3,
                                        paddingTop: 2,
                                        '& .MuiInputBase-root': {
                                            height: '40px',
                                            backgroundColor: '#f4f4f4',
                                            borderRadius: '8px',
                                            textDecoration: 'none',
                                            '&.MuiInput-underline:before': {
                                                borderBottom: 'none',
                                            },
                                        },
                                    },
                                },
                            }}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 15 },
                                },
                            }}
                            pageSizeOptions={[15, 30, 60]}
                            rowHeight={75}
                            checkboxSelection
                            className="tw-rounded-2xl"
                        />
                    </div>
                </div>
            }
        </div>
    );
};

export default TrafficReport;