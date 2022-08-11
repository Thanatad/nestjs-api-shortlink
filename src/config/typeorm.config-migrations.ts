import { typeOrmConfig } from './typeorm.config';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource(typeOrmConfig);
