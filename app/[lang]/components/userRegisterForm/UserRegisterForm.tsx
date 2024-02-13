import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import UserRegisterForm from './hooks/UserRegisterForm';
import MenuItem from '@mui/material/MenuItem';
import useDictionary from '@/hooks/dictionary/useDictionary';
import CustomModalAlert from '../customModalAlert/CustomModalAlert';

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
      <Container className='tw-bg-white tw-shadow-m  tw-rounded-2xl tw-h-[700px] tw-w-[794px] tw-flex tw-flex-col tw-justify-center tw-items-center '>
          <Box className='tw-w-[386px]' component='form'>
            <Typography
              className='tw-mb-2 tw-w-[184px] tw-h-[45px]  tw-mt-10 tw-w-full'
              variant='body2'
              color='textPrimary'
              display={'flow'}
            >
              {dictionary.dictionary?.backOffice.UserRegister}
            </Typography>
            <Typography
              className="tw-mb-2 tw-w-[184px] tw-h-[45px]"
              variant='body2'
              color='textSecondary'
              display={'flow'}
            >
              {dictionary.dictionary?.backOffice.dni}:{' '}
            </Typography>
            <TextField
              className='tw-h-[52px] tw-mt-1 tw-w-[386px]  tw-text-sm  '
              required
              type="number"
              id='outlined-required'
              defaultValue={dni}
              variant='outlined'
              InputProps={{ className: 'tw-rounded-3xl' }}
              onChange={(e) => setDni(e.target.value)}
            />

            <Typography
              className='tw-text-white  tw-mt-10 tw-w-full'
              variant='body2'
              color='textSecondary'
              display={'flow'}
            >
              {dictionary.dictionary?.backOffice.Nombre}:{' '}
            </Typography>
            <TextField
              className='tw-h-[52px] tw-mt-1 tw-w-[386px]  tw-text-sm  '
              required
              id='outlined-required'
              defaultValue={name}
              variant='outlined'
              InputProps={{ className: 'tw-rounded-3xl' }}
              onChange={(e) => setName(e.target.value)}
            />
            <Typography
              className='tw-text-white  tw-mt-10 tw-w-full'
              variant='body2'
              color='textSecondary'
              display={'flow'}
            >
              {dictionary.dictionary?.backOffice.Apellido}:{' '}
            </Typography>
            <TextField
              className='tw-h-[52px] tw-mt-1 tw-w-[386px]  tw-text-sm  '
              required
              id='outlined-required'
              defaultValue={lastName}
              variant='outlined'
              InputProps={{ className: 'tw-rounded-3xl' }}
              onChange={(e) => setLastName(e.target.value)}
            />

            <Typography
              className='tw-text-white  tw-mt-10 tw-w-full'
              variant='body2'
              color='textSecondary'
              display={'flow'}
            >
              {dictionary.dictionary?.backOffice.Email}:{' '}
            </Typography>
            {errorMailForm && (
              <span className='tw-text-red-500'>
                {dictionary.dictionary?.backOffice.ValidEmail}
              </span>
            )}
            <TextField
              className='tw-h-[52px] tw-mt-1 tw-w-[386px]  tw-text-sm  '
              required
              id='outlined-required'
              defaultValue={email}
              variant='outlined'
              InputProps={{ className: 'tw-rounded-3xl' }}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Typography
              className='tw-text-white  tw-mt-10 tw-w-full'
              variant='body2'
              color='textSecondary'
              display={'flow'}
            >
              {dictionary.dictionary?.backOffice.Plan}:{' '}
            </Typography>
            <Select
              className='tw-h-[52px] tw-mt-1 tw-w-[386px]  tw-text-sm  '
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
            {errorDataForm && (
              <span className='tw-text-red-500'>
                {dictionary.dictionary?.backOffice.FillAllFields}
              </span>
            )}

            <Button
              className='tw-text-white tw-mt-10 tw-mb-10 tw-w-[386px] '
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
