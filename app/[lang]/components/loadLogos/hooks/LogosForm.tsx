import { useState } from 'react';
import { TextField, Button, InputAdornment, Fab } from '@mui/material';
import { Dictionary } from '@/types/dictionary';
import ImagesearchRollerIcon from '@mui/icons-material/ImagesearchRoller';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CustomModalAlert from '@/components/customModalAlert/CustomModalAlert';
import { saveSocialNetworkImage } from '@/firebase/generals';

type ItemFormProps = {
    dictionary: Dictionary | undefined;
    flag: boolean;
    setFlag: any;
};

const LogosForm: React.FC<ItemFormProps> = ({ dictionary, flag, setFlag }) => {
    const [name, setName] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [open, setOpen] = useState(false);
    const imgStatus = imageFile ? dictionary?.backOffice.imagenSeleccionada : dictionary?.backOffice.agregarImagen;

    const handleClose = () => {
        setOpen(false);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (imageFile && name) {
            try {
                const result = await saveSocialNetworkImage(imageFile, name);
                setOpen(true);
                setFlag(!flag);
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        } else {
            console.log('Ensure both name and image file are provided.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className='tw-w-full tw-flex tw-flex-col tw-items-center'>
            <TextField
                label={dictionary?.backOffice.LogoName}
                className='tw-mb-4'
                variant="standard"
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
                fullWidth
                value={name}
                onChange={handleNameChange}
            />

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
                {dictionary?.backOffice.guardar}
            </Button>
            <CustomModalAlert
                isModalAlert={open}
                handleModalAlert={handleClose}
                title={dictionary?.backOffice?.alertTitleLogo || ''}
                description={dictionary?.backOffice?.alertSuccessLogo || ''}
                isClosed={true}
            />
        </form>
    );
};

export default LogosForm;