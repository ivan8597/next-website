import { createClient } from 'contentful';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
});

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