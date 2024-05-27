'use client';
import React from 'react';
import { Locale } from 'i18n-config';
import useDictionary from '@/hooks/dictionary/useDictionary';
import { DataGrid, GridColDef, GridToolbarQuickFilter } from '@mui/x-data-grid';
import ReportTableLogic from './hooks/ReportTableLogic';

const TrafficReportDetail = ({ params: { lang } }: { params: { lang: Locale } }) => {
    const { dictionary } = useDictionary({ lang });
    const { data,
        flag,
        setFlag,
    } = ReportTableLogic();

    const columns: GridColDef[] = [
        { field: 'dateRegister', headerName: 'Fecha Registro', width: 170, headerAlign: 'center', align: 'center' },
        { field: 'id', headerName: 'No. Identificació', width: 150, headerAlign: 'center', align: 'center' },
        { field: 'name', headerName: 'Nombres', width: 170, headerAlign: 'center', align: 'center' },
        { field: 'email', headerName: 'Correo', width: 250, headerAlign: 'center', align: 'center' }
    ];

    return (
        <div className='tw-flex  tw-items-center tw-justify-center tw-bg-[url("/images/loginBackground.png")]  tw-flex-col tw-bg-no-repeat tw-bg-center tw-bg-cover'>
            <div className='tw-bg-[#02AF9B] tw-mt-4 tw-shadow-m tw-mx-20 tw-px-10 tw-rounded-2xl tw-h-[800px] tw-w-[810px] tw-flex tw-flex-col tw-justify-center tw-items-center '>
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
                                    width: '90%',
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


        </div>
    );
};

export default TrafficReportDetail;