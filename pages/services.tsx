import { Typography, Button, Grid, Card, CardContent, CardActions, Box } from '@mui/material';
import styled from 'styled-components';
import Layout from '../components/Layout';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetStaticProps } from 'next';
import { motion } from 'framer-motion';
import { fadeInUp, fadeIn, staggerContainer } from '../utils/animations';
import SEO from '../components/SEO';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
`;

const PageTitle = styled(motion.h1)`
  font-size: 48px;
  margin-bottom: 2rem;
  font-weight: 700;
`;

const StyledCard = styled(motion.div)`
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  }
`;

const StyledCardContent = styled(CardContent)`
  flex-grow: 1;
`;

const ServiceIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #E2E8F0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 1.5rem;
`;

const ServicesPage = () => {
  const { t } = useTranslation('common');
  
  const services = [
    { id: 1, icon: '💻', key: 'webDevelopment' },
    { id: 2, icon: '📱', key: 'mobileDevelopment' },
    { id: 3, icon: '🔍', key: 'seo' },
    { id: 4, icon: '📊', key: 'analytics' },
    { id: 5, icon: '🛠️', key: 'maintenance' },
    { id: 6, icon: '🔒', key: 'security' }
  ];
  
  // Структурированные данные для страницы услуг
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": services.map((service, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Service",
        "name": t(`services.items.${service.key}.title`),
        "description": t(`services.items.${service.key}.description`),
        "provider": {
          "@type": "Organization",
          "name": t('site.name')
        }
      }
    }))
  };
  
  return (
    <Layout>
      <SEO 
        title={t('services.title')}
        description={t('services.description')}
        ogType="article"
        structuredData={structuredData}
      />
      
      <Container>
        <PageTitle
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {t('services.title')}
        </PageTitle>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Typography paragraph sx={{ mb: 5, maxWidth: '800px' }}>
            {t('services.description')}
          </Typography>
        </motion.div>
        
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          viewport={{ once: true }}
        >
          <Grid container spacing={4}>
            {services.map((service, index) => (
              <Grid item xs={12} sm={6} md={4} key={service.id}>
                <motion.div
                  variants={fadeInUp}
                  custom={index * 0.1}
                >
                  <Card component={StyledCard}>
                    <StyledCardContent>
                      <ServiceIcon>
                        <Typography variant="h3">{service.icon}</Typography>
                      </ServiceIcon>
                      <Typography variant="h5" component="h2" textAlign="center" gutterBottom>
                        {t(`services.items.${service.key}.title`)}
                      </Typography>
                      <Typography color="text.secondary" paragraph>
                        {t(`services.items.${service.key}.description`)}
                      </Typography>
                    </StyledCardContent>
                    <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                      <Button 
                        size="small" 
                        href="/contact"
                        component={motion.button}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {t('services.learnMore')}
                      </Button>
                    </CardActions>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
        
        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Typography variant="h4" gutterBottom>
              {t('services.cta.title')}
            </Typography>
            <Typography paragraph sx={{ mb: 4, maxWidth: '600px', mx: 'auto' }}>
              {t('services.cta.description')}
            </Typography>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                variant="contained" 
                href="/contact"
                sx={{
                  borderRadius: '8px',
                  padding: '8px 40px',
                  height: '48px',
                  minWidth: '200px',
                  textTransform: 'none',
                  fontSize: '16px',
                  background: '#1A202C',
                  '&:hover': {
                    background: '#2D3748'
                  }
                }}
              >
                {t('services.cta.button')}
              </Button>
            </motion.div>
          </motion.div>
        </Box>
      </Container>
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

export default ServicesPage; 