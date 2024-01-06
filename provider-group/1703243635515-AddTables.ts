import { MigrationInterface } from "typeorm"
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { PostgresQueryRunner } from 'typeorm/driver/postgres/PostgresQueryRunner';

export class AddTables1703243635515 implements MigrationInterface {

    public async up(queryRunner: PostgresQueryRunner): Promise<void> {
        const { schema } = queryRunner.connection.options as PostgresConnectionOptions;
        console.log(schema, 'schema')
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "${schema}"."USER" ("id" SERIAL PRIMARY KEY,
    "IAM_ID" UUID NOT NULL,
    "FIRST_NAME" VARCHAR(500) NOT NULL,
    "LAST_NAME" VARCHAR(500) NOT NULL,
    "MOBILE_NO" VARCHAR(500) NOT NULL,
    "EMAIL" VARCHAR(500) NOT NULL,
    "ADDRESS" VARCHAR(500) NOT NULL,
    "ROLES" "user_roles"[] NOT NULL,
    "CREATED_AT" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "UPDATED_AT" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`);
await queryRunner.query(`CREATE TABLE IF NOT EXISTS "${schema}"."PROVIDER_GROUP" (
    "id" SERIAL PRIMARY KEY,
    "CLINIC_ID" UUID NOT NULL,
    "NAME" VARCHAR(500) NOT NULL,
    "DESCRIPTION" VARCHAR(500) NOT NULL,
    "ROOT_URL" VARCHAR(500) NOT NULL,
    "BASE_URL" VARCHAR(500) NOT NULL,
    "ALWAYS_DISPLAY_IN_CONSOLE" BOOLEAN NOT NULL,
    "CREATED_AT" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "UPDATED_AT" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`);
    }

    public async down(queryRunner: PostgresQueryRunner): Promise<void> {
        const { schema } = queryRunner.connection
          .options as PostgresConnectionOptions;
        await queryRunner.query(`DROP TABLE IF EXISTS "${schema}"."USER"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "${schema}"."PROVIDER_GROUP"`);
    }

}
