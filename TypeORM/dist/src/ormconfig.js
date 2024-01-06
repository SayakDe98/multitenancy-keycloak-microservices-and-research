"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    type: "mysql",
    database: "my_db_1",
    port: 3306,
    username: "root",
    password: "root123",
    host: "localhost",
    entities: ['dist/src/entities/**'],
    synchronize: false,
    migrations: [
        'dist/src/db/migrations/*.js'
    ],
};
exports.default = config;
//# sourceMappingURL=ormconfig.js.map