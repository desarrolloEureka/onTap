'use client';
import React from 'react';
import { Locale } from 'i18n-config';
import useDictionary from '@/hooks/dictionary/useDictionary';
import { DataGrid, GridColDef, GridToolbar, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport } from '@mui/x-data-grid';
import { GridToolbarQuickFilter, GridToolbarFilterButton } from '@mui/x-data-grid/components';
import ReportTableLogic from './hooks/ReportTableLogic';
import { Typography, Button, TextField } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box } from '@mui/system';

const TrafficReport = ({ params: { lang } }: { params: { lang: Locale } }) => {
    const { dictionary } = useDictionary({ lang });

    const {
        query,
        flag,
        setFlag,
        seeDetail,
        setSeeDetail,
        dataDetailUser,
        setDataDetailUser,
        handleSeeDetail,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        searchTerm,
        setSearchTerm,
        handleDateChange,
        startDateDetail,
        setStartDateDetail,
        endDateDetail,
        setEndDateDetail,
        handleDateChangeDetail,
        dataDetailUserTool,
        setDataDetailUserTool,
        filteredDetail,
        setFilteredDetail,
        handleBack,
        handleDeleteFilter,
        handleDeleteFilterDetail
    } = ReportTableLogic();
    const dateToday = new Date().toISOString().split('T')[0];
    const columns: GridColDef[] = [
        { field: 'date', headerName: 'Fecha Registro', width: 170, headerAlign: 'center', align: 'center' },
        { field: 'hour', headerName: 'Hora Registro', width: 130, headerAlign: 'center', align: 'center' },
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
        { field: 'viewsDate', headerName: 'Fecha Visualización', width: 170, headerAlign: 'center', align: 'center' }, { field: 'viewsTime', headerName: 'Hora', width: 150, headerAlign: 'center', align: 'center' },
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
                <GridToolbarQuickFilter
                    sx={{
                        width: '35%',
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

    function CustomToolbarDetail() {
        return (
            <GridToolbarContainer sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                                value={startDateDetail}
                                onChange={(e) => setStartDateDetail(e.target.value)}
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
                                value={endDateDetail}
                                onChange={(e) => setEndDateDetail(e.target.value)}
                            />
                        </div>
                    </div>
                    <Button
                        className='tw-w-[100%] tw-h-[100%] tw-text-white tw-text-custom border tw-bg-[#02AF9B] tw-mx-4'
                        type='submit'
                        style={{ textTransform: 'none' }}
                        onClick={handleDateChangeDetail}
                    >
                        Filtrar
                    </Button>

                    <Button
                        className='tw-w-[100%] tw-h-[100%] tw-text-white tw-text-custom border tw-bg-[#02AF9B]'
                        type='submit'
                        style={{ textTransform: 'none' }}
                        onClick={handleDeleteFilterDetail}
                    >
                        Borrar
                    </Button>

                </Box>
                <GridToolbarQuickFilter
                    sx={{
                        width: '35%',
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
                    {dataDetailUser && dataDetailUserTool && (
                        <div className='tw-bg-[#02AF9B] tw-mt-4 tw-shadow-m tw-mx-20 tw-px-10 tw-rounded-2xl tw-h-[800px] tw-w-[1100px] tw-flex tw-flex-col tw-justify-center tw-items-center '>
                            <div style={{ height: 70, width: '100%' }} className='tw-flex tw-flex-col tw-justify-center tw-items-start'>
                                <Button style={{ height: '100%', width: '10%' }} className='tw-flex tw-justify-start tw-items-start' onClick={() => handleBack()}>
                                    <ArrowBackIcon sx={{ color: 'white', fontSize: 35, paddingTop: 1.8 }} />
                                </Button>
                            </div>

                            <div style={{ height: 100, width: '100%' }} className='tw-bg-white tw-shadow-m tw-rounded-2xl tw-mt-0 tw-mb-5 tw-flex tw-flex-col tw-justify-center tw-items-center '>

                                <div style={{ height: '33%', width: '97%' }} className='tw-flex tw-justify-start tw-items-center'>
                                    <div style={{ height: '100%', width: '35%' }} className='tw-flex tw-justify-start tw-items-end'>
                                        <Typography className=' tw-text-lg tw-font-bold tw-text-black tw-text-start'>
                                            {dataDetailUserTool ? dataDetailUserTool?.name : ''}
                                        </Typography>
                                    </div>
                                </div>
                                <div style={{ height: '33%', width: '97%' }} className='tw-flex tw-justify-start tw-items-center'>
                                    <div style={{ height: '100%', width: '35%', }} className='tw-flex tw-justify-start tw-items-center'>
                                        <Typography className=' tw-text-sm  tw-text-black tw-text-start'>
                                            {dataDetailUserTool ? dataDetailUserTool?.dni : ''}
                                        </Typography>
                                    </div>
                                </div>
                                <div style={{ height: '33%', width: '97%' }} className='tw-flex tw-justify-start tw-items-center'>
                                    <div style={{ height: '100%', width: '35%' }} className=''>
                                        <Typography className=' tw-text-sm  tw-text-black tw-text-start'>
                                            {dataDetailUserTool ? dataDetailUserTool?.email : ''}
                                        </Typography>
                                    </div>
                                    <div style={{ height: '100%', width: '63%' }} className=''>
                                        <Typography className=' tw-text-sm  tw-text-black tw-text-end'>
                                            Total Vistas: {dataDetailUserTool ? dataDetailUserTool?.views : ''}
                                        </Typography>
                                    </div>
                                </div>

                            </div>
                            <div style={{ height: 590, width: '100%' }} className='tw-bg-white tw-shadow-m tw-rounded-2xl tw-mt-0'>
                                <DataGrid
                                    //rows={dataDetailUser.DataMetrics ?? []}
                                    rows={filteredDetail?.map((row: any, index: any) => ({
                                        id: index,
                                        ...row
                                    })) ?? []}
                                    columns={columnsDetail}
                                    slots={{ toolbar: CustomToolbarDetail }}
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
                                    pageSizeOptions={[15, 30, 45, 60]}
                                    rowHeight={75}
                                    className="tw-rounded-2xl"
                                    disableColumnSelector
                                    disableDensitySelector
                                    disableColumnFilter
                                    disableRowSelectionOnClick
                                />
                            </div>
                        </div>
                    )}

                </>
                :
                <div className='tw-bg-[#02AF9B] tw-mt-4 tw-shadow-m tw-mx-20 tw-px-10 tw-rounded-2xl tw-h-[800px] tw-w-[1000px] tw-flex tw-flex-col tw-justify-center tw-items-center '>
                    <div style={{ height: 700, width: '100%' }} className='tw-bg-white tw-shadow-m tw-rounded-2xl tw-mt-0'>
                        <DataGrid
                            rows={query ?? []}
                            columns={columns}
                            slots={{ toolbar: CustomToolbar }}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 15 },
                                },
                            }}
                            pageSizeOptions={[15, 30, 45, 60]}
                            rowHeight={75}
                            className="tw-rounded-2xl"
                            disableColumnSelector
                            disableDensitySelector
                            disableColumnFilter
                            disableRowSelectionOnClick
                        />
                    </div>
                </div>
            }
        </div>
    );
};

export default TrafficReport;