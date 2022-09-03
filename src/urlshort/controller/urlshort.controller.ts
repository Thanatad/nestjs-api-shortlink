import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { UrlshortService } from '../urlshort.service';
import { CreateUrlshortDto } from '../dto/create-urlshort.dto';
import { UpdateUrlshortDto } from '../dto/update-urlshort.dto';
import { GetUrlshortQuery } from './urlshort.getquery';

@Controller('urlshort')
export class UrlshortController {
  constructor(private readonly urlshortService: UrlshortService) {}

  @Post('//')
  create(@Body() urlshortDto: CreateUrlshortDto) {
    return this.urlshortService.create(urlshortDto);
  }

  @Get('//')
  findAll(@Query() queryParams: GetUrlshortQuery) {
    queryParams.limit = queryParams.limit > 100 ? 100 : queryParams.limit;

    return this.urlshortService.findAll({
      limit: queryParams.limit,
      page: queryParams.page,
      route: `${process.env.BASE_URL}/${process.env.API_CURRENT_VERSION}/urlshort`,
    });
  }

  @Get('/filter')
  findByFilter(@Query() queryParams: GetUrlshortQuery) {
    return this.urlshortService.findByFilter(queryParams);
  }

  @Get(':id')
  findById(@Param() queryParams: GetUrlshortQuery) {
    return this.urlshortService.findById(queryParams.id);
  }

  @Put(':id')
  update(
    @Param() queryParams: GetUrlshortQuery,
    @Body() urlshortDto: UpdateUrlshortDto,
  ) {
    return this.urlshortService.update(queryParams.id, urlshortDto);
  }

  @Delete(':id')
  remove(@Param() queryParams: GetUrlshortQuery) {
    return this.urlshortService.remove(queryParams.id);
  }
}
