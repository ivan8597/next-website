import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { getPageContent, getAllPages, PageContent as ContentfulPage } from '../lib/contentful';
import Header from '../components/Header';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const PageTitle = styled(motion.h1)`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const ContentBlock = styled(motion.div)`
  line-height: 1.6;
  font-size: 1.1rem;
`;

interface PageProps {
  page: ContentfulPage;
  locale: string;
}

export default function Page({ page, locale }: PageProps) {
  const { t } = useTranslation('common');

  if (!page) {
    return <div>Страница не найдена</div>;
  }

  return (
    <>
      <Head>
        <title>{page.metadata.title}</title>
        <meta name="description" content={page.metadata.description} />
      </Head>
      <Header />
      <PageContainer>
        <PageTitle
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          {page.title}
        </PageTitle>
        <ContentBlock
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          {page.content}
        </ContentBlock>
      </PageContainer>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async ({ locales = ['ru'] }) => {
  const pages = await getAllPages();
  
  // Создаем пути для всех локалей
  const paths = pages.flatMap(page => 
    locales.map(locale => ({
      params: { slug: page.slug },
      locale
    }))
  );
  
  return { 
    paths, 
    fallback: false 
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale = 'ru' }) => {
  const slug = params?.slug as string;
  const page = await getPageContent(slug);
  
  if (!page) {
    return { notFound: true };
  }
  
  return { 
    props: { 
      page,
      locale,
      ...(await serverSideTranslations(locale, ['common'])),
    } 
  };
}; 