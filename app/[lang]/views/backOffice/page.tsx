'use client';
import React, { useState } from 'react';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';
import { Button } from '@mui/material';
import LogOut from '@/hooks/logOut/LogOut';
import { Locale } from 'i18n-config';
import useDictionary from '@/hooks/dictionary/useDictionary';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import UserRegister from '@/components/userRegisterForm/UserRegisterForm';
import UserTable from '@/components/userTable/UserTable';

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
  const [items, setItems] = useState<Array<Item>>([]);
  const { logOut } = LogOut();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handleAddItem = (newItem: { name: string; image: string }) => {
    setItems([...items, { id: items.length + 1, ...newItem }]);
  };
  return (
    <div>
      <Box sx={{ width: '100%' }} className="tw-bg-white">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Cargar fondos" {...a11yProps(0)} />
            <Tab label="Listar usuarios/clientes" {...a11yProps(1)} />
            <Tab label="Crear usuarios/clientes" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <UserRegister />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <UserTable />
        </CustomTabPanel>
      </Box>
      <div className='tw-container tw-mx-auto tw-p-4'>
        <h1 className='tw-text-4xl tw-font-bold tw-mb-8'> {dictionary?.backOffice.CRUD} </h1>
        <ItemForm onAddItem={handleAddItem} dictionary={dictionary} />
        <ItemList items={items} />
        <Button onClick={logOut}>{dictionary?.logOut}</Button>
      </div>
    </div>
  );
};

export default Page;
