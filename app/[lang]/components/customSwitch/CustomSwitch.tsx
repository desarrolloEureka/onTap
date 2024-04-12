import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import {
  GetUser,
  SendSwitchActivateCard,
  SendSwitchProfile,
} from '@/reactQuery/users';
import useMediaQuery from '@mui/material/useMediaQuery';
import LogOut from '@/hooks/logOut/LogOut';

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
        backgroundColor: '#02AF9B',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '@media screen and (min-width: 601px)': {
      '&.Mui-checked': {
        transform: 'translateX(28px)' /* Desplazamiento  */,
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
    width: 25,
    height: 25,
    marginTop: '0.3px',
    marginLeft: '3px',
    transition: 'width 300ms, height 300ms', // Transición para el cambio de tamaño
  },
  '& .Mui-checked .MuiSwitch-thumb': {
    backgroundColor: '#fff', // Circulo blanco cuando está a la derecha
  },
  '& .MuiSwitch-track': {
    borderRadius: 50 / 2,
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
      color: '#8a2be2',
    },
  },
}));

const CustomSwitch = ({
  profile,
  handleModalAlert,
}: {
  profile: boolean;
  handleModalAlert?: () => void;
}) => {
  const [flag, setFlag] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const { data } = GetUser(flag, setFlag);
  const { logOut } = LogOut();
  const [isUpdate, setIsUpdate] = React.useState(false);
  const switchRef = React.useRef<any>(null);
  const [switchCard, setSwitchCard] = useState(false);

  const userId = data?.uid;
  const plan = data?.plan;

  const handleSwitchChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { checked } = event.target;

    if (profile && plan === 'standard') {
      handleModalAlert && handleModalAlert();
      switchRef.current.checked = false;
      setIsUpdate(!isUpdate);
    } else {
      if (userId && switchRef) {
        switchRef.current.checked = checked;
        setIsUpdate(!isUpdate);
        if (profile) {
          await SendSwitchProfile(userId, checked);
        } else {
          setSwitchCard(checked);
          await setFlag(true);
          if (data?.isActiveByAdmin === true) {
            SendSwitchActivateCard(userId, checked);
          } else {
            SendSwitchActivateCard(userId, false);
            logOut();
          }
          setFlag(false);
        }
      }
    }
  };

  useEffect(() => {
    if (switchRef)
      switchRef.current.checked = profile
        ? plan === 'standard'
          ? false
          : data?.switch_profile
        : data?.switch_activateCard;
  }, [data, isUpdate, plan, profile, switchRef]);

  // Determina los estilos basados en el perfil
  const thumbBackgroundColor = profile ? '#fff' : null;
  const trackBackgroundColor = profile ? '#02AF9B' : '#ABA9A6';

  return (
    <MaterialUISwitch
      inputRef={switchRef}
      checked={switchRef?.current?.checked ? true : false}
      onChange={handleSwitchChange}
      //disabled={!profile && data?.isActiveByAdmin === false ? true : false}
      sx={{
        width: isSmallScreen ? 55 : 66,
        height: isSmallScreen ? 29 : 33,
        '& .MuiSwitch-thumb': {
          width: isSmallScreen ? 25 : 29,
          height: isSmallScreen ? 25 : 29,
          backgroundColor: thumbBackgroundColor,
        },
        '& .MuiSwitch-track': {
          backgroundColor: trackBackgroundColor,
        },
      }}
    />
  );
};

export default CustomSwitch;
