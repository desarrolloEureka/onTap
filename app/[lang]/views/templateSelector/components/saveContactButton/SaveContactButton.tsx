import { Button, Typography } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

const SaveContactButton = () => {
  return (
    <Button
      sx={{ textTransform: 'none' }}
      className='tw-drop-shadow-xl tw-rounded-2xl tw-bg-white'
      variant='contained'
      startIcon={
        <SaveOutlinedIcon
          style={{
            color: '#02AF9B',
            fontSize: '1.5rem',
            marginLeft: '0rem',
          }}
        />
      }
    >
      <Typography className='tw-capitalize' color={'#679a88'}>
        guardar Contacto
      </Typography>
    </Button>
  );
};

export default SaveContactButton;
