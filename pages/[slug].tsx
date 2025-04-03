import { GetStaticProps, GetStaticPaths } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { AriaLive, Hidden } from '../components/A11y';
import { getPageContent, getAllPages, PageContent } from '../lib/contentful';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

interface PageProps {
  page: PageContent | null;
}

export default function DynamicPage({ page }: PageProps) {
  const { t } = useTranslation('common');

  if (!page) {
    return (
      <Layout>
        <AriaLive type="assertive">
          {t('errors.pageNotFound')}
        </AriaLive>
        <div>
          <h1>{t('errors.notFound')}</h1>
          <p>{t('errors.pageNotFoundMessage')}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO 
        title={page.metadata.title}
        description={page.metadata.description}
      />
      <main id="main-content">
        <Hidden>
          {t('navigation.mainContent')}
        </Hidden>
        <h1>{page.title}</h1>
        <div>{page.content}</div>
      </main>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async ({ locales = [] }) => {
  const pages = await getAllPages();
  const paths = pages.flatMap(page => 
    locales.map(locale => ({
      params: { slug: page.slug },
      locale
    }))
  );

  return {
    paths,
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  if (!params?.slug || typeof params.slug !== 'string') {
    return { notFound: true };
  }

  const page = await getPageContent(params.slug);
  
  if (!page) {
    return { notFound: true };
  }

  return {
    props: {
      page,
      ...(await serverSideTranslations(locale || 'ru', ['common'])),
    },
    revalidate: 60
  };
}; 