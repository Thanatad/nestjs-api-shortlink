import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUrlshortDto } from './dto/create-urlshort.dto';
import { UpdateUrlshortDto } from './dto/update-urlshort.dto';
import { Urlshort } from './entities/urlshort.entity';
import { UrlshortRepository } from './repository/urlshort.repository';

@Injectable()
export class UrlshortService {
  constructor(@InjectRepository(UrlshortRepository)
  private urlshortRepository: UrlshortRepository) { }

  create(urlshortDto: CreateUrlshortDto): Promise<Urlshort> {
    return this.urlshortRepository.createUrlshort(urlshortDto);
  }

  findAll(): Promise<Urlshort[]> {
    return this.urlshortRepository.find();
  }

  findOne(id: number): Promise<Urlshort> {
    return this.urlshortRepository.findOneUrlshort(id);
  }

  update(id: number, updateUrlshortDto: UpdateUrlshortDto) {
    return this.urlshortRepository.updateUrlshort(id, updateUrlshortDto);
  }

  remove(id: number) {
    return this.urlshortRepository.removeUrlshort(id);
  }
}
