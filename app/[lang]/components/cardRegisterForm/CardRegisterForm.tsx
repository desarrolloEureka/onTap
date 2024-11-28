"use client";
import useDictionary from "@/hooks/dictionary/useDictionary";
import {
    Box,
    Button,
    CircularProgress,
    FormControl,
    FormControlLabel,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import "react-phone-input-2/lib/style.css";
import { DataGrid, GridColDef, GridToolbarContainer } from "@mui/x-data-grid";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import { Close } from "@mui/icons-material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";

import CardRegisterFormHook from "./hooks/CardRegisterFormHook";
import Image from "next/image";

const CardRegisterForm = () => {
    const {
        cardNumberError,
        cvcError,
        expMonthError,
        expYearError,
        cardHolderError,
        dataRegisterHandle,
        data,
        handleInputChange,
        cardInfo,
        isModalOpen,
        loading,
        idTypeError,
        idNumberError,
        handleOpenModal,
        handleCloseModal
    } = CardRegisterFormHook();
    const dictionary = useDictionary({ lang: 'es' });

    const formatearFecha = (fechaISO: string): string => {
        return moment(fechaISO).format("DD/MM/YYYY HH:mm:ss");
    };

    const formatearNumero = (numero: any) => {
        // Convierte el número a string y toma los últimos 4 dígitos
        return numero?.toString().slice(-4);
    };

    const columns: GridColDef[] = [
/*         {
            field: "optionEdit",
            headerName: "Editar",
            flex: 1,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => (
                <Button
                    style={{ color: "black" }}
                //onClick={() => handleEditCategory(params?.value)}
                >
                    <EditIcon />
                </Button>
            ),
        }, */
        {
            field: "created_at",
            headerName: "Fecha Registro",
            flex: 1,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => (
                <div className="tw-flex tw-justify-center tw-items-center">
                    <div>{formatearFecha(params.value)}</div>
                </div>
            ),
        },
        {
            field: "number",
            headerName: "Numero",
            flex: 1,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => (
                <div className="tw-flex tw-justify-center tw-items-center">
                    <div>{`**** **** **** ${formatearNumero(params.value)}`}</div>
                </div>
            ),
        },
    ];

    function CustomToolbar() {
        return (
            <GridToolbarContainer
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    padding: 2,
                }}
            >
                <Box
                    sx={{
                        width: "20%",
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            paddingRight: 3.5,
                            paddingTop: 0,
                        }}
                    >
                        <Button
                            className="tw-w-[100%] tw-h-[100%] tw-text-white tw-text-custom"
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
                            onClick={handleOpenModal}
                        >
                            <AddCircleRoundedIcon
                                style={{ marginBottom: 5, fontSize: 30, color: "#02AF9B" }}
                            />
                            <Typography style={{ color: "#02AF9B" }}>Crear</Typography>
                        </Button>
                    </Box>
                </Box>
            </GridToolbarContainer>
        );
    }

    return (
        data && (
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
                        {dictionary.dictionary?.backOffice.CardsLabel}
                    </Typography>
                    <div
                        style={{ height: 650, width: "100%" }}
                        className="tw-bg-white tw-shadow-m tw-rounded-2xl tw-m-6"
                    >
                        <DataGrid
                            rows={data ?? []}
                            columns={columns}
                            slots={{ toolbar: CustomToolbar }}

                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 10 },
                                },
                                sorting: {
                                    sortModel: [{ field: "created_at", sort: "asc" }],
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

                <Modal
                    open={isModalOpen}
                    onClose={() => handleCloseModal()}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    className="tw-flex tw-justify-center tw-items-center"
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            bgcolor: "#02AF9B",
                            padding: 0.5,
                            borderRadius: 3,
                            position: "relative",
                        }}
                    >
                        <IconButton
                            className="tw-absolute tw-right-1 tw-top-1"
                            onClick={() => handleCloseModal()}
                        >
                            <Close className="tw-text-white" />
                        </IconButton>
                        <div className="tw-w-[100%] tw-h-[80%] tw-flex tw-flex-col tw-justify-center tw-items-center">
                            <div className="tw-w-[90%] tw-bg-white tw-shadow-m tw-rounded-2xl tw-py-1 tw-mt-9 tw-mb-9 tw-flex tw-flex-col tw-justify-center tw-items-center">
                                <div className="tw-w-full tw-h-[95%] tw-flex tw-justify-center tw-justify-items-center tw-mx-5 tw-mt-1 tw-mb-1">

                                    <div className="tw-w-full tw-grid tw-grid-cols-3 tw-grid-rows-3 tw-gap-1 tw-px-1 tw-mx-3 tw-my-3">

                                        <div className="tw-w-full tw-flex tw-justify-starttw-items-center tw-col-span-3">
                                            <Image
                                                src='/images/Wompi.png'
                                                alt="Imagen"
                                                width={100}
                                                height={60}
                                            />
                                        </div>

                                        <div className="tw-w-full tw-flex tw-justify-center tw-items-center tw-col-span-3 -tw-mt-10 -tw-mb-1">
                                            <h3 className='tw-mr-2'>Registro</h3>
                                        </div>


                                        <div className="tw-w-full tw-flex tw-justify-center tw-items-center tw-col-span-3 tw-mt-0">
                                            <div className="tw-w-[98%] tw-h-[100%] tw-flex tw-flex-col tw-justify-center tw-items-center">
                                                <TextField
                                                    variant='outlined'
                                                    label='Número de tarjeta'
                                                    className='tw-mr-0'
                                                    onChange={handleInputChange}
                                                    name="number"
                                                    fullWidth
                                                    inputProps={{ maxLength: 16 }}
                                                    disabled={loading}
                                                    error={!!cardNumberError}
                                                    helperText={cardNumberError}
                                                />
                                            </div>
                                        </div>

                                        <div className="tw-w-full tw-flex tw-justify-center tw-justify-items-center tw-mt-4">
                                            <div className="tw-w-[95%] tw-h-[95%] tw-flex tw-justify-center tw-justify-items-center">
                                                <TextField
                                                    variant='outlined'
                                                    label='CVC'
                                                    className=''
                                                    onChange={handleInputChange}
                                                    name="cvc"
                                                    fullWidth
                                                    inputProps={{ maxLength: 3 }}
                                                    disabled={loading}
                                                    error={!!cvcError}
                                                    helperText={cvcError}
                                                />
                                            </div>
                                        </div>

                                        <div className="tw-w-full tw-flex tw-justify-center tw-justify-items-center tw-mt-4">
                                            <div className="tw-w-[95%] tw-h-[95%] tw-flex tw-justify-center tw-justify-items-center">
                                                <FormControl className='tw-mr-0' fullWidth disabled={loading}>
                                                    <InputLabel id="month-label">Mes de expiración </InputLabel>
                                                    <Select
                                                        label='Mes de expiración'
                                                        className='tw-w-full'
                                                        onChange={handleInputChange}
                                                        name="exp_month"
                                                        error={!!expMonthError}
                                                        MenuProps={{
                                                            PaperProps: {
                                                                style: {
                                                                    maxHeight: 180,
                                                                },
                                                            },
                                                        }}
                                                    >
                                                        {Array.from({ length: 12 }, (_, i) => (
                                                            <MenuItem key={i + 1} value={i + 1}>{String(i + 1).padStart(2, '0')}</MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </div>
                                        </div>

                                        <div className="tw-w-full tw-flex tw-justify-center tw-justify-items-center tw-mt-4">
                                            <div className="tw-w-[95%] tw-h-[95%] tw-flex tw-justify-center tw-justify-items-center">
                                                <FormControl className='tw-mr-0' fullWidth disabled={loading}>
                                                    <InputLabel id="year-label">Año de expiración </InputLabel>
                                                    <Select
                                                        label='Tipo de Documento'
                                                        className='tw-w-full'
                                                        onChange={handleInputChange}
                                                        name="exp_year"
                                                        error={!!expYearError}
                                                        MenuProps={{
                                                            PaperProps: {
                                                                style: {
                                                                    maxHeight: 180,
                                                                },
                                                            },
                                                        }}
                                                    >
                                                        {Array.from({ length: 10 }, (_, i) => (
                                                            <MenuItem key={new Date().getFullYear() + i} value={new Date().getFullYear() + i}>{(new Date().getFullYear() + i).toString().slice(-2)}</MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </div>
                                        </div>

                                        <div className="tw-w-full tw-flex tw-justify-center tw-items-center tw-col-span-3 tw-mt-4">
                                            <div className="tw-w-[98%] tw-h-[100%] tw-flex tw-flex-col tw-justify-center tw-items-center tw-mt-0">
                                                <TextField
                                                    variant='outlined'
                                                    label='Nombre del titular'
                                                    onChange={handleInputChange}
                                                    name="card_holder"
                                                    fullWidth
                                                    disabled={loading}
                                                    error={!!cardHolderError}
                                                    helperText={cardHolderError}
                                                />
                                            </div>
                                        </div>


                                        <div className="tw-w-full tw-flex tw-justify-center tw-justify-items-center tw-mt-4">
                                            <div className="tw-w-[95%] tw-h-[95%] tw-flex tw-justify-center tw-justify-items-center">
                                                <FormControl className='tw-mr-0' fullWidth disabled={loading}>
                                                    <InputLabel id="year-label">Tipo de Identificación</InputLabel>
                                                    <Select
                                                        label='Tipo de Documento '
                                                        className='tw-w-full'
                                                        name="idType"
                                                        value={cardInfo.idType}
                                                        onChange={handleInputChange}
                                                        error={!!idTypeError}
                                                        MenuProps={{
                                                            PaperProps: {
                                                                style: {
                                                                    maxHeight: 180,
                                                                },
                                                            },
                                                        }}
                                                    >
                                                        <MenuItem value="AS">AS</MenuItem>
                                                        <MenuItem value="CC">CC</MenuItem>
                                                        <MenuItem value="CD">CD</MenuItem>
                                                        <MenuItem value="CE">CE</MenuItem>
                                                        <MenuItem value="CN">CN</MenuItem>
                                                        <MenuItem value="MS">MS</MenuItem>
                                                        <MenuItem value="NIT">NIT</MenuItem>
                                                        <MenuItem value="PA">PA</MenuItem>
                                                        <MenuItem value="PE">PE</MenuItem>
                                                        <MenuItem value="RC">RC</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </div>
                                        </div>

                                        <div className="tw-w-full tw-flex tw-justify-center tw-items-center tw-col-span-2 tw-mt-4">
                                            <div className="tw-w-[95%] tw-h-[100%] tw-flex tw-flex-col tw-justify-center tw-items-center tw-mt-0">
                                                <TextField
                                                    variant='outlined'
                                                    label='Número de Identificación'
                                                    name="idNumber"
                                                    fullWidth
                                                    value={cardInfo.idNumber}
                                                    onChange={handleInputChange}
                                                    error={!!idNumberError}
                                                    helperText={idNumberError}
                                                    disabled={loading}
                                                />
                                            </div>
                                        </div>

                                        <div className="tw-w-full tw-flex tw-justify-center tw-items-center tw-col-span-3 tw-mt-4 tw-mb-4">
                                            <div className="tw-w-[95%] tw-h-[100%] tw-flex tw-flex-col tw-justify-center tw-items-center tw-mt-0">
                                                <div className="tw-flex tw-justify-center text-red-500">
                                                    {loading ? (
                                                        <CircularProgress />
                                                    ) : (
                                                        <button
                                                            className='tw-bg-teal-500 tw-text-white tw-py-2 tw-px-4 tw-rounded'
                                                            //disabled={!isAccepted}
                                                            onClick={() => dataRegisterHandle()}
                                                        >
                                                            Registrar Tarjeta
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </Box>
                </Modal>
            </div>
        )
    );

}

export default CardRegisterForm;