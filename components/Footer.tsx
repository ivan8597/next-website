import { Container, Typography, Box } from '@mui/material';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  background: white;
  padding: 9rem 0;
  border-top: 1px solid #E2E8F0;
`;

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