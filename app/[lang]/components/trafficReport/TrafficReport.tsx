'use client';
import React from 'react';
import { Locale } from 'i18n-config';
import useDictionary from '@/hooks/dictionary/useDictionary';
import { DataGrid, GridColDef, gridFilteredSortedRowIdsSelector, GridToolbarContainer, gridVisibleColumnFieldsSelector, useGridApiRef } from '@mui/x-data-grid';
import { GridToolbarQuickFilter } from '@mui/x-data-grid/components';
import ReportTableLogic from './hooks/ReportTableLogic';
import { Typography, Button, TextField } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box } from '@mui/system';
import GetAppIcon from '@mui/icons-material/GetApp';
import FilterListIcon from '@mui/icons-material/FilterList';
import DeleteIcon from '@mui/icons-material/Delete';

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
        handleDeleteFilterDetail,
        exportToExcel
    } = ReportTableLogic();
    const dateToday = new Date().toISOString().split('T')[0];
    const apiRef = useGridApiRef();
    const apiRefDetail = useGridApiRef();

    const getFormattedDate = (date: any) => {
        const formattedDate = `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()}`;
        return formattedDate ? formattedDate : '';
    };

    const columns: GridColDef[] = [
        {
            field: 'date',
            headerName: 'Fecha Registro',
            minWidth: 170,
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
            align: 'center',
        },
        {
            field: 'id',
            headerName: 'No. Identificación',
            minWidth: 150,
            flex: 1,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'name',
            headerName: 'Nombres',
            minWidth: 170,
            flex: 1,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'email',
            headerName: 'Correo',
            minWidth: 250,
            flex: 2,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'optionDetail',
            headerName: 'Ver detalle',
            minWidth: 100,
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <Button style={{ color: 'black' }} onClick={() => handleSeeDetail(params?.value)}>
                    <VisibilityIcon />
                </Button>
            )
        }
    ];

    const columnsDetail: GridColDef[] = [
        {
            field: 'viewsDate',
            headerName: 'Fecha Visualización',
            minWidth: 170,
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
            field: 'viewsTime',
            headerName: 'Hora',
            minWidth: 150,
            flex: 1,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'ipAddress',
            headerName: 'IP',
            minWidth: 115,
            flex: 1,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'typeDevice',
            headerName: 'Tipo Dispositivo',
            minWidth: 125,
            flex: 1,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'so',
            headerName: 'Sistema Operativo',
            minWidth: 115,
            flex: 1,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'cityView',
            headerName: 'Ciudad',
            minWidth: 115,
            flex: 1,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'countryView',
            headerName: 'País',
            minWidth: 115,
            flex: 1,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'View_Count',
            headerName: 'Cantidad Veces Visualizaciones',
            minWidth: 105,
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            valueGetter: () => 1
        }
    ];

    function getExcelData(apiRef: any) {
        // Select rows and columns
        const filteredSortedRowIds = gridFilteredSortedRowIdsSelector(apiRef);
        const visibleColumnsField = gridVisibleColumnFieldsSelector(apiRef);

        // Format the data. Here we only keep the value
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
        exportToExcel(data, true);
    };

    const handleExportDetail = () => {
        const data = getExcelData(apiRefDetail);
        exportToExcel(data, false);
    };

    function CustomToolbar() {
        return (
            <GridToolbarContainer sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'end', width: '100%', paddingLeft: 3, paddingRight: 4, marginBottom: -2, marginTop: 1 }}>
                    <Button
                        className='tw-w-[90px] tw-h-[100%] tw-text-white tw-text-custom'
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

                <Box sx={{ width: '35%', paddingBottom: 3, paddingTop: 1, paddingLeft: 2 }}>
                    <Typography variant="inherit" style={{ paddingBottom: 9, fontSize: 14.3, color: "rgba(0, 0, 0, 0.6)" }}>
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
                <Box sx={{ display: 'flex', alignItems: 'center', paddingRight: 4 }}>
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

                    {/*   <Button
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
                    </Button> */}

                    <Button
                        className='tw-w-[90px] tw-h-[100%] tw-text-white tw-text-custom tw-mr-5'
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
                        className='tw-w-[100px] tw-h-[100%] tw-text-white tw-text-custom tw-mr-2'
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
            </GridToolbarContainer>
        );
    }

    function CustomToolbarDetail() {
        return (
            <GridToolbarContainer sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 1 }}>

                <Box sx={{ display: 'flex', justifyContent: 'end', width: '100%', paddingLeft: 3, paddingRight: 4, marginBottom: -2, marginTop: 1 }}>
                    {/*  <Button
                        className='tw-w-[90px] tw-h-[100%] tw-text-white tw-text-custom border tw-bg-[#02AF9B]'
                        type='submit'
                        style={{ textTransform: 'none' }}
                        onClick={() => handleExportDetail()}
                    >
                        <GetAppIcon />
                        Exportar
                    </Button> */}

                    <Button
                        className='tw-w-[90px] tw-h-[100%] tw-text-white tw-text-custom'
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
                        onClick={() => handleExportDetail()}
                    >
                        <GetAppIcon style={{ marginBottom: 5, fontSize: 30, color: '#02AF9B' }} />
                        <Typography style={{ color: '#02AF9B' }}>
                            Exportar
                        </Typography>
                    </Button>
                </Box>

                <Box sx={{ width: '35%', paddingBottom: 3, paddingTop: 1, paddingLeft: 2 }}>
                    <Typography variant="inherit" style={{ paddingBottom: 9, fontSize: 14.3, color: "rgba(0, 0, 0, 0.6)" }}>
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
                <Box sx={{ display: 'flex', alignItems: 'center', paddingRight: 4 }}>
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
                    {/* <Button
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
                    </Button> */}

                    <Button
                        className='tw-w-[90px] tw-h-[100%] tw-text-white tw-text-custom tw-mr-5'
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
                        onClick={handleDateChangeDetail}
                    >
                        <FilterListIcon style={{ marginBottom: 5, fontSize: 30, color: '#02AF9B' }} />
                        <Typography style={{ color: '#02AF9B' }}>
                            Filtrar
                        </Typography>
                    </Button>

                    <Button
                        className='tw-w-[100px] tw-h-[100%] tw-text-white tw-text-custom tw-mr-2'
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
                        onClick={handleDeleteFilterDetail}
                    >
                        <DeleteIcon style={{ marginBottom: 5, fontSize: 30, color: '#02AF9B' }} />
                        <Typography style={{ color: '#02AF9B' }}>
                            Borrar
                        </Typography>
                    </Button>


                </Box>
            </GridToolbarContainer>
        );
    }

    return (
        <div className='tw-flex  tw-items-center tw-justify-center tw-bg-[url("/images/loginBackground.png")]  tw-flex-col tw-bg-no-repeat tw-bg-center tw-bg-cover'>
            {seeDetail ?
                <>
                    {dataDetailUser && dataDetailUserTool && (
                        <div className=' tw-mt-4 tw-shadow-m tw-rounded-2xl tw-h-[800px] tw-w-[99%] tw-flex tw-flex-col tw-justify-center tw-items-center'>
                            <div style={{ height: 70, width: '100%' }} className='tw-flex tw-flex-col tw-justify-center tw-items-start'>
                                <Button style={{ height: '100%', width: '10%' }} className='tw-flex tw-justify-start tw-items-start' onClick={() => handleBack()}>
                                    <ArrowBackIcon sx={{ color: 'black', fontSize: 39, paddingTop: 1.8 }} />
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

                            <div style={{ height: 590, width: '100%' }} className='tw-bg-white tw-shadow-m tw-rounded-2xl tw-mb-10'>
                                <DataGrid
                                    apiRef={apiRefDetail}
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
                                        columns: {
                                            columnVisibilityModel: {
                                                status: false,
                                                traderName: false,
                                            },
                                        },
                                        sorting: {
                                            sortModel: [{ field: 'viewsDate', sort: 'desc' }],
                                        },
                                    }}
                                    pageSizeOptions={[15, 30]}
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
                <div className=' tw-mt-4 tw-shadow-m tw-rounded-2xl tw-h-[800px] tw-w-[99%] tw-flex tw-flex-col tw-justify-center tw-items-center'>
                    <div style={{ height: 700, width: '100%' }} className='tw-bg-white tw-shadow-m tw-rounded-2xl'>
                        <DataGrid
                            apiRef={apiRef}
                            rows={query ?? []}
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