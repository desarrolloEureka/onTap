'use client';
import { useState } from 'react';
import useDictionary from '@/hooks/dictionary/useDictionary';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Locale } from 'i18n-config';
import RecoverPasswordHook from '../hooks/RecoverPasswordHook';
import { Alert } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

const CreateNewPassword = ({
  params: { lang },
  handleNext,
}: {
  params: { lang: Locale };
  handleNext: (e: number) => void;
}) => {
  const { dictionary } = useDictionary({ lang });
  const [showPasswordOne, setShowPasswordOne] = useState(false);
  const [showPasswordTwo, setShowPasswordTwo] = useState(false);
  const {
    alertErrorPassword,
    validatingPassword,
    finishReset,
    expired,
    setNewPassword,
    setConfirmNewPassword,
    alertErrorConfirmNewPassword,
    alertErrorNotEqual
  } = RecoverPasswordHook();

  return (
    <div className='tw-flex tw-h-screen tw-items-center tw-justify-center tw-bg-[url("/images/loginBackground.png")] tw-bg-no-repeat tw-bg-center tw-bg-cover'>
      <Container className='tw-bg-[#02AF9B] tw-shadow-md tw-pt-16 tw-rounded-2xl tw-h-[515px] tw-w-[794px] flex tw-justify-center  tw-justify-items-center tw-text-center tw-mt-[50px]'>
        {expired && (
          <div className='tw-h-[5%] tw-mb-8'>
            <Alert severity='error'>
              {dictionary?.recoverPassword.expiredRecover}
            </Alert>
          </div>
        )}
        <div className='tw-h-[10%] tw-w-[100%] tw-flex tw-items-center tw-justify-center'>
          <h1 className='tw-text-white tw-text-3xl'>
            {dictionary?.newPassword.createNewPass}
          </h1>
        </div>

        <div className='tw-h-[30%] tw-w-[100%] tw-flex tw-items-center tw-justify-center'>
          <div>
            <TextField
              className='tw-h-[52px] tw-w-[386px] tw-mt-10 tw-text-sm'
              required
              id='outlined-password'
              label={dictionary?.newPassword?.nPassword}
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
                      {showPasswordOne ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Typography
              className='tw-text-white tw-mt-3 tw-mr-60'
              variant='body2'
              color='textSecondary'
            >
              {dictionary?.newPassword?.nPassword}
            </Typography>
          </div>
        </div>

        {alertErrorPassword && (
          <div className='tw-h-[6%] tw-w-[100%] tw-flex tw-items-center tw-justify-center'>
            <div className='tw-h-[100%] tw-w-[386px] tw-flex tw-items-center tw-justify-start '>
              <span className='tw-text-red-500'>
                {alertErrorPassword.errorMessage} *
              </span>
            </div>
          </div>
        )}

        <div className='tw-h-[25%] tw-w-[100%] tw-flex tw-items-center tw-justify-center tw-mb-2'>
          <div>
            <TextField
              className='tw-h-[52px] tw-w-[386px] tw-mt-8 tw-text-sm'
              required
              id='outlined-password'
              label={dictionary?.newPassword?.repeatPassword}
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
                      {showPasswordTwo ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
            <Typography
              className='tw-text-white tw-mt-3 tw-mr-60'
              variant='body2'
              color='textSecondary'
            >
              {dictionary?.newPassword?.nPassword}
            </Typography>
          </div>
        </div>

        {alertErrorConfirmNewPassword && (
          <div className='tw-h-[5%] tw-w-[100%] tw-flex tw-items-center tw-justify-center'>
            <div className='tw-h-[100%] tw-w-[386px] tw-flex tw-items-center tw-justify-start'>
              <span className='tw-text-red-500'>
                {alertErrorConfirmNewPassword.errorMessage}*
              </span>
            </div>
          </div>
        )}

        {alertErrorNotEqual && (
          <div className='tw-h-[5%] tw-w-[100%] tw-flex tw-items-center tw-justify-center'>
            <div className='tw-h-[100%] tw-w-[386px] tw-flex tw-items-center tw-justify-start'>
              <span className='tw-text-red-500'>
                {alertErrorNotEqual.errorMessage}*
              </span>
            </div>
          </div>
        )}

        <div className='tw-h-[15%] tw-w-[100%] tw-flex tw-items-center tw-justify-center'>
          <Button
            className='tw-w-[184px] tw-h-[45px] tw-rounded-3xl tw-bg-white tw-mt-[30px] tw-items-center '
            onClick={() => finishReset((e) => handleNext(e))}
          >
            {dictionary?.newPassword.nextNewPassword}
          </Button>
        </div>


      </Container>
    </div>
  );
};
export default CreateNewPassword;
