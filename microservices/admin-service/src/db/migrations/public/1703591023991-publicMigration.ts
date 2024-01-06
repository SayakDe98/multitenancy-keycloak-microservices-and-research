import { MigrationInterface, QueryRunner } from "typeorm";

export class PublicMigration1703591023991 implements MigrationInterface {
    name = 'PublicMigration1703591023991'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "PROVIDER_GROUP" ("id" SERIAL NOT NULL, "CLINIC_ID" uuid NOT NULL, "NAME" character varying(500) NOT NULL, "DESCRIPTION" character varying(500) NOT NULL, "ROOT_URL" character varying(500) NOT NULL, "BASE_URL" character varying(500) NOT NULL, "ALWAYS_DISPLAY_IN_CONSOLE" boolean NOT NULL, "CREATED_AT" TIMESTAMP NOT NULL DEFAULT now(), "UPDATED_AT" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_750318ea24ec566d073afae38e5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."USER_roles_enum" AS ENUM('SUPER_ADMIN', 'SUPPORT', 'PROVIDER_GROUP_ADMIN', 'FRONTDESK', 'BILLER', 'ADMISSIONS_COORDINATOR', 'SETTERS', 'PATIENT_EDUCATOR', 'ACCOUNTANT', 'IT_SUPPORT', 'QA_AND_COMPLIANCE', 'MA', 'NURSE_PRACTITIONERS', 'NURSE', 'CRNA', 'DOCTOR', 'THERAPIST', 'PHARMACIST', 'LAB_SPECIALIST', 'REMOTE_CLINICIAN', 'PATIENT')`);
        await queryRunner.query(`CREATE TABLE "USER" ("id" SERIAL NOT NULL, "IAM_ID" uuid NOT NULL, "USERNAME" uuid NOT NULL, "FIRST_NAME" character varying(500) NOT NULL, "LAST_NAME" character varying(500) NOT NULL, "MOBILE_NO" character varying(500) NOT NULL, "EMAIL" character varying(500) NOT NULL, "ADDRESS" character varying(500) NOT NULL, "ROLES" "public"."USER_roles_enum" NOT NULL, "CREATED_AT" TIMESTAMP NOT NULL DEFAULT now(), "UPDATED_AT" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_84af7daf6264dc1b7d12b1eeb21" UNIQUE ("IAM_ID"), CONSTRAINT "UQ_d02ca672152e744cf7ba53d2864" UNIQUE ("USERNAME"), CONSTRAINT "UQ_d4a32d7995d4c1cde2ebe0fb262" UNIQUE ("EMAIL"), CONSTRAINT "PK_480564dbef3c7391661ce3b9d5c" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "USER"`);
        await queryRunner.query(`DROP TYPE "public"."USER_roles_enum"`);
        await queryRunner.query(`DROP TABLE "PROVIDER_GROUP"`);
    }

}
