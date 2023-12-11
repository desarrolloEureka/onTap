'use client';
import useDictionary from '@/hooks/dictionary/useDictionary';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { Locale } from 'i18n-config';
import Image from 'next/image';
import { useState } from 'react';

const RecoverPassword = ({
  params: { lang },
}: {
  params: { lang: Locale };
}) => {
  const { dictionary } = useDictionary({ lang });
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  return (
    <div>
      {step === 1 && (
        <div className='tw-flex tw-h-screen tw-items-center tw-justify-center tw-bg-[url("/images/loginBackground.png")] tw-bg-no-repeat tw-bg-center tw-bg-cover'>
          <Container className='tw-bg-primary tw-shadow-md tw-pt-16 tw-rounded-2xl tw-h-[475px] tw-w-[794px] flex tw-justify-center  tw-justify-items-center tw-text-center '>
            <h1 className=' tw-text-white tw-text-[26px]  '>
              {dictionary?.recoverPassword.recoverpassword}
            </h1>
            <TextField
              className='tw-h-[52px] tw-w-[386px] tw-text-sm tw-mt-[80px] '
              required
              id='outlined-required'
              label={dictionary?.recoverPassword.mail}
              defaultValue=''
              variant='outlined'
              InputProps={{ className: 'tw-rounded-3xl' }}
            />
            <Typography
              className='tw-text-white tw-mt-3 tw-mr-80'
              variant='body2'
              color='textSecondary'
            >
              {dictionary?.recoverPassword.mail}
            </Typography>
            <Button
              className='tw-w-[184px] tw-h-[45px] tw-rounded-3xl  tw-bg-white tw-mt-[65px]'
              onClick={handleNext}
            >
              {dictionary?.recoverPassword.next}
            </Button>
            <Button className='tw-w-[184px] tw-h-[45px] tw-rounded-3xl tw-bg-white tw-mt-[65px]'>
              {dictionary?.recoverPassword.back}
            </Button>
          </Container>
        </div>
      )}

      {step === 2 && (
        <div className='tw-flex tw-h-screen tw-items-center tw-justify-center tw-bg-[url("/images/loginBackground.png")] tw-bg-no-repeat tw-bg-center tw-bg-cover'>
          <Container className='tw-bg-primary tw-shadow-md tw-pt-16 tw-rounded-2xl tw-h-[475px] tw-w-[794px] flex tw-justify-center  tw-justify-items-center tw-text-center '>
            <Typography className='tw-text-white  tw-ml-[20px] tw-text-2xl text-center'>
              {dictionary?.recoveryCode.recoverycode}
            </Typography>

            <Typography
              className='text-black tw-pt-10 h-[38px] w-[250px] text-center '
              variant='body2'
              color='textSecondary'
            >
              {
                dictionary?.recoveryCode
                  .enter_the_recovery_code_that_we_have_sent_to_your_email
              }
            </Typography>

            <TextField
              className='tw-h-[52px] tw-w-[42px] tw-mt-[44px] tw-ml-[40px]  '
              required
              id='outlined-required'
              defaultValue=''
              variant='outlined'
              InputProps={{ className: 'tw-rounded-xl' }}
            />

            <TextField
              className='tw-h-[52px] tw-w-[42px] tw-mt-[44px] tw-text-sm tw-ml-[20px] '
              required
              id='outlined-required'
              defaultValue=''
              variant='outlined'
              InputProps={{ className: 'tw-rounded-xl' }}
            />
            <TextField
              className='tw-h-[52px] tw-w-[42px] tw-mt-[44px] tw-text-sm tw-ml-[20px] '
              required
              id='outlined-required'
              defaultValue=''
              variant='outlined'
              InputProps={{ className: 'tw-rounded-xl' }}
            />
            <TextField
              className='tw-h-[52px]  tw-w-[42px] tw-mt-[44px] tw-text-sm tw-ml-[20px]  '
              required
              id='outlined-required'
              defaultValue=''
              variant='outlined'
              InputProps={{ className: 'tw-rounded-xl' }}
            />

            <Typography className='tw-text-white tw-mt-5 tw-ml-[40px] text-center'>
              {dictionary?.recoveryCode.code}
            </Typography>
            <div>
              <Button className='tw-text-black tw-ml-[10px] tw-mt-7   '>
                {dictionary?.recoveryCode.resendcode}
              </Button>
            </div>
            <Button
              className='tw-w-[184px] tw-h-[45px] tw-mt-1 tw-rounded-3xl tw-bg-white  tw-items-center '
              onClick={handleNext}
            >
              {dictionary?.recoveryCode.nextCode}
            </Button>
            <Button
              className='tw-w-[184px] tw-h-[45px] tw-mt-1 tw-rounded-3xl tw-bg-white  tw-items-center '
              onClick={handleBack}
            >
              {dictionary?.recoveryCode.backCode}
            </Button>
          </Container>
        </div>
      )}
      {step === 3 && (
        <div className='tw-flex tw-h-screen tw-items-center tw-justify-center tw-bg-[url("/images/loginBackground.png")] tw-bg-no-repeat tw-bg-center tw-bg-cover'>
          {/* {dictionary && <Menu dictionary={dictionary} />} */}
          <Container className='tw-bg-primary tw-shadow-md tw-pt-16 tw-rounded-2xl tw-h-[513px] tw-w-[794px] flex tw-justify-center  tw-justify-items-center tw-text-center '>
            <div>
              <h1 className='tw-mt-[10px] tw-text-white tw-text-3xl'>
                {dictionary?.newPassword.createnewpassword}
              </h1>
            </div>
            <TextField
              className='tw-h-[52px] tw-w-[386px] tw-mt-10 tw-text-sm  '
              required
              id='outlined-required'
              label={dictionary?.newPassword.newpassword}
              defaultValue=''
              variant='outlined'
              InputProps={{ className: 'tw-rounded-3xl' }}
            />
            <Typography
              className='tw-text-white tw-mt-3 tw-mr-60'
              variant='body2'
              color='textSecondary'
            >
              {dictionary?.newPassword.newpassword}
            </Typography>
            <TextField
              className='tw-h-[52px] tw-w-[386px] tw-mt-14 tw-text-sm  '
              required
              id='outlined-password'
              label={dictionary?.newPassword.repeatpassword}
              type='password'
              defaultValue=''
              variant='outlined'
              InputProps={{ className: 'tw-rounded-3xl' }}
            />
            <Typography
              className='tw-text-white tw-mt-3 tw-mr-60'
              variant='body2'
              color='textSecondary'
            >
              {dictionary?.newPassword.repeatpassword}
            </Typography>
            <Button
              className='tw-w-[184px] tw-h-[45px] tw-rounded-3xl tw-bg-white tw-mt-[30px] tw-items-center '
              onClick={handleNext}
            >
              {dictionary?.newPassword.nextnewpassword}
            </Button>
          </Container>
        </div>
      )}
      {step === 4 && (
        <div className='tw-flex tw-h-screen tw-items-center tw-justify-center tw-bg-[url("/images/loginBackground.png")] tw-bg-no-repeat tw-bg-center tw-bg-cover'>
          {/* {dictionary && <Menu dictionary={dictionary} />} */}
          <Container className='tw-relative tw-bg-primary tw-pt-16 tw-shadow-md tw-rounded-2xl tw-h-[618px] tw-w-[794px] flex tw-justify-center  tw-justify-items-center tw-text-center '>
            <div>
              <h1 className='tw-mt-[10px] tw-text-white tw-text-3xl'>
                {dictionary?.passwordChangedSuccessfully}
              </h1>
            </div>

            <Box className='tw-w-full tw-flex tw-justify-center tw-justify-items-center '>
              <Image
                className='tw-mt-[105px]'
                src='/images/password_change_girl.png'
                alt='Logo'
                width={305}
                height={380}
              />
              <Button className=' tw-absolute tw-w-[184px] tw-h-[45px] tw-rounded-3xl tw-bg-white tw-mt-[400px] tw-items-center '>
                {dictionary?.newPassword.nextnewpassword}
              </Button>
            </Box>
          </Container>
        </div>
      )}
    </div>
  );
};

export default RecoverPassword;
