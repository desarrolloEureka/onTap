import {
  GetUser,
  SendSwitchActivateCard,
  SendSwitchProfile,
} from '@/reactQuery/users';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import React, { useEffect, useRef, useState } from 'react';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 92,
  height: 37,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(20px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: '#62ae9b',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '@media screen and (min-width: 601px)': {
      // Pantallas grandes
      '&.Mui-checked': {
        transform: 'translateX(48px)',
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 34,
    height: 34,
    marginTop: '-1px',
    marginLeft: '3px',
    transition: 'width 300ms, height 300ms', // Añadido para animar el cambio de tamaño
  },
  '& .MuiSwitch-track': {
    borderRadius: 50 / 2,
    backgroundColor: '#62ae9b',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
    '&:before, &:after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
    },
  },
}));

const CustomSwitch = ({ profile }: { profile: boolean }) => {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const { data, error } = GetUser();

  const [isUpdate, setIsUpdate] = useState(false);
  const switchRef = useRef<any>(null);

  const handleSwitchChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { checked } = event.target;
    const userId = data?.uid;
    if (userId && switchRef) {
      switchRef.current.checked = checked;
      setIsUpdate(!isUpdate);
      if (profile) {
        await SendSwitchProfile(userId, checked);
      } else {
        await SendSwitchActivateCard(userId, checked);
      }
    }
  };

  useEffect(() => {
    if (switchRef)
      switchRef.current.checked = profile
        ? data?.switch_profile
        : data?.switch_activateCard;
  }, [data, isUpdate, profile, switchRef]);

  return (
    <MaterialUISwitch
      inputRef={switchRef}
      checked={switchRef?.current?.checked ? true : false}
      onChange={handleSwitchChange}
      sx={{
        width: isSmallScreen ? 60 : 92,
        height: isSmallScreen ? 30 : 37,
        '& .MuiSwitch-thumb': {
          width: isSmallScreen ? 28 : 34,
          height: isSmallScreen ? 28 : 34,
        },
      }}
    />
  );
};

export default CustomSwitch;
