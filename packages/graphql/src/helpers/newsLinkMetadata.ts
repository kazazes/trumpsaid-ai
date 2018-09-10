import { logger } from '@trumpsaid/common';
import { NewsSourceItem, NewsSourceItemUpdateInput, prismaContext } from '@trumpsaid/prisma';
import got from 'got';
import metascraper from 'metascraper';
import metaAuthor from 'metascraper-author';
import metaClearbitLogo from 'metascraper-clearbit-logo';
import metaDate from 'metascraper-date';
import metaDescription from 'metascraper-description';
import metaLang from 'metascraper-lang';
import metaPublisher from 'metascraper-publisher';
import metaTitle from 'metascraper-title';

const scraper = metascraper([metaAuthor(), metaDate(), metaTitle(), metaLang(), 
  metaClearbitLogo({ size: 256, format: 'png' }), metaDescription(), metaPublisher()]);

export async function processNewsItemMetadata(newsItems: NewsSourceItem | NewsSourceItem[]) {
  let items = newsItems;
  if (!Array.isArray(items)) {
    items = [items];
  }

  const itemMetadata = await Promise.all(items.map((item) => {
    return fetchMetadata(item);
  }));

  const updatedMetadata = await Promise.all(itemMetadata.map((itemMeta) => {
    return updateNewsItemMetadata(itemMeta);
  }));

  return updatedMetadata;
}

async function fetchMetadata(item: NewsSourceItem): Promise<[NewsSourceItem, any]> {
  try {
    const { body: html, url } = await got(item.url);
    const metadata = await scraper({ html, url });

    logger.debug(`${item.url} metadata: ${JSON.stringify(metadata, null, 2)}`);

    return [item, metadata];
  } catch (e) {
    logger.error(JSON.stringify(e, null, 2));
    return [item, e]; 
  }
}

async function updateNewsItemMetadata(itemMeta: [NewsSourceItem, any]) {
  const update: NewsSourceItemUpdateInput = {};
  const item = itemMeta[0];
  const metadata = itemMeta[1];
  if (metadata.code) {
    update.reachable = false;
  } else {
    update.reachable = true;
    update.title = metadata.title;
    update.lang = metadata.lang;
    update.description = metadata.description;
    update.author = metadata.author;
    update.publishedDate = metadata.date;
    update.publisher = metadata.publisher;
    update.logo = metadata.logo;
    update.lastAccessed = new Date().toISOString();
  }
  logger.debug(`Updating metadata for ${item.id}, ${item.url}: ${JSON.stringify(update, null, 2)}`);
  return prismaContext.mutation.updateNewsSourceItem({ where: { id: item.id }, data: update }, ' { url reachable title }');
}
