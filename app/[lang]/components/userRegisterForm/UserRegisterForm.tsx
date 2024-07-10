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
import ReactCountryFlag from 'react-country-flag';
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'
import { countries } from '../../globals/constants'

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
    phone,
    setPhone,
    phoneCode,
    setPhoneCode,
    phoneChangeHandler
  } = UserRegisterForm();

  const dictionary = useDictionary({ lang: 'es' });

  return (
    <div className='tw-flex tw-h-screen tw-items-start tw-justify-center tw-bg-[url("/images/loginBackground.png")] tw-bg-no-repeat tw-bg-center tw-bg-cover'>
      <Container className='tw-bg-[#02AF9B] tw-shadow-m tw-rounded-2xl tw-h-[675px] tw-w-[600px] tw-flex tw-flex-col tw-justify-center tw-items-center tw-mt-20'>
        <Typography
          className='tw-text-white  tw-mt-5 tw-w-full c tw-mb-4'
          variant='h4'
          color='textPrimary'
          display={'flow'}
          align='center'
          fontWeight='bold'
        >
          {dictionary.dictionary?.backOffice.UserRegister}
        </Typography>
        <Box className='tw-w-[400px] tw-bg-white tw-shadow-m tw-rounded-2xl tw-p-4 tw-mt-1 tw-flex tw-flex-col tw-justify-center tw-items-center ' component='form'>
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
            id='outlined-required'
            value={dni}
            className='tw-mb-4 tw-w-[300px] tw-text-sm tw-mt-4'
            onChange={(e) => setDni(e.target.value)}
          />
          <TextField
            required
            id='outlined-required'
            value={name}
            variant='standard'
            label={dictionary.dictionary?.backOffice.Nombre}
            className='tw-mb-4 tw-w-[300px] tw-text-sm'
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
            value={lastName}
            className='tw-mb-4 tw-w-[300px] tw-text-sm'
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
          <TextField
            required
            id='outlined-required'
            value={email}
            variant='standard'
            className='tw-mb-4 tw-w-[300px] tw-text-sm'
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
          {errorMailForm && (
            <span className='tw-text-red-500'>
              {dictionary.dictionary?.backOffice.ValidEmail}
            </span>
          )}

          <div className='tw-w-[300px] tw-flex tw-items-start tw-justify-center tw-mb-4'>
            <div className='tw-w-[40%] tw-items-start'>
              <Select
                variant='outlined'
                className='tw-w-[100%] tw-text-center'
                value={phoneCode}
                style={{ height: '48px' }}
                required
                id='outlined-required'
                defaultValue=''
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 150,
                    },
                  },
                }}
                onChange={(e) => setPhoneCode(e.target.value)}
              >
                {countries.map((country) => (
                  <MenuItem key={country.id} value={country.id}>
                    <ReactCountryFlag countryCode={country.flag} svg style={{ marginRight: '8px' }} />
                    {country.code}
                    {/*  {country.name} ({country.code}) */}
                  </MenuItem>
                ))}
                {/*  {countries.map((country) => (
                  <MenuItem key={country.code} value={country.code}>
                    <ReactCountryFlag countryCode={country.flag} svg style={{ marginRight: '8px' }} />
                    {country.code}
                  </MenuItem>
                ))} */}
              </Select>
            </div>
            <div className='tw-h-[100%] tw-w-[60%] tw-items-start tw-ml-2'>
              <TextField
                id="standard-number"
                value={phone}
                variant='standard'
                className='tw-w-full'
                InputLabelProps={{
                  shrink: true
                }}
                inputProps={{
                  inputMode: 'numeric',
                  maxLength: 10,
                }}
                label={dictionary.dictionary?.backOffice.Phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          {/*   <div className='tw-w-[300px]'>
            <Typography
              color='textSecondary'
              display={'flow'}
              className='tw-text-left tw-text-sm tw-mb-2'
            >
              {dictionary.dictionary?.backOffice.Phone}*
            </Typography>
          </div>

          <div className='tw-w-[300px] tw-flex tw-items-start tw-justify-center tw-mb-4'>
            <PhoneInput
              autoFormat={false}
              country={"co"}
              specialLabel=""
              placeholder=""
              prefix="+"
              dropdownStyle={{
                color: "black",
                borderRadius: 12,
              }}
              inputStyle={{
                height: "56px",
                //borderRadius: 0,
                //border: "none",
                //borderBottom: "0.4px solid grey"
              }}
              //value={data.phone2}
              onChange={phoneChangeHandler}
            />
          </div> */}

          <div className='tw-w-[300px]'>
            <Typography
              color='textSecondary'
              display={'flow'}
              className='tw-text-left tw-text-sm tw-mb-2'
            >
              {dictionary.dictionary?.backOffice.Plan}*
            </Typography>
          </div>
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
              className='tw-w-[300px] tw-text-center tw-mb-4'
              required
              id='outlined-required'
              value={plan}
              variant='outlined'
              onChange={(e) => setPlan(e.target.value)}
            >
              <MenuItem value='standard'>{dictionary.dictionary?.backOffice.StandardPlan}</MenuItem>
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
