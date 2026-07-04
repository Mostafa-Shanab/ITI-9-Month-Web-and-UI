import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1720230000000 implements MigrationInterface {
  name = 'InitialSchema1720230000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    await queryRunner.query(`CREATE TYPE "public"."orders_paymentmethod_enum" AS ENUM('Cash', 'Visa')`);

    await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_fe0bb3f65ca3c14d79c6d3bc854" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f0c8d3d" UNIQUE ("email"), CONSTRAINT "PK_a3c1483314cd855e92cf1f7a314" PRIMARY KEY ("id"))`);

    await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "price" numeric(10,2) NOT NULL, CONSTRAINT "PK_0806c755e0dc1e1be8ff500dec2" PRIMARY KEY ("id"))`);

    await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" numeric(10,2) NOT NULL, "longitude" double precision NOT NULL, "latitude" double precision NOT NULL, "paymentMethod" "public"."orders_paymentmethod_enum" NOT NULL DEFAULT 'Cash', "clientId" uuid, CONSTRAINT "PK_710e2d4957aa5878d94079ac330" PRIMARY KEY ("id"))`);

    await queryRunner.query(`CREATE TABLE "order_products" ("order_id" uuid NOT NULL, "product_id" uuid NOT NULL, CONSTRAINT "PK_d8eb8307d8dbcc40a5a3a71b12b" PRIMARY KEY ("order_id", "product_id"))`);

    await queryRunner.query(`CREATE INDEX "IDX_order_products_order_id" ON "order_products" ("order_id") `);
    await queryRunner.query(`CREATE INDEX "IDX_order_products_product_id" ON "order_products" ("product_id") `);

    await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_orders_clientId" FOREIGN KEY ("clientId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);

    await queryRunner.query(`ALTER TABLE "order_products" ADD CONSTRAINT "FK_order_products_order_id" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE "order_products" ADD CONSTRAINT "FK_order_products_product_id" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "order_products" DROP CONSTRAINT "FK_order_products_product_id"`);
    await queryRunner.query(`ALTER TABLE "order_products" DROP CONSTRAINT "FK_order_products_order_id"`);

    await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_orders_clientId"`);

    await queryRunner.query(`DROP INDEX "public"."IDX_order_products_product_id"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_order_products_order_id"`);

    await queryRunner.query(`DROP TABLE "order_products"`);
    await queryRunner.query(`DROP TABLE "orders"`);
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(`DROP TABLE "users"`);

    await queryRunner.query(`DROP TYPE "public"."orders_paymentmethod_enum"`);
  }
}
