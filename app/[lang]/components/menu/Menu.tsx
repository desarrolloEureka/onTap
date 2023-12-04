import { MenuProps } from '@/types/menu';
import { Button, Divider, IconButton, ListItemIcon, ListItemText, MenuItem, MenuList, Paper, TextField, Toolbar, Typography } from '@mui/material';
import Home from '@mui/icons-material/Home';
import Work from '@mui/icons-material/Work';
import People from '@mui/icons-material/People';
import Business from '@mui/icons-material/Business';


const Menu = ({dictionary}:MenuProps) => {
  return (
   
    
    <div style={{ 
      backgroundImage: "url('/images/fondo.png')",  // Ruta de la imagen de fondo
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
     }}>
  {/* <div>
    <h1 style={{ color: 'white', marginLeft: '16px' }}>{dictionary?.mainMenu}</h1>
  </div> */}
   


  <Paper sx={{ width: '100%', backgroundColor: '#62AD9B'}}>
    <Toolbar sx={{ margin: 'auto', display: 'flex', justifyContent: 'center',  width: '1440px', height: '139px' }}>
    <img
      src="/images/Capa_1.png"
      alt="Logo One Tap"
      width="81"
      height="77"
      style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)' }}
    />
     
      <MenuItem sx={{ width: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '-250px' }}>
        <IconButton sx={{ fontSize: '24px'}}>
          <Home />
        </IconButton>
        <ListItemText sx={{ fontSize: '14px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'white' }}>Home</ListItemText>
      </MenuItem>
      {/* <Divider orientation="vertical" flexItem /> */}

      {/* <div style={{ width: '50px' }} /> */}

      <MenuItem sx={{ width: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <IconButton sx={{ fontSize: '24px' }}>
          <People />
        </IconButton>
        <ListItemText sx={{ fontSize: '14px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'white' }}>Social</ListItemText>
      </MenuItem>
      {/* <Divider orientation="vertical" flexItem /> */}

      {/* <div style={{ width: '50px' }} /> */}

      <MenuItem sx={{ width: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <IconButton sx={{ fontSize: '24px'}}>
          <Work />
        </IconButton>
        <ListItemText sx={{ fontSize: '14px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'white' }}>Pro</ListItemText>
      </MenuItem>
      {/* <Divider orientation="vertical" flexItem /> */}

      {/* <div style={{ width: '50px' }} /> */}

      <MenuItem sx={{ width: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <IconButton sx={{ fontSize: '24px'}}>
          <Business />
        </IconButton>
        <ListItemText sx={{ fontSize: '14px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'white', maxWidth: '100px',textAlign: 'center' }}>Corporativo</ListItemText>
      </MenuItem>
      
    </Toolbar>
  </Paper>

  {/* <div>
    <h1>Haciendo cambios</h1>
  </div> */}
   
   


</div>
    
  )
}

export default Menu
