import { GetAllBackgroundImages, GetAllTemplates } from '@/reactQuery/home';
import { TabPanelProps } from '@/types/home';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { GetUser } from '@/reactQuery/users';

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
      {value === index && <Box sx={{ p: 0, height: '100vh' }}>{children}</Box>}
    </div>
  );
}

const HomeHook = () => {
  const [value, setValue] = useState(0);
  const [isProUser, setIsProUser] = useState(true);
  const { data, isLoading, error } = GetAllTemplates();
  const backgroundImages = GetAllBackgroundImages();
  const datUser = GetUser();

  const [isModalAlert, setIsModalAlert] = useState(false);
  const handleModalAlert = () => setIsModalAlert(!isModalAlert);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    const plan = datUser?.data?.plan;
    if (plan === 'basic' && newValue === 2) {
      setIsModalAlert(!isModalAlert);
    } else {
      setValue(newValue);
    }

  };

  useEffect(() => {
    value === 1 ? setIsProUser(false) : setIsProUser(true);
  }, [value]);

  return {
    handleChange,
    value,
    setIsProUser,
    isProUser,
    CustomTabPanel,
    templates: data,
    isLoadingTemplates: isLoading,
    backgroundImages,
    isModalAlert,
    setIsModalAlert,
    handleModalAlert
  };
};

export default HomeHook;