import { Close } from '@mui/icons-material';
import { Box, IconButton, Modal, Button, TextField, InputAdornment, Fab } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ImagesearchRollerIcon from '@mui/icons-material/ImagesearchRoller';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Image from 'next/image';
import { UpdateSocialNetwork } from '@/reactQuery/home';

function ModalEditLogo({
    isModalAlert,
    handleModalAlert,
    dataLogo,
    handleSaveData,
    dictionary,
    flag,
    setFlag,
    setIsModalSuccessEdit,
    setIsModalFailEdit
}: {
    isModalAlert: boolean;
    handleModalAlert: (e: boolean) => void;
    dataLogo: any;
    handleSaveData: (e: any) => void;
    dictionary: any;
    flag: boolean;
    setFlag: any;
    setIsModalSuccessEdit: any;
    setIsModalFailEdit: any;
}) {
    const [name, setName] = useState<string>('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [open, setOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const imgStatus = imageFile ? dictionary?.imagenSeleccionada : dictionary?.agregarImagen;

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const fileUrl = URL.createObjectURL(file);
            setImageUrl(fileUrl);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (imageFile && name) {
            try {
                const result = await UpdateSocialNetwork(imageFile, dataLogo.name, name, dataLogo.id);
                setFlag(!flag);
                handleModalAlert(false);
                if (result === true) {
                    setIsModalSuccessEdit(true);
                } else {
                    setIsModalFailEdit(true);
                }

            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };

    useEffect(() => {
        dataLogo && setName(dataLogo.name);
    }, [dataLogo])

    return (
        <Modal
            open={isModalAlert}
            onClose={() => handleModalAlert(false)}
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
                    padding: 5,
                    borderRadius: 3,
                    position: 'relative',
                }}
            >

                <IconButton
                    className='tw-absolute tw-right-1 tw-top-1'
                    onClick={() => handleModalAlert(false)}
                >
                    <Close className='tw-text-white' />
                </IconButton>

                {dataLogo && (
                    <div className='tw-w-[100%] tw-h-[80%] tw-flex tw-justify-center tw-justify-items-center tw-pl-3 tw-pr-3'>
                        <Box className='tw-w-[95%] tw-bg-white tw-shadow-m tw-rounded-2xl tw-p-11 tw-mt-4 tw-flex tw-flex-col tw-justify-center tw-items-center'>
                            <form onSubmit={handleSubmit} className='tw-w-full tw-flex tw-flex-col tw-items-center'>
                                <TextField
                                    required
                                    value={name}
                                    variant="standard"
                                    className='tw-mb-4'
                                    label={dictionary?.LogoName}
                                    fullWidth
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
                                    }}
                                    onChange={(e) => setName(e.target.value)}
                                />

                                {imageUrl && (
                                    <div className='tw-w-full tw-h-[140px] tw-flex tw-justify-center tw-items-center tw-mb-3'>
                                        <div className='tw-w-[90%] tw-h-[100%] tw-flex tw-justify-center tw-items-center'>
                                            <Image src={imageUrl} alt="Preview" width={100} height={100} />
                                        </div>
                                    </div>
                                )}

                                {imageUrl === null && dataLogo.image && (
                                    <div className='tw-w-full tw-h-[140px] tw-flex tw-justify-center tw-items-center tw-mb-3'>
                                        <div className='tw-w-[90%] tw-h-[100%] tw-flex tw-justify-center tw-items-center'>
                                            <Image src={dataLogo.image} alt="Preview" width={100} height={100} />
                                        </div>
                                    </div>
                                )}

                                <label className='tw-flex tw-items-center tw-justify-center tw-gap-2 tw-text-white tw-font-bold tw-cursor-pointer'>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        hidden
                                    />
                                    <Fab
                                        className='tw-bg-[#C3CEC2] tw-text-white'
                                        size="small"
                                        component="span"
                                        aria-label="add"
                                        variant="extended"
                                        sx={{ mb: 2 }}
                                    >
                                        <UploadFileIcon /> {imgStatus}
                                    </Fab>
                                </label>

                                <Button
                                    className="tw-w-[184px] tw-h-[40px] tw-rounded-3xl tw-bg-[#02AF9B] tw-text-white tw-font-bold tw-mb-4"
                                    type="submit"
                                >
                                    {dictionary?.guardar}
                                </Button>
                            </form>
                        </Box>
                    </div>
                )}
            </Box>
        </Modal>
    );
}

export default ModalEditLogo;