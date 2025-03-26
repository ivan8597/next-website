import { AppBar, Button, Toolbar, Box, Typography } from '@mui/material';

const Header = () => (
  <AppBar 
    position="static" 
    sx={{ 
      backgroundColor: 'white',
      boxShadow: 'none',
      py: 2
    }}
  >
    <Toolbar disableGutters sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
      <Typography 
        variant="h3" 
        sx={{ 
          color: '#1A202C',
          fontSize: '24px',
          fontWeight: 700,
          margin: 0
        }}
      >
        Some Company
      </Typography>
      <Box sx={{ flexGrow: 1 }} />
      <Button 
        variant="contained"
        href="/contact"
        sx={{
          background: '#1A202C',
          color: 'white',
          borderRadius: '8px',
          padding: '8px 40px',
          height: '36px',
          minWidth: '160px',
          textTransform: 'none',
          fontSize: '16px',
          fontWeight: 500,
          boxShadow: 'none',
          '&:hover': {
            background: '#2D3748',
            boxShadow: 'none'
          }
        }}
      >
        Contact us
      </Button>
    </Toolbar>
  </AppBar>
);

export default Header;