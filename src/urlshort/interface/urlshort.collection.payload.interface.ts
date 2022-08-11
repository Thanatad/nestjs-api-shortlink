import { Urlshort } from '../entities/urlshort.entity';

export interface UrlshortCollectionPayload {
  info: object;
  data: Urlshort[];
  meta: object;
  links: object;
}
