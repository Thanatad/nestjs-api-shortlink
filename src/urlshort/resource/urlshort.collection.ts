export class UrlshortCollection {
  constructor(data) {
    return {
      info: {
        module: 'urlshort',
        api: `${process.env.API_CURRENT_VERSION}`,
      },
      data: data.items,
      meta: {
        item_count: data.meta.itemCount,
        total_items: data.meta.totalItems,
        per_page: data.meta.itemsPerPage,
        total_pages: data.meta.totalPages,
        current_page: data.meta.currentPage,
      },
      links: {
        first: data.links.first,
        next: data.links.next,
        prev: data.links.previous,
        last: data.links.last,
      },
    };
  }
}
