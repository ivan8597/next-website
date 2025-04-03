import { Typography, Box } from '@mui/material';
import styled from 'styled-components';
import Layout from '../components/Layout';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetStaticProps } from 'next';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../utils/animations';
import OptimizedImage from '../components/OptimizedImage';
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

const ContentSection = styled(motion.section)`
  margin-bottom: 4rem;
`;

const TeamSection = styled(motion.section)`
  margin-top: 4rem;
`;

const TeamGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TeamMember = styled(motion.div)`
  text-align: center;
  
  h3 {
    font-size: 24px;
    margin: 1rem 0 0.5rem;
    font-weight: 600;
  }
  
  p {
    color: #4A5568;
  }
`;

const AboutPage = () => {
  const { t } = useTranslation('common');
  
  const teamMembers = [
    {
      id: 1,
      name: t('about.team.members.0.name'),
      position: t('about.team.members.0.position'),
      image: '/images/team-1.svg'
    },
    {
      id: 2,
      name: t('about.team.members.1.name'),
      position: t('about.team.members.1.position'),
      image: '/images/team-2.svg'
    },
    {
      id: 3,
      name: t('about.team.members.2.name'),
      position: t('about.team.members.2.position'),
      image: '/images/team-3.svg'
    }
  ];
  
  // Структурированные данные для страницы о нас
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "Organization",
      "name": t('site.name'),
      "description": t('about.description'),
      "foundingDate": "2010",
      "founder": {
        "@type": "Person",
        "name": t('about.team.members.0.name')
      },
      "employee": teamMembers.map((member) => ({
        "@type": "Person",
        "name": member.name,
        "jobTitle": member.position
      }))
    }
  };
  
  return (
    <Layout>
      <SEO 
        title={t('about.title')}
        description={t('about.description')}
        ogType="article"
        structuredData={structuredData}
      />
      
      <Container>
        <PageTitle
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {t('about.title')}
        </PageTitle>
        
        <ContentSection
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Typography variant="h2" gutterBottom sx={{ fontSize: '32px', fontWeight: 600 }}>
            {t('about.mission.title')}
          </Typography>
          <Typography paragraph>
            {t('about.mission.description')}
          </Typography>
        </ContentSection>
        
        <ContentSection
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Typography variant="h2" gutterBottom sx={{ fontSize: '32px', fontWeight: 600 }}>
            {t('about.history.title')}
          </Typography>
          <Typography paragraph>
            {t('about.history.description')}
          </Typography>
        </ContentSection>
        
        <TeamSection
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Typography variant="h2" gutterBottom sx={{ fontSize: '32px', fontWeight: 600 }}>
            {t('about.team.title')}
          </Typography>
          <Typography paragraph>
            {t('about.team.description')}
          </Typography>
          
          <TeamGrid
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            viewport={{ once: true }}
          >
            {teamMembers.map((member, index) => (
              <TeamMember 
                key={member.id}
                variants={fadeInUp}
                custom={index * 0.1}
              >
                <OptimizedImage
                  src={member.image}
                  alt={member.name}
                  width={200}
                  height={200}
                  rounded
                  shadow
                  fadeIn
                  hover="zoom"
                  style={{ marginBottom: '1rem' }}
                />
                <h3>{member.name}</h3>
                <p>{member.position}</p>
              </TeamMember>
            ))}
          </TeamGrid>
        </TeamSection>
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

export default AboutPage; 