import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { CreateUrlshortDto } from "../dto/create-urlshort.dto";
import { UpdateUrlshortDto } from "../dto/update-urlshort.dto";
import { Urlshort } from "../entities/urlshort.entity";

@Injectable()
export class UrlshortRepository extends Repository<Urlshort> {
    constructor(private dataSource: DataSource) {
        super(Urlshort, dataSource.createEntityManager())
    }

    async createUrlshort(
        urlshortDto: CreateUrlshortDto,
    ): Promise<Urlshort> {
        try {
            const urlshort = new Urlshort();
            urlshort.url = urlshortDto.url;
            urlshort.code = urlshortDto.code;
            await this.save(urlshort);
            return urlshort;
        } catch (error) {
            throw new ConflictException({ message: ['Something\s wrong I can feel it.'] })
        }
    }

    async findOneUrlshort(id: number): Promise<Urlshort> {
        const urlshort = await this.findOne({ where: { id } });
        if (!urlshort) throw new NotFoundException(`This id:${id} is not found`)
        return urlshort
    }

    async updateUrlshort(
        id: number,
        urlshortDto: UpdateUrlshortDto
    ): Promise<Urlshort> {
        try {
            const urlshort = await this.findOneUrlshort(id);
            urlshort.url = urlshortDto.url;
            urlshort.code = urlshortDto.code;
            await this.save(urlshort);
            return urlshort
        } catch (error) {
            throw new NotFoundException(`This id:${id} is not found`)
        }

    }

    async removeUrlshort(id: number): Promise<{ message: string }> {
        const urlshort = await this.delete(id)
        if (urlshort.affected === 0) throw new NotFoundException(`This id:${id} is not found`)
        return { message: 'Deleted successfully !' }
    }
}


