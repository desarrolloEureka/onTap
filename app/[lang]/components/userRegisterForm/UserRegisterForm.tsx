
/*
Data a recolectar:
{
    "dni": "111023456",
    "email": "email2@gmail.com",
    "name": "name",
    "last_name": "lastname",
    "plan": "basic",
    "gif": true
}

*/
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
} from '@mui/material';
import { Dictionary } from "@/types/dictionary";
import UserRegisterForm from "./hooks/UserRegisterForm";


const UserRegister = (dictionary: Dictionary, isBasicPlan: Boolean) => {
    const {
        dni,
        email,
        name,
        lastName,
        setDni,
        setEmail,
        setName,
        setLastName
    } = UserRegisterForm(dictionary, isBasicPlan);

    return (
        <div className='tw-flex tw-h-screen tw-items-center tw-justify-center tw-bg-[url("/images/loginBackground.png")] tw-bg-no-repeat tw-bg-center tw-bg-cover'>
            <Container className='tw-bg-[#02AF9B] tw-shadow-m  tw-rounded-2xl tw-h-[618px] tw-w-[794px] tw-flex tw-flex-col tw-justify-center tw-items-center '>
                <>
                    <Box className='tw-w-[386px]'>
                        <Typography
                            className='tw-text-white  tw-mt-10 tw-w-full'
                            variant='body2'
                            color='textSecondary'
                            display={'flow'}
                        >
                            DNI:{' '}
                        </Typography>
                        <TextField
                            className='tw-h-[52px] tw-mt-1 tw-w-[386px]  tw-text-sm  '
                            required
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
                            Nombre:{' '}
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
                            Apellido:{' '}
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
                            Email:{' '}
                        </Typography>
                        <TextField
                            className='tw-h-[52px] tw-mt-1 tw-w-[386px]  tw-text-sm  '
                            required
                            id='outlined-required'
                            defaultValue={email}
                            variant='outlined'
                            InputProps={{ className: 'tw-rounded-3xl' }}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        
                        <Button className='tw-text-white tw-ml-36'></Button>
                    </Box>
                </>
            </Container>
        </div>
    );

}

export default UserRegister;