import { MenuProps } from '@/types/menu';
import Business from '@mui/icons-material/Business';
import Home from '@mui/icons-material/Home';
import People from '@mui/icons-material/People';
import Work from '@mui/icons-material/Work';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import Image from 'next/image';
import useMediaQuery from '@mui/material/useMediaQuery';
import ItemMenu from '@/components/menu/ItemMenu';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Menu = ({ dictionary, handleChange, value, children, isChangeData, setIsAlertSaveModal, setIsSubItemNav, isModalLogOut, setIsModalLogOut }: MenuProps) => {
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const Logo = () => (
    <Image
      src='/images/simple_logo.png'
      alt='Logo One Tap'
      width={isSmallScreen ? 31 : 81}
      height={isSmallScreen ? 27 : 77}
      priority
    />
  );

  const Label = ({
    icon,
    label,
    value,
    index,
  }: {
    icon: React.ReactNode;
    label: string;
    value: number;
    index: number;
  }) => {

    return (
      <Box>
        {icon}
        <Typography
          color={`${index === value ? 'black' : 'white'}`}
          sx={{
            fontSize: '16px',
            '@media screen and (max-width: 600px)': {
              fontSize: '12px',
            },
          }}
        >
          {label}
        </Typography>
      </Box>
    );
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          backgroundColor: '#02AF9B',
        }}
      >
        <Box sx={{
          ml: 1,
          '@media screen and (max-width: 600px)': {
            mt: 2
          },

        }}>
          <Logo />
        </Box>
        <Box
          sx={{
            width: '100%',
            borderBottom: 1,
            borderColor: 'divider',

            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label='Home Tab'
            sx={isSmallScreen ?
              {
                '& .MuiTabs-flexContainer': {
                  gap: 0, // Ajusta el espacio entre las pestañas según tus necesidades
                },
                '& .MuiTab-root': {
                  minWidth: 'unset', // Elimina el ancho mínimo de cada pestaña
                  width: 'auto',    // Permite que cada pestaña ajuste su propio ancho
                  padding: '8px 9px', // Ajusta el relleno interno según tus necesidades
                },
              }
              :
              null}
          >
            <Tab
              label={
                <Label
                  icon={<Home sx={{ color: value === 0 ? 'black' : 'white' }} />}
                  label={dictionary.mainTab.tab1}
                  value={value}
                  index={0}
                />
              }
              {...a11yProps(0)}
            />
            <Tab
              label={
                <Label
                  icon={
                    <People sx={{ color: value == 1 ? 'black' : 'white' }} />
                  }
                  label={dictionary.mainTab.tab2}
                  value={value}
                  index={1}
                />
              }
              {...a11yProps(1)}
            />
            <Tab
              label={
                <Label
                  icon={<Work sx={{ color: value == 2 ? 'black' : 'white' }} />}
                  label={dictionary.mainTab.tab3}
                  value={value}
                  index={2}
                />
              }
              {...a11yProps(2)}
            />

            <ItemMenu isChangeData={isChangeData} setIsAlertSaveModal={setIsAlertSaveModal} setIsSubItemNav={setIsSubItemNav} 
            isModalLogOut={isModalLogOut} setIsModalLogOut={setIsModalLogOut}
            />

            {/*  <Tab
              label={
                <Label
                  icon={
                    <Business sx={{ color: value == 3 ? 'black' : 'white' }} />
                  }
                  label={dictionary.mainTab.tab4}
                  value={value}
                  index={3}
                />
              }
              {...a11yProps(3)}
              disabled
            /> */}
          </Tabs>
        </Box>
      </Box>
      {children}
    </Box>
  );
};

export default Menu;
