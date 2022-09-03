import { Controller, Get, Param, Res } from '@nestjs/common';
import { UrlshortRepository } from '../repository/urlshort.repository';
import { GetUrlshortQuery } from './urlshort.getquery';

@Controller()
export class RedirectController {
  constructor(private readonly urlshortRepository: UrlshortRepository) {}

  @Get(':code')
  async redirect(@Res() response, @Param() paramQuery: GetUrlshortQuery) {
    try {
      const urlshort = await this.urlshortRepository._findByFilterUrlshort({
        code: paramQuery.code,
      });
      return response.redirect(urlshort[0].url);
    } catch (error) {
      return response.redirect('https://xhofficial.com/');
    }
  }
}
