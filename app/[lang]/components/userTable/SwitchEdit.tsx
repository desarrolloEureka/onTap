import * as React from 'react';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useEffect } from 'react';
import { SendSwitchEditAdmin } from '@/reactQuery/users';
import UserTableLogic from './hooks/UserTable';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 92,
    height: 37,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(20px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: '#02AF9B',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '@media screen and (min-width: 601px)': {
            '&.Mui-checked': {
                transform: 'translateX(20px)' /* Desplazamiento  */,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 25,
        height: 25,
        marginTop: '0.3px',
        marginLeft: '3px',
        transition: 'width 300ms, height 300ms', // Transición para el cambio de tamaño
    },
    '& .Mui-checked .MuiSwitch-thumb': {
        backgroundColor: '#fff', // Circulo blanco cuando está a la derecha
    },
    '& .MuiSwitch-track': {
        borderRadius: 50 / 2,
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
        '&:before, &:after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 16,
            height: 16,
            color: '#8a2be2',
        },
    },
}));

const SwitchEdit = ({ isActive, uid, onSwitchChange }: { isActive: boolean; uid: any; onSwitchChange: () => void }) => {
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const switchRef = React.useRef<HTMLInputElement>(null);
    const [checked, setChecked] = React.useState<boolean>(false);

    useEffect(() => {
        if (isActive) {
            setChecked(isActive);
            if (switchRef.current) {
                switchRef.current.checked = isActive;
            }
        }
    }, [isActive]);

    const handleSwitchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = event.target;
        setChecked(checked);
        await SendSwitchEditAdmin(uid, checked);
        onSwitchChange();
    };

    return (
        <MaterialUISwitch
            inputRef={switchRef}
            checked={checked ? true : false}
            onChange={handleSwitchChange}
            sx={{
                width: isSmallScreen ? 55 : 52,
                height: isSmallScreen ? 29 : 28,
                '& .MuiSwitch-thumb': {
                    width: isSmallScreen ? 25 : 24,
                    height: isSmallScreen ? 25 : 24,
                },
                '& .MuiSwitch-track': {
                    backgroundColor: '#ABA9A6',
                },
            }}
        />
    );
};

export default SwitchEdit;
