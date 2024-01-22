import useDictionary from '@/hooks/dictionary/useDictionary';
import { Button, Container, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Locale } from 'i18n-config';
import ChangePasswordHook from '../hooks/ChangePasswordHook';

const ChangePassword = ({ params: { lang }, }: { params: { lang: Locale }; }) => {

    const { dictionary } = useDictionary({ lang });
    const [showPasswordOne, setShowPasswordOne] = useState(false);
    const [showPasswordTwo, setShowPasswordTwo] = useState(false);
    const { handleChangePassword, setPassword, setPasswordConfirm, errorForm, stateUpdate, handleBack } = ChangePasswordHook();

    return (
        <div className='tw-flex tw-h-screen tw-items-center tw-justify-center tw-bg-[url("/images/loginBackground.png")] tw-bg-no-repeat tw-bg-center tw-bg-cover'>
            <div className={`tw-flex tw-items-center tw-justify-center lg:tw-h-[560px] md:tw-w-[100%]`}>
                <Container className='tw-bg-[#02AF9B] tw-shadow-md tw-pt-12 tw-rounded-2xl tw-h-[465px] tw-w-[754px] tw-flex tw-flex-col tw-items-center tw-justify-center'>

                    <div className='tw-h-[10%] tw-w-[100%]'>
                        <h1 className=' tw-text-white tw-text-[18px]'>
                            Cambiar contraseña
                        </h1>
                    </div>

                    <div className='tw-h-[30%] tw-w-[100%] tw-flex tw-items-center tw-justify-center'>
                        <div>
                            <TextField
                                className='tw-h-[52px] tw-w-[386px] tw-mt-10 tw-text-sm'
                                required
                                id='outlined-password'
                                label={dictionary?.newPassword.nPassword}
                                type={showPasswordOne ? 'text' : 'password'}
                                defaultValue=''
                                variant='outlined'
                                InputProps={{
                                    className: 'tw-rounded-3xl',
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <IconButton
                                                onClick={() => setShowPasswordOne(!showPasswordOne)}
                                                edge='end'
                                            >
                                                {showPasswordOne ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Typography
                                className='tw-text-white tw-mt-3 tw-mr-60'
                                variant='body2'
                                color='textSecondary'
                            >
                                {dictionary?.newPassword.nPassword}
                            </Typography>
                        </div>
                    </div>

                    {errorForm?.errorType === 1 && (
                        <span className='tw-text-red-500 tw-mt-2'>
                            {errorForm.errorMessage} *
                        </span>
                    )}

                    <div className='tw-h-[30%] tw-w-[100%] tw-flex tw-items-center tw-justify-center'>
                        <div>
                            <TextField
                                className='tw-h-[52px] tw-w-[386px] tw-mt-14 tw-text-sm'
                                required
                                id='outlined-password'
                                label={dictionary?.newPassword.repeatPassword}
                                type={showPasswordTwo ? 'text' : 'password'}
                                defaultValue=''
                                variant='outlined'
                                InputProps={{
                                    className: 'tw-rounded-3xl',
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <IconButton
                                                onClick={() => setShowPasswordTwo(!showPasswordTwo)}
                                                edge='end'
                                            >
                                                {showPasswordTwo ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                onChange={(e) => setPasswordConfirm(e.target.value)}
                            />
                            <Typography
                                className='tw-text-white tw-mt-3 tw-mr-60'
                                variant='body2'
                                color='textSecondary'
                            >
                                {dictionary?.newPassword.nPassword}
                            </Typography>
                        </div>
                    </div>

                    {errorForm?.errorType === 2 && (
                        <span className='tw-text-red-500 tw-underline tw-mt-2'>
                            {errorForm.errorMessage}
                        </span>
                    )}

                    {stateUpdate === true ?
                        <span className='tw-text-green-300 tw-mt-2'>
                            Contraseña actualizada correctamente *
                        </span>
                        :
                        null
                    }

                    <div className='tw-h-[25%] tw-w-[90%] tw-flex tw-items-center tw-justify-center'>
                        <div className='tw-h-[90%] tw-w-[50%] tw-flex tw-items-center tw-justify-center'>
                            <Button
                                className='tw-w-[184px] tw-h-[45px] tw-rounded-3xl tw-bg-white tw-mt-[30px] tw-items-center'
                                onClick={handleChangePassword}
                            >
                                Guardar
                            </Button>
                        </div>
                        <div className='tw-h-[90%] tw-w-[50%] tw-flex tw-items-center tw-justify-center'>
                            <Button
                                className='tw-w-[184px] tw-h-[45px] tw-rounded-3xl tw-bg-white tw-mt-[30px] tw-items-center'
                                onClick={handleBack}
                            >
                                {dictionary?.recoverPassword?.back}
                            </Button>
                        </div>


                    </div>

                </Container>
            </div>
        </div>

    );
};

export default ChangePassword;