import { Box, Button, IconButton, Typography } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import useMediaQuery from '@mui/material/useMediaQuery';

const SaveContactButtonColor = (
  { circular, colorButton }: { circular?: boolean, colorButton?: string }) => {

  const isSmallScreen = useMediaQuery('(max-height:668px)');

  return (
    <Box sx={{ position: 'relative' }} className={`tw-shadow-[0_0px_10px_10px_rgba(0,0,0,0.1)] tw-rounded-3xl ${isSmallScreen ? 'tw-mt-3' : undefined}`}>
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
                color: colorButton || undefined,
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
                color: colorButton || undefined,
                fontSize: '1.5rem',
                marginLeft: '0rem',
              }}
            />
          }
        >
          <Typography className='tw-capitalize' color={colorButton}>
            guardar Contacto
          </Typography>
        </Button>
      )}
    </Box>
  );
};

export default SaveContactButtonColor;
