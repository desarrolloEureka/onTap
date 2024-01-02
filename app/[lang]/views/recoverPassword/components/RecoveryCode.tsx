'use client';
import useDictionary from '@/hooks/dictionary/useDictionary';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Locale } from 'i18n-config';
import React, { useState } from 'react';

const RecoveryCode = ({
  params: { lang },
  handleNext,
  handleBack,
}: {
  params: { lang: Locale };
  handleNext: () => void;
  handleBack: () => void;
}) => {
  const { dictionary } = useDictionary({ lang });

  return (
    <div className='tw-flex tw-h-screen tw-items-center tw-justify-center tw-bg-[url("/images/loginBackground.png")] tw-bg-no-repeat tw-bg-center tw-bg-cover'>
      <Container className='tw-bg-primary tw-shadow-md tw-pt-16 tw-rounded-2xl tw-h-[475px] tw-w-[794px] flex tw-justify-center  tw-justify-items-center tw-text-center tw-mt-[50px]'>
        <Typography className='tw-text-white  tw-ml-[20px] tw-text-2xl text-center'>
          {dictionary?.recoveryCode.titleCode}
        </Typography>

        <Typography
          className='text-black tw-pt-10 h-[38px] w-[250px] text-center '
          variant='body2'
          color='textSecondary'
        >
          {dictionary?.recoveryCode.descriptionCode}
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
            {dictionary?.recoveryCode.resendCode}
          </Button>
        </div>
        <div>
          <Button
            className='tw-w-[184px] tw-h-[45px] tw-mt-1 tw-rounded-3xl tw-bg-white  tw-items-center tw-mx-12'
            onClick={handleNext}
          >
            {dictionary?.recoveryCode.nextCode}
          </Button>
          <Button
            className='tw-w-[184px] tw-h-[45px] tw-mt-1 tw-rounded-3xl tw-bg-white  tw-items-center tw-mx-10 '
            onClick={handleBack}
          >
            {dictionary?.recoveryCode.backCode}
          </Button>
        </div>
      </Container>
    </div>
  );
};
export default RecoveryCode;
