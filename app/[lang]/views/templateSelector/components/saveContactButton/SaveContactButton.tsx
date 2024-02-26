import { Box, Button, IconButton, Typography } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

const SaveContactButton = ({ circular }: { circular: boolean }) => {
  return (
    <Box sx={{ position: 'relative' }}>
      {circular ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <IconButton sx={{ backgroundColor: '#fff', width: 40, height: 40 }}>
            <SaveOutlinedIcon
              style={{
                color: '#02AF9B',
                fontSize: '1.5rem',
                marginLeft: '0rem',
              }}
            />
          </IconButton>
          <Typography className='tw-capitalize' color={'#fff'}>
            guardar Contacto
          </Typography>
        </Box>
      ) : (
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
      )}
    </Box>
  );
};

export default SaveContactButton;
