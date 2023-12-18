import React from 'react';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 60,
  height: 30,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      // Cuando esta a la derecha
      transform: 'translateX(26px)', //movimiento
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
    width: 26,
    height: 26,
    marginTop: '0px',
    marginLeft: '2px',
  },
  '& .MuiSwitch-track': {
    // Cuando esta a la izquierda
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
    /* '&:after': {
            content: '"PRO"',
            color: "black",
            right: 30,
        }, */
  },
}));

const CustomSwitch = ({
  handleSwitch,
  name,
}: {
  handleSwitch: (e: any) => void;
  name: string;
}) => {
  return (
    <FormControlLabel
      value='bottom'
      control={
        <MaterialUISwitch color='primary' name={name} onChange={handleSwitch} />
      }
      label='off/on'
      labelPlacement='bottom'
      sx={{
        '& .MuiFormControlLabel-label': {
          fontSize: '13px', // Ajusta el tamaño del texto del label
          color: 'black', // Ajusta el color del texto del label
        },
      }}
    />
  );
};

export default CustomSwitch;
