import { useState } from 'react';
import { Button, Container, TextField, Typography, Box, CircularProgress, Alert } from '@mui/material';
import styled from 'styled-components';
import Layout from '../components/Layout';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetStaticProps } from 'next';
import { motion } from 'framer-motion';
import { fadeInUp, fadeIn } from '../utils/animations';
import { useLazyApiData } from '../hooks/useApi';
import { api } from '../utils/api';

const ContactSection = styled.section`
  padding: 4rem 0;
  display: flex;
  justify-content: center;
`;

const ContactContent = styled(motion.div)`
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

const FormContainer = styled(motion.div)`
  padding: 2rem;
  width: 100%;
  max-width: 450px;
  margin: 0 auto;
  background: white;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ResponseMessage = styled(motion.p)`
  width: 100%;
  text-align: center;
  font-size: 72px;
  line-height: 1.2;
  font-weight: 700;
  color: #1A202C;
  padding: 3rem 2rem 2rem;
`;

const ContactPage = () => {
  const { t } = useTranslation('common');
  const [response, setResponse] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // Используем хук useLazyApiData для отправки формы
  const { fetch: submitForm, isLoading, isError, error } = useLazyApiData(
    '/api/form/submit', 
    {
      onSuccess: () => {
        setResponse(t('contact.success'));
      }
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await submitForm(formData);
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  if (response) {
    return (
      <Layout>
        <Head>
          <title>{t('contact.title')} | {t('site.name')}</title>
          <meta name="description" content={t('contact.subtitle')} />
        </Head>
        <ContactSection>
          <Container maxWidth="md">
            <ContactContent
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <ResponseMessage
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {response}
              </ResponseMessage>
            </ContactContent>
          </Container>
        </ContactSection>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>{t('contact.title')} | {t('site.name')}</title>
        <meta name="description" content={t('contact.subtitle')} />
      </Head>
      <ContactSection>
        <Container maxWidth="md">
          <ContactContent
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <motion.div variants={fadeInUp}>
              <Typography 
                variant="h1" 
                sx={{ 
                  fontSize: { xs: '48px', md: '72px' },
                  lineHeight: 1.2,
                  fontWeight: 700,
                  textAlign: 'center',
                  marginBottom: '3rem'
                }}
              >
                {t('contact.title')}
              </Typography>
            </motion.div>
            
            <FormContainer
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Form onSubmit={handleSubmit}>
                {isError && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {error?.message || t('contact.error')}
                  </Alert>
                )}
                
                <Box sx={{ mb: 1.5 }}>
                  <Typography 
                    sx={{ 
                      marginBottom: '0.5rem',
                      fontWeight: 500,
                      fontSize: '16px',
                      color: '#1A202C'
                    }}
                  >
                    {t('contact.name')}
                  </Typography>
                  <TextField
                    id="name"
                    variant="outlined"
                    fullWidth
                    required
                    hiddenLabel
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t('contact.placeholders.name')}
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
                    {t('contact.email')}
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
                    placeholder={t('contact.placeholders.email')}
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
                <Box sx={{ mb: 2 }}>
                  <Typography 
                    sx={{ 
                      marginBottom: '0.5rem',
                      fontWeight: 500,
                      fontSize: '16px',
                      color: '#1A202C'
                    }}
                  >
                    {t('contact.message')}
                  </Typography>
                  <TextField
                    id="message"
                    variant="outlined"
                    fullWidth
                    required
                    multiline
                    rows={4}
                    hiddenLabel
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t('contact.placeholders.message')}
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
                  variant="contained" 
                  fullWidth 
                  type="submit"
                  disabled={isLoading}
                  sx={{
                    borderRadius: '9px',
                    padding: '0.75rem',
                    textTransform: 'none',
                    background: '#1A202C',
                    '&:hover': {
                      background: '#2D3748'
                    }
                  }}
                >
                  {isLoading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    t('contact.submit')
                  )}
                </Button>
              </Form>
            </FormContainer>
          </ContactContent>
        </Container>
      </ContactSection>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'ru', ['common'])),
    },
  };
};

export default ContactPage;