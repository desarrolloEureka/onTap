'use client';
import React from 'react';
import { Locale } from 'i18n-config';
import useDictionary from '@/hooks/dictionary/useDictionary';
import { DataGrid, GridColDef, GridToolbar, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton, GridToolbarQuickFilter } from '@mui/x-data-grid';
import ReportTableLogic from './hooks/ReportTableLogic';
import { Typography, Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box } from '@mui/system';

const TrafficReport = ({ params: { lang } }: { params: { lang: Locale } }) => {
    const { dictionary } = useDictionary({ lang });

    const {
        data,
        flag,
        setFlag,
        seeDetail,
        setSeeDetail,
        dataDetailUser,
        setDataDetailUser,
        handleSeeDetail
    } = ReportTableLogic();

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
        { field: 'viewsDate', headerName: 'Fecha Visualización', width: 170, headerAlign: 'center', align: 'center' },
        { field: 'viewsTime', headerName: 'Hora', width: 150, headerAlign: 'center', align: 'center' },
        { field: 'ipAddress', headerName: 'IP', width: 115, headerAlign: 'center', align: 'center' },
        { field: 'typeDevice', headerName: 'Tipo Dispositivo', width: 125, headerAlign: 'center', align: 'center' },
        { field: 'so', headerName: 'Sistema Operativo', width: 115, headerAlign: 'center', align: 'center' },
        { field: 'cityView', headerName: 'Ciudad', width: 115, headerAlign: 'center', align: 'center' },
        { field: 'countryView', headerName: 'País', width: 115, headerAlign: 'center', align: 'center' },
        { field: 'View_Count', headerName: 'Cantidad Veces Visualizaciones"', width: 105, headerAlign: 'center', align: 'center', valueGetter: () => 1 },
    ];

    function CustomToolbar() {
        return (
            <GridToolbarContainer sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <GridToolbarExport
                        slotProps={{
                            tooltip: { title: 'Export data' },
                            button: { variant: 'outlined' },
                        }}
                    />
                    <GridToolbarFilterButton />
                </Box>
                <GridToolbarQuickFilter
                    sx={{
                        width: '50%',
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
                    }}
                />
            </GridToolbarContainer>
        );
    }

    return (
        <div className='tw-flex  tw-items-center tw-justify-center tw-bg-[url("/images/loginBackground.png")]  tw-flex-col tw-bg-no-repeat tw-bg-center tw-bg-cover'>
            {seeDetail ?
                <>
                    {dataDetailUser && (
                        <div className='tw-bg-[#02AF9B] tw-mt-4 tw-shadow-m tw-mx-20 tw-px-10 tw-rounded-2xl tw-h-[800px] tw-w-[1100px] tw-flex tw-flex-col tw-justify-center tw-items-center '>
                            <div style={{ height: 70, width: '100%' }} className='tw-flex tw-flex-col tw-justify-center tw-items-start'>
                                <Button style={{ height: '100%', width: '10%' }} className='tw-flex tw-justify-start tw-items-start' onClick={() => setSeeDetail(false)}>
                                    <ArrowBackIcon sx={{ color: 'white', fontSize: 35, paddingTop: 1.8 }} />
                                </Button>
                            </div>

                            <div style={{ height: 100, width: '100%' }} className='tw-bg-white tw-shadow-m tw-rounded-2xl tw-mt-0 tw-mb-5 tw-flex tw-flex-col tw-justify-center tw-items-center '>

                                <div style={{ height: '33%', width: '97%' }} className='tw-flex tw-justify-start tw-items-center'>
                                    <div style={{ height: '100%', width: '35%' }} className='tw-flex tw-justify-start tw-items-end'>
                                        <Typography className=' tw-text-lg tw-font-bold tw-text-black tw-text-start'>
                                            {dataDetailUser ? dataDetailUser?.name : ''}
                                        </Typography>
                                    </div>
                                </div>
                                <div style={{ height: '33%', width: '97%' }} className='tw-flex tw-justify-start tw-items-center'>
                                    <div style={{ height: '100%', width: '35%', }} className='tw-flex tw-justify-start tw-items-center'>
                                        <Typography className=' tw-text-sm  tw-text-black tw-text-start'>
                                            {dataDetailUser ? dataDetailUser?.dni : ''}
                                        </Typography>
                                    </div>
                                </div>
                                <div style={{ height: '33%', width: '97%' }} className='tw-flex tw-justify-start tw-items-center'>
                                    <div style={{ height: '100%', width: '35%' }} className=''>
                                        <Typography className=' tw-text-sm  tw-text-black tw-text-start'>
                                            {dataDetailUser ? dataDetailUser?.email : ''}
                                        </Typography>
                                    </div>
                                    <div style={{ height: '100%', width: '63%' }} className=''>
                                        <Typography className=' tw-text-sm  tw-text-black tw-text-end'>
                                            Total Vistas: {dataDetailUser ? dataDetailUser?.views : ''}
                                        </Typography>
                                    </div>
                                </div>

                            </div>
                            <div style={{ height: 590, width: '100%' }} className='tw-bg-white tw-shadow-m tw-rounded-2xl tw-mt-0'>
                                <DataGrid
                                    rows={dataDetailUser.DataMetrics ?? []}
                                    getRowId={(row) => row.viewsTime}
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
                    )}

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
                            slots={{ toolbar: CustomToolbar }}
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