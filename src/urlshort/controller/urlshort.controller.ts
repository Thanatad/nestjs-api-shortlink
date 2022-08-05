import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { UrlshortService } from '../urlshort.service';
import { CreateUrlshortDto } from '../dto/create-urlshort.dto';
import { UpdateUrlshortDto } from '../dto/update-urlshort.dto';
import { GetUrlshortQuery } from './urlshort.getquery';


@Controller('urlshort')
export class UrlshortController {
  constructor(private readonly urlshortService: UrlshortService) { }

  @Post('//')
  create(@Body() createUrlshortDto: CreateUrlshortDto) {
    return this.urlshortService.create(createUrlshortDto);
  }

  @Get('//')
  findAll() {
    return this.urlshortService.findAll();
  }

  @Get('/filter')
  findByFilter(@Query() queryParams: GetUrlshortQuery) {

    return this.urlshortService.findByFilter(queryParams);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.urlshortService.findById(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUrlshortDto: UpdateUrlshortDto) {
    return this.urlshortService.update(+id, updateUrlshortDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.urlshortService.remove(+id);
  }
}
