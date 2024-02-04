import React from 'react';
import { Box } from '@mui/material';
import { UrlDataFormValues } from '@/types/profile';
import LeftButtons from './leftButtons/LeftButtons';
import RightButtons from './rightButtons/RightButtons';
import CustomAvatar from '../avatar/CustomAvatar';

const FloatingButtons = ({
  socialNetworks,
  photo,
  name,
}: {
  socialNetworks: UrlDataFormValues[];
  photo: string;
  name: string;
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        zIndex: 99999,
      }}
    >
      <LeftButtons socialNetworks={socialNetworks} />
      <CustomAvatar image={photo} name={name} ml={-2} size={140} rounded />
      <RightButtons socialNetworks={socialNetworks} />
    </Box>
  );
};

export default FloatingButtons;
