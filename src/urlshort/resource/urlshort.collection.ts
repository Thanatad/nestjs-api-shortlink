export class UrlshortCollection {
  constructor(data) {
    return {
      info: {
        module: 'urlshort',
        api: `${process.env.API_CURRENT_VERSION}`,
      },
      data,
      meta: {
        item_count: 1,
        total_items: data.length,
        per_page: 1,
        total_pages: 1,
        current_page: 1,
      },
      links: {
        next: '...',
        prev: '...',
      },
    };
  }
}
