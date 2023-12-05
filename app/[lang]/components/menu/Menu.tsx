import { MenuProps } from '@/types/menu';
import Business from '@mui/icons-material/Business';
import Home from '@mui/icons-material/Home';
import People from '@mui/icons-material/People';
import Work from '@mui/icons-material/Work';
import {
  IconButton,
  ListItemText,
  MenuItem,
  Paper,
  Toolbar,
} from '@mui/material';
import Image from 'next/image';

const Menu = ({ dictionary }: MenuProps) => {
  return (
    <Paper sx={{ width: '100%', backgroundColor: '#62AD9B' }}>
      <Toolbar
        sx={{
          margin: 'auto',
          display: 'flex',
          justifyContent: 'center',
          width: '1440px',
          height: '139px',
        }}
      >
        <Image
          src='/images/capa_1.png'
          alt='Logo One Tap'
          width='81'
          height='77'
          style={{
            position: 'absolute',
            left: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        />

        <MenuItem
          sx={{
            width: '200px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginLeft: '-250px',
          }}
        >
          <IconButton sx={{ fontSize: '24px' }}>
            <Home />
          </IconButton>
          <ListItemText
            sx={{
              fontSize: '14px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              color: 'white',
            }}
          >
            {dictionary.mainTab.tab1}
          </ListItemText>
        </MenuItem>

        <MenuItem
          sx={{
            width: '200px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <IconButton sx={{ fontSize: '24px' }}>
            <People />
          </IconButton>
          <ListItemText
            sx={{
              fontSize: '14px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              color: 'white',
            }}
          >
            {dictionary.mainTab.tab2}
          </ListItemText>
        </MenuItem>

        <MenuItem
          sx={{
            width: '200px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <IconButton sx={{ fontSize: '24px' }}>
            <Work />
          </IconButton>
          <ListItemText
            sx={{
              fontSize: '14px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              color: 'white',
            }}
          >
            {dictionary.mainTab.tab3}
          </ListItemText>
        </MenuItem>

        <MenuItem
          sx={{
            width: '200px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <IconButton sx={{ fontSize: '24px' }}>
            <Business />
          </IconButton>
          <ListItemText
            sx={{
              fontSize: '14px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              color: 'white',
              maxWidth: '100px',
              textAlign: 'center',
            }}
          >
            {dictionary.mainTab.tab4}
          </ListItemText>
        </MenuItem>
      </Toolbar>
    </Paper>
  );
};

export default Menu;
