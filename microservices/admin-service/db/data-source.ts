import { join } from "path";
import { DataSource, DataSourceOptions } from "typeorm";
require('dotenv').config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process?.env?.DATABASE_HOST,
  port: 5432,
  username: process?.env?.DATABASE_USERNAME,
  password: process?.env?.DATABASE_PASSWORD,
  database: process?.env?.DATABASE_NAME,
  logging: true,
  entities: [join(__dirname, '../../dist/src/entities/*.entity{.js, .ts}')],
  migrations: [__dirname + '/migrations/**/*.js'],
  synchronize: true,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;