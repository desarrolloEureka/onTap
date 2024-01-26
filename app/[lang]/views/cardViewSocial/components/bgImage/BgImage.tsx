import React from 'react';
import Image from 'next/image';
import { BackgroundImages } from '@/types/home';

const BgImage = ({ background }: { background: BackgroundImages }) => {
  return (
    background && (
      <Image
        className='tw-rounded-2xl tw-absolute tw-z-0'
        src={background.image}
        alt='Card'
        width={380}
        height={700}
        style={{ display: 'block', position: 'relative', zIndex: 0 }}
      />
    )
  );
};

export default BgImage;
