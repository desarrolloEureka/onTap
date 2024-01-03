import React, { useState } from 'react';
import { Avatar, Stack, IconButton } from '@mui/material';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { Dictionary } from '@/types/dictionary';

const PhotoUser = ({ dictionary }: { dictionary: Dictionary }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      // Leer el archivo como una cadena base64
      const base64String = await convertFileToBase64(file);
      console.log("base64 ", base64String)
      setSelectedImage(base64String);
    }
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.result && typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Error al convertir el archivo a base64.'));
        }
      };

      reader.onerror = () => {
        reject(new Error('Error al leer el archivo.'));
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <div className='tw-h-[210px] tw-flex tw-items-center tw-justify-center tw-flex-col'>
      <div className='tw-flex tw-items-center tw-justify-center'>
        <Stack direction='row' spacing={2} className='tw-relative'>
          <label htmlFor='photoInput'>
            <Avatar
              alt='Photo User'
              src={selectedImage || '/images/profilePhoto.png'}
              sx={{
                width: 125,
                height: 125,
                borderRadius: '50%',
                border: '10px solid #62ad9b',
                cursor: 'pointer',
              }}
            />
          </label>
          <input
            type='file'
            id='photoInput'
            accept='image/*'
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
          <IconButton
            style={{
              position: 'absolute',
              top: 30,
              right: -15,
              background: 'transparent',
              color: '#396593',
            }}
            onClick={() => document.getElementById('photoInput')?.click()}
          >
            <DriveFileRenameOutlineIcon />
          </IconButton>
        </Stack>
      </div>
      <div className=' tw-h-[20%] tw-w-[100%] tw-flex tw-flex-col tw-items-center tw-justify-center '>
        <div className='tw-h-[70%] tw-w-[100px] tw-flex tw-flex-col tw-items-center tw-justify-center tw-bg-[#62ae9b] tw-rounded-tr-xl tw-rounded-bl-xl'>
          <h5 className='tw-text-white'>
            {dictionary?.profileView.labelHello} David
          </h5>
        </div>
      </div>
    </div>
  );
};

export default PhotoUser;
