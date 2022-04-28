import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import logo from '../assets/logo.png';

const MenuAppBar = () => {
  let navigate = useNavigate();
  let { query } = useParams();

  return (
    <AppBar>
      <Container maxWidth="xl">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'flex', md: 'flex' } }}
          >
            DNA Matcher
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
            <Button
              onClick={() => navigate('/tambah')}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Tambah
            </Button>
            <Button
              onClick={() => navigate('/test')}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Test
            </Button>
            <Button
              onClick={() => navigate('/cari')}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Cari
            </Button>
          </Box>

          <Button onClick={() => navigate('/')} sx={{ p: 0 }}>
            <img src={logo} className="App-logo" alt="logo" />
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default MenuAppBar;