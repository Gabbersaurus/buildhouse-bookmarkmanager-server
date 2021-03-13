import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1615642328224 implements MigrationInterface {
    name = 'initial1615642328224'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "password" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "bookmark" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "url" varchar NOT NULL, "order" integer NOT NULL, "userId" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_bookmark" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "url" varchar NOT NULL, "order" integer NOT NULL, "userId" integer, CONSTRAINT "FK_e389fc192c59bdce0847ef9ef8b" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_bookmark"("id", "name", "url", "order", "userId") SELECT "id", "name", "url", "order", "userId" FROM "bookmark"`);
        await queryRunner.query(`DROP TABLE "bookmark"`);
        await queryRunner.query(`ALTER TABLE "temporary_bookmark" RENAME TO "bookmark"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookmark" RENAME TO "temporary_bookmark"`);
        await queryRunner.query(`CREATE TABLE "bookmark" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "url" varchar NOT NULL, "order" integer NOT NULL, "userId" integer)`);
        await queryRunner.query(`INSERT INTO "bookmark"("id", "name", "url", "order", "userId") SELECT "id", "name", "url", "order", "userId" FROM "temporary_bookmark"`);
        await queryRunner.query(`DROP TABLE "temporary_bookmark"`);
        await queryRunner.query(`DROP TABLE "bookmark"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
