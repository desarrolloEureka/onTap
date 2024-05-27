import React from 'react';
import { Box } from '@mui/material';
import { UrlDataFormValues } from '@/types/profile';
import LeftButtons from './leftButtons/LeftButtons';
import RightButtons from './rightButtons/RightButtons';
import CustomAvatar from '../avatar/CustomAvatar';
import useMediaQuery from '@mui/material/useMediaQuery';

const FloatingButtons = ({
  socialNetworks,
  photo,
  name,
}: {
  socialNetworks: UrlDataFormValues[];
  photo: string;
  name: string;
}) => {

  const isSmallScreen = useMediaQuery('(max-height:668px)');

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        //zIndex: 99999,
      }}
    >
      <LeftButtons socialNetworks={socialNetworks} />
      <CustomAvatar image={photo} name={name} ml={0} size={isSmallScreen ? 110 : 140} rounded />
      <RightButtons socialNetworks={socialNetworks} />
    </Box>
  );
};

export default FloatingButtons;
