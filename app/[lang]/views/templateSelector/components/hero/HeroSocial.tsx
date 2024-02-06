import React from 'react';
import { Typography } from '@mui/material';
import Container from '@mui/material/Container';
import FloatingButtons from '../floatingButtons/FloatingButtons';
import { UrlDataFormValues } from '@/types/profile';

const HeroSocial = ({
  socialNetworks,
  photo,
  name,
  profession,
}: {
  socialNetworks: UrlDataFormValues[] | undefined;
  photo: string;
  name: string;
  profession: string | undefined;
}) => {
  return (
    socialNetworks && (
      <Container className='tw-flex tw-flex-col tw-justify-center tw-content-center tw-items-center tw-w-[380px] tw-h-[300px]'>
        <div className='tw-rounded-bl-2xl tw-rounded-tr-2xl tw-bg-[#679a88] tw-z-10 tw-mt-2 tw-px-3 tw-drop-shadow-xl tw-mb-1'>
          <Typography className='tw-z-10' color={'white'}>
            {name}
          </Typography>
        </div>
        <FloatingButtons
          socialNetworks={socialNetworks}
          photo={photo}
          name={name}
        />
        <Typography className='tw-z-10 tw-mt-2 tw-pt-4 tw-text-black'>
          {profession}
        </Typography>
      </Container>
    )
  );
};

export default HeroSocial;
