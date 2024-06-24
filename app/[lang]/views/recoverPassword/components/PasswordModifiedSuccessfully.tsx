'use client';
import useDictionary from '@/hooks/dictionary/useDictionary';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Locale } from 'i18n-config';
import React from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';
import { useRouter } from 'next/navigation';

const PasswordModifiedSuccessfully = ({
  params: { lang },
  handleNext,
  handleBack,
}: {
  params: { lang: Locale };
  handleNext: () => void;
  handleBack: () => void;
}) => {
  const router = useRouter();
  const { dictionary } = useDictionary({ lang });

  return (
    <div className='tw-flex tw-h-screen tw-items-center tw-justify-center tw-bg-[url("/images/loginBackground.png")] tw-bg-no-repeat tw-bg-center tw-bg-cover'>
      <Container className='tw-relative tw-bg-[#02AF9B] tw-pt-16 tw-shadow-md tw-rounded-2xl tw-h-[518px] tw-w-[694px] flex tw-justify-center  tw-justify-items-center tw-text-center tw-mt-[103px]'>
        <div>
          <h1 className='tw-mt-[2px] tw-text-white ' style={{ fontSize: 24 }}>
            {dictionary?.passwordChangedSuccessfully}
          </h1>
        </div>

        <Box className='tw-w-full tw-flex tw-justify-center tw-justify-items-center '>
          <Image
            className='tw-mt-[10px]'
            src='/images/password_change_girl.png'
            alt='Logo'
            width={300}
            height={365}
          />
          <Button
            className=' tw-absolute tw-w-[184px] tw-h-[45px] tw-rounded-3xl tw-bg-white tw-mt-[300px] tw-items-center'
            onClick={() => router.replace('/views/login')}
          >
            {dictionary?.newPassword.nextNewPassword}
          </Button>
        </Box>
      </Container>
    </div>
  );
};
export default PasswordModifiedSuccessfully;
