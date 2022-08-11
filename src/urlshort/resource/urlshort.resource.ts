import { Resource } from 'rc-transforms';
export class UrlshortResource extends Resource {
  public id: number;
  public url: string;
  public code: string;
  public updated_at: Date;
  public created_at: Date;

  toArray() {
    return {
      ids: this.id,
      url: this.url,
      base_url: process.env.BASE_URL,
      code: this.code,
      created_at: this.dateConverter(this.created_at),
      updated_at: this.dateConverter(this.updated_at),
    };
  }

  private dateConverter(date: Date): string {
    return new Date(date).toLocaleDateString();
  }
}
