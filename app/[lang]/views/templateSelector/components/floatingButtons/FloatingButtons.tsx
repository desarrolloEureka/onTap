import React from 'react';
import { Avatar, Box } from '@mui/material';
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
        justifyContent: 'center',
        height: '190px',
        width: '100%',
        alignItems: 'center'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          height: '80%',
          width: '100%',
          alignContent: 'center',
          justifyContent: 'center'
        }}
      >
        <Avatar
          alt={name}
          src={photo}
          variant={'rounded'}
          imgProps={{ loading: "lazy" }}
          sx={{
            width: '135px',
            height: '135px',
            borderRadius: '100%',
            border: '12px solid #679a88',
          }}
        />
      </Box>
    </Box>
  );
};

export default FloatingButtons;
