import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import LogOut from '@/hooks/logOut/LogOut';
import { useRouter } from 'next/navigation';
import useMediaQuery from '@mui/material/useMediaQuery';
import { GetUser, SendInactiveUser } from '../../reactQuery/users';

const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

const ItemMenu = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const { logOut } = LogOut();
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const { data } = GetUser();
    const router = useRouter();

    const handleChangePassword = () => {
        router.replace('/views/profileRecoverPassword');
    };

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDeleteUser = async () => {
        const userId = data?.uid;
        if (userId) {
            const resUpdate = await SendInactiveUser(userId);
            if (resUpdate === true) {
                console.log('Se eliminó correctamente la cuenta');
                logOut();
            } else {
                console.log('Ocurrió un error y no fue posible eliminar la cuenta. Por favor, inténtalo de nuevo.');
            }
        }
    };

    return (
        <div>
            <Button
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                disableElevation
                onClick={handleClick}
                startIcon={<SettingsIcon />}
                style={{ height: '100%', color: 'white', fontSize: isSmallScreen ? "12px" : "16px", flexDirection: 'column', alignItems: 'center' }}
            >
                <span>
                    Mi cuenta <KeyboardArrowDownIcon style={{ marginLeft: '2px' }} />
                </span>
            </Button>
            <StyledMenu
                id="menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleChangePassword} disableRipple>
                    <EditIcon />
                    Cambiar contraseña
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem onClick={handleDeleteUser} disableRipple>
                    <LogoutIcon />
                    Eliminar cuenta
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem onClick={logOut} disableRipple>
                    <LogoutIcon />
                    Cerrar Sesión
                </MenuItem>
            </StyledMenu>
        </div>
    );
};

export default ItemMenu;