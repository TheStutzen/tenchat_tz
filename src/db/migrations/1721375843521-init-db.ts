import { MigrationInterface, QueryRunner } from 'typeorm'

export class InitDb1721375843521 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "user" (
            "id" SERIAL PRIMARY KEY,
            "name" VARCHAR NOT NULL,
            "email" VARCHAR NOT NULL UNIQUE,
            "balance" INTEGER DEFAULT 0 NOT NULL,
            "dateReg" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
          );`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "user";`)
  }
}
