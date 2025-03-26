import { Container, Typography, Box } from '@mui/material';

const Footer = () => (
  <Box 
    component="footer" 
    sx={{ 
      backgroundColor: 'white',
      py: 4,
      textAlign: 'center'
    }}
  >
    <Container>
      <Typography 
        sx={{ 
          color: '#1A202C',
          fontSize: '24px',
          fontWeight: 700
        }}
      >
        Some Company 2024
      </Typography>
    </Container>
  </Box>
);

export default Footer;