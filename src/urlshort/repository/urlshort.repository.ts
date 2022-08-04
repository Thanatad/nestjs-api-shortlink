import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { CreateUrlshortDto } from "../dto/create-urlshort.dto";
import { Urlshort } from "../entities/urlshort.entity";

@Injectable()
export class UrlshortRepository extends Repository<Urlshort> {
    constructor(private dataSource: DataSource) {
        super(Urlshort, dataSource.createEntityManager())
    }

    async createUrlshort(
        urlshortDto: CreateUrlshortDto,
    ): Promise<Urlshort> {
        const { url, code } = urlshortDto;

        const urlshort = new Urlshort();
        urlshort.url = url;
        urlshort.code = code;
        
        await this.save(urlshort);

        return urlshort;
    }

}

