import { TabPanelProps } from '@/types/home';
import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

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
        <Box sx={{ p: 0, height: '100vh' }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const HomeHook = () => {
  const [value, setValue] = useState(0);
  const [isProUser, setIsProUser] = useState(true);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    value === 1 ? setIsProUser(false) : setIsProUser(true);
  }, [value]);

  return { handleChange, value, setIsProUser, isProUser, CustomTabPanel };
};

export default HomeHook;
