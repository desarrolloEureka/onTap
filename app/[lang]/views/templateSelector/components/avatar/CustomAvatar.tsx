import React from 'react';
import Avatar from '@mui/material/Avatar';
import { Box } from '@mui/material';

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
    <Box
      className='tw-shadow-xl'
      sx={{
        borderRadius: rounded ? '100%' : square ? '20%' : '10px',
        ml: ml,
        mt: 5,
        padding: 1,
        backgroundColor: '#679a88',
        height: size,
        width: size,
      }}
    >
      <Avatar
        alt={name}
        src={image}
        variant={rounded ? 'rounded' : 'square'}
        sx={{
          width: size,
          height: size,
          borderRadius: rounded ? '100%' : '12%',
        }}
      />
    </Box>
  );
};

export default CustomAvatar;
