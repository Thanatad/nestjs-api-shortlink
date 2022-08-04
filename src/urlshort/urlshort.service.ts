import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUrlshortDto } from './dto/create-urlshort.dto';
import { UpdateUrlshortDto } from './dto/update-urlshort.dto';
import { Urlshort } from './entities/urlshort.entity';
import { UrlshortRepository } from './repository/urlshort.repository';
import { GetUrlshortQuery } from './controller/urlshort.getquery';

const shortid = require('shortid');
const urlExists = require('url-exists-deep');
@Injectable()
export class UrlshortService {
  constructor(@InjectRepository(UrlshortRepository)
  private urlshortRepository: UrlshortRepository) { }

  async create(urlshortDto: CreateUrlshortDto): Promise<Urlshort> {
    const isUrlStatus = await this.checkUrlExist(urlshortDto)
    if (isUrlStatus === 2) {
      urlshortDto.code = shortid.generate()
      return this.urlshortRepository.createUrlshort(urlshortDto)
    } else if (isUrlStatus === 1) {
      const urlshort = await this.findByFilter({ url: urlshortDto.url })
      return urlshort[0]
    } else {
      throw new BadRequestException('Url\'\s wrong I can feel it.')
    }

  }

  findAll(): Promise<Urlshort[]> {
    return this.urlshortRepository.find()
  }

  findById(id: number): Promise<Urlshort> {
    return this.urlshortRepository.findByIdUrlshort(id);
  }

  findByFilter(queryParams: GetUrlshortQuery): Promise<Urlshort[]> {
    return this.urlshortRepository.findByFilterUrlshort(queryParams);
  }

  update(id: number, updateUrlshortDto: UpdateUrlshortDto): Promise<Urlshort> {
    return this.urlshortRepository.updateUrlshort(id, updateUrlshortDto);
  }

  remove(id: number) {
    return this.urlshortRepository.removeUrlshort(id);
  }


  /**
   *
   * @param urlshortDto
   * @Type CreateUrlshortDto
   * @returns 1 if url is exist on database
   * @returns 2 if url empty on database
   * @returns 3 if url is exist link
   * @returns
   */
  private async checkUrlExist(urlshortDto: CreateUrlshortDto) {
    const isUrlExist = await urlExists(urlshortDto.url);
    if (isUrlExist) {
      try {
        await this.findByFilter({ url: urlshortDto.url })
        return 1
      } catch (err) {
        return 2
      }
    } else {
      return 3
    }
  }
}
