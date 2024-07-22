import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entity/User';
import { GetEnv } from './shared/getEnv/GetEnv';

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
