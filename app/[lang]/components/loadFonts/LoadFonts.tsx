import {
    Box,
    Button,
    Container,
    Fab,
    IconButton,
    InputAdornment,
    MenuItem,
    Modal,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import useDictionary from "@/hooks/dictionary/useDictionary";
import "react-phone-input-2/lib/style.css";
import { Locale } from "i18n-config";
import { DataGrid, GridColDef, GridToolbarContainer } from "@mui/x-data-grid";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import { Close } from "@mui/icons-material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import SaveIcon from "@mui/icons-material/Save";
import LoadFontsHook from "./hooks/LoadFontsHook";
import Image from "next/image";
import ImagesearchRollerIcon from '@mui/icons-material/ImagesearchRoller';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DeleteIcon from '@mui/icons-material/Delete';

const LoadFonts = ({
    params: { lang },
}: {
    params: { lang: Locale };
}) => {
    const {
        data,
        name,
        setName,
        dataRegisterHandle,
        status,
        error,
        isSubmitting,
        handleEditFondo,
        handleEditData,
        handleCloseModal,
        handleOpenModal,
        isModalOpen,
        isEditData,
        rowId,
        imgStatus,
        handleImageChange,
        selectedImage,
        imageError,
        handleDeleteFondo,
        isModalDeleteOpen,
        setIsModaDeletelOpen,
        handleCloseDeleteModal,
        handleDeleteLogo
    } = LoadFontsHook();

    const dictionary = useDictionary({ lang: "es" });

    const formatearFecha = (fechaISO: string): string => {
        return moment(fechaISO).format("DD/MM/YYYY HH:mm:ss");
    };

    const columns: GridColDef[] = [
        {
            field: "optionActions",
            headerName: "Acciones",
            flex: 1,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => (
                <div style={{ display: "flex", gap: "8px" }}>
                    <Button
                        style={{ color: "black" }}
                        onClick={() => handleEditFondo(params?.row)}
                    >
                        <EditIcon />
                    </Button>
                    <Button
                        style={{ color: "black" }}
                        onClick={() => handleDeleteFondo(params?.row)}
                    >
                        <DeleteIcon />
                    </Button>
                </div>
            ),
        },
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
            field: "name",
            headerName: "Nombre de Fondo",
            headerAlign: "center",
            align: "center",
            minWidth: 130,
            flex: 1,
        },
        {
            field: "image",
            headerName: "Imagen",
            headerAlign: "center",
            align: "center",
            minWidth: 130,
            flex: 1,
            renderCell: (params) => (
                <div className="tw-flex tw-justify-center tw-items-center">
                    <Image src={`${params.value}`} alt="image" width={50} height={100} />
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
                    {dictionary.dictionary?.backOffice.fondoPlantilla}
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
                                paginationModel: { page: 0, pageSize: 15 },
                            },
                            sorting: {
                                sortModel: [{ field: "created_at", sort: "desc" }],
                            },
                        }}
                        pageSizeOptions={[15, 25]}
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
                        <div className="tw-w-[90%] tw-bg-white tw-shadow-m tw-rounded-2xl tw-py-3 tw-mt-10 tw-mb-6 tw-flex tw-flex-col tw-justify-center tw-items-center">
                            <div className="tw-w-full tw-h-[95%] tw-flex-row tw-justify-center tw-justify-items-center tw-mx-32 tw-mt-4 tw-mb-5">
                                <div className="tw-w-full tw-flex tw-justify-center tw-justify-items-center">
                                    <div className="tw-w-[85%] tw-h-[95%] tw-flex tw-justify-center tw-justify-items-center">
                                        <TextField
                                            variant="standard"
                                            label={dictionary.dictionary?.backOffice.FontName}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position='start'>
                                                        <ImagesearchRollerIcon
                                                            style={{
                                                                color: '#02AF9B',
                                                                fontSize: '2rem',
                                                                marginRight: '1rem',
                                                            }}
                                                        />
                                                    </InputAdornment>
                                                ),
                                                style: {
                                                    paddingTop: "5px",
                                                    paddingBottom: "5px",
                                                },
                                            }}
                                            InputLabelProps={{
                                                style: {
                                                    fontSize: 18,
                                                },
                                            }}
                                            FormHelperTextProps={{
                                                style: {
                                                    fontSize: 13,
                                                    color: "red",
                                                },
                                            }}
                                            id="outlined"
                                            className="tw-w-full tw-text-sm"
                                            error={!!error}
                                            helperText={error}
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            margin="normal"
                                        />
                                    </div>
                                </div>

                                {selectedImage && (
                                    <div className="tw-w-full tw-flex tw-justify-center tw-justify-items-center tw-mt-2 tw-mb-1">
                                        <div className="tw-mt-2">
                                            <Image
                                                src={
                                                    selectedImage
                                                        ? selectedImage
                                                        : ""
                                                }
                                                alt="Vista previa"
                                                className="tw-h-[180px] tw-object-cover tw-rounded"
                                                layout="responsive"
                                                width={150}
                                                height={150}
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className={`tw-w-full tw-flex tw-flex-col tw-items-center ${!selectedImage ? 'tw-mt-7' : ''}`}>
                                    <div className="tw-w-[80%] tw-flex tw-flex-col tw-items-center">
                                        <label
                                            htmlFor="iconButton"
                                            className="tw-flex tw-flex-col tw-items-center tw-justify-center"
                                        >
                                            <div className="tw-flex tw-flex-row tw-items-center tw-justify-center tw-h-10 tw-w-36 tw-rounded-3xl tw-bg-[#02AF9B] tw-mt-3 -tw-ml-2">
                                                <Typography className="tw-font-bold tw-text-sm url-label tw-text-white">
                                                    Seleccionar Imagen
                                                </Typography>
                                            </div>

                                            <input
                                                type="file"
                                                name="icon"
                                                id="iconButton"
                                                accept=".jpg, .jpeg, .png"
                                                hidden
                                                onChange={handleImageChange}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            />
                                        </label>

                                        <Typography className="tw-text-sm tw-text-gray-500 tw-mt-5 tw-text-center">
                                            Tamaño recomendado: 738×1600 px
                                        </Typography>
                                        <Typography className="tw-text-sm tw-text-gray-500 tw-text-center">
                                            Formatos permitidos: JPG, JPEG, PNG
                                        </Typography>
                                    </div>
                                </div>

                                {imageError && (
                                    <div className="tw-w-[100%] tw-flex tw-justify-center tw-justify-items-center">
                                        <div className="tw-text-[#FF0000] tw-text-[13px] tw-mt-4 tw-font-normal">
                                            {imageError}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="tw-w-[101%] tw-flex tw-justify-center tw-items-center tw-border-t-white tw-border-t-[0.5px] tw-border-x-0 tw-border-b-0 tw-border-solid">
                            <div className="tw-w-1/2 tw-py-4 tw-flex tw-flex-col tw-justify-center tw-items-start">
                                <div className="tw-w-40 tw-flex tw-flex-col tw-justify-center tw-items-center"></div>
                            </div>
                            <div className="tw-w-1/2 tw-py-4 tw-flex tw-justify-end tw-items-center">
                                <div className="tw-w-[100%] tw-h-full tw-flex tw-justify-end tw-items-center">
                                    <div className="tw-w-full tw-h-full tw-flex tw-justify-end tw-items-center">
                                        <div className="tw-w-[40%] tw-h-full tw-flex tw-justify-center tw-items-center tw-mr-10">
                                            <Button
                                                variant="text"
                                                className="tw-text-black tw-ml-6"
                                                onClick={
                                                    isEditData ? handleEditData : dataRegisterHandle
                                                }
                                                sx={{
                                                    padding: "0",
                                                    minWidth: "auto",
                                                    textTransform: "none",
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                                startIcon={
                                                    <SaveIcon
                                                        style={{
                                                            paddingLeft: 1,
                                                            fontSize: 25,
                                                            color: "white",
                                                        }}
                                                    />
                                                }
                                            >
                                                <Typography style={{ color: "white" }}>
                                                    Guardar
                                                </Typography>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>

            <Modal
                open={isModalDeleteOpen}
                onClose={handleCloseDeleteModal}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
                className='tw-flex tw-justify-center tw-items-center'
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        bgcolor: '#02AF9B',
                        paddingTop: 5,
                        borderRadius: 3,
                        position: 'relative',
                    }}
                >
                    <IconButton
                        className='tw-absolute tw-right-1 tw-top-1'
                        onClick={handleCloseDeleteModal}
                    >
                        <Close className='tw-text-white' />
                    </IconButton>

                    <div className='tw-w-[100%] tw-h-[70%] tw-flex tw-justify-center tw-items-center tw-pl-2 tw-pr-2'>
                        <div className='tw-w-[95%] tw-h-[90%] tw-flex tw-justify-center tw-items-center tw-pb-7'>
                            <span className='tw-text-center tw-text-white'>
                                ¿Estás seguro de borrar este fondo? Esta acción es definitiva.
                            </span>
                        </div>
                    </div>

                    <div className='tw-w-[100%] tw-h-[30%] tw-border-t-black tw-border-t-[1px] tw-border-x-0 tw-border-b-0 tw-border-solid  tw-flex tw-justify-center tw-justify-items-center tw-pl-8 tw-pr-8'>
                        <div className='tw-w-[50%] tw-h-[100%] tw-flex tw-justify-center tw-justify-items-center tw-border-r-black tw-border-r-[1px] tw-border-l-0 tw-border-b-0 tw-border-t-0 tw-border-solid tw-p-2'>
                            <Button
                                className='tw-w-[100%] tw-h-[100%] tw-text-white tw-text-custom'
                                type='submit'
                                style={{ textTransform: 'none' }}
                                onClick={handleCloseDeleteModal}
                            >
                                {dictionary.dictionary?.modalDelete?.buttonCancel}
                            </Button>
                        </div>
                        <div className='tw-w-[50%] tw-h-[100%] tw-flex tw-justify-center tw-justify-items-center tw-p-2'>
                            <Button
                                onClick={handleDeleteLogo}
                                className='tw-w-[100%] tw-h-[100%] tw-text-white'
                                type='submit'
                                style={{ textTransform: 'none' }}
                            >
                                {dictionary.dictionary?.modalDelete?.buttonConfirm}
                            </Button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default LoadFonts;

