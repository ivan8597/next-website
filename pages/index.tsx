import { Button, Typography } from '@mui/material';
import styled from 'styled-components';
import Layout from '../components/Layout';
import YouTubeLite from '../components/YouTubeLite';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetStaticProps } from 'next';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, heroAnimation, sequentialFadeIn, scaleOnHover } from '../utils/animations';
import SEO from '../components/SEO';

const CustomContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 120px;
  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

const HeroSection = styled.section`
  display: flex;
  justify-content: space-between;
  padding: 3rem 0 6rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 2rem 0 3rem;
  }
`;

const ContentSection = styled(motion.div)`
  width: 500px;
  margin-right: 120px;

  h1 {
    font-size: 48px;
    line-height: 1.2;
    margin-bottom: 1.5rem;
    font-weight: 700;
  }

  p {
    font-size: 16px;
    line-height: 1.6;
    color: #4A5568;
    margin-bottom: 2rem;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-right: 0;
    margin-bottom: 2rem;
  }
`;

const VideoWrapper = styled(motion.div)`
  border-radius: 8px;
  overflow: hidden;
  width: 500px;
  height: 320px;
  position: relative;
  flex-shrink: 0;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const CardsSection = styled.section`
  padding: 6rem 0;
  text-align: center;
  background: white;

  h2 {
    font-size: 48px;
    line-height: 1.2;
    margin-bottom: 4rem;
    font-weight: 700;
  }
`;

const LastSection = styled.section`
  padding: 5rem 0;
  text-align: center;
  display: flex;
  justify-content: center;
`;

const CardsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(motion.div)`
  text-align: left;
  
  h3 {
    font-size: 24px;
    margin-bottom: 1rem;
    font-weight: 600;
    color: #1A202C;
  }
  
  p {
    font-size: 16px;
    color: #4A5568;
    line-height: 1.6;
  }
`;

const LastSectionContent = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  
  h2 {
    font-size: 48px;
    line-height: 1.2;
    margin-bottom: 1.5rem;
    font-weight: 700;
  }
`;

const AnimatedButton = styled(motion.div)`
  display: inline-block;
`;

const MainPage = () => {
  const { t } = useTranslation('common');
  
  // Структурированные данные для главной страницы (Schema.org)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": t('site.name'),
    "url": process.env.NEXT_PUBLIC_SITE_URL,
    "logo": `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
    "description": t('site.description'),
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Москва",
      "addressCountry": "RU"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+7-123-456-7890",
      "contactType": "customer service"
    },
    "sameAs": [
      "https://www.facebook.com/yourcompany",
      "https://twitter.com/yourcompany",
      "https://www.linkedin.com/company/yourcompany"
    ]
  };
  
  return (
    <Layout>
      <SEO 
        title={t('site.name')}
        description={t('site.description')}
        structuredData={structuredData}
      />
      
      <CustomContainer>
        <HeroSection>
          <ContentSection
            initial="hidden"
            animate="visible"
            variants={heroAnimation}
          >
            <motion.div variants={sequentialFadeIn(0.2)}>
              <Typography variant="h1">
                {t('home.hero.title')}
              </Typography>
            </motion.div>
            <motion.div variants={sequentialFadeIn(0.4)}>
              <Typography paragraph>
                {t('home.hero.description')}
              </Typography>
            </motion.div>
          </ContentSection>
          <VideoWrapper
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <YouTubeLite videoId="dQw4w9WgXcQ" />
          </VideoWrapper>
        </HeroSection>
      </CustomContainer>

      <CardsSection>
        <CustomContainer>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Typography variant="h2">
              {t('home.features.title')}
            </Typography>
          </motion.div>
          
          <CardsGrid
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[...Array(6)].map((_, index) => (
              <Card 
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
              >
                <h3>{t(`home.features.cards.${index}.title`)}</h3>
                <p>
                  {t(`home.features.cards.${index}.description`)}
                </p>
              </Card>
            ))}
          </CardsGrid>
          
          <AnimatedButton
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.4 }}
            {...scaleOnHover}
          >
            <Button 
              variant="contained" 
              href="/contact"
              sx={{
                borderRadius: '8px',
                padding: '8px 40px',
                height: '36px',
                minWidth: '160px',
                textTransform: 'none',
                fontSize: '16px',
                background: '#1A202C',
                '&:hover': {
                  background: '#2D3748'
                }
              }}
            >
              {t('nav.contact')}
            </Button>
          </AnimatedButton>
        </CustomContainer>
      </CardsSection>

      <LastSection>
        <CustomContainer>
          <LastSectionContent
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Typography variant="h2">
              {t('home.cta.title')}
            </Typography>
          </LastSectionContent>
        </CustomContainer>
      </LastSection>
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

export default MainPage;