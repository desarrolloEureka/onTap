import React from 'react';
import Avatar from '@mui/material/Avatar';
import { Box } from '@mui/material';

const CustomAvatar = ({ name, image }: { image: string; name: string }) => {
  return (
    <Box
      className='tw-shadow-xl'
      sx={{
        borderRadius: '100%',
        ml: -2,
        mt: 3,
        padding: 1,
        backgroundColor: '#679a88',
        height: 140,
        width: 140,
      }}
    >
      <Avatar
        alt={name}
        src={image}
        sx={{
          width: 140,
          height: 140,
        }}
      />
    </Box>
  );
};

export default CustomAvatar;
