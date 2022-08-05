import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { CreateUrlshortDto } from "../dto/create-urlshort.dto";
import { UpdateUrlshortDto } from "../dto/update-urlshort.dto";
import { Urlshort } from "../entities/urlshort.entity";
import { GetUrlshortQuery } from "../controller/urlshort.getquery";

@Injectable()
export class UrlshortRepository extends Repository<Urlshort> {
    constructor(private dataSource: DataSource) {
        super(Urlshort, dataSource.createEntityManager())
    }

    async createUrlshort(urlshortDto: CreateUrlshortDto): Promise<Urlshort> {
        try {
            const urlshort = new Urlshort();
            urlshort.url = urlshortDto.url;
            urlshort.code = urlshortDto.code;
            await this.save(urlshort);
            return urlshort;
        } catch (error) {
            throw new ConflictException('Something\'\s wrong I can feel it.')
        }
    }

    async findByIdUrlshort(id: number): Promise<Urlshort> {
        const urlshort = await this.findOne({ where: { id } });
        if (!urlshort) throw new NotFoundException(`This id:${id} is not found`)
        return urlshort
    }

    async findByFilterUrlshort(queryParams: GetUrlshortQuery): Promise<Urlshort[]> {
        const urlshort = await this.createQueryBuilder('urlshort')
            .orWhere('urlshort.url = :url', { url: queryParams.url })
            .orWhere('urlshort.id = :id', { id: queryParams.id })
            .orWhere('urlshort.code = :code', { code: queryParams.code })
            .getMany();
        if (urlshort.length === 0) throw new NotFoundException(`This is not found`)
        return urlshort
    }

    async updateUrlshort(
        id: number,
        urlshortDto: UpdateUrlshortDto
    ): Promise<Urlshort> {
        try {
            const urlshort = await this.findByIdUrlshort(id);
            urlshort.url = urlshortDto.url;
            urlshort.code = urlshortDto.code;
            await this.save(urlshort);
            return urlshort
        } catch (error) {
            throw new NotFoundException(`This id:${id} is not found`)
        }
    }

    async removeUrlshort(id: number): Promise<{ statusCode: number, message: string }> {
        const urlshort = await this.delete(id)
        if (urlshort.affected === 0) throw new NotFoundException(`This id:${id} is not found`)
        return { statusCode: 200, message: 'Deleted successfully !' }
    }
}


