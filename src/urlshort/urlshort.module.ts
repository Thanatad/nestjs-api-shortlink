import { Module } from '@nestjs/common';
import { UrlshortService } from './urlshort.service';
import { UrlshortController } from './controller/urlshort.controller';
import { RedirectController } from './controller/redirect.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlshortRepository } from './repository/urlshort.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UrlshortRepository])],
  controllers: [UrlshortController, RedirectController],
  providers: [UrlshortService, UrlshortRepository],
})
export class UrlshortModule {}
