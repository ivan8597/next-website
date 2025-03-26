import { useState } from 'react';
import { Button, Container, TextField, Typography, Box, CircularProgress } from '@mui/material';
import styled from 'styled-components';
import Layout from '../components/Layout';
import Head from 'next/head';

const ContactSection = styled.section`
  padding: 4rem 0;

  display: flex;
  justify-content: center;
`;

const ContactContent = styled.div`
  width: 100%;
  text-align: left;
  padding: 2rem;

  h1 {
    font-size: 72px;
    line-height: 1.2;
    margin-bottom: 2rem;
    font-weight: 700;
    text-align: center;
    color: #1A202C;
  }
`;

const FormContainer = styled.div`
  padding: 2rem;
  width: 100%;
  max-width: 450px;
  margin: 0 auto;
  background: white;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ResponseMessage = styled.p`
  width: 100%;
  text-align: center;
  font-size: 72px;
  line-height: 1.2;
  font-weight: 700;
  color: #1A202C;
  padding: 3rem 2rem 2rem;
`;

const ContactPage = () => {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setResponse('Message generated on the server');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  if (response) {
    return (
      <Layout>
        <Head>
          <title>Contact Us | Some Company</title>
          <meta name="description" content="Contact us through our form" />
        </Head>
        <ContactSection>
          <Container maxWidth="md">
            <ContactContent>
              <ResponseMessage>{response}</ResponseMessage>
            </ContactContent>
          </Container>
        </ContactSection>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>Contact Us | Some Company</title>
        <meta name="description" content="Contact us through our form" />
      </Head>
      <ContactSection>
        <Container maxWidth="md">
          <ContactContent>
            <Typography 
              variant="h1" 
              sx={{ 
                fontSize: '72px',
                lineHeight: 1.2,
                fontWeight: 700,
                textAlign: 'center',
                marginBottom: '3rem'
              }}
            >
              Only CTA on the page
            </Typography>
            <FormContainer>
              <Form onSubmit={handleSubmit}>
                <Box sx={{ mb: 1.5 }}>
                  <Typography 
                    sx={{ 
                      marginBottom: '0.5rem',
                      fontWeight: 500,
                      fontSize: '16px',
                      color: '#1A202C'
                    }}
                  >
                    Name
                  </Typography>
                  <TextField
                    id="name"
                    variant="outlined"
                    fullWidth
                    required
                    hiddenLabel
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Value"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '9px',
                        backgroundColor: 'white',
                        '& fieldset': {
                          borderColor: '#E2E8F0',
                        },
                        '&:hover fieldset': {
                          borderColor: '#1A202C',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#1A202C',
                        },
                      },
                      '& .MuiOutlinedInput-input': {
                        padding: '0.75rem 1rem',
                        '&::placeholder': {
                          color: '#A0AEC0',
                          opacity: 1,
                        },
                      },
                    }}
                  />
                </Box>
                <Box sx={{ mb: 1.5 }}>
                  <Typography 
                    sx={{ 
                      marginBottom: '0.5rem',
                      fontWeight: 500,
                      fontSize: '16px',
                      color: '#1A202C'
                    }}
                  >
                    Email
                  </Typography>
                  <TextField
                    id="email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    required
                    hiddenLabel
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Value"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '9px',
                        backgroundColor: 'white',
                        '& fieldset': {
                          borderColor: '#E2E8F0',
                        },
                        '&:hover fieldset': {
                          borderColor: '#1A202C',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#1A202C',
                        },
                      },
                      '& .MuiOutlinedInput-input': {
                        padding: '0.75rem 1rem',
                        '&::placeholder': {
                          color: '#A0AEC0',
                          opacity: 1,
                        },
                      },
                    }}
                  />
                </Box>
                <Box sx={{ mb: 1.5 }}>
                  <Typography 
                    sx={{ 
                      marginBottom: '0.5rem',
                      fontWeight: 500,
                      fontSize: '16px',
                      color: '#1A202C'
                    }}
                  >
                    Message
                  </Typography>
                  <TextField
                    id="message"
                    variant="outlined"
                    fullWidth
                    required
                    hiddenLabel
                    multiline
                    minRows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Value"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '9px',
                        backgroundColor: 'white',
                        '& fieldset': {
                          borderColor: '#E2E8F0',
                        },
                        '&:hover fieldset': {
                          borderColor: '#1A202C',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#1A202C',
                        },
                      },
                      '& .MuiOutlinedInput-input': {
                        padding: '0.75rem 1rem',
                        '&::placeholder': {
                          color: '#A0AEC0',
                          opacity: 1,
                        },
                      },
                    }}
                  />
                </Box>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={loading}
                  sx={{
                    height: '36px',
                    background: '#1A202C',
                    color: 'white',
                    borderRadius: '9px',
                    padding: '8px',
                    fontSize: '16px',
                    fontWeight: 500,
                    textTransform: 'none',
                    '&:hover': {
                      background: '#2D3748',
                    },
                  }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
                </Button>
                {error && (
                  <Typography 
                    color="error" 
                    sx={{ 
                      textAlign: 'center',
                      marginTop: '1rem'
                    }}
                  >
                    {error}
                  </Typography>
                )}
              </Form>
            </FormContainer>
          </ContactContent>
        </Container>
      </ContactSection>
    </Layout>
  );
};

export default ContactPage;