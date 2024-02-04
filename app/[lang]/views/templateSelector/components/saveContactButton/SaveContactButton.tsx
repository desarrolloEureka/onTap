import { Button, Typography } from '@mui/material';

const SaveContactButton = () => {
  return (
    <Button
      sx={{ textTransform: 'none' }}
      className='tw-drop-shadow-xl tw-rounded-2xl tw-bg-white'
      variant='contained'
    >
      <Typography className='tw-capitalize' color={'#679a88'}>
        guardar Contacto
      </Typography>
    </Button>
  );
};

export default SaveContactButton;
