import { LoginProps } from '@/types/login';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import LoginHook from './hooks/LoginHook';

const Login = ({ dictionary }: LoginProps) => {
  // const { data } = GetLangQuery();
  // const lang = (data ? data.toString() : "es") as Locale;
  // const { dictionary } = useDictionary({ lang });
  const { loginHandle, setPassword, setEmail, errorForm } = LoginHook();

  return (
    <div className='tw-flex tw-h-screen tw-items-center tw-justify-center tw-bg-[url("/images/loginBackground.png")] tw-bg-no-repeat tw-bg-center tw-bg-cover'>
      <Container className='tw-bg-primary tw-shadow-m  tw-rounded-2xl tw-h-[618px] tw-w-[794px] tw-flex tw-flex-col tw-justify-center tw-items-center '>
        <Box className='tw-w-full tw-flex tw-justify-center tw-justify-items-center '>
          <Image
            className='tw-mt-14'
            src='/images/logo_onetap_white.png'
            alt='Logo'
            width={190}
            height={160}
            priority
          />
        </Box>
        <Box className='tw-w-[386px]'>
          <TextField
            className='tw-h-[52px] tw-w-[386px] tw-mt-14 tw-text-sm  '
            required
            id='outlined-required'
            label={dictionary.loginView.username}
            defaultValue=''
            variant='outlined'
            InputProps={{ className: 'tw-rounded-3xl' }}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Typography
            className='tw-text-white tw-mt-3 tw-mr-80 tw-w-full'
            variant='body2'
            color='textSecondary'
            display={'flow'}
          >
            {dictionary.loginView.username}{' '}
            {errorForm?.errorType === 1 && (
              <span className='tw-text-red-500 tw-underline'>
                {errorForm.errorMessage}
              </span>
            )}
          </Typography>

          <TextField
            className='tw-h-[52px] tw-w-[386px] tw-mt-14 tw-text-sm  '
            required
            id='outlined-password'
            label={dictionary.loginView.password}
            type='password'
            defaultValue=''
            variant='outlined'
            InputProps={{ className: 'tw-rounded-3xl' }}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Typography
            className='tw-text-white tw-mt-3 tw-mr-72 tw-w-full'
            variant='body2'
            color='textSecondary'
            display={'flow'}
          >
            {dictionary.loginView.password}{' '}
            {errorForm?.errorType === 2 && (
              <span className='tw-text-red-500 tw-underline'>
                {errorForm.errorMessage}
              </span>
            )}
          </Typography>

          <Button className='tw-text-white' onClick={loginHandle}>
            {dictionary.loginView.login}
          </Button>
          <Button className='tw-text-white'>
            <Link href='/views/recoverPassword'>
              {dictionary.loginView.recoverPassLogin}
            </Link>
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default Login;
