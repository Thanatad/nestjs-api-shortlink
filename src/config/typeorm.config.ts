require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
import {
    TypeOrmModuleAsyncOptions,
    TypeOrmModuleOptions,
} from '@nestjs/typeorm';


const databaseConfig: DataSourceOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    entities: [`${__dirname}/../**/*.entity.{js,ts}`],
    migrationsRun: false,
    logging: true,
    migrationsTableName: "migration",
    migrations: [`${__dirname}/../database/migrations/*.{js,ts}`],
    extra: {
        charset: 'utf8mb4_unicode_ci',
    }
}

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (): Promise<TypeOrmModuleOptions> => {
        return databaseConfig
    },

};

export const typeOrmConfig: DataSourceOptions = databaseConfig

