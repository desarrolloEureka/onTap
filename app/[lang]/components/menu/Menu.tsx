import { MenuProps } from '@/types/menu';
import Business from '@mui/icons-material/Business';
import Home from '@mui/icons-material/Home';
import People from '@mui/icons-material/People';
import Work from '@mui/icons-material/Work';
import { Box, IconButton, Tab, Tabs, Typography } from '@mui/material';
import Image from 'next/image';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Menu = ({ dictionary, handleChange, value, children }: MenuProps) => {
  const Logo = () => (
    <Image src='/images/capa_1.png' alt='Logo One Tap' width='81' height='77' />
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
        <IconButton
          className={`tw-text-[24px]  ${
            index === value ? 'tw-text-black' : 'tw-text-white'
          }`}
        >
          {icon}
        </IconButton>
        <Typography color={`${index === value ? 'black' : 'white'}`}>
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
          backgroundColor: '#62AD9B',
        }}
      >
        <Box sx={{ ml: 3, mt: 0.7 }}>
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
          <Tabs value={value} onChange={handleChange} aria-label='Home Tab'>
            <Tab
              label={
                <Label
                  icon={<Home />}
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
                  icon={<People />}
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
                  icon={<Work />}
                  label={dictionary.mainTab.tab3}
                  value={value}
                  index={2}
                />
              }
              {...a11yProps(2)}
            />
            <Tab
              label={
                <Label
                  icon={<Business />}
                  label={dictionary.mainTab.tab4}
                  value={value}
                  index={3}
                />
              }
              {...a11yProps(3)}
              disabled
            />
          </Tabs>
        </Box>
      </Box>
      {children}
    </Box>
  );
};

export default Menu;
