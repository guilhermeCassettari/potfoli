import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../modules/entity/User';
import { GetEnv } from './getEnv/GetEnv';

const getEnv = new GetEnv();

export const AppDataSource = new DataSource({
  type: getEnv.dbType,
  host: getEnv.dbHost,
  port: getEnv.dbPort,
  username: getEnv.dbUserName,
  password: getEnv.dbPassword,
  database: getEnv.dbName,
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});

AppDataSource.initialize().catch(err => {
  //  eslint-disable-next-line no-console
  console.error('Error during Data Source initialization', err);
});
