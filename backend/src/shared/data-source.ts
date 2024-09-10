import 'reflect-metadata';
import path from 'path';
import { DataSource } from 'typeorm';
import { User } from '../modules/users/entities/User.entity';
import { GetEnv } from './getEnv/GetEnv';
import AppError from './errors/AppError';
import { UploadImage } from '../modules/upload/entities/UploadImage.entity';
import { HomePage } from '../modules/pages/entities/HomePage.entity';

const getEnv = GetEnv.getInstance();
const migrationPath = path.join(
  __dirname,
  '..',
  '..',
  'migrations',
  '*.ts',
);

export const AppDataSource = new DataSource({
  type: getEnv.dbType,
  host: getEnv.dbHost,
  port: getEnv.dbPort,
  username: getEnv.dbUserName,
  password: getEnv.dbPassword,
  database: getEnv.dbName,
  synchronize: true,
  logging: false,
  entities: [User, UploadImage, HomePage],
  migrations: [migrationPath],

  subscribers: [],
});

AppDataSource.initialize().catch(err => {
  throw new AppError(
    `Error during Data Source initialization ${err}`,
    500,
  );
});
