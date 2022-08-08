
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
            code: this.code,
            created_at: this.created_at,
            updated_at: this.updated_at
        }
    }
}

