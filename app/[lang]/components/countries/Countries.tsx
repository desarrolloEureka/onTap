import { Typography } from '@mui/material';
import useDictionary from '@/hooks/dictionary/useDictionary';
import CountriesHook from './hooks/CountriesHook';
import { Locale } from 'i18n-config';
import { DataGrid, GridColDef, GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { Box } from '@mui/system';

const Countries = ({ params: { lang } }: { params: { lang: Locale } }) => {
    const { countries } = CountriesHook();
    const dictionary = useDictionary({ lang: 'es' });

    const columns: GridColDef[] = [
        {
            field: 'label',
            headerName: 'Nombre',
            minWidth: 160,
            flex: 1,
            headerAlign: 'left',
            align: 'left',
            cellClassName: 'tw-pl-12',
            headerClassName: 'tw-pl-12',
        },
    ];

    function CustomToolbar() {
        return (
            <GridToolbarContainer sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 1, marginTop: 2 }}>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ width: '30%', paddingBottom: 3, paddingTop: 0, paddingLeft: 2 }}>
                        <Typography variant="inherit" style={{ paddingBottom: 8, fontSize: 14.4, color: "rgba(0, 0, 0, 0.6)" }}>
                            Búsqueda
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
                </Box>
            </GridToolbarContainer>
        );
    }

    return (
        <div className='tw-flex tw-items-center tw-justify-center tw-bg-[url("/images/loginBackground.png")] tw-bg-no-repeat tw-bg-center tw-bg-cover'>
            <div className='tw-mt-3 tw-shadow-m tw-rounded-2xl tw-h-[775px] tw-w-[99%] tw-flex tw-flex-col tw-justify-center tw-items-center tw-mb-5 '>
                <Typography
                    className='tw-text-black tw-w-full'
                    variant='h6'
                    color='textPrimary'
                    display={'flow'}
                    align='center'
                    fontWeight='bold'
                >
                    {dictionary.dictionary?.backOffice.CountryLabel}
                </Typography>
                <div style={{ height: 650, width: '100%' }} className='tw-bg-white tw-shadow-m tw-rounded-2xl tw-m-6'>
                    <DataGrid
                        rows={countries ?? []}
                        columns={columns}
                        slots={{ toolbar: CustomToolbar }}
                        getRowId={(row) => row.id}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 10 },
                            },
                            sorting: {
                                sortModel: [{ field: 'label', sort: 'asc' }],
                            },
                        }}
                        pageSizeOptions={[10, 20, 30]}
                        className="tw-rounded-2xl"
                        disableColumnSelector
                        disableDensitySelector
                        disableColumnFilter
                        disableRowSelectionOnClick
                        ignoreDiacritics={true}
                    />
                </div>
            </div>
        </div>
    );
};

export default Countries;
