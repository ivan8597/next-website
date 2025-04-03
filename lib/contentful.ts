import { createClient } from 'contentful';

// Моковые данные для работы без CMS
const mockData = {
  pages: [
    {
      fields: {
        title: 'О нас',
        slug: 'about',
        content: 'Мы молодая и динамично развивающаяся компания...',
        metaTitle: 'О нашей компании',
        metaDescription: 'Узнайте больше о нашей компании и команде'
      }
    },
    {
      fields: {
        title: 'Услуги',
        slug: 'services',
        content: 'Мы предоставляем широкий спектр услуг...',
        metaTitle: 'Наши услуги',
        metaDescription: 'Ознакомьтесь с нашими услугами'
      }
    }
  ]
};

// Проверяем наличие переменных окружения
const hasValidConfig = process.env.CONTENTFUL_SPACE_ID && process.env.CONTENTFUL_ACCESS_TOKEN;

// Создаем клиент только если есть конфигурация
const client = hasValidConfig 
  ? createClient({
      space: process.env.CONTENTFUL_SPACE_ID || '',
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
    })
  : null;

export interface PageContent {
  title: string;
  slug: string;
  content: any;
  metadata: {
    title: string;
    description: string;
  };
}

export async function getPageContent(slug: string): Promise<PageContent | null> {
  try {
    // Если нет клиента, используем моковые данные
    if (!client) {
      const mockPage = mockData.pages.find(page => page.fields.slug === slug);
      if (!mockPage) return null;

      return {
        title: mockPage.fields.title,
        slug: mockPage.fields.slug,
        content: mockPage.fields.content,
        metadata: {
          title: mockPage.fields.metaTitle || mockPage.fields.title,
          description: mockPage.fields.metaDescription || '',
        },
      };
    }

    const entries = await client.getEntries({
      content_type: 'page',
      'fields.slug': slug,
      limit: 1,
    });

    if (!entries.items.length) {
      return null;
    }

    const page = entries.items[0] as any;
    return {
      title: page.fields.title,
      slug: page.fields.slug,
      content: page.fields.content,
      metadata: {
        title: page.fields.metaTitle || page.fields.title,
        description: page.fields.metaDescription || '',
      },
    };
  } catch (error) {
    console.error('Error fetching page content:', error);
    return null;
  }
}

export async function getAllPages(): Promise<PageContent[]> {
  try {
    // Если нет клиента, возвращаем моковые данные
    if (!client) {
      return mockData.pages.map(page => ({
        title: page.fields.title,
        slug: page.fields.slug,
        content: page.fields.content,
        metadata: {
          title: page.fields.metaTitle || page.fields.title,
          description: page.fields.metaDescription || '',
        },
      }));
    }

    const entries = await client.getEntries({
      content_type: 'page',
      limit: 100,
    });

    return entries.items.map((page: any) => ({
      title: page.fields.title,
      slug: page.fields.slug,
      content: page.fields.content,
      metadata: {
        title: page.fields.metaTitle || page.fields.title,
        description: page.fields.metaDescription || '',
      },
    }));
  } catch (error) {
    console.error('Error fetching all pages:', error);
    return [];
  }
} 