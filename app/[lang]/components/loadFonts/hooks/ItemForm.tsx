import { useState } from 'react';
import { TextField, Button, InputAdornment, Fab } from '@mui/material';
import { Dictionary } from '@/types/dictionary';
import ImagesearchRollerIcon from '@mui/icons-material/ImagesearchRoller';
import AddIcon from '@mui/icons-material/Add';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { saveBackgroundImage } from '@/firebase/generals';
import CustomModalAlert from '@/components/customModalAlert/CustomModalAlert';
import { set } from 'firebase/database';

type ItemFormProps = {
  onAddItem: (item: { name: string; image: string }) => void;
  dictionary: Dictionary | undefined;
};

const ItemForm: React.FC<ItemFormProps> = ({ onAddItem, dictionary }) => {
  const [name, setName] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    window.location.reload();
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (imageFile) {
      convertToBase64(imageFile).then((image) => {
        saveBackgroundImage(image, name).then(() => {
          onAddItem({ name, image });
          setName('');
          setImageFile(null);
        });
      });
      setOpen(true);
    }

  };

  const imgStatus = imageFile ? dictionary?.backOffice.imagenSeleccionada : dictionary?.backOffice.agregarImagen;

  const convertToBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <form onSubmit={handleSubmit} className='tw-w-full tw-flex tw-flex-col tw-items-center'>
      <TextField
        label={dictionary?.backOffice.FontName}
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
        //font color white
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
        {dictionary?.homeView.agregar}
      </Button>
      <CustomModalAlert
        isModalAlert={open}
        handleModalAlert={handleClose}
        title={dictionary?.backOffice?.alertTitle || ''}
        description={dictionary?.backOffice?.alertMessage || ''}
        isClosed={true}
      />
    </form>
  );
};

export default ItemForm;
