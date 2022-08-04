import { Module } from '@nestjs/common';
import { UrlshortService } from './urlshort.service';
import { UrlshortController } from './urlshort.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlshortRepository } from './repository/urlshort.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UrlshortRepository])],
  controllers: [UrlshortController],
  providers: [UrlshortService, UrlshortRepository],
})
export class UrlshortModule { }
