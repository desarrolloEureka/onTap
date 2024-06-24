import { useState } from 'react';
import { LoginProps } from '@/types/login';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import LoginHook from './hooks/LoginHook';

import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Login = ({ dictionary }: LoginProps) => {
  // const { data } = GetLangQuery();
  // const lang = (data ? data.toString() : "es") as Locale;
  // const { dictionary } = useDictionary({ lang });

  const {
    loginHandle,
    setPassword,
    setEmail,
    errorForm,
    isLoading,
    isRefetching,
    email,
    password,
  } = LoginHook(dictionary);

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='tw-flex tw-h-screen tw-items-center tw-justify-center tw-bg-[url("/images/loginBackground.png")] tw-bg-no-repeat tw-bg-center tw-bg-cover'>
      <Container className='tw-bg-[#02AF9B] tw-shadow-m  tw-rounded-2xl tw-h-[618px] tw-w-[794px] tw-flex tw-flex-col tw-justify-center tw-items-center '>
        {isLoading || isRefetching ? (
          <CircularProgress />
        ) : (
          <>
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
              <Typography
                className='tw-text-white  tw-mt-10 tw-w-full'
                variant='body2'
                color='textSecondary'
                display={'flow'}
              >
                {dictionary.loginView.username}{' '}
              </Typography>
              <TextField
                className='tw-h-[52px] tw-mt-1 tw-w-[386px]  tw-text-sm'
                required
                id='outlined-required'
                // label={dictionary.loginView.username}
                defaultValue={email}
                variant='outlined'
                InputProps={{
                  className: 'tw-rounded-3xl',

                  sx: {
                    backgroundColor: '#E8F0FE',
                    '&.Mui-focused': {
                      backgroundColor: '#E8F0FE',
                    },
                    color: 'black',
                  },
                }}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errorForm?.errorType === 1 && (
                <span className='tw-text-red-500'>
                  {errorForm.errorMessage} *
                </span>
              )}
              <Typography
                className='tw-text-white tw-mt-3  tw-w-full'
                variant='body2'
                color='textSecondary'
                display={'flow'}
              >
                {dictionary.loginView.password}{' '}
              </Typography>
              <TextField
                className='tw-h-[52px] tw-w-[386px] tw-mt-1 tw-text-sm'
                required
                id='outlined-password'
                type={showPassword ? 'text' : 'password'}
                defaultValue={password}
                variant='outlined'
                InputProps={{
                  className: 'tw-rounded-3xl',
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge='end'
                      >
                        {showPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                  sx: {
                    backgroundColor: '#E8F0FE',
                    '&.Mui-focused': {
                      backgroundColor: '#E8F0FE',
                    },
                    color: 'black',
                  },
                }}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button className='tw-text-white tw-ml-[180px] '>
                <Link
                  href='/views/recoverPassword'
                  className='tw-normal-case tw-no-underline tw-text-white tw-pl-10'
                >
                  {dictionary.loginView.recoverPassLogin}
                </Link>
              </Button>
              {errorForm?.errorType === 2 && (
                <span className='tw-text-red-500 tw-underline'>
                  {errorForm.errorMessage}
                </span>
              )}

              <Typography
                className='tw-text-white tw-mt-3 tw-mr-72 tw-w-full'
                variant='body2'
                color='textSecondary'
                display={'flow'}
              >
                {errorForm?.errorType === 3 && (
                  <span className='tw-text-red-500 tw-underline'>
                    {errorForm.errorMessage}
                  </span>
                )}
              </Typography>

              <Button className='tw-text-white tw-ml-36' onClick={loginHandle}>
                {dictionary.loginView.login}
              </Button>
            </Box>
          </>
        )}
      </Container>
    </div>
  );
};

export default Login;
