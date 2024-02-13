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
import GroupIcon from '@mui/icons-material/Group';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import useMediaQuery from '@mui/material/useMediaQuery';
import Image from 'next/image';
import LogoutIcon from '@mui/icons-material/Logout';
import { QueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const logOut = () => {
    localStorage.clear();
    queryClient.clear();
    router.replace('/views/login');
  };


  return (
    <div>
      <Box >
        <div className="tw-flex tw-justify-between tw-items-center tw-bg-[#02AF9B] tw-p-4">
          <Image
            src='/images/simple_logo.png'
            alt='Logo One Tap'
            width={isSmallScreen ? 31 : 81}
            height={isSmallScreen ? 27 : 77}
            priority
          />
          <BottomNavigation
            value={value}
            onChange={handleChange}
            showLabels
            //en el centro de la pantalla los iconos juntos
            className="tw-bg-[#02AF9B] tw-flex tw-justify-center tw-items-center tw-w-full"
          >
            <BottomNavigationAction label={dictionary?.backOffice.CreateUser}
              icon={<GroupAddIcon fontSize="large" sx={{ color: 'white'}} />}
              sx={{ color: 'white', fontSize:70  }} />
            <BottomNavigationAction label={dictionary?.backOffice.UserList}
              icon={<GroupIcon fontSize="large"
                sx={{ color: 'white' }} />}
              sx={{ color: 'white' }} />
            <BottomNavigationAction label={dictionary?.backOffice.LoadFonts}
              icon={<FilterIcon fontSize="large"
                sx={{ color: 'white' }} />}
              sx={{ color: 'white' }} />
          </BottomNavigation>
          <Button onClick={logOut} sx={{ color: 'white' }}>
            <div className="tw-flex tw-items-center">
              <LogoutIcon />
              <Typography>{dictionary?.logOut}</Typography>
            </div>
          </Button>
        </div>
        {value === 0 && <UserRegister />}
        {value === 1 && <UserTable />}
        {value === 2 && <LoadFonts params={{ lang }} />}
      </Box>
    </div>
  );
};

export default Page;
/*
<Box sx={{ width: '100%' }} className="tw-bg-white">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="NavTab BackOffice">
            <Tab label={dictionary?.backOffice.LoadFonts} {...a11yProps(0)} />
            <Tab label={dictionary?.backOffice.UserList} {...a11yProps(1)} />
            <Tab label={dictionary?.backOffice.CreateUser} {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <LoadFonts params={{ lang }} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <UserTable />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <UserRegister />
        </CustomTabPanel>
      </Box>
*/ 