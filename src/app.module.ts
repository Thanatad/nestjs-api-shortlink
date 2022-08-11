import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from './config/typeorm.config';
import { validate } from './config/env.validation';
import { UrlshortModule } from './urlshort/urlshort.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      validate,
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    UrlshortModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
