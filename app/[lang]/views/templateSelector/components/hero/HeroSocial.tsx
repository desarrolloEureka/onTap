import React from 'react';
import { Typography } from '@mui/material';
import Container from '@mui/material/Container';
import FloatingButtons from '../floatingButtons/FloatingButtons';
import { UrlDataFormValues } from '@/types/profile';
import useMediaQuery from '@mui/material/useMediaQuery';

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

  const isSmallScreen = useMediaQuery('(max-height:668px)');
  const isSmallScreenTwo = useMediaQuery('(max-height:896px)');

  return (
    socialNetworks && (
      <Container className={`tw-flex tw-flex-col tw-justify-center tw-items-center tw-w-[380px] ${isSmallScreen ? 'tw-h-[280px]' : 'tw-h-[360px]'}  tw-z-10`}>
        <div className='tw-rounded-bl-2xl tw-rounded-tr-2xl tw-shadow-[0_0px_10px_10px_rgba(0,0,0,0.1)] tw-bg-[#679a88] tw-z-10 tw-mt-2 tw-px-3  tw-mb-1'>
          <Typography className='tw-z-10 tw-text-xl' color={'white'}>
            {name}
          </Typography>
        </div>
        <FloatingButtons
          socialNetworks={socialNetworks}
          photo={photo}
          name={name}
        />
        <div className='tw-rounded-bl-2xl tw-rounded-tr-2xl tw-shadow-[0_0px_10px_10px_rgba(0,0,0,0.1)] tw-bg-[#679a88] tw-z-10 tw-mt-2 tw-px-3 tw-mb-1'>
          <Typography className='tw-z-10 tw-text-xl' color={'white'}>
            {profession}
          </Typography>
        </div>
      </Container>
    )
  );
};

export default HeroSocial;
