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

type Item = {
  id: number;
  name: string;
  image: string;
};
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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box sx={{ width: '100%' }} className="tw-bg-white">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="NavTab BackOffice">
            <Tab label="Cargar fondos" {...a11yProps(0)} />
            <Tab label="Listar usuarios/clientes" {...a11yProps(1)} />
            <Tab label="Crear usuarios/clientes" {...a11yProps(2)} />
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
    </div>
  );
};

export default Page;
