import React from 'react';
import Avatar from '@mui/material/Avatar';

const CustomAvatar = ({ name, image }: { image: string; name: string }) => {
  return (
    <Avatar
      className='tw-shadow-xl'
      alt={name}
      src={image}
      sx={{
        ml: -2,
        mt: 3,
        width: 140,
        height: 140,
        backgroundColor: '#679a88',
        p: 1,
      }}
    />
  );
};

export default CustomAvatar;
