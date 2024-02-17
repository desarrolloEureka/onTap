'use client';
import React, { useState } from 'react';
import { Avatar, Stack, IconButton, Typography } from '@mui/material';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { Dictionary } from '@/types/dictionary';
import { GetUser, SendDataImage } from '@/reactQuery/users';
import { Button, Container } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import CustomModalAlert from '@/components/customModalAlert/CustomModalAlert';
import ProfileHook from './hooks/ProfileHook';
import CustomSwitchGeneral from '@/components/customSwitchGeneral/CustomSwitchGeneral';
import { DataForm } from '@/types/profile';

const PhotoUser = ({
  dictionary,
  handleDataSet,
}: {
  dictionary: Dictionary;
  handleDataSet: (e: DataForm) => void;
}) => {
  const {
    handleSwitchAll,
    handleSendProfile,
    isDataSuccess,
    setIsDataSuccess,
    isDataError,
    setIsDataError,
    isEmailPhoneRight,
    setisEmailPhoneRight,
    status,
  } = ProfileHook({
    dictionary,
    handleDataSet,
  });

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { data, error } = GetUser();

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      const base64String = await convertFileToBase64(file);
      setSelectedImage(base64String);
      const userId = data?.uid;
      if (userId) {
        await SendDataImage(userId, base64String);
      }
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
    <div className='tw-h-[280px] tw-flex tw-items-center tw-justify-center tw-flex-col tw-mb-[-20px] tw-pb-6'>
      <div className=' tw-h-[70%] tw-flex tw-items-center tw-justify-center'>
        <Stack direction='row' spacing={2} className='tw-relative'>
          <label htmlFor='photoInput'>
            <Avatar
              alt='Photo User'
              src={
                selectedImage != null
                  ? selectedImage
                  : data?.image || '/images/profilePhoto.png'
              }
              sx={{
                width: 125,
                height: 125,
                borderRadius: '50%',
                border: '10px solid #02AF9B',
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

      <div className=' tw-h-[20%] tw-w-[100%] tw-flex  tw-items-center tw-justify-center tw-flex-row'>
        <div className='tw-h-[35px] tw-w-[120px] tw-flex tw-flex-col tw-items-center tw-justify-center tw-bg-[#02AF9B] tw-rounded-tr-xl tw-rounded-bl-xl'>
          <Typography
            className={`tw-w-[90%] tw-text-center tw-truncate tw-capitalize`}
          >
            {dictionary?.profileView?.labelHello}{' '}
            {data && data.name ? data.name : ''}
          </Typography>
        </div>
      </div>

      <div className=' tw-h-[35%] tw-w-[100%] tw-flex  tw-items-center tw-justify-center tw-flex-row'>
        <Container className='tw-h-[98%] tw-w-[85%] tw-flex tw-items-start tw-justify-end'>
          <div className=' tw-h-[100%] tw-w-[50%] tw-flex tw-flex-col tw-items-start tw-justify-center'>
            <div className=' tw-h-[100%] tw-w-[80%] tw-flex tw-flex-row tw-items-center tw-justify-center'>
              <div className=' tw-h-[100%] max-sm:tw-w-[50%] tw-w-[20%] tw-flex tw-items-center tw-justify-center tw-pt-3 max-md:tw-mr-2'>
                <CustomSwitchGeneral
                  name='all_true'
                  handleSwitch={(e: any) => handleSwitchAll(e)}
                />
              </div>

              <div className=' tw-h-[100%] max-sm:tw-w-[70%] tw-w-[80%] tw-flex tw-items-center tw-justify-start'>
                <span
                  style={{
                    color: '#030124',
                    fontSize: '1rem',
                    textTransform: 'none',
                  }}
                >
                  {dictionary.profileView.labelSwitchMain}
                </span>
              </div>
            </div>
          </div>
          <div className=' tw-h-[100%] tw-w-[50%] tw-flex  tw-items-end tw-justify-end '>
            <div className='tw-h-[100%] tw-w-[30%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
              <Button
                className='tw-w-[90%] tw-h-[45px]'
                onClick={handleSendProfile}
                color='secondary'
                size='medium'
                startIcon={
                  <SaveOutlinedIcon
                    style={{
                      color: '#02AF9B',
                      fontSize: '1.8rem',
                      marginLeft: '0rem',
                    }}
                  />
                }
              >
                <span
                  style={{
                    color: '#030124 ',
                    fontSize: '1.09rem',
                    textTransform: 'none',
                  }}
                >
                  {dictionary.homeView.saveButtonLabel}
                </span>
              </Button>
            </div>
          </div>
        </Container>
      </div>

      <CustomModalAlert
        isModalAlert={isDataError}
        handleModalAlert={setIsDataError}
        title={dictionary?.generalTitle}
        description={dictionary.profileView.errorDataSend}
        isClosed
      />
      <CustomModalAlert
        isModalAlert={isDataSuccess}
        handleModalAlert={setIsDataSuccess}
        title={dictionary?.generalTitle}
        description={dictionary.profileView.successDataSend}
        isClosed
      />
      <CustomModalAlert
        isModalAlert={isEmailPhoneRight}
        handleModalAlert={setisEmailPhoneRight}
        title={dictionary?.generalTitle}
        description={status}
        isClosed
      />
    </div>
  );
};

export default PhotoUser;
