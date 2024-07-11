import React from 'react';
import Avatar from '@mui/material/Avatar';
import { Box } from '@mui/material';
import Image from 'next/image';

const CustomAvatar = ({
  name,
  image,
  ml,
  size,
  rounded,
  square,
}: {
  image: string;
  name: string;
  ml: number;
  size: number;
  rounded?: boolean;
  square?: boolean;
}) => {
  return (
    <Box sx={{ borderRadius: '20%', height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Image
        className='tw-rounded-2xl tw-absolute tw-z-0'
        src={image}
        alt='Card'
        width={size}
        height={size + 19}
        style={{ display: 'block', position: 'relative', zIndex: 0, border: '8px solid #679a88', objectFit: 'cover' }}
      />

    </Box>
  );
};

export default CustomAvatar;
