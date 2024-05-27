'use client';
import React, { useState } from 'react';
import { Locale } from 'i18n-config';
import useDictionary from '@/hooks/dictionary/useDictionary';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import UserRegister from '@/components/userRegisterForm/UserRegisterForm';
import UserTable from '@/components/userTable/UserTable';
import LoadFonts from '@/components/loadFonts/LoadFonts';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FilterIcon from '@mui/icons-material/Filter';
import LogoDevIcon from '@mui/icons-material/LogoDev';
import GroupIcon from '@mui/icons-material/Group';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import useMediaQuery from '@mui/material/useMediaQuery';
import Image from 'next/image';
import LogoutIcon from '@mui/icons-material/Logout';
import { QueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';
import OneTapLogo from '@/components/oneTapLogo/OneTapLogo';
import LogOut from '@/hooks/logOut/LogOut';
import LoadLogos from '@/components/loadLogos/LoadLogos';
import TableRowsIcon from '@mui/icons-material/TableRows';
import TrafficReport from '@/components/trafficReport/TrafficReport';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Page = ({ params: { lang } }: { params: { lang: Locale } }) => {
  const { dictionary } = useDictionary({ lang });
  const [value, setValue] = React.useState(0);
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const queryClient = new QueryClient();
  const router = useRouter();
  const { logOut } = LogOut();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box>
        <div className='tw-flex tw-justify-between tw-items-center tw-bg-[#02AF9B] tw-p-4'>
          <Image
            src='/images/simple_logo.png'
            alt='Logo One Tap'
            width={81}
            height={77}
            priority
          />
          <BottomNavigation
            value={value}
            onChange={handleChange}
            showLabels
            //en el centro de la pantalla los iconos juntos
            className='tw-bg-[#02AF9B] tw-flex tw-justify-center tw-items-center tw-w-full tw-text-white tw-font-bold'
          >
            <BottomNavigationAction
              label={dictionary?.backOffice.CreateUser}
              icon={<GroupAddIcon fontSize='large' sx={{ color: 'white' }} />}
              className='tw-text-white tw-text-lg tw-font-bold'
            />
            <BottomNavigationAction
              label={dictionary?.backOffice.UserList}
              icon={<GroupIcon fontSize='large' sx={{ color: 'white' }} />}
              className='tw-text-white tw-text-lg tw-font-bold'
            />
            <BottomNavigationAction
              label={dictionary?.backOffice.LoadFonts}
              icon={<FilterIcon fontSize='large' sx={{ color: 'white' }} />}
              className='tw-text-white tw-text-lg tw-font-bold'
            />
            <BottomNavigationAction
              label={dictionary?.backOffice.CreateLogo}
              icon={<LogoDevIcon fontSize='large' sx={{ color: 'white' }} />}
              className='tw-text-white tw-text-lg tw-font-bold'
            />
            {/* <BottomNavigationAction
              label={dictionary?.backOffice.TrafficReport}
              icon={<TableRowsIcon fontSize='large' sx={{ color: 'white' }} />}
              className='tw-text-white tw-text-lg tw-font-bold'
            /> */}
          </BottomNavigation>
          <Button onClick={logOut} sx={{ color: 'white' }}>
            <div className='tw-flex tw-items-center'>
              <LogoutIcon />
              <Typography className='tw-font-bold' >{dictionary?.logOut}</Typography>
            </div>
          </Button>
        </div>
        {value === 0 && <UserRegister />}
        {value === 1 && <UserTable />}
        {value === 2 && <LoadFonts params={{ lang }} />}
        {value === 3 && <LoadLogos params={{ lang }} />}
        {/* {value === 4 && <TrafficReport params={{ lang }} />} */}
      </Box>
    </div>
  );
};

export default Page;
