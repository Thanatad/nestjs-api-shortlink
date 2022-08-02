
import { ConfigModule, ConfigService } from '@nestjs/config';
import 'dotenv/config';
import { DataSourceOptions } from 'typeorm';
import {
    TypeOrmModuleAsyncOptions,
    TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (): Promise<TypeOrmModuleOptions> => {
        return {
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
        };
    },

};


export const typeOrmConfig: DataSourceOptions = {
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
    },
}

