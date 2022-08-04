import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUrlshortDto } from './dto/create-urlshort.dto';
import { UpdateUrlshortDto } from './dto/update-urlshort.dto';
import { Urlshort } from './entities/urlshort.entity';
import { UrlshortRepository } from './repository/urlshort.repository';

@Injectable()
export class UrlshortService {
  constructor(@InjectRepository(UrlshortRepository)
  private urlshortRepository: UrlshortRepository) { }

  create(createUrlshortDto: CreateUrlshortDto) : Promise<Urlshort> {
    return this.urlshortRepository.createUrlshort(createUrlshortDto);
  }

  findAll(): Promise<Urlshort[]> {
    return this.urlshortRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} urlshort`;
  }

  update(id: number, updateUrlshortDto: UpdateUrlshortDto) {
    return `This action updates a #${id} urlshort`;
  }

  remove(id: number) {
    return `This action removes a #${id} urlshort`;
  }
}
