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
    handleSetNewPassword,
    handleSetConfirmNewPassword,
    alertErrorPassword,
    validatingPassword,
    finishReset,
    expired,
  } = RecoverPasswordHook();

  return (
    <div className='tw-flex tw-h-screen tw-items-center tw-justify-center tw-bg-[url("/images/loginBackground.png")] tw-bg-no-repeat tw-bg-center tw-bg-cover'>
      {/* {dictionary && <Menu dictionary={dictionary} />} */}
      <Container className='tw-bg-[#02AF9B] tw-shadow-md tw-pt-16 tw-rounded-2xl tw-h-[513px] tw-w-[794px] flex tw-justify-center  tw-justify-items-center tw-text-center tw-mt-[50px]'>
        {alertErrorPassword && (
          <div>
            <Alert severity='info'>
              {dictionary?.recoverPassword.alertErrorPassword}
            </Alert>
          </div>
        )}
        {expired && (
          <div>
            <Alert severity='error'>
              {dictionary?.recoverPassword.expiredRecover}
            </Alert>
          </div>
        )}
        <div>
          <h1 className='tw-mt-[10px] tw-text-white tw-text-3xl'>
            {dictionary?.newPassword.createNewPass}
          </h1>
        </div>
        <TextField
          className='tw-h-[52px] tw-w-[386px] tw-mt-10 tw-text-sm'
          required
          id='outlined-password'
          label={dictionary?.newPassword.nPassword}
          type={showPasswordOne ? 'text' : 'password'}
          defaultValue=''
          variant='outlined'
          InputProps={{ className: 'tw-rounded-3xl' }}
          onChange={handleSetNewPassword}
        />
        <Typography
          className='tw-text-white tw-mt-3 tw-mr-60'
          variant='body2'
          color='textSecondary'
        >
          {dictionary?.newPassword.nPassword}
        </Typography>
        <TextField
          className='tw-h-[52px] tw-w-[386px] tw-mt-14 tw-text-sm'
          required
          id='outlined-password'
          label={dictionary?.newPassword.repeatPassword}
          type={showPasswordTwo ? 'text' : 'password'}
          defaultValue=''
          variant='outlined'
          InputProps={{ className: 'tw-rounded-3xl' }}
          onChange={handleSetConfirmNewPassword}
        />
        <Typography
          className='tw-text-white tw-mt-3 tw-mr-60'
          variant='body2'
          color='textSecondary'
        >
          {dictionary?.newPassword.repeatPassword}
        </Typography>
        <Button
          className='tw-w-[184px] tw-h-[45px] tw-rounded-3xl tw-bg-white tw-mt-[30px] tw-items-center '
          onClick={() => finishReset((e) => handleNext(e))}
          disabled={validatingPassword ?? false}
        >
          {dictionary?.newPassword.nextNewPassword}
        </Button>
      </Container>
    </div>
  );
};
export default CreateNewPassword;
