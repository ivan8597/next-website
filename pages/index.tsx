import { Button, Typography } from '@mui/material';
import styled from 'styled-components';
import Layout from '../components/Layout';
import YouTubeLite from '../components/YouTubeLite';
import Head from 'next/head';

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

const ContentSection = styled.div`
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

const VideoWrapper = styled.div`
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

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
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

const LastSectionContent = styled.div`
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

const MainPage = () => {
  return (
    <Layout>
      <Head>
        <title>Some Company</title>
        <meta name="description" content="Welcome" />
      </Head>
      <CustomContainer>
        <HeroSection>
          <ContentSection>
            <Typography variant="h1">
              Most important title on the page
            </Typography>
            <Typography paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam mattis, leo et condimentum ultricies, sem urna convallis metus, vel suscipit nibh lacus tincidunt ante
            </Typography>
          </ContentSection>
          <VideoWrapper>
            <YouTubeLite videoId="dQw4w9WgXcQ" />
          </VideoWrapper>
        </HeroSection>
      </CustomContainer>

      <CardsSection>
        <CustomContainer>
          <Typography variant="h2">
            Also very important title
          </Typography>
          <CardsGrid>
            {[...Array(6)].map((_, index) => (
              <Card key={index}>
                <h3>Title</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam mattis, leo et condimentum
                </p>
              </Card>
            ))}
          </CardsGrid>
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
            Contact us
          </Button>
        </CustomContainer>
      </CardsSection>

      <LastSection>
        <CustomContainer>
          <LastSectionContent>
            <Typography 
              variant="h2" 
              sx={{ 
                fontSize: '48px',
                lineHeight: 1.2,
                fontWeight: 700,
                marginBottom: '1.5rem',
                letterSpacing: '-0.02em'
              }}
            >
              Less important title
            </Typography>
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
              Contact us
            </Button>
          </LastSectionContent>
        </CustomContainer>
      </LastSection>
    </Layout>
  );
};

export default MainPage;