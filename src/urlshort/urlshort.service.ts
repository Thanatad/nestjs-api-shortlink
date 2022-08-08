import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUrlshortDto } from './dto/create-urlshort.dto';
import { UpdateUrlshortDto } from './dto/update-urlshort.dto';
import { Urlshort } from './entities/urlshort.entity';
import { UrlshortRepository } from './repository/urlshort.repository';
import { GetUrlshortQuery } from './controller/urlshort.getquery';
import { UrlshortResource } from './resource/urlshort.resource';
import { UrlshortCollection } from './resource/urlshort.collection';
import { UrlshortCollectionPayload as UCPayload } from './interface/urlshort.collection.payload.interface';

const shortid = require('shortid');
const urlExists = require('url-exists-deep');
@Injectable()
export class UrlshortService {
  constructor(@InjectRepository(UrlshortRepository)
  private urlshortRepository: UrlshortRepository) { };

  async create(urlshortDto: CreateUrlshortDto): Promise<Urlshort> {
    const isUrlStatus: number = await this.checkUrlExist(urlshortDto);

    switch (isUrlStatus) {
      case 1: {
        const urlshort: UCPayload = await this.findByFilter({ url: urlshortDto.url });
        return urlshort.data[0];
      }
      case 2: {
        urlshortDto.code = shortid.generate();
        const urlshort: Urlshort = await this.urlshortRepository.createUrlshort(urlshortDto);
        return new UrlshortResource(urlshort);
      }
      default:
        throw new BadRequestException('Url\'\s wrong I can feel it.');
    }
  }

  async findAll(): Promise<UCPayload> {
    const urlshort: Urlshort[] = await this.urlshortRepository.find();
    return UrlshortResource.collection(new UrlshortCollection(urlshort));
  }

  async findById(id: number): Promise<UCPayload> {
    const urlshort: Urlshort = await this.urlshortRepository.findByIdUrlshort(id);
    return UrlshortResource.collection(new UrlshortCollection([urlshort]));
  }
  async findByFilter(queryParams: GetUrlshortQuery): Promise<UCPayload> {
    const urlshort: Urlshort[] = await this.urlshortRepository.findByFilterUrlshort(queryParams);
    return UrlshortResource.collection(new UrlshortCollection(urlshort));
  }

  async update(id: number, updateUrlshortDto: UpdateUrlshortDto): Promise<Urlshort> {
    const urlshort: Urlshort = await this.urlshortRepository.updateUrlshort(id, updateUrlshortDto);
    return new UrlshortResource(urlshort);
  }

  remove(id: number): Promise<object> {
    return this.urlshortRepository.removeUrlshort(id);
  }


  /**
   *
   * @param urlshortDto
   * @Type CreateUrlshortDto
   * @returns 1 if url is exists on database
   * @returns 2 if url is not exists on database
   * @returns 3 if url is exists link
   * @returns
   */
  private async checkUrlExist(urlshortDto: CreateUrlshortDto) {
    const isUrlExists: string = await urlExists(urlshortDto.url);
    if (isUrlExists) {
      try {
        await this.findByFilter({ url: urlshortDto.url });
        return 1;
      } catch (err) {
        return err.response.statusCode === 404 ? 2 : 3;
      }
    } else {
      return 3;
    }
  }
}
