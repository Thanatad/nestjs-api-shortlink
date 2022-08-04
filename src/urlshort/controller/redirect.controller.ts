import { Controller, Get, Param, Res } from '@nestjs/common';
import { UrlshortService } from '../urlshort.service';
import { GetUrlshortQuery } from './urlshort.getquery';

@Controller()
export class RedirectController {
    constructor(private readonly urlshortService: UrlshortService) { }

    @Get(':code')
    async redirect(@Res() response, @Param() paramQuery: GetUrlshortQuery) {
        try {
            const urlshort = await this.urlshortService.findByFilter({ code: paramQuery.code });
            return response.redirect(urlshort[0].url);
        } catch (error) {
            return response.redirect('https://xhofficial.com/');
        }
    }
}
