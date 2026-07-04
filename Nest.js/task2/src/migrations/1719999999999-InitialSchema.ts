import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1719999999999 implements MigrationInterface {
    name = 'InitialSchema1719999999999'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
        await queryRunner.query(`CREATE TYPE "public"."order_paymentmethod_enum" AS ENUM('Cash', 'Visa')`);
        await queryRunner.query(`CREATE TABLE "order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" double precision NOT NULL, "longitude" double precision NOT NULL, "latitude" double precision NOT NULL, "clientId" integer NOT NULL, "paymentMethod" "public"."order_paymentmethod_enum" NOT NULL, CONSTRAINT "PK_order_id" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TYPE "public"."order_paymentmethod_enum"`);
    }
}
