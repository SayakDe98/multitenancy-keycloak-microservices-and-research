import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

const config: MysqlConnectionOptions = {
    type: "mysql",
    database: "my_db_1",
    port: 3306,
    username: "root",
    password: "root123",
    host: "localhost",
    // entities: ['./entities/**'],
    entities: ['dist/src/entities/**'],
    synchronize: false,
    migrations: [
        'dist/src/db/migrations/*.js'
    ],
    // cli: {
    //     migrationsDir: 'src/db/migrations'
    // }
}

export default config;