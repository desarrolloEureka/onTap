import React from 'react';
import Image from 'next/image';
import { BackgroundImages } from '@/types/home';
import useMediaQuery from '@mui/material/useMediaQuery';

const BgImage = ({ background }: { background: BackgroundImages }) => {

  const isSmallScreen = useMediaQuery('(max-height:668px)');
  const isSmallScreenTwo = useMediaQuery('(max-height:896px)');
  const isSmallScreenthree = useMediaQuery('(max-height:933px)');

  return (
    background && (
      <Image
        className='tw-rounded-2xl tw-absolute tw-z-0'
        src={background.image}
        alt='Card'
        width={380}
        height={isSmallScreen ? 670 : isSmallScreenTwo ? 890 : isSmallScreenthree ? 930 : 800}
        style={{ display: 'block', position: 'relative', zIndex: 0 }}
      />
    )
  );
};

export default BgImage;
