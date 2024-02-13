import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Select,
  InputAdornment,
} from '@mui/material';
import UserRegisterForm from './hooks/UserRegisterForm';
import MenuItem from '@mui/material/MenuItem';
import useDictionary from '@/hooks/dictionary/useDictionary';
import CustomModalAlert from '../customModalAlert/CustomModalAlert';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import BadgeIcon from '@mui/icons-material/Badge';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

const UserRegister = () => {
  const {
    dni,
    email,
    name,
    lastName,
    plan,
    setDni,
    setEmail,
    setName,
    setLastName,
    setPlan,
    dataRegisterHandle,
    errorMailForm,
    errorDataForm,
    open,
    handleClickOpen,
    handleClose,
    status,
  } = UserRegisterForm();

  const dictionary = useDictionary({ lang: 'es' });

  return (
    <div className='tw-flex tw-h-screen tw-items-center tw-justify-center tw-bg-[url("/images/loginBackground.png")] tw-bg-no-repeat tw-bg-center tw-bg-cover'>
      <Container className='tw-bg-[#02AF9B] tw-shadow-m  tw-rounded-2xl tw-h-[550px] tw-w-[600px] tw-flex tw-flex-col tw-justify-center tw-items-center '>
        <Typography
          className='tw-text-white  tw-mt-9 tw-w-full tw-mb-6'
          variant='h4'
          color='textPrimary'
          display={'flow'}
          align='center'
          fontWeight='bold'
        >
          {dictionary.dictionary?.backOffice.UserRegister}
        </Typography>
        <Box className='tw-w-[400px] tw-bg-white tw-shadow-m tw-rounded-2xl tw-p-4 tw-mt-4 tw-flex tw-flex-col tw-justify-center tw-items-center ' component='form'>
          <TextField
            variant='standard'
            label={dictionary.dictionary?.backOffice.dni}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <BadgeIcon
                    style={{
                      color: '#02AF9B',
                      fontSize: '1.8rem',
                      marginRight: '1rem',
                    }}
                  />
                </InputAdornment>
              ),
            }}
            required
            type="number"
            id='outlined-required'
            defaultValue={dni}
            onChange={(e) => setDni(e.target.value)}
          />
          <TextField
            required
            id='outlined-required'
            defaultValue={name}
            variant='standard'
            label={dictionary.dictionary?.backOffice.Nombre}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <PersonOutlinedIcon
                    style={{
                      color: '#02AF9B',
                      fontSize: '1.8rem',
                      marginRight: '1rem',
                    }}
                  />
                </InputAdornment>
              ),
            }}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            required
            id='outlined-required'
            defaultValue={lastName}
            variant='standard'
            label={dictionary.dictionary?.backOffice.Apellido}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <PersonOutlinedIcon
                    style={{
                      color: '#02AF9B',
                      fontSize: '1.8rem',
                      marginRight: '1rem',
                    }}
                  />
                </InputAdornment>
              ),
            }}
            onChange={(e) => setLastName(e.target.value)}
          />
          {errorMailForm && (
            <span className='tw-text-red-500'>
              {dictionary.dictionary?.backOffice.ValidEmail}
            </span>
          )}
          <TextField
            required
            id='outlined-required'
            defaultValue={email}
            variant='standard'
            label={dictionary.dictionary?.backOffice.Email}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <AlternateEmailIcon
                    style={{
                      color: '#02AF9B',
                      fontSize: '1.8rem',
                      marginRight: '1rem',
                    }}
                  />
                </InputAdornment>
              ),
            }}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Typography
            color='textSecondary'
            display={'flow'}
          >
            {dictionary.dictionary?.backOffice.Plan}:{' '}
          </Typography>
          <div className='tw-relative'>
            <PersonOutlinedIcon
              style={{
                color: '#02AF9B',
                fontSize: '1.8rem',
                marginTop: '1rem',
                marginLeft: '1rem',
                position: 'absolute',
              }}
            />
            <Select
              className='tw-w-[250px] tw-text-center'
              required
              id='outlined-required'
              defaultValue={plan}
              type='email'
              variant='outlined'
              onChange={(e) => setPlan(e.target.value)}
            >
              <MenuItem value='standar'>{dictionary.dictionary?.backOffice.StandardPlan}</MenuItem>
              <MenuItem value='premium'>{dictionary.dictionary?.backOffice.PremiumPlan}</MenuItem>
            </Select>
          </div>
          {errorDataForm && (
            <span className='tw-text-red-500'>
              {dictionary.dictionary?.backOffice.FillAllFields}
            </span>
          )}

          <Button
            variant='contained'
            //centrar boton
            className='tw-mx-auto tw-mt-4 tw-w-[200px] tw-bg-[#02AF9B] tw-text-white tw-shadow-m'
            onClick={dataRegisterHandle}
          >
            {dictionary.dictionary?.backOffice.Register}
          </Button>
          <CustomModalAlert
            isModalAlert={open}
            handleModalAlert={handleClose}
            title={'Registro de usuario'}
            description={status}
            isClosed={true}
          />
        </Box>
      </Container>
    </div>
  );
};

export default UserRegister;
