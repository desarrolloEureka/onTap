import { Typography, Button, TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { Box } from "@mui/material";
import useDictionary from "@/hooks/dictionary/useDictionary";
import "react-phone-input-2/lib/style.css";
import { Locale } from "i18n-config";
import moment from "moment";
import SubscriptionReportHook from "./hooks/SubscriptionReportHook";
import { countries } from "@/globals/constants";
import ReactCountryFlag from "react-country-flag";
import { DataGrid, GridColDef, gridFilteredSortedRowIdsSelector, GridToolbarContainer, gridVisibleColumnFieldsSelector, useGridApiRef } from "@mui/x-data-grid";
import FilterListIcon from "@mui/icons-material/FilterList";
import DeleteIcon from "@mui/icons-material/Delete";
import GetAppIcon from "@mui/icons-material/GetApp";
import { GridToolbarQuickFilter } from "@mui/x-data-grid/components";

const SubscriptionReport = ({
    params: { lang },
}: {
    params: { lang: Locale };
}) => {
    const {
        query,
        exportToExcel,
        handleDateChange,
        handleDeleteFilter,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        subscriptionStatus,
        handleChange
    } = SubscriptionReportHook();

    const dictionary = useDictionary({ lang: "es" });
    const apiRef = useGridApiRef();
    const dateToday = new Date().toISOString().split("T")[0];

    const formatearFecha = (fechaISO: string): string => {
        return moment(fechaISO).format("DD/MM/YYYY HH:mm:ss");
    };

    const getCountryFlag = (item: any) => {
        const country = countries.find((country) => country.id === item);
        return country ? country.flag : "";
    };

    const getCountryName = (item: any) => {
        const country = countries.find((country) => country.id === item);
        return country ? country.code : "";
    };

    const columns: GridColDef[] = [
        {
            field: "created_at",
            headerName: "Fecha Registro",
            minWidth: 220,
            flex: 2,
            type: "date",
            headerAlign: "center",
            align: "center",
            valueGetter: (params) => new Date(params.value),
            renderCell: (params) => (
                <div className="tw-flex tw-justify-center tw-items-center">
                    <div>{formatearFecha(params.value)}</div>
                </div>
            ),
        },
        {
            field: "fecha_pago",
            headerName: "Fecha Pago",
            minWidth: 200,
            flex: 2,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => (
                <div>{formatearFecha(params.value)}</div>
            ),
        },
        {
            field: "fecha_suscripcion",
            headerName: "Fecha Suscripción",
            minWidth: 200,
            flex: 2,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => (
                <div>{formatearFecha(params.value)}</div>
            ),
        },
        {
            field: "fecha_vencimiento",
            headerName: "Fecha Vencimiento",
            minWidth: 200,
            flex: 2,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => (
                <div>{formatearFecha(params.value)}</div>
            ),
        },
        {
            field: "id",
            headerName: "No. Identificación",
            minWidth: 160,
            flex: 1,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "name",
            headerName: "Nombres y Apellidos",
            minWidth: 230,
            flex: 2,
        },
        {
            field: "indicative",
            headerName: "Indicativo",
            minWidth: 90,
            flex: 1,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => (
                <div className="tw-flex tw-justify-center tw-items-center">
                    {params.value && (
                        <ReactCountryFlag
                            countryCode={getCountryFlag(params.value ? params.value : "")}
                            svg
                            style={{ marginRight: "5px", width: "29px", height: "20px" }}
                        />
                    )}
                    <div>{getCountryName(params.value)}</div>
                </div>
            ),
        },
        {
            field: "phone",
            headerName: "Teléfono",
            minWidth: 180,
            flex: 1,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "email",
            headerName: "Correo",
            minWidth: 250,
            flex: 2,
        },
        {
            field: "estado_suscripcion",
            headerName: "Estado Suscripción",
            minWidth: 200,
            flex: 2,
            headerAlign: "center",
            align: "center",
        },
    ];

    function getExcelData(apiRef: any) {
        const filteredSortedRowIds = gridFilteredSortedRowIdsSelector(apiRef);
        const visibleColumnsField = gridVisibleColumnFieldsSelector(apiRef);
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
        exportToExcel(data);
    };

    function CustomToolbar() {
        return (
            <GridToolbarContainer
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 1,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "end",
                        width: "100%",
                        paddingLeft: 2,
                        paddingRight: 5,
                        marginBottom: -2,
                        marginTop: 1,
                    }}
                >
                    <Button
                        className="tw-w-[90px] tw-h-[100%] tw-text-white tw-text-custom tw-mx-5 tw-mr-2"
                        type="submit"
                        sx={{
                            padding: "0",
                            minWidth: "auto",
                            textTransform: "none",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                        style={{ textTransform: "none" }}
                        onClick={handleDateChange}
                    >
                        <FilterListIcon
                            style={{ marginBottom: 5, fontSize: 30, color: "#02AF9B" }}
                        />
                        <Typography style={{ color: "#02AF9B" }}>Filtrar</Typography>
                    </Button>

                    <Button
                        className="tw-w-[100px] tw-h-[100%] tw-text-white tw-text-custom tw-mr-2"
                        type="submit"
                        sx={{
                            padding: "0",
                            minWidth: "auto",
                            textTransform: "none",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                        style={{ textTransform: "none" }}
                        onClick={handleDeleteFilter}
                    >
                        <DeleteIcon
                            style={{ marginBottom: 5, fontSize: 30, color: "#02AF9B" }}
                        />
                        <Typography style={{ color: "#02AF9B" }}>Borrar</Typography>
                    </Button>

                    <Button
                        className="tw-w-[90px] tw-h-[100%] tw-text-white tw-text-custom"
                        type="submit"
                        sx={{
                            padding: "0",
                            minWidth: "auto",
                            textTransform: "none",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                        style={{ textTransform: "none" }}
                        onClick={() => handleExport()}
                    >
                        <GetAppIcon
                            style={{ marginBottom: 5, fontSize: 30, color: "#02AF9B" }}
                        />
                        <Typography style={{ color: "#02AF9B" }}>Exportar</Typography>
                    </Button>
                </Box>

                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Box
                        sx={{
                            width: "35%",
                            paddingBottom: 3,
                            paddingTop: 0,
                            paddingLeft: 2,
                        }}
                    >
                        <Typography
                            variant="inherit"
                            style={{
                                paddingBottom: 8,
                                fontSize: 14.4,
                                color: "rgba(0, 0, 0, 0.6)",
                            }}
                        >
                            Consulta General
                        </Typography>
                        <GridToolbarQuickFilter
                            sx={{
                                width: "100%",
                                height: "40px",
                                backgroundColor: "#f4f4f4",
                                borderRadius: "8px",
                                textDecoration: "none",
                                "& .MuiInputBase-root": {
                                    height: "40px",
                                    backgroundColor: "#f4f4f4",
                                    borderRadius: "8px",
                                    textDecoration: "none",
                                    "&.MuiInput-underline:before": {
                                        borderBottom: "none",
                                    },
                                },
                            }}
                        />
                    </Box>
                    <Box
                        sx={{ display: "flex", alignItems: "center", paddingRight: 110 }}
                    >
                        <div
                            style={{
                                height: "100%",
                                width: "50%",
                                paddingLeft: 5,
                                paddingRight: 15,
                            }}
                        >
                            <div style={{ height: "100%", width: "90%" }}>
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
                        <div style={{ height: "100%", width: "50%" }}>
                            <div style={{ height: "100%", width: "90%" }}>
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

                        <FormControl
                            variant="outlined"
                            sx={{
                                flex: "1 1 200px",
                                minWidth: 200,
                                margin: "0 8px",
                            }}
                        >
                            <InputLabel id="subscriptionStatusFilter-label">Estado de Suscripción</InputLabel>
                            <Select
                                labelId="subscriptionStatusFilter-label"
                                id="subscriptionStatusFilter"
                                value={subscriptionStatus}
                                onChange={(e) => handleChange(e.target.value || "")}
                                label="Estado de Suscripción"
                                MenuProps={{
                                    PaperProps: {
                                        style: {
                                            maxHeight: 300,
                                            width: "auto",
                                        },
                                    },
                                }}
                                sx={{ width: "100%" }}
                            >
                                <MenuItem value="">Selecciona un estado de suscripción</MenuItem>
                                <MenuItem value="Active">Active</MenuItem>
                                <MenuItem value="Inactive">Inactive</MenuItem>
                                <MenuItem value="Cancelled">Cancelled</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
            </GridToolbarContainer>
        );
    }


    return (
        <div className='tw-flex tw-items-center tw-justify-center tw-bg-[url("/images/loginBackground.png")] tw-bg-no-repeat tw-bg-center tw-bg-cover'>
            <div className="tw-mt-3 tw-shadow-m tw-rounded-2xl tw-h-[775px] tw-w-[99%] tw-flex tw-flex-col tw-justify-center tw-items-center tw-mb-5 ">
                <Typography
                    className="tw-text-black tw-w-full"
                    variant="h6"
                    color="textPrimary"
                    display={"flow"}
                    align="center"
                    fontWeight="bold"
                >
                    {dictionary.dictionary?.backOffice.labelReportSubscriptions}
                </Typography>
                <div
                    style={{ height: 650, width: "100%" }}
                    className="tw-bg-white tw-shadow-m tw-rounded-2xl tw-m-6"
                >
                    <DataGrid
                        apiRef={apiRef}
                        rows={query ?? []}
                        columns={columns}
                        slots={{ toolbar: CustomToolbar }}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 15 },
                            },
                            sorting: {
                                sortModel: [{ field: "created_at", sort: "desc" }],
                            },
                        }}
                        pageSizeOptions={[10, 20, 30]}
                        className="tw-rounded-2xl"
                        disableColumnSelector
                        disableDensitySelector
                        disableColumnFilter
                        disableRowSelectionOnClick
                        ignoreDiacritics={true}
                        sx={{
                            "& .MuiDataGrid-columnHeaders": {
                                backgroundColor: "#dddddd",
                                color: "#000000",
                                fontWeight: "bold",
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default SubscriptionReport;
