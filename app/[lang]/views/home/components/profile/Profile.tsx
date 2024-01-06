import { Dictionary } from '@/types/dictionary';
import { DataForm } from '@/types/profile';
import FormDataUser from '@/views/home/components/form/FormDataUser';
import FooterProfile from '@/views/home/components/profile/FooterProfile';
import FormAddDataUser from '@/views/home/components/profile/FormAddDataUser';
import ModalProfile from '@/views/home/components/profile/ModalProfile';
import PhotoUser from '@/views/home/components/profile/PhotoUser';
import { Button, Container, TextField, Typography } from '@mui/material';
import { profile } from 'app/[lang]/initialData/profileInitialData';
import { useState } from 'react';

import ProfileHook from './hooks/ProfileHook';
import Link from 'next/link';

import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ModalAlert from './modalalert';


const Profile = ({
  dictionary,
  isProUser,
}: {
  dictionary: Dictionary;
  isProUser: boolean;
}) => {
  const [dataForm, setDataForm] = useState<DataForm>(profile);

  const {
    handleModal,
    handleModalAlert,
    handleSeeMore,
    handleDeleteData,
    isDetailOpen,
    itemDetail,
    isModalOpen,
    isModalAlert,
    handleModalAux,
    itemDelete,
  } = ProfileHook({
    dictionary,
    dataForm,
    setDataForm,
  });

  const [showPasswordOne, setShowPasswordOne] = useState(false);
  const [showPasswordTwo, setShowPasswordTwo] = useState(false);

  const [changePassword, setChangePassword] = useState(false);

  const handleChangePassword = () => {
    console.log("Holaaaaaaaaaaa");
    setChangePassword(!changePassword);
  };


  function handleDataSet(e: DataForm): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div>
      <div className="tw-bg-[url('/images/homeBackground.png')] tw-bg-cover tw-bg-center">
        <PhotoUser dictionary={dictionary}
          handleChangePassword={handleChangePassword}
          changePassword={changePassword}
        />
        {changePassword ?
          <div className={`tw-flex tw-items-center tw-justify-center ${isProUser ? 'lg:tw-h-[560px] md:tw-w-[100%]' : 'lg:tw-h-[550px] md:tw-w-[100%]'}`}>
            <Container className='tw-bg-primary tw-shadow-md tw-pt-12 tw-rounded-2xl tw-h-[455px] tw-w-[754px] tw-flex tw-flex-col tw-items-center tw-justify-center'>

              <div className='tw-h-[15%] tw-w-[100%]'>
                <h1 className=' tw-text-white tw-text-[18px]'>{/* font-size: 16px; */}
                  Cambiar contraseña
                </h1>
              </div>

              <div className='tw-h-[30%] tw-w-[100%] tw-flex tw-items-center tw-justify-center'>
                <div>
                  <TextField
                    className='tw-h-[52px] tw-w-[386px] tw-mt-10 tw-text-sm'
                    required
                    id='outlined-password'
                    label={dictionary?.newPassword.nPassword}
                    type={showPasswordOne ? 'text' : 'password'}
                    defaultValue=''
                    variant='outlined'
                    InputProps={{
                      className: 'tw-rounded-3xl',
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            onClick={() => setShowPasswordOne(!showPasswordOne)}
                            edge='end'
                          >
                            {showPasswordOne ? <VisibilityIcon /> : <VisibilityOffIcon />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Typography
                    className='tw-text-white tw-mt-3 tw-mr-60'
                    variant='body2'
                    color='textSecondary'
                  >
                    {dictionary?.newPassword.nPassword}
                  </Typography>
                </div>
              </div>

              <div className='tw-h-[30%] tw-w-[100%] tw-flex tw-items-center tw-justify-center'>
                <div>
                  <TextField
                    className='tw-h-[52px] tw-w-[386px] tw-mt-14 tw-text-sm'
                    required
                    id='outlined-password'
                    label={dictionary?.newPassword.repeatPassword}
                    type={showPasswordTwo ? 'text' : 'password'}
                    defaultValue=''
                    variant='outlined'
                    InputProps={{
                      className: 'tw-rounded-3xl',
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            onClick={() => setShowPasswordTwo(!showPasswordTwo)}
                            edge='end'
                          >
                            {showPasswordTwo ? <VisibilityIcon /> : <VisibilityOffIcon />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Typography
                    className='tw-text-white tw-mt-3 tw-mr-60'
                    variant='body2'
                    color='textSecondary'
                  >
                    {dictionary?.newPassword.nPassword}
                  </Typography>
                </div>
              </div>

              <div className='tw-h-[25%] tw-w-[100%] tw-flex tw-items-center tw-justify-center'>
                <Button
                  className='tw-w-[184px] tw-h-[45px] tw-rounded-3xl tw-bg-white tw-mt-[30px] tw-items-center'
                //onClick={handleNext}
                >
                  Guardar
                </Button>
              </div>

            </Container>
          </div>
          :
          <div className={`tw-flex tw-items-center tw-justify-center ${isProUser ? 'lg:tw-h-[1700px] md:tw-w-[100%]' : 'lg:tw-h-[750px] md:tw-w-[100%]'}`}>
            <Container className='tw-bg-white tw-shadow-md tw-rounded-2xl tw-h-[90%] tw-w-[85%] md:tw-flex tw-items-start tw-justify-center'>
              <FormDataUser
                dictionary={dictionary}
                isProUser={isProUser}
                dataForm={dataForm}
                handleDataSet={(e) => handleDataSet(e)}
              />
              <FormAddDataUser
                dictionary={dictionary}
                isProUser={isProUser}
                dataForm={dataForm}
                handleDataSet={(e) => handleDataSet(e)}
                isDetailOpen={isDetailOpen}
                itemDetail={itemDetail}
                handleSeeMore={handleSeeMore}
                handleModalAlert={handleModalAlert}
              />
            </Container>
          </div>
        }


        <FooterProfile
          handleModal={handleModal}
          dictionary={dictionary}
          dataForm={dataForm}
          handleDataSet={(e) => handleDataSet(e)}
        />
      </div>

      <ModalProfile
        isModalOpen={isModalOpen}
        handleModal={handleModal}
        dictionary={dictionary}
      />
      <ModalAlert
        isModalAlert={isModalAlert}
        handleModalAlert={handleModalAux}
        dictionary={dictionary}
        handleDeleteData={(name) => handleDeleteData({ name })}
        itemDelete={itemDelete}
      />
    </div>
  );
};

export default Profile;
