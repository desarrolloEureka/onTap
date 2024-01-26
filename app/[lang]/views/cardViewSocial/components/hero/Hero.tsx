import React from 'react';
import { Typography } from '@mui/material';
import Container from '@mui/material/Container';
import FloatingButtons from '../floatingButtons/FloatingButtons';
import { UrlDataFormValues } from '@/types/profile';

const Hero = ({
  socialNetworks,
  photo,
  name,
}: {
  socialNetworks: UrlDataFormValues[] | undefined;
  photo: string;
  name: string;
}) => {
  return (
    socialNetworks && (
      <Container className='tw-flex tw-flex-col tw-justify-center tw-content-center tw-items-center tw-w-[380px] tw-h-[300px]'>
        <div className='tw-rounded-bl-2xl tw-rounded-tr-2xl tw-bg-[#679a88] tw-z-10 tw-py-1 tw-px-3 tw-shadow-xl tw-mb-3'>
          <Typography className='tw-z-10' color={'white'}>
            {name}
          </Typography>
        </div>
        <FloatingButtons
          socialNetworks={socialNetworks}
          photo={photo}
          name={name}
        />
      </Container>
    )
  );
};

//tw-rounded-s-2xl

export default Hero;
